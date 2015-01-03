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
						return new Spacebars.SafeString('<a href="' + Router.path('Workshop', {id: object._id}) + '">' + value + '</a>');
					}
				},
				{
					key: 'schuleStr',
					label: 'Schule'
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
