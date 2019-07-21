const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

// Express route handlers

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.post('/ticket', (req, res) => {
  const index = req.body.ticket;
  console.log("Received POST request with ticket number: %s", index);
  redisClient.lpush('ticket_queue', index, (err, res) => {
		if (err != null) {
			console.error("Error in Redis LPUSH onto queue: %s", err.message);
		}
	});
  res.send('OK');
})

app.listen(3010, err => {
  console.log('Listening');
});