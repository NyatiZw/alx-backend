import redis from 'redis';

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

const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, redis.print);
};

const displaySchoolValue = (schoolName) => {
	client.get(schoolName, (err, value) => {
		if (err) {
			console.error(`Error getting value for ${schoolName}: ${err.message}`);
		} else {
			console.log(`${value}`);
		}
	});
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
