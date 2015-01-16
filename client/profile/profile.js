accountsUIBootstrap3.setLanguage('de');

Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('OwnProfile');
	}
});

Router.route('OwnProfile', {
	path: '/profile',
	waitOn: function() {
		if (Meteor.userId()) {
			return Meteor.subscribe('Teamerinnen');
		}
	},
	action: function () {
		if (!this.ready()) {
			this.render('Loading');
			return;
		}

		this.render('Profile', {data: {userId: Meteor.userId(), userdata: Meteor.user().profile}});
	}
});


Router.route('Profile', {
	path: '/profile/:id',
	waitOn: function() {
		if (Meteor.userId()) {
			return Meteor.subscribe('Teamerinnen');
		}
	},
	action: function () {
		if (!this.ready()) {
			this.render('Loading');
			return;
		}

		var userId = this.params.id;
		var user = Meteor.users.findOne(userId);

		this.render('Profile', {data: {userId: userId, userdata: user.profile}});
	}
});

Template.Profile.events({
	'submit form': function(event) {
		event.preventDefault();
		var data = SimpleForm.processForm(event.target);
		Meteor.users.update({
			_id: data.userId
		},
		{
			$set: {
				'profile.name': data.name,
				'profile.email': data.email,
				'profile.handynummer': data.handynummer,
				'profile.grundquali': data.grundquali
			}
		});
	}
});
