import {expectType} from 'tsd';
import * as helpFunc from './index.js';

expectType<Function>(helpFunc.debounce(() => {}));
