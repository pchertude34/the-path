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
    const providers = csvData.slice(1);

    for (let provider of providers) {
      const rowData = {
        id: Number(provider[0]),
        name: provider[1],
        service: provider[2],
        undisclosed: provider[3] === 'FALSE' ? false : true,
        spanish: provider[4] === 'FALSE' ? false : true,
        street: provider[5],
        city: provider[6],
        state: provider[7],
        zip: Number(provider[8]),
        lat: Number(provider[9]),
        long: Number(provider[10]),
        website: provider[11],
        phone: provider[12],
        email: provider[13],
        description: provider[14],
      };

      try {
        await prisma.provider.create({
          data: rowData,
        });
        console.log(`Added row ${provider[0]}`);
      } catch (e) {
        console.log(`Error adding row ${provider[0]}`);
        clg(e);
      }
    }
  });
