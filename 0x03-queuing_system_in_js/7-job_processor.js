import kue from 'kue';

const queue = kue.createQueue();

const blacklistedNumbers = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
	job.progress(0);

	if (blacklistedNumbers.includes(phoneNumber)) {
		const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
		done(new Error(errorMessage));
	} else {
		job.progress(50);

		console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

		done();
	}
};

queue.process('push_notification_code_2', 2, (job, done) => {
	const { phoneNumber, message } = job.data;

	sendNotification(phoneNumber, message, job, done);
});

queue.on('job complete', (id, result) => {
	console.log(`Job ${id} completed successfully`);
});

queue.on('job failed', (id, errorMessage) => {
	console.error(`Job ${id} failed: ${errorMessage}`);
});

queue.on('job removed', (id) => {
	console.log(`Job ${id} removed from the queue`);
});

queue.on('enqueue', (id, type) => {
	console.log(`Job ${id} enqueued for type ${type}`);
});

queue.on('dequeue', (id, type) => {
	console.log(`Job ${id} dequeued for type ${type}`);
});

queue.on('promotion', (id) => {
	console.log(`Job ${id} promoted`);
});

queue.on('progress', (id, progress) => {
	console.log(`Job ${id} is ${progress}% complete`);
});

queue.on('failed attempt', (id, errorMessage) => {
	console.error(`Job ${id} failed attempt: ${errorMessage}`);
});
