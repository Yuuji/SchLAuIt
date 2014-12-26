$.fn.newSchule = function(options) {
	var that_ = this;
	
	options = options || {};

	options.setName = options.setName || false;
	options.setId = options.setId || false;
	options.placement = options.placement || 'bottom';
	options.onElementClick = options.onElementClick || this;

	$(that_).popover({
		html: true,
		content: function() {
			return UI.toHTML(Template.NewSchule);
		},
		placement: options.placement,
		trigger: 'manual'
	});

	$(that_).on('shown.bs.popover', function() {
		$(that_).trigger('shown.newSchule');
		
		if (options.setName !== false) {
			$('.popover-content input[name=name]').val($(options.setName).val());
		}
		
		$('.popover-content form').submit(function(ev) {
			ev.preventDefault();

			var name = $('.popover-content input[name=name]').val();

			var id = Schulen.insert({
				name: name,
				adresse: $('.popover-content input[name=adresse]').val()
			});

			if (options.setId !== false) {
				$(options.setId).val(id);
			}

			if (options.setName !== false) {
				$(options.setName).val(name);
			}

			$(that_).my_popover('hide');
		});
	});

	$(document).off('click.newschule', options.onElementClick).on('click.newschule', options.onElementClick, function() {
		$(that_).my_popover('show');
	});
};
