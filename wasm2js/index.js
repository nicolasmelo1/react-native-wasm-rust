// Import our JS shim and initialize it, executing the start function when it's
// ready.
import {greet} from './pkg/wasm2js.js';

console.log(greet())