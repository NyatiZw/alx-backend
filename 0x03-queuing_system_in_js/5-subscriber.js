import redis from 'redis';

const subscriberClient = redis.createClient();

subscriberClient.on('connect', () => {
	console.log('Redis client conneceted to the server');
});

subscriberClient.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});

subscriberClient.subscribe('holberton school channel');

subscriberClient.on('message', (channel, message) => {
	console.log(`Message received on channel ${channel}: ${message}`);

	if (message === 'KILL_SERVER') {
		console.log('Unsubscribing and quitting...');
		subscriberClient.unsubscribe('holberton school channel');
		subscriberClient.quit();
	}
});
