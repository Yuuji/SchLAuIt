Workshops = new Mongo.Collection("workshops");

Meteor.publish('Workshops', function() {
	if (this.userId) {
		return Workshops.find();
	}
});

Workshops.allow({
	'insert': function(userId, doc) {
		if (Meteor.userId()) {
			return true;
		}

		return false;
	},
	update: function(userId, doc) {
		if (Meteor.userId()) {
			return true;
		}

		return false;
	}
});
