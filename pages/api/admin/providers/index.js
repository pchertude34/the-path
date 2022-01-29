import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import withPermissions from '../../../../middleware/withAdmin';
import onError from '../../../../middleware/onError';
import { query } from '../../../../utils/constants';

const prisma = new PrismaClient();

const handler = nc({ onError })
  .use(withPermissions())
  .get(async function listProviders(req, res) {
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
        OR: [{}],
      };
    }

    const providersPromise = prisma.provider.findMany({
      skip: parseInt(from, 10),
      take: parseInt(size, 10),
      ...params,
      include: {
        serviceOnProvider: {
          select: {
            service: true,
          },
        },
      },
    });

    const providerCountPromise = prisma.provider.count();

    // Run the queries in parallel because they are independent of eachother.
    const [providers, providerCount] = await Promise.all([providersPromise, providerCountPromise]);

    // Get rid of the join attributes that prisma makes us use.
    const filteredProviders = providers.map((provider) => {
      const filteredProvider = {
        ...provider,
        services: provider.serviceOnProvider.map((sop) => sop.service),
      };

      delete filteredProvider.serviceOnProvider;
      return filteredProvider;
    });

    const response = {
      items: filteredProviders,
      total: providerCount,
      from: from,
      size: size,
    };

    res.json(response);
  });

export default handler;
