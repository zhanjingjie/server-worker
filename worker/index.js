const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

function processQueue() {
  redisClient.lindex("ticket_queue", -1, (err, res) => {
    if (res) {
      console.log("Received message from the queue: %s", res);
      redisClient.rpop("ticket_queue", (err, res) => {
        console.log("Removed message from the queue: %s", res);
        if (err) {
          console.error("Error deleting last element %s in %s", res, "ticket_queue");
        }
      });
    }
  });
}

setInterval(processQueue, 3000);
