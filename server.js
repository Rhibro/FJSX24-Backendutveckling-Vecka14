// Node JS server:
// req = request
// res = response

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hej from Rhi! Nu har vi en Node js server!');
// });

// server.listen(8000, () => {
//     console.log('Hej, Server is running on http://localhost:8080');
// });

//-------------------------------------------
// Express server:

const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hej from Rhi! Nu har vi en Express server!');
});

// this is a route
app.listen(8000, () => {
    console.log('Hej, Server is running on http://localhost:8000');
})