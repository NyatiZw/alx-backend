import kue from 'kue';

const queue = kue.createQueue();

const createPushNotificationsJobs = (jobs, queue) => {
	if (!Array.isArray(jobs)) {
		throw new Error('Jobs is not an array');
	}

	jobs.forEach((jobData) => {
		const notificationJob = queue.create('push_notification_code_3', jobData);

		notificationJob.on('created', () => {
			console.log(`Notification job created: ${notificationJob.id}`);
		});

		notificationJob.on('complete', () => {
			console.log(`Notification job ${notificationJob.id} completed`);
		});

		notificationJob.on('failed', (errorMessage) => {
			console.error(`Notification job ${notificationJob.id} failed: ${errorMessage}`);
		});

		notificationJob.on('progress', (progress) => {
			console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
		});

		notificationJob.save((err) => {
			if (err) {
				console.error(`Error creating notification job: ${err.message}`);
			}
		});
	});
};
