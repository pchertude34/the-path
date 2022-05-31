import nc from 'next-connect';
import { prisma } from '~/utils/database';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';
import { query } from '~/utils/constants';

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function listAllServiceTypes(req, res) {
    const { sortField = 'description', sortDir = query.ASC } = req.query;

    let params = {};

    // Add sorting if the user wants it.
    if (sortField) {
      params.orderBy = [{ [sortField]: sortDir }];
    }

    const serviceTypes = await prisma.service.findMany({
      ...params,
    });

    res.json(serviceTypes);
  });

export default handler;
