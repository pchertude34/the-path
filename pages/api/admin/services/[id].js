import nc from 'next-connect';
import { prisma } from '~/utils/database';
import { serviceUpdateSchema } from '~/utils/schema';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function getServiceById(req, res) {
    const { id } = req.query;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    res.json(service);
  })
  .put(async function updateServiceById(req, res) {
    const { id } = req.query;
    const { body } = req;

    const serviceData = await serviceUpdateSchema.validate(body, {
      abortEarly: true,
      stripUnkonwn: true,
    });

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        description: serviceData.description,
      },
    });

    res.status(200).json(updatedService);
  })
  .delete(async function deleteServiceById(req, res) {
    const { id } = req.query;

    await prisma.service.delete({
      where: { id },
    });

    res.send();
  });

export default handler;
