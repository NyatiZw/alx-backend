import kue from 'kue';

const queue = kue.createQueue();

const sendNotification = (phoneNumber, message) => {
	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

queue.process('push_notification_code', (job, done) => {
	const { phoneNumber, message } = job.data;

	sendNotification(phoneNumber, message);

	done();
});

queue.on('ready', () => {
	console.log('Kue queue is ready');

	queue.process('push_notification_code', (job, done) => {
		const { phoneNumber, message } = job.data;

		sendNotification(phoneNumber, message);

		done();
	});
});

queue.on('error', (err) => {
	console.error(`Kue queue error: ${err.message}`);
});

queue.on('shutdown', () => {
	console.log('Kue queue is shut down');
});
