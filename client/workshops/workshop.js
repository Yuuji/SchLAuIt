Router.route('Workshop', {
	path: '/workshop/:id',
	waitOn: function() {
		if (Meteor.userId()) {
			return [
				Meteor.subscribe('Workshops'),
				Meteor.subscribe('Schulen')
			];
		}
	},
	data: function() {
		var workshop = Meteor.getWorkshops().findOne(this.params.id);

		// status: '', 'success', 'warning', 'danger'
		var status = {
			verantwortlicher: {checked: false, status: 'danger'},
			termin: {checked: false, status: ''},
			information: {checked: false, status: ''},
			planung: {checked: false, status: ''},
			feedback: {checked: false, status: ''}
		};
		
		return {workshop: workshop, status: status};
	}
});
