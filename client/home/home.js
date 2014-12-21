Router.route('Home', {
	path: '/',
	waitOn: function() {
		return Meteor.subscribe('Workshops');
	},
	data: function() {
		debugger;
		try {
			Workshops;
		} catch (e) {
			Workshops = new Mongo.Collection('workshops');
		}
		return { workshops: Workshops.find() };
	}
});

Template.Home.helpers({
	tableSettings : function () {
		return {
			rowsPerPage: 5,
			showNavigation: 'auto',
			showColumnToggles: true
		};
	}
});
