var workshopId = false;

Router.route('WorkshopTermin', {
	path: '/workshop/termin/:id',
	waitOn: function() {
		if (Meteor.userId()) {
			return [
				Meteor.subscribe('Workshops'),
				Meteor.subscribe('Schulen'),
				Meteor.subscribe('Teamerinnen'),
				Meteor.subscribe('WorkshopTermine')
			];
		}
	},
	action: function () {
		if (!this.ready()) {
			this.render('Loading');
			return;
		}

		var workshop = Meteor.getWorkshops().findOne(this.params.id);

		if (!workshop) {
			return Router.go('Workshops');
		}

		workshopId = this.params.id;

		var schule = Meteor.getSchulen().findOne(workshop.schule);

		if (!schule) {
			return Router.go('Workshops');
		}

		var termine = Meteor.getWorkshopTermine().find({workshop: workshopId}).fetch();

		this.render('WorkshopTermin', {data: {workshop: workshop, status: status}});
	}
});

Template.WorkshopTermin.rendered = function() {
};

Template.WorkshopTermin.events({
	'submit form': function(event) {
		event.preventDefault();
		var data = SimpleForm.processForm(event.target);
		Meteor.getWorkshops().update({
			_id: workshopId
		},{
			$set: {
				'informationen.adresse': $('#adresse').val(),
				'informationen.kontakt': $('#kontakt').val(),
				'informationen.telefon': $('#telefon').val(),
				'informationen.email': $('#email').val(),
				'informationen.klassenstufe': $('#klassenstufe').val(),
				'informationen.gruppengroesse': $('#gruppengroesse').val(),
				'informationen.geschlechter': $('#geschlechter').val(),
				'informationen.einbettung': $('#einbettung').val(),
				'informationen.gruppeninfos': $('#gruppeninfos').val(),
				'informationen.sonstigeinfos': $('#sonstigeinfos').val()
			}
		});
	}
});
