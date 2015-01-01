Router.route('Workshop', {
	path: '/workshop/:id',
	waiton: function() {
		return [
			Meteor.subscribe('Workshops'),
			Meteor.subscribe('Schulen')
		];
	},
	data: function() {
		console.log(this.params);
	}
});
