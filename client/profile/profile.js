accountsUIBootstrap3.setLanguage('de');

Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('profile');
	}
});

Router.route('/profile');

Template.Profile.helpers({
	userdata: function () {
		return Meteor.user() && Meteor.user().profile;
	}
});

Template.Profile.events({
	'submit form': function(event) {
		event.preventDefault();
		var data = SimpleForm.processForm(event.target);
		Meteor.users.update({
			_id: Meteor.userId()
		},
		{
			$set: {
				'profile.name': data.name,
				'profile.email': data.email,
				'profile.handynummer': data.handynummer
			}
		});
	}
});
