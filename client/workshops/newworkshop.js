Router.route('newWorkshop', {
	path: '/neuer-workshop',
	waitOn: function() {
		return [
			Meteor.subscribe('Schulen'),
			Meteor.subscribe('Workshops')
		];
	},
	data: function() {
		var Schulen = Meteor.getSchulen();

		Template.newWorkshop.helpers({
			settings: {
				position: 'top',
				limit: 10,
				rules: [
					{
						// token: '',
						collection: Schulen,
						field: 'name',
						matchAll: true,
						template: Template.newWorkshopSchule,
						noMatchTemplate: Template.newWorkshopNoMatchSchule,
						callback: function(doc) {
							$('#schulid').val(doc._id);
						}
					}
				]
			}
		});

		return {};
	}
});

Template.newWorkshop.rendered = function() {
	    $("#schule").newSchule({
			setName: $('#schule'),
			setId: $('#schulid'),
			placement: 'bottom',
			onElementClick: '#newSchule'
		});

		$('#schule').change(function() {
			$('#schulid').val('');
		});
};

Template.newWorkshop.events({
	'submit form': function(event) {
		event.preventDefault();
		if ($('#schulid').val()==='') {
			alert($('<span>Bitte eine Schule ausw&auml;hlen!</span>').text());
			return;
		}

		var data = SimpleForm.processForm(event.target);
		var id = Meteor.getWorkshops().insert({
			name: $('#name').val(),
			schule: $('#schulid').val()
		});

		Router.go('Workshop', {id: id});
	}
});
