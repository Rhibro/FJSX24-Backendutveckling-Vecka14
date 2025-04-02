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

// // Express server:
const express = require('express');
const app = express();
const dateModule = require('./dateModule');
const jsonModule = require('./jsonModule');
// read existing data
const data = jsonModule.readData();
console.log('Current Data:', data);

// add a new user
if (data) {
    data.users.push({name: 'Rhi', age: 31});

    // write the updated data back to file
    jsonModule.writeData(data);
}

console.log("Today's date is:", dateModule.getCurrentDate());

// route to home page
app.get('/', (req, res) => {
    res.send('Hej from Rhi! Nu har vi en Express server!');
});

// JSON data 
app.get('/api/info', (req, res) => {
    const courseInfo = {
        courseName: 'Backend',
        instructor: 'Mandus',
        duration: '10 weeks',
        price: 'Free! This is SWEDEN!'
    };
    res.json(courseInfo);
});

// displays 
app.get('/api/users', (req, res) => {
    const users = [
        {userName: 'Rhi'}, 
        {userName: 'Joe'},
        {userName: 'Boe'},
        {userName: 'Ho'}
    ];
    res.json(users);
})

// route to contact page
app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><br></br><p>+1 234 56 78</p>')
});

// this is a route
app.listen(8000, () => {
    console.log('Hej, Server is running on http://localhost:8000');
})

// fake API server 
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const logMessage = require('./logging');

// const app = express();
// const PORT = 8000;
// const dataFilePath = path.join(__dirname, 'data.json');

// app.get('/api/data', (req, res) => {
//     fs.readFile(dataFilePath, 'utf8', (err, data) => {
//         if (err) {
//             logMessage('Error reading data file');
//             return res.status(500).json({ error: 'internal server error'});
//         }
//         logMessage('Server API data');
//         res.json(JSON.parse(data));
//     });
// });

// app.listen(PORT, () => {
//     logMessage(`Server started on port ${PORT}`);
//     console.log(`Server is running at http://localhost:${PORT}`);
// });


// sample data for data.json
// {
//   "users": [
//     {
//       "name": "Rhi",
//       "age": 31
//     },
//     {
//       "name": "Rhi",
//       "age": 31
//     },
//     {
//       "name": "Rhi",
//       "age": 31
//     },
//     {
//       "name": "Rhi",
//       "age": 31
//     },
//     {
//       "name": "Rhi",
//       "age": 31
//     }
//   ]
// }