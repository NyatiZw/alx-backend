import kue from 'kue';

const queue = kue.createQueue();

const jobs = [
	{
		phoneNumber: '4153518780',
		messasge: 'This is the code 1234 to verify your account'
	},
	{
		phoneNumber: '4153518781',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4153518743',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4153538781',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4153118782',
		message: 'This is the code 4321 to verify your account'
	},
	{
		phoneNumber: '4153718781',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4159518782',
		message: 'This is the code 4321 to verify your account'
	},
	{
		phoneNumber: '4158718781',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4153818782',
		message: 'This is the code 4321 to verify your account'
	},
	{
		phoneNumber: '4154318781',
		message: 'This is the code 4562 to verify your account'
	},
	{
		phoneNumber: '4151218782',
		message: 'This is the code 4321 to verify your account'
	}
];

queue.process('push_notification_code_2', (job, done) => {
	const { phoneNumber, message } = job.data;

	let progress = 0;

	const progressInterval = setInterval(() => {
		progress += 10;
		job.progress(progress);

		if (progress === 100) {
			clearInterval(progressInterval);
			done();
		}
	}, 1000);

	job.on('failed', (errorMessage) => {
		console.error(`Notification job ${job.id} failed: ${errorMessage}`);
	});

	job.on('complete', () => {
		console.log(`Notification job ${job.id} completed`);
	});

	job.on('progress', (progress) => {
		console.log(`Notification job ${job.id} ${progress}% complete`);
	});
});

jobs.forEach((jobData) => {
	const notificationJob = queue.create('push_notification_code_2', jobData);

	notificationJob.save((err) => {
		if (err) {
			console.error(`Error creating notification job: ${err.message}`);
		}
	});
});
