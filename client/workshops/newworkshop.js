Router.route('newWorkshop', {
	path: '/neuer-workshop',
	waitOn: function() {
		return Meteor.subscribe('Schulen');
	},
	data: function() {
		try {
			Schulen;
		} catch (e) {
			Schulen = new Mongo.Collection('schulen');
		}

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
						callback: function(doc) { console.log(doc); }
					}
				]
			}
		});

		return {};
	}
});

Template.newWorkshop.rendered = function() {
	    $("#schule").popover({
			html: true,
			content: function() {
				return UI.toHTML(Template.NewSchule);
			},
			placement: 'bottom',
			trigger: 'manual'
		});

		$('#schule').on('shown.bs.popover', function () {
			$('.popover-content input[name=name]').val($('#schule').val());
			$('.popover-content form').submit(function(ev) {
				ev.preventDefault();
				
				var name = $('.popover-content input[name=name]').val();
				var id = Schulen.insert({
					name: name,
					adresse: $('.popover-content input[name=adresse]').val()
				});

				$('#schulid').val(id);
				$('#schule').val(name);

				$('#schule').popover('hide');
			});
		});
};

Template.newWorkshop.events = {
	'click #newSchule': function() {
		$('#schule').popover('show');
	}
};
