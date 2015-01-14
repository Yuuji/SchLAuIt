Router.configure({
	layoutTemplate: 'Layout',
	loadingTemplate: 'loading'
});

// If not loged in:
Router.onBeforeAction(function () {
	if (Meteor.userId()) {
		var user = Meteor.user();

		if (user && user.profile && user.profile.name) {
			this.next();
		} else {
			this.render('Profile', {data: {userdata: Meteor.user().profile}});
		}
	} else {
		this.render('Login');
	}
});
