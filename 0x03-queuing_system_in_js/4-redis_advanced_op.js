// Import the necessary modules
import redis from 'redis';

// CReate a Redis client
const client = redis.createClient();

// Event listerner for successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
};

// Event listerner for connection errors
client.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});

// Close the Redis connection when the script exits
process.on('SIGINT', () => {
	client.quit();
});

// Create Hash
const createHash = () => {
	//Using hest to store hash values
	client.hset(
		'HolbertonSchools',
		'Portland',
		50,
		redis.print
	);
	client.hset(
		'HolbertonSchools',
		'Seattle',
		80,
		redis.print
	);
	client.hset(
		'HolbertonSchools',
		'New York',
		20,
		redis.print
	);
	client.hset(
		'HolbertonSchools',
		'Bogota',
		20,
		redis.print
	);
	client.hset(
		'HolbertonSchools',
		'Paris',
		2,
		redis.print
	);
};


// Display Hash
const displayHash = () => {
	// Using hgetall to display the object stored in Redis
	client.hgetall('HolbertonSchools', (err, result) => {
		if (err) {
			console.error(`Error getting hash values: ${err.message}`);
		} else {
			console.log('Object stored in Redis:', result);
		}
	});
};

createHash();
displayHash();
