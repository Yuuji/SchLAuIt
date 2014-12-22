Router.route('Workshops', {
	path: '/',
	waitOn: function() {
		return Meteor.subscribe('Workshops');
	},
	data: function() {
		try {
			Workshops;
		} catch (e) {
			Workshops = new Mongo.Collection('workshops');
		}
		return { workshops: Workshops.find() };
	}
});

Template.Workshops.helpers({
	tableSettings : function () {
		return {
			rowsPerPage: 5,
			showNavigation: 'auto',
			showColumnToggles: true
		};
	}
});

Template.Workshops.events = {
	'click #newWorkshop': function() {
		Router.go('newWorkshop');
	}
};
