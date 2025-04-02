const fs = require('fs') // import the File System module

const filePath = './data.json'; // path to json file

// function to read the data form json file
function readData() {
    try {
        const data = fs.readFileSync(filePath, 'utf8'); // read file synchronously
        return JSON.parse(data); // convert json string to object
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// function to write data to json file
function writeData(newData) {
    try {
        const jsonString = JSON.stringify(newData, null, 2); // converts object to json string (pretty format)
        fs.writeFileSync(filePath, jsonString, 'utf8'); // write to file
        console.log('Data successfully written to file');
    } catch {
        console.error('Error writing file:', error);
    }
}

module.exports = { readData, writeData};