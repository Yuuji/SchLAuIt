Template.reactiveTable.helpers({
	'getField': function (object) {
		var fn = this.fn || function (value) { return value; };
		var key = this.key || this;
		var keys = key.split('.');
		var value = object;
		_.each(keys, function (key) {
			if (!_.isUndefined(value) && !_.isUndefined(value[key])) {
				value = value[key];
			} else {
				value = null;
			}
		});
		var computedValue = fn(value, object);
		if (typeof computedValue === 'function') {
			computedValue = computedValue.apply(object); 
		}
		return computedValue;
	}
});
