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
	    $("#schule").newSchule({
			setName: $('#schule'),
			setId: $('#schulid'),
			placement: 'bottom',
			onElementClick: '#newSchule'
		});
};
