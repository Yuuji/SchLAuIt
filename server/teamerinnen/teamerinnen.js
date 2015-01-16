Meteor.publish('Teamerinnen', function() {
	if (this.userId) {
		return Meteor.users.find({}, {fields: {services: 0}});
	}
});
