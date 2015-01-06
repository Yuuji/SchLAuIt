var workshopId = false;

Router.route('WorkshopInformationen', {
	path: '/workshop/informationen/:id',
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

		if (!workshop) {
			return Router.go('Workshops');
		}

		var schule = Meteor.getSchulen().findOne(workshop.schule);

		if (!schule) {
			return Router.go('Workshops');
		}

		if (!workshop.informationen) {
			workshop.informationen = {
				adresse: schule.adresse,
				kontakt: '',
				telefon: '',
				email: '',
				klassenstufe: '',
				gruppengroesse: '',
				geschlechter: '',
				einbettung: '',
				gruppeninfos: '',
				sonstigeinfos: ''
			};
		}

		this.render('WorkshopInformationen', {data: {workshop: workshop, status: status}});
	}
});

Template.WorkshopInformationen.rendered = function() {
};

Template.WorkshopInformationen.events({
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
