var WorkshopTermine=false;
Meteor.getWorkshopTermine = function() {
	if (WorkshopTermine === false) {
		WorkshopTermine = new Mongo.Collection('workshopTermine');
	}

	return WorkshopTermine;
};
