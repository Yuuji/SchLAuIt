var Workshops=false;
Meteor.getWorkshops = function() {
	if (Workshops === false) {
		Workshops = new Mongo.Collection('workshops');

		Workshops.helpers({
			schuleStr: function(value, object) {
				var schule = Meteor.getSchulen().findOne(this.schule);
				
				if (schule && schule.name) {
					return schule.name + ', ' + schule.adresse;
				}
				
				return 'Unbekannt?';
			}
		});
	}

	return Workshops;
};
