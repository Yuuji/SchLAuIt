var workshopId = false;

Router.route('Workshop', {
	path: '/workshop/:id',
	waitOn: function() {
		if (Meteor.userId()) {
			return [
				Meteor.subscribe('Workshops'),
				Meteor.subscribe('Schulen'),
				Meteor.subscribe('Teamerinnen')
			];
		}
	},
	action: function () {
		if (!this.ready()) {
			this.render('Loading');
			return;
		}

		workshopId = this.params.id;

		var workshop = Meteor.getWorkshops().findOne(this.params.id);

		// status: '', 'success', 'warning', 'danger'
		var status = {
			verantwortlicher: {checked: false, status: 'danger'},
			termin: {checked: false, status: ''},
			information: {checked: false, status: ''},
			planung: {checked: false, status: ''},
			feedback: {checked: false, status: ''}
		};

		if (workshop.verantwortlicher) {
			status.verantwortlicher.checked = true;
			status.verantwortlicher.status = 'success';
		}
		
		this.render('Workshop', {data: {workshop: workshop, status: status}});
	}
});

Template.Workshop.rendered = function() {
	$('#verantwortlicher').verantwortlicher({
		workshop: workshopId,
		setId: 'input[type=hidden][name=verantwortlicher]',
		callback: function(teamerin) {
			Meteor.getWorkshops().update({
				_id: workshopId
			},
			{
				$set: {
					'verantwortlicher': teamerin
				}
			});
		}
	});
};
