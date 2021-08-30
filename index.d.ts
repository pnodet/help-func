/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _Func.delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */
export function delay(func: () => any, wait: number, ...args: any[]): number;

/**
 * @param {*} func The function to run.
 * @param {...*} [args] The arguments to invoke `func` with.
 */
export function safelyRun(func: () => any, ...args: any[]): any;

/**
 * Returns a function that will only run N milliseconds after it stops being called.
 * Or optionally will only run once during multiple calls,
 * and won't run again until N milliseconds after the last call.
 * @param {Function} fn
 * @param {number} [interval] - time in milliseconds to wait until execution.
 * @param {Object} [options]
 * @param {boolean} [options.leading]
 *
 * @example
 * const debouncedFunction = _Func.debounce(checkPositionAndDoSomething(), 150);
 * window.addEventListener('scroll', debouncedFunction);
 */
export function debounce(
	fn: () => any,
	interval?: number,
	{
		leading,
	}?: {
		leading?: boolean;
	},
): (...args: any[]) => void;

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0
 * }
 *
 * filter([1, 2, 3, 4, 5, 6], _Func.negate(isEven))
 * // => [1, 3, 5]
 */
export function negate(predicate: () => any): () => any;

/**
 * Creates a function that invokes `func` with its arguments transformed.
 * @param {Function} func The function to wrap.
 * @param {Function[]} transforms
 *  The argument transforms.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2
 * }
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const func = _Func.overArgs((x, y) => [x, y], [square, doubled])
 *
 * func(9, 3)
 * // => [81, 6]
 *
 * func(10, 5)
 * // => [100, 10]
 */
export function overArgs(func: () => any, transforms: () => any[]): () => any;

/**
 * @param {number} milliseconds The function to run.
 * @param {Function} [callback] The arguments to invoke `func` with.
 * @returns {Promise<Void>}
 */
export function waitTime(
	milliseconds: number,
	callback?: () => any,
): Promise<void>;

/**
 * @param {Function} condition The function to run
 * @param {Number} [time] time.
 * @param {Number} [maxTimes] max times.
 */
export function waitFor(
	condition: () => any,
	time?: number,
	maxTimes?: number,
): {
	promise: Promise<any>;
	stop: () => void;
};

/**
 * @param {Function} func The function to run.
 * @param {Number} [limitTimes] Max retry number.
 * @param {...*} [args] Arguments to pass to the function
 */
export function retry(
	func: () => any,
	limitTimes?: number,
	...args: any[]
): Promise<any>;

/**
 * Mock promise, useful for testing asynchronous functions.
 * @param {Number} time
 * @param {String | Function} response
 * @param {Boolean} fail
 *
 * @example
 * const expected = 100;
 * const result = await _Func.mock(100);
 * expect(result).toEqual(expected);
 * //=> Successfully resolved promise
 */
export function mock(
	time: number,
	response: string | (() => any),
	fail?: boolean,
): Promise<any>;
export function times(n: number, iteratee: () => any): any[];
export function asyncRetry(
	fn: () => any,
	maxAttempts: number,
	options?: {
		backoff?: number;
		backoffPower?: number;
	},
): Promise<any>;

/**
 * MAsyncRequestFactory stands for mock asynchronous request factory.
 * It returns a function that returns promises upon execution.
 * If countdownToSuccess is larger than 0 it will throw executing/returning onFailure.
 * When countdownToSuccess reaches zero it will resolve promise successfully returning onSuccess.
 *
 * @param {Number | String | Function} onSuccess - is the value or function returned on success.
 * @param {Number | String | Function} onFailure - is the value or function returned when promise is rejected.
 * @param {Number} [countdownToSuccess] - is the amount of promises to reject before succeeding
 * @param {Number} [waitTime] - Amount of [ms] to wait until resolving or rejecting each promise.
 */
export function mockFactory(
	onSuccess: number | string | (() => any),
	onFailure: number | string | (() => any),
	countdownToSuccess?: number,
	waitTime?: number,
): () => Promise<any>;
