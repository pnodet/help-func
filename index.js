/* eslint-disable no-await-in-loop, no-unused-expressions */
const isFunction = value => typeof value === 'function';

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9_007_199_254_740_991;
const MAX_ARRAY_LENGTH = 4_294_967_295;

export function delay(func, wait, ...args) {
	if (typeof func !== 'function') {
		throw new TypeError('Expected a function');
	}

	return setTimeout(func, Number(wait) || 0, ...args);
}

export function safelyRun(func, ...args) {
	let result = null;

	if (isFunction(func)) {
		result = func(...args);
	}

	return result;
}

export function debounce(fn, interval, {leading} = {}) {
	let timeout;
	let leadExecuted = false;
	const timer = typeof interval === 'number' ? interval : 200;
	const lead = typeof leading === 'boolean' ? leading : false;
	return (...args) => {
		const postponed = () => {
			timeout = null;
			if (lead) {
				leadExecuted = false;
			} else {
				fn.apply(this, args);
			}
		};

		clearTimeout(timeout);
		timeout = setTimeout(postponed, timer);
		if (lead && !leadExecuted) {
			leadExecuted = true;
			fn.apply(this, args);
		}
	};
}

export function negate(predicate) {
	if (typeof predicate !== 'function') {
		throw new TypeError('Expected a function');
	}

	return function (...args) {
		return !predicate.apply(this, args);
	};
}

export function overArgs(func, transforms) {
	const funcsLength = transforms.length;
	return function (...args) {
		let index = -1;
		const length = Math.min(args.length, funcsLength);
		while (++index < length) {
			args[index] = transforms[index].call(this, args[index]);
		}

		return func.apply(this, args);
	};
}

export const times = (n, iteratee) => {
	if (n < 1 || n > MAX_SAFE_INTEGER) {
		return [];
	}

	let index = -1;
	const length = Math.min(n, MAX_ARRAY_LENGTH);
	const result = Array.from({length});
	while (++index < length) {
		result[index] = iteratee(index);
	}

	index = MAX_ARRAY_LENGTH;
	n -= MAX_ARRAY_LENGTH;
	while (++index < n) {
		iteratee(index);
	}

	return result;
};

export function waitTime(milliseconds, callback) {
	return new Promise(resolve => {
		setTimeout(() => {
			callback && callback();
			resolve();
		}, milliseconds);
	});
}

export function waitFor(condition, time = 100, maxTimes = 1000) {
	let interval;
	const promise = new Promise((resolve, reject) => {
		let count = 0;
		function judge() {
			if (count <= maxTimes) {
				if (condition()) {
					stop();
					resolve();
				}
			} else {
				stop();
				reject(new Error('waitFor: Limit is reached'));
			}

			count++;
		}

		interval = setInterval(() => {
			judge();
		}, time);
		judge();
	});
	return {promise, stop};
	function stop() {
		clearInterval(interval);
	}
}

export async function retry(func, limitTimes = 3, ...args) {
	for (let index = 1; index <= limitTimes; index++) {
		try {
			return await func(...args);
		} catch (error) {
			if (index === limitTimes) {
				throw error;
			}
		}
	}
}

export function mock(time, response, fail = false) {
	let result;
	const t = typeof time === 'number' ? time : 50;

	if (typeof response === 'function') {
		result = response;
	} else {
		const ans = response ? response : t;
		result = () => ans;
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (fail) {
				reject(result());
			}

			return resolve(result());
		}, t);
	});
}

export const asyncRetry = async (
	fn,
	maxAttempts,
	{backoff = 2000, backoffPower = 1.25},
) => {
	const execute = async attempt => {
		try {
			return await fn();
		} catch (error) {
			if (attempt <= maxAttempts) {
				const nextAttempt = attempt + 1;
				const delayInSeconds = Math.round(
					(backoff * nextAttempt ** backoffPower) / 1000,
				);
				console.warn(`Retrying after ${delayInSeconds} seconds due to:`, error);
				return mock(delayInSeconds * 1000, () => execute(nextAttempt));
			}

			throw error;
		}
	};

	return execute(1);
};

export const mockFactory = (
	onSuccess,
	onFailure,
	countdownToSuccess = 0,
	waitTime = 200,
) => {
	let reminderTries = countdownToSuccess;
	return () => {
		reminderTries -= 1;
		if (reminderTries + 1 > 0) {
			return mock(waitTime, onFailure, true);
		}

		return mock(waitTime, onSuccess);
	};
};
