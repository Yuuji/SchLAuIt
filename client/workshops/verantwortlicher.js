$.fn.verantwortlicher = function(options) {
	var that_ = this;

	options = options || {};
	options.callback = options.callback || function() {};
	options.target = options.target || '#verantwortlicher';
	options.placement = options.placement || 'bottom';
	options.workshop = options.workshop || false;
	options.onElementClick = options.onElementClick || '#verantwortlicher';
	options.setId = options.setId || false;

	if (!options.workshop) {
		return;
	}
	
	var workshop = Meteor.getWorkshops().findOne(options.workshop);
	var teamerinnen = Meteor.users.find().fetch();
	var teamerinnenArray = [];
	teamerinnenArray.push({name: 'Bitte ausw&auml;hlen!', value: 'none'});
	_.each(teamerinnen, function(teamerin) {
		return teamerinnenArray.push({
			name: teamerin.profile.name,
			value: teamerin._id
		});
	});

	var data = {workshop: workshop, teamerinnen: teamerinnenArray};

	$(that_).my_popover({
		content: function() {
			return UI.toHTMLWithData(Template.Verantwortlicher, data);
		},
		target: options.target,
		placement: options.placement,
		title: 'Verantwortiche*r'
	});

	$(that_).on('shown.my_popover', function() {
		$(that_).trigger('shown.Verantwortlicher');

		if (options.setId) {
			var setValue = $(options.setId).val();
			if (setValue === '') {
				setValue = 'none';
			}
			$('.popover-content form select[name=setteamerin]').val(setValue);
		}

		$('.popover-content form').submit(function(ev) {
			ev.preventDefault();

			var teamerin = $('.popover-content form select[name=setteamerin]').val();

			if (teamerin === 'none') {
				teamerin = false;
			}

			options.callback(teamerin);
			
			$(that_).my_popover('hide');
		});
	});

	$(document).off('click.verantwortlicher', options.onElementClick).on('click.verantwortlicher', options.onElementClick, function() {
		$(that_).my_popover('show');
	});
};
