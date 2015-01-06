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
			informationen: {checked: false, status: ''},
			termin: {checked: false, status: ''},
			planung: {checked: false, status: ''},
			feedback: {checked: false, status: ''}
		};

		if (workshop.verantwortlicher) {
			status.verantwortlicher.checked = true;
			status.verantwortlicher.status = 'success';

			status.informationen.status = 'danger';
			status.termin.status = 'warning';
		}

		if (workshop.informationen) {
			status.informationen.checked = true;
			status.informationen.status = 'success';

			status.termin.status = 'danger';
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
