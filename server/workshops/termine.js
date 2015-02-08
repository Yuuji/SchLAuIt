WorkshopTermine = new Mongo.Collection("workshopTermine");

Meteor.publish('WorkshopTermine', function() {
	if (this.userId) {
		return WorkshopTermine.find();
	}
});

WorkshopTermine.allow({
	insert: function(userId, doc) {
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
