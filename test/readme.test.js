const Hooks = require(__dirname + "/../index.js");
const hooks = Hooks.create();

const add = function(char, data) {
	return new Promise(function(ok, fail) {
		data.msg += char;
		setTimeout(ok, 100);
	});
};

hooks.add("on:init", async params => await add("e", params), 90);
hooks.add("on:init", async params => await add("!", params), 50);
hooks.add("on:init", async params => await add("l", params), 70);
hooks.add("on:init", async params => await add("o", params), 60);
hooks.add("on:init", async params => await add("l", params), 80);
hooks.add("on:init", async params => await add("H", params), 100);
hooks.use("on:init", { msg: "" }).then(output => {
	console.log(output.msg);
})