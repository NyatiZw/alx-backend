import { export } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

const testQueue = kue.createQueue({ disableSearch: true, jobEvents: false });

describe('createPushNotificationsJobs', () => {
	before(() => {
		testQueue.testMode.enter();
	});

	after(() => {
		testQueue.testMode.clear();
		testQueue.testMode.exit();
	});

	it('should create jobs in the queue', () => {
		const jobs = [
			{ phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
			{ phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
		];

		createPushNotificationsJobs(jobs, tesQueue);

		const jobsInQueue = testQueue.testMode.jobs.length;
		expect(jobsInQueue).to.equal(jobs.length);
	});

	it('should log job creation events', () => {
		const consoleSpy = sinon.spy(console, 'log');

		createPushNotificationsJobs(jobs, testQueue);

		expect(consoleSpy).to.have.been.calledWith(sinon.match('Notification job created'));
		expect(consoleSpy.callCount).to.equal(jobs.length);

		consoleSpy.restore();
	});
});
