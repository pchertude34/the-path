import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { lat, long, distance = 10000 } = req.query;

  try {
    const userLocation = `ST_GeomFromText('POINT(${lat} ${long})', 4326)`;
    const query = Prisma.sql`
      SELECT s.id, s.description, COUNT(sop.service_id) AS total FROM ServiceOnProvider sop
      INNER JOIN Provider p ON p.id = sop.provider_id AND ST_Distance_Sphere(p.location, ${Prisma.raw(
        userLocation
      )}) < ${distance}
      INNER JOIN Service s ON s.id = sop.service_id 
      GROUP BY service_id
      HAVING total > 0;`;

    const nearbyProviderTypes = await prisma.$queryRaw(query);

    res.send(nearbyProviderTypes);
  } catch (error) {
    let errorMessage = 'error getting provider types';
    let statusCode = 500;

    if (error?.meta?.code && error?.meta?.message) {
      errorMessage = error.meta.message;
      statusCode = 400;
    }

    res.status(statusCode).send(errorMessage);
  }
}
