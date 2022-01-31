import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import withPermissions from '../../../../middleware/withAdmin';
import onError from '../../../../middleware/onError';
import { query } from '../../../../utils/constants';

const prisma = new PrismaClient();

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function listServiceTypes(req, res) {
    const {
      q = '',
      sortField,
      sortDir = query.DEFAULT_DIR,
      from = 0,
      size = query.DEFAULT_SIZE,
    } = req.query;

    let params = {};

    // Add sorting if the user sent it
    if (sortField) {
      params.orderBy = [{ [sortField]: sortDir }];
    }

    // Add the search term if the user sent it
    if (q) {
      params.where = {
        // Placeholder for the search term
        OR: [{}],
      };
    }

    const serviceTypesPromise = prisma.service.findMany({
      skip: parseInt(from, 10),
      take: parseInt(size, 10),
      ...params,
    });

    const serviceTypesCountPromise = prisma.service.count();

    // Run the queries in parallel because they are independent of eachother
    const [serviceTypes, serviceTypesCount] = await Promise.all([
      serviceTypesPromise,
      serviceTypesCountPromise,
    ]);

    const response = {
      items: serviceTypes,
      total: serviceTypesCount,
      from: parseInt(from, 10),
      size: parseInt(size, 10),
    };

    res.json(response);
  });

export default handler;
