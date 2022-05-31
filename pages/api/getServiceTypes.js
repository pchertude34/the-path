import { Prisma } from '@prisma/client';
import { prisma } from '~/utils/database';

export default async function handler(req, res) {
  const { lat, lng, distance = 10000 } = req.query;

  try {
    const userLocation = `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`;
    const query = Prisma.sql`
      SELECT s.id, s.description, COUNT(sop.service_id) AS total FROM ServiceOnProvider sop
      INNER JOIN Provider p ON p.id = sop.provider_id AND ST_Distance_Sphere(p.location, ${Prisma.raw(
        userLocation
      )}) < ${distance}
      INNER JOIN Service s ON s.id = sop.service_id 
      GROUP BY service_id
      HAVING total > 0
      ORDER BY s.description ASC;`;

    const nearbyProviderTypes = await prisma.$queryRaw(query);

    res.send(nearbyProviderTypes);
  } catch (error) {
    console.error(error);
    let errorMessage = 'error getting provider types';
    let statusCode = 500;

    // Check to see if the error follows the prisma error schema
    if (error?.meta?.code && error?.meta?.message) {
      errorMessage = error.meta.message;
      statusCode = 400;
    }

    res.status(statusCode).send(errorMessage);
  }
}
