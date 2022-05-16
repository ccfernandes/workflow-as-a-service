'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const schedulerServiceUrl = "https://3bd9eb30-a041-4fa7-90c7-9f2b6f92a960.mock.pstmn.io";
const backendServiceUrl = "http://workflow-gen-service:8080";
// App

const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/workflow/:workflowId', (req, res) => {
    res.render('workflow', {
        workflowId: req.params['workflowId']
    });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {});
});

app.get('/', (req, res) => {
    res.render('dashboard', {});
});

app.get('/workflowList', (req, res) => {
    res.contentType("application/json");
    request.get(`${schedulerServiceUrl}/workflow`, { timeout: 30000 }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response); // Print the response status code if a response was received
        console.log('body:', body);
        if (error != null) {
            const errorJson = {
                error: error
            }
            res.statusCode = 500;
            res.send(JSON.stringify(errorJson));
        }
        else if (response.statusCode === 200) {
            res.send(body);
        }
        else {
            const errorJson = {
                response: response
            }
            res.status(response.statusCode).send(JSON.stringify(errorJson));
        }
    });
});

app.get('/workflowSpec', (req, res) => {
    res.contentType("application/json");
    request.get(`${backendServiceUrl}/workflowSpec`, { timeout: 30000 }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        if (error != null) {
            const errorJson = {
                error: error
            }
            res.send(JSON.stringify(errorJson));
        }
        else if (response.statusCode === 200) {
            res.send(body);
        }
        else {
            const errorJson = {
                response: response
            }
            res.send(JSON.stringify(errorJson));
        }
    });
});

app.post('/workflow/start', (req, res) => {
    console.log(req.body);
    res.contentType("application/json");
    request.post({
        url: `${schedulerServiceUrl}/workflow/start`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
        timeout: 30000
    }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        if (error != null) {
            const errorJson = {
                error: error
            }
            res.send(JSON.stringify(errorJson));
        }
        else if (response.statusCode === 200) {
            res.send(body);
        }
        else {
            const errorJson = {
                response: response
            }
            res.
            res.send(JSON.stringify(errorJson));
        }
    });
});

app.get('/workflowStatus/:workflowId', (req, res) => {
    let workflowId = req.params['workflowId'];
    res.contentType("application/json");
    request.get(`${schedulerServiceUrl}/workflow/${workflowId}`, { timeout: 30000 }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        if (error != null) {
            const errorJson = {
                error: error
            }
            res.send(JSON.stringify(errorJson));
        }
        else if (response.statusCode === 200) {
            res.send(body);
        }
        else {
            const errorJson = {
                response: response
            }
            res.send(JSON.stringify(errorJson));
        }
    });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);