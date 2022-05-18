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

    const providerData = await providerUpdateSchema.validate(body, {
      abortEarly: true,
      stripUnknown: true,
    });

    const updatedProvider = await prisma.provider.update({
      where: { id: parseInt(id, 10) },
      data: {
        description: providerData.description,
      },
    });

    providerData.serviceTypes.forEach(async (serviceType) => {
      try {
        const serviceJoinQuery = Prisma.sql`
          INSERT INTO \`the-path\`.ServiceOnProvider
          VALUES (${id}, ${serviceType})
        `;
        await prisma.$executeRaw(serviceJoinQuery);
      } catch (error) {
        console.error(error);
      }
    });

    res.status(200).send();
  })
  .delete(async function deleteProviderById(req, res) {
    const { id } = req.query;

    await prisma.provider.delete({
      where: { id: parseInt(id, 10) },
    });

    res.send();
  });
export default handler;
