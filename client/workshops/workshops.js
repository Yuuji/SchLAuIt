Router.route('Workshops', {
	path: '/',
	waitOn: function() {
		if (Meteor.userId()) {
			return [
				Meteor.subscribe('Schulen'),
				Meteor.subscribe('Workshops')
			];
		}
	},
	data: function() {
		var Workshops = Meteor.getWorkshops();
		return { workshops: Workshops.find() };
	}
});

Template.Workshops.helpers({
	tableSettings : function () {
		return {
			rowsPerPage: 5,
			showNavigation: 'auto',
			showColumnToggles: true,
			fields: [
				{
					key: 'name',
					label: 'Name',
					fn: function(value, object) {
						console.log(object);
						return new Spacebars.SafeString('<a href="' + Router.path('Workshop', {id: object._id}) + '">' + value + '</a>');
					}
				},
				{
					key: 'schule',
					label: 'Schule',
					fn: function(value, object) {
						var schule = Meteor.getSchulen().findOne(value);

						if (schule && schule.name) {
							return schule.name + ', ' + schule.adresse;
						}

						return 'Unbekannt?';
					}
				}
			]
		};
	}
});

Template.Workshops.events = {
	'click #newWorkshop': function() {
		Router.go('newWorkshop');
	}
};
