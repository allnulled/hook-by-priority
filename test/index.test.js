const HookManager = require(__dirname + "/../index.js");
const hooks = new HookManager();

(async function() {
	const results = [];
	const expectedResults = [500,1,400,2,300,3,200,4,"a",5,"b",6];
	console.log("✓ Starting basic test:");
	try {
		hooks.add("on:step:one", function(parameters) {
			console.log("✓ Running: 200");
			return new Promise(function(ok, fail) {
				results.push(200);
				results.push(++parameters.index);
				setTimeout(ok, 200);
			});
		}, 200);
		hooks.add("on:step:one", function(parameters) {
			console.log("✓ Running: 400");
			return new Promise(function(ok, fail) {
				results.push(400);
				results.push(++parameters.index);
				setTimeout(ok, 200);
			});
		}, 400);
		hooks.add("on:step:one", function(parameters) {
			console.log("✓ Running: 300");
			return new Promise(function(ok, fail) {
				results.push(300);
				results.push(++parameters.index);
				setTimeout(ok, 200);
			});
		}, 300);
		hooks.add("on:step:one", function(parameters) {
			console.log("✓ Running: 500");
			return new Promise(function(ok, fail) {
				results.push(500);
				results.push(++parameters.index);
				setTimeout(ok, 200);
			});
		}, 500);
		hooks.add("on:step:one", [
			function(parameters) {
				console.log("✓ Running: 100/b");
				return new Promise(function(ok, fail) {
					results.push("b");
					results.push(++parameters.index);
					setTimeout(ok, 200);
				});
			},
			function(parameters) {
				console.log("✓ Running: 100/a");
				return new Promise(function(ok, fail) {
					results.push("a");
					results.push(++parameters.index);
					setTimeout(ok, 200);
				});
			}
		], 100);
		const output = await hooks.use("on:step:one", {index:0});
		if(output.index !== 6) {
			console.log(output.index);
			throw new Error("Parameters failed");
		}
		console.log("✓ Parameters work.");
		if(results.length !== 12) {
			throw new Error("Results length failed");
		}
		for(let index=0; index < expectedResults.length; index++) {
			const expectedResult = expectedResults[index];
			if(expectedResult !== results[index]) {
				throw new Error(`Position ${index} failed the test`);
			}
		}
		console.log("✓ Test passed successfully.");
	} catch(error) {
		throw error;
	}
})();
