import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
	phoneNumber: '1234567890',
	message: 'string',
};

const notificationJob = queue.create('push_notification_code', jobData);

notificationJob.on('complete', () => {
	console.log('Notification job completed');
});

notificationJob.on('failed', (errorMessage) => {
	console.error(`Notification job failed: ${errorMessage}`);
});

notificationJob.save((err) => {
	if (!err) {
		console.log(`Notification job created: ${notificationJob.id}`);
	} else {
		console.error(`Error creating notification job: ${err.message}`);
	}
});
