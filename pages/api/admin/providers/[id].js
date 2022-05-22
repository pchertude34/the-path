import nc from 'next-connect';
import { PrismaClient, Prisma } from '@prisma/client';
import { providerUpdateSchema } from '~/utils/schema';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';

const prisma = new PrismaClient();

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function getProviderById(req, res) {
    const { id } = req.query;

    const provider = await prisma.provider.findUnique({
      where: { id: parseInt(id, 10) },
    });

    res.json(provider);
  })
  .put(async function updateProviderById(req, res) {
    const { id } = req.query;
    const { body } = req;
    const updatedServices = body.serviceTypes;

    const providerData = await providerUpdateSchema.validate(body, {
      abortEarly: true,
      stripUnknown: true,
    });

    // Query the current provider data from the database so we can figure out what is changing.
    const currentProvider = await prisma.provider.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        serviceOnProvider: {
          select: {
            serviceId: true,
          },
        },
      },
    });

    // Get the current services associated with the provider so we can determin which ones to add
    // and which ones to remove.
    const currentServices = currentProvider.serviceOnProvider.map(
      (serviceType) => serviceType.serviceId
    );

    // Get a list of all services that aren't currently associated with the provider. We will add these to the provider later.
    let servicesToAdd = updatedServices.filter((s) => !currentServices.includes(s));
    // Get a list of all services that are currently associated with the provider, but aren't in the new service data.
    // We will remove these services from the provider later.
    let servicesToRemove = currentServices.filter((s) => !updatedServices.includes(s));

    const updateProviderQuery = {
      where: { id: parseInt(id, 10) },
      data: {
        description: providerData.description,
        serviceOnProvider: {},
      },
    };

    // Remove old services from the provider
    if (servicesToRemove.length > 0) {
      updateProviderQuery.data.serviceOnProvider.deleteMany = servicesToRemove.map((serviceId) => ({
        serviceId,
      }));
    }

    // Add new services to the provider
    if (servicesToAdd.length > 0) {
      updateProviderQuery.data.serviceOnProvider.create = servicesToAdd.map((serviceId) => ({
        service: {
          connect: {
            id: serviceId,
          },
        },
      }));
    }

    const updatedProvider = await prisma.provider.update(updateProviderQuery);

    res.status(200).json(updatedProvider);
  })
  .delete(async function deleteProviderById(req, res) {
    const { id } = req.query;

    await prisma.provider.delete({
      where: { id: parseInt(id, 10) },
    });

    res.send();
  });
export default handler;
