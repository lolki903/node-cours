const express = require('express');
const hostname = "0.0.0.0";

const port = 3000;


const server = express();

server.get('/', (req, res) => {
    res.type('html');
    res.status(200);
    res.end("Home s")
});
server.get('/posts', (req, res) => {
    res.type('html');
    res.status(200);
    res.end("gtgttsasa")
});
server.listen(port, hostname , () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}
);

