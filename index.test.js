import test from 'ava';
import * as helpFunc from './index.js';

test('main()', (t) => {
	const sum = (a, b) => a + b;
	helpFunc.safelyRun(sum, [1, 2]);
	t.pass();
});
