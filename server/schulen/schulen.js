Schulen = new Mongo.Collection("schulen");

Meteor.publish('Schulen', function() {
	if (this.userId) {
		return Schulen.find();
	}
});

Schulen.allow({
	'insert': function(userId, doc) {
		if (Meteor.userId()) {
			return true;
		}

		return false;
	}
});
