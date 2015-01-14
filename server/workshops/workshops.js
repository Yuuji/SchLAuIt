Workshops = new Mongo.Collection("workshops");

Meteor.publish('Workshops', function() {
	if (this.userId) {
		return Workshops.find();
	}
});

Workshops.allow({
	insert: function(userId, doc) {
		if (Meteor.userId()) {
			doc.createdAt = (new Date()).toString();
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
