var factory = (function () {

	var options = {};

	var data = [];

	function init(optionsIn) {

		options = optionsIn;

		this.data = [];

		for (i = 0; i < options.maxCount; i++) {
			var stateNum = Math.round(Math.random() * 100);
			this.data[i] = {
				id: i,
				val: stateNum,
				color: getStateColor(stateNum)
			};
		}

		return this;
	}

	function update() {

		for (i = 0; i < options.changeCount; i++) {
			var stateNum = Math.round(Math.random() * 100);
			var index = Math.round(Math.random() * options.maxCount);
			this.data[index] = {
				id: index,
				val: stateNum,
				color: getStateColor(stateNum)
			};
		}

		return this;
	}

	function getStateColor(state) {

		var colour = 'lightGray';
		var stateNum = +state;

		if (stateNum === 0) {
			colour = 'red';
		}
		else if (stateNum === 100) {
			colour = 'lime';
		}
		else if ((stateNum > 0) && (stateNum < 1)) {
			colour = 'rgb(255, 141, 0)';
		}
		else if ((stateNum >= 1) && (stateNum < 100)) {
			colour = 'rgb(255, ' + (140 + Math.floor(stateNum)) + ', 0)';
		}

		return colour;
	}

	function logTime(label) {
		// the outer timeout defers execution until the current stack is cleared
		setTimeout(function(start) {
			// the inner timeout delays until after anything that may have been
			// deferred in the previous stack
			setTimeout(function() {
				var milliseconds = $.now() - start;
				console.log(label + ' completed in ' + milliseconds + 'ms');
			}, 1);
		}, 1, $.now());
	}

	return {
		init: init,
		update: update,
		data: data,
		logTime: logTime
	};

})();