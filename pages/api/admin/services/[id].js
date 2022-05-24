import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';

const prisma = new PrismaClient();

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function getServiceById(req, res) {
    const { id } = req.query;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    res.json(service);
  });

export default handler;
