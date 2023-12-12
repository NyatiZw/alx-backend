// Import the necessary modules
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});


process.on('SIGINT', () => {
	client.quit();
});
