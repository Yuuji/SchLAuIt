Router.route('Verantwortlicher', {
	path: '/verantwortliche_r/:id',
	waitOn: function() {
		if (Meteor.userId()) {
			return [
				Meteor.subscribe('Workshops'),
				Meteor.subscribe('Schulen'),
				Meteor.subscribe('Teamerinnen')
			];
		}
	},
	data: function() {
		var workshop = Meteor.getWorkshops().findOne(this.params.id);
		var teamerinnen = Meteor.users.find().fetch();
		var teamerinnenArray = [];
		teamerinnenArray.push({name: 'Bitte ausw&auml;hlen!', value: ''});
		_.each(teamerinnen, function(teamerin) {
			return teamerinnenArray.push({
				name: teamerin.profile.name,
				value: teamerin._id
			});
		});
		console.log(teamerinnenArray);

		return {workshop: workshop, teamerinnen: teamerinnenArray};
	}
});
