var Schulen=false;
Meteor.getSchulen = function() {
	if (Schulen === false) {
		Schulen = new Mongo.Collection('schulen');
	}

	return Schulen;
};
