# hook-by-priority

Hooking system using priority numbers.

## Advantages

 - **Asynchronous hooks.**
 - **Parameters passed along the cycle of hooks.**
 - **Less than 50 lines of code.**
 - **For `node.js` or `browser`.**
 - **No dependencies at all.**

## Installation

`$ npm install -s hook-by-priority`

## Usage

This example appends a character for each hook asynchronously.

It also uses `priority` option to order the `hooks` added to the created hooks-manager.

```js
const Hooks = require("hook-by-priority");
const hooks = Hooks.create();

const add = function(char, data) {
	return new Promise(function(ok, fail) {
		data.msg += char;
		setTimeout(ok, 100);
	});
};

hooks.add("on:init", async params => await add("e", params.msg), 90);
hooks.add("on:init", async params => await add("!", params.msg), 50);
hooks.add("on:init", async params => await add("l", params.msg), 70);
hooks.add("on:init", async params => await add("o", params.msg), 60);
hooks.add("on:init", async params => await add("l", params.msg), 80);
hooks.add("on:init", async params => await add("H", params.msg), 100);
hooks.use("on:init", { msg: "" })
```

This script is also under `test/readme.test.js` file of the project.

## License

This project is released under [WTFPL (or *What The Fuck Public License*)](https://es.wikipedia.org/wiki/WTFPL), which means **do what you want**.

## Issues

Please, address your issues [here](https://github.com/allnulled/hook-by-priority/issues).