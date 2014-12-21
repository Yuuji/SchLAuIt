Schulen = new Mongo.Collection("schulen");

Meteor.publish('Schulen', function() {
	if (this.userId) {
		return Schulen.find();
	}
});
