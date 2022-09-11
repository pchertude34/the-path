const fs = require('fs');
const parse = require('csv-parse');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

// Load Services
const serviceCsvData = [];

fs.createReadStream(`${__dirname}/files/the-path-services.csv`)
  .pipe(parse({ delimiter: ',', trim: true }))
  .on('data', (csvRow) => {
    serviceCsvData.push(csvRow);
  })
  .on('end', async () => {
    // Get rid of the column headers
    const services = serviceCsvData.slice(1);

    for (let service of services) {
      try {
        const [id, description] = service;
        const createdService = await prisma.service.create({
          data: {
            id,
            description,
          },
        });
        console.log(createdService);
      } catch (error) {
        console.log(`Error adding row ${service}`);
        console.log(e);
      }
    }

    // Load Providers
    const providerCsvData = [];

    fs.createReadStream(`${__dirname}/files/the-path-providers.csv`)
      .pipe(parse({ delimiter: ',', trim: true }))
      .on('data', (csvRow) => {
        providerCsvData.push(csvRow);
      })
      .on('end', async () => {
        // Get rid of the column headers
        const providers = providerCsvData.slice(1);

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

            const googlePlaceIds = await axios.get(
              `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
              {
                params: {
                  input: `${name}+${street}`,
                  inputtype: 'textquery',
                  key: process.env.GOOGLE_MAPS_API_KEY,
                },
              }
            );

            if (googlePlaceIds.data?.candidates[0]) {
              const placeId = googlePlaceIds.data.candidates[0].place_id;
              const googlePlaceResponse = await axios.get(
                'https://maps.googleapis.com/maps/api/place/details/json',
                {
                  params: {
                    place_id: placeId,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                  },
                }
              );

              // If we can't find the place, just move on to the next provider and try again.
              if (!googlePlaceResponse.data) continue;

              const { address, city, state } = buildPlaceAddress(googlePlaceResponse.data.result);
              const {
                geometry: {
                  location: { lat, lng },
                },
              } = googlePlaceResponse.data.result;

              const location = `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`;
              var query1 = `INSERT INTO \`the-path\`.Provider VALUES (${id}, "${placeId}", "${name}", ${location}, ${undisclosed}, "${address}", "${city}", "${state}", "${website}", "${email}", "${description}", ${null});`;
              await prisma.$executeRawUnsafe(query1);

              console.log({ id, placeId, name, location, address, city, state });

              services.forEach(async (service) => {
                try {
                  var query2 = `INSERT INTO \`the-path\`.ServiceOnProvider VALUES (${id}, "${service}")`;
                  await prisma.$executeRawUnsafe(query2);
                } catch (e) {
                  console.log('ERROR WITH ADDING SERVICE LINK');
                  console.log(query2);
                }
              });
            } else {
              console.log('No placeId for', `${name}+${street}`);
            }
          } catch (e) {
            console.log(`Error adding row ${provider[0]}`);
            console.log(`query`, query1);
            console.log(e);
          }
        }
      });
  });

function buildPlaceAddress(place) {
  let address1 = '';
  let city = '';
  let state = '';
  let postcode = '';
  let longState = '';

  if (!place.address_components) return;

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case 'street_number':
        address1 = `${component.long_name} ${address1}`;
        break;
      case 'route':
        address1 += component.short_name;
        break;
      case 'postal_code':
        postcode = `${component.long_name}${postcode}`;
        break;
      case 'postal_code_suffix':
        postcode = `${postcode}-${component.long_name}`;
        break;
      case 'locality':
        city = component.long_name;
        break;
      case 'administrative_area_level_1':
        state = component.short_name;
        longState = component.long_name;
    }
  }

  const address = `${address1}, ${city}, ${state} ${postcode}`;

  return { address, city, state: longState };
}

// seedServices().then(() => seedProviders());
// seedProviders();
