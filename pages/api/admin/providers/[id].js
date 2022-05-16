import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import withPermissions from '../../../../middleware/withAdmin';
import onError from '../../../../middleware/onError';

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
  .delete(async function deleteProviderById(req, res) {
    const { id } = req.query;

    await prisma.provider.delete({
      where: { id: parseInt(id, 10) },
    });

    res.send();
  });
export default handler;
