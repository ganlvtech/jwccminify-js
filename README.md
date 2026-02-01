# jwccminify

![AI Assisted](https://img.shields.io/badge/AI%20Assisted-Yes-blue)
![Human Validated](https://img.shields.io/badge/Human%20Validated-100%25-brightgreen)
[![npm](https://img.shields.io/npm/v/jwccminify)](https://www.npmjs.com/package/jwccminify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

A lightweight JSON minifier that removes whitespace and comments from [JWCC](https://nigeltao.github.io/blog/2021/json-with-commas-comments.html) (JSON with Commas and Comments) or [HuJSON](https://github.com/tailscale/hujson) (Human JSON).

* Removes single-line comments (`//`)
* Removes multi-line comments (`/* */`)
* Removes whitespace (`" \t\r\n"`)
* Removes trailing commas before closing brackets and braces
* No RegExp.
* Zero dependencies.
* Fault-tolerant: Invalid JSON is also parsable.

## Usage

```bash
npm install jwccminify
```

### ESM / CommonJS

```javascript
import jwccminify from 'jwccminify';
// or
import { jwccminify } from 'jwccminify';
// or
const { jwccminify } = require('jwccminify');

const input = `{
  "name": "example", // This is a comment
  "value": 123, /* Multi-line
     comment */
}`;

const output = jwccminify(input);
console.log(output); // {"name":"example","value":123}
```

```javascript
import { jwccstrip } from 'jwccminify';
// or
const { jwccstrip } = require('jwccminify');

const input = `{
  "name": "example", // This is a comment
  "value": 123, /* Multi-line
     comment */
}`;

const output = jwccstrip(input);
console.log(output);
// commas and comments were replaced with whitespace
// {
//   "name": "example",_____________________
//   "value": 123_______________
// ______________
// }
```

### Browser UMD / ESM

```html
<script src="./dist/jwccminify.umd.js"></script>
<script>
  const { jwccminify, jwccstrip } = JwccMinify;
</script>
```

```html
<script type="module">
  const { jwccminify, jwccstrip } = await import('./dist/jwccminify.mjs');
</script>
```

## License

[MIT License](https://choosealicense.com/licenses/mit/)
