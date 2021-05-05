const x = 5
const arr = [0, 1, 2]
const myObj = {x: 0, y: 0}

const csv = require('csv-parser')
const fs = require('fs')

const results = [];
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './mappedFile.csv',
    header: [
        {id: 'name', title: 'MAPPED NAME'},
        {id: 'age', title: 'MAPPED AGE'}
    ]
});


fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const mappedResults = results.map(item => ({name: item.NAME, age: Number(item.AGE) - 5}));
    
    csvWriter.writeRecords(mappedResults)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

  });