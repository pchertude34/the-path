import nc from 'next-connect';
import { prisma } from '~/utils/database';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';
import { serviceSchema } from '~/utils/schema';
import { query } from '~/utils/constants';
import { ApiError } from '~/utils/error';

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
        OR: [
          {
            id: { contains: q },
          },
          {
            description: { contains: q },
          },
        ],
      };
    }

    const serviceTypesPromise = prisma.service.findMany({
      skip: parseInt(from, 10),
      take: parseInt(size, 10),
      ...params,
    });

    // Add the search term to the count if the user is passing it in.
    // This way we only get the count of services that match the search term.
    const serviceTypesCountPromise = prisma.service.count({
      where: { ...params.where },
    });

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
  })
  .post(async function createService(req, res) {
    const { body } = req;

    // validate the data in order to return any specific errors
    const serviceData = await serviceSchema.validate(body, {
      abortEarly: true,
      stripUnknown: true,
    });

    // Check to see if a service with the sent id already exists. We don't want duplicates.
    const existingService = await prisma.service.findUnique({
      where: {
        id: serviceData.id,
      },
    });

    // Throw an error if a service with the same id exists.
    if (existingService) {
      throw new ApiError(`Service with id ${serviceData.id} already exists!`, 400);
    }

    const createdService = await prisma.service.create({
      data: serviceData,
    });

    res.status(201).json(createdService);
  });

export default handler;
