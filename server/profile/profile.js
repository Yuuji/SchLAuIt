Meteor.users.allow({
	'update': function(userId, doc) {
		if (!Meteor.userId()) {
			return false;
		}

		if (doc._id === Meteor.userId()) {
			return true;
		}
		
		for (var key in doc) {
			switch(key) {
				case '_id':
				case 'profile':
					break;
				default:
					delete doc[key];
			}
		}

		return true;
	}
});
