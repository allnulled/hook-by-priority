class HookManager {
	static create(...args) {
		return new this(...args);
	}
	constructor(options = {}) {
		this.events = {};
		this.DEFAULT_PRIORITY = 100;
		Object.assign(this, options);
	}
	sorter(a, b) {
		return a.priority >= b.priority ? -1 : 1;
	}
	add(event, callback, priority = this.DEFAULT_PRIORITY) {
		if (!(event in this.events)) {
			this.events[event] = [];
		}
		if (Array.isArray(callback)) {
			for (let index = 0; index < callback.length; index++) {
				const callbackItem = callback[index];
				if (typeof callbackItem !== "function") {
					throw new Error("Parameter <callback> must be an array or a function. Item at position " + index + " failed.");
				}
				this.events[event].push({ callback: callbackItem, priority });
			}
		} else if (typeof callback === "function") {
			this.events[event].push({ callback, priority });
		} else {
			throw new Error("Parameter <callback> must be an array or a function.")
		}
		this.events[event] = this.events[event].sort(this.sorter);
	}
	async use(event, parameters = {}) {
		try {
			const events = this.events[event];
			for (let index = 0; index < events.length; index++) {
				const callback = events[index].callback;
				try {
					await callback(parameters);
				} catch (error) {
					console.error(`[ERROR] Event ${index} caused an error:`, error);
				}
			}
			return parameters;
		} catch (error) {
			throw error;
		}
	}
}
module.exports = HookManager;