const fs = require('fs');

let quote = 'Hello World!';

fs.writeFile('example.txt', quote, (err) => {
    console.log('example.txt is in this file');
});

const text = fs.readFile('example.txt', 'utf8', (err, content) => {
    console.log('content: ', content);
});

console.log('text:', text);