Workshops = new Mongo.Collection("workshops");

Meteor.publish('Workshops', function() {
	if (this.userId) {
		return Workshops.find();
	}
});
