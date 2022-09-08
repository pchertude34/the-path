const fs = require('fs');
const parse = require('csv-parse');
const { PrismaClient } = require('@prisma/client');

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
    const services = csvData.slice(1);

    for (let service of services) {
      try {
        const [id, code, description] = service;
        const createdService = await prisma.service.create({
          data: {
            id: code,
            description,
          },
        });
        console.log(createdService);
      } catch (error) {
        console.log(`Error adding row ${service}`);
        console.log(e);
      }
    }
  });
