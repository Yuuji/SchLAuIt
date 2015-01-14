Router.route('Teamerinnen', {
	path: '/teamer_innen',
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
				{
					key: 'profile.name',
					label: 'Name',
					fn: function(value, object) {
						return new Spacebars.SafeString('<a href="' + Router.path('Profile', {id: object._id}) + '">' + value + '</a>');
					}
				},
				{key: 'profile.email', label: 'E-Mail-Adresse'},
				{key: 'profile.handynummer', label: 'Handynummer'},
				{
					key: 'grundquali',
					label: 'Qualifikation queer_school',
					fn: function(value, object) {
						return (value === 1 ? 'Ja' : 'Nein');
					}
				}
			]
		};
	}
});
