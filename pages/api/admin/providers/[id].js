import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import withPermissions from '../../../../middleware/withAdmin';
import onError from '../../../../middleware/onError';

const prisma = new PrismaClient();

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function getProviderById(req, res) {
    const { id } = req.query;

    // console.log('req.params', req.params);

    const provider = await prisma.provider.findUnique({
      where: { id: parseInt(id, 10) },
    });

    res.json(provider);
  });

export default handler;
