var Workshops=false;
Meteor.getWorkshops = function() {
	if (Workshops === false) {
		Workshops = new Mongo.Collection('workshops');
	}

	return Workshops;
};
