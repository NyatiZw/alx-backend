// Import the necessary modules
import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the Redis fuunction
const getAsync = promisify(client.get).bind(client);

// Event listener for successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

// Event listener for connection errors
client.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});

// Close the Redis connection when the script exits
process.on('SIGINT', () => {
	client.quit();
});

// Function to set a new school value in Redis
const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, redis.print);
};

// Async function to display the value for a given school in Redis
const displaySchoolValue = async (schoolName) => {
	try {
		const value = await getAsync(schoolName);
		console.log(`${value}`);
	} catch (error) {
		console.error(`Error getting value for ${schoolName}: ${error.message}`);
	}
};


// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');	
