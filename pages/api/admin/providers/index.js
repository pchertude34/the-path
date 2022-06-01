import nc from 'next-connect';
import { Prisma } from '@prisma/client';
import withPermissions from '~/middleware/withAdmin';
import onError from '~/middleware/onError';
import { query } from '~/utils/constants';
import { providerSchema } from '~/utils/schema';
import { ApiError } from '~/utils/error';

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
    // Right now, we are just searching by name and address.
    if (q) {
      params.where = {
        OR: [
          {
            name: { contains: q },
          },
          {
            address: { contains: q },
          },
        ],
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

    // Add the search term to the count if the user is passing it in.
    // This way we only get the count of providers that match the search term.
    const providerCountPromise = prisma.provider.count({
      where: { ...params.where },
    });

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
  })
  .post(async function createProvider(req, res) {
    const { body } = req;

    // validate the data coming being loaded in so we can return any specific errors to the frontend.
    const providerData = await providerSchema.validate(body, {
      abortEarly: true,
      stripUnknown: true,
    });

    // Make sure the current provider doesn't already exist by checking the placeId in the database.
    const existingProvider = await prisma.provider.findFirst({
      where: {
        placeId: providerData.placeId,
      },
    });

    // TODO: Remove this once we change schema to have unique placeIds
    // Throw an error if a provider with that place exists already.
    if (existingProvider) {
      throw new ApiError(`Provider with placeId ${providerData.placeId} already exists!`, 400);
    }

    // Because we Prisma doesn't support the "Geom" type in MySQL, we cannot use .create or .update and
    // we need to do so manually using raw queries.
    const location = `ST_GeomFromText('POINT(${providerData.latitude} ${providerData.longitude})', 4326)`;
    const createProviderQuery = Prisma.sql`
        INSERT INTO \`the-path\`.Provider (place_id, address, name, description, location) 
        VALUES (${providerData.placeId}, ${providerData.address}, ${providerData.name}, ${
      providerData.description
    }, ${Prisma.raw(location)});
      `;
    await prisma.$executeRaw(createProviderQuery);

    // Now we need to query the provider we just created, since prisma raw query executes dont'
    // return the created entry.
    // We need this for joining the services.
    const newlyCreatedProvider = await prisma.provider.findFirst({
      where: {
        placeId: providerData.placeId,
      },
    });

    providerData.serviceTypes.forEach(async (serviceType) => {
      // We want to issolate the errors for all of the services here
      // since we don't want one failed service join to ruin the whole query.
      try {
        const serviceJoinQuery = Prisma.sql`
            INSERT INTO \`the-path\`.ServiceOnProvider
            VALUES (${newlyCreatedProvider.id}, ${serviceType})
          `;
        await prisma.$executeRaw(serviceJoinQuery);
      } catch (error) {
        // TODO: deal with errors here
        console.error(error);
      }
    });

    res.status(201).send();
  });

export default handler;
