Router.configure({
	layoutTemplate: 'Layout'
});

// If not loged in:
Router.onBeforeAction(function () {
	if (Meteor.userId()) {
		var user = Meteor.user();

		if (user && user.profile && user.profile.name) {
			this.next();
		} else {
			this.render('Profile');
		}
	} else {
		this.render('Login');
	}
});
