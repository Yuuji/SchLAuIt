// Give first created User admin rights
Accounts.onCreateUser(function(options, user) {
	if(!Meteor.users.find().count()) {
		_.extend(user, {admin: true});
	}

	user.profile = {};

	return user;
});
	
Meteor.startup(function () {
	// code to run on server at startup
});
