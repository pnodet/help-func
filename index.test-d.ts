import {expectType} from 'tsd';
import * as helpFunc from './index.js';

const test = (value: any): any => value;
expectType<(...args: any[]) => void>(helpFunc.debounce(test('hello')));
