import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { lat, lng, distance = 10000, serviceType } = req.query;

  try {
    const userLocation = `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`;
    const query = Prisma.sql`
      SELECT *, p.id AS id, ST_Distance_Sphere(p.location, ${Prisma.raw(
        userLocation
      )}) AS distance FROM Provider p
      LEFT JOIN ServiceOnProvider sop ON sop.provider_id = p.id
      LEFT JOIN Service s ON s.id = sop.service_id
      WHERE ST_Distance_Sphere(p.location, ${Prisma.raw(userLocation)}) < ${distance}
      AND s.id = ${serviceType};`;

    const nearbyProviderList = await prisma.$queryRaw(query);

    res.send(nearbyProviderList);
  } catch (error) {
    let errorMessage = 'error getting service list';
    let statusCode = 500;

    // Check to see if the error follows the prisma error schema
    if (error?.meta?.code && error?.meta?.message) {
      errorMessage = error.meta.message;
      statusCode = 400;
    }

    res.status(statusCode).send(errorMessage);
  }
}
