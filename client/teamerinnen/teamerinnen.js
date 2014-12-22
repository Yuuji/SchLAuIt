Router.route('Teamerinnen', {
	path: '/teamerinnen',
	waitOn: function() {
		if (Meteor.userId()) {
			return Meteor.subscribe('Teamerinnen');
		}
	},
	data: function() {
		return { teamerinnen: Meteor.users.find() };
	}
});

Template.Teamerinnen.helpers({
	tableSettings : function () {
		return {
			rowsPerPage: 5,
			showNavigation: 'auto',
			showColumnToggles: true,
			fields: [
				{key: 'profile.name', label: 'Name'},
				{key: 'profile.email', label: 'E-Mail-Adresse'},
				{key: 'profile.handynummer', label: 'Handynummer'}
			]
		};
	}
});
