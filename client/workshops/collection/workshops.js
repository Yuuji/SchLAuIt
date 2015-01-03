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
			},
			verantwortlicherStr: function(val, object) {
				var teamerin = Meteor.users.findOne(this.verantwortlicher);

				if (teamerin && teamerin.profile && teamerin.profile.name) {
					return teamerin.profile.name;
				}

				return '';
			}
		});
	}

	return Workshops;
};
