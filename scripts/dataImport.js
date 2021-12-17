const fs = require('fs');
const parse = require('csv-parse');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const filePath = args[0];
const csvData = [];

fs.createReadStream(filePath)
  .pipe(parse({ delimiter: ',', trim: true }))
  .on('data', (csvRow) => {
    csvData.push(csvRow);
  })
  .on('end', async () => {
    // Get rid of the column headers
    const providers = csvData.slice(1);

    for (let provider of providers) {
      const services = provider[2].split(',').map((service) => service.trim());

      try {
        const [
          id,
          name,
          _,
          undisclosed,
          spanish,
          street,
          city,
          state,
          zip,
          lat,
          long,
          website,
          phone,
          email,
          description,
        ] = provider;

        const googlePlace = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
          {
            params: {
              input: `${name}+${street}`,
              inputtype: 'textquery',
              key: process.env.GOOGLE_MAPS_API_KEY,
            },
          }
        );
        const placeId = googlePlace.data?.candidates[0]?.place_id;

        // console.log(`placeId`, placeId);

        const location = `ST_GeomFromText('POINT(${lat} ${long})', 4326)`;
        var query1 = `INSERT INTO \`the-path\`.Provider VALUES (${id}, "${placeId}", "${name}", ${location}, ${undisclosed}, ${spanish}, "${street}", "${city}", "${zip}", "${website}", "${email}", "${description}", ${null});`;
        await prisma.$executeRawUnsafe(query1);

        services.forEach(async (service) => {
          try {
            var query2 = `INSERT INTO \`the-path\`.ServiceOnProvider VALUES (${id}, "${service}")`;
            await prisma.$executeRawUnsafe(query2);
          } catch (e) {
            console.log('ERROR WITH ADDING SERVICE LINK');
            console.log(query2);
          }
        });
      } catch (e) {
        console.log(`Error adding row ${provider[0]}`);
        console.log(`query`, query1);
        console.log(e);
      }
    }
  });
