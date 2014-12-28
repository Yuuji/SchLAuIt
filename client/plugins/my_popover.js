$.fn.my_popover = function(options) { 
	var that_ = this;
	if ($('#my_popover').length === 0) {
		$('body').append($(UI.toHTML(Template.my_popover)).hide());
	}

	if (typeof options === 'string') {
		var el = $('#my_popover_shadow');
		if (el.length===0) {
			el = $('<div />').attr('id', 'my_popover_shadow').css({
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 1000,
				background: '#aaa',
				opacity: '.6'
			}).hide();
	
			$('body').append(el);
		}

		switch (options) {
			case 'hide':
				el.hide();
				break;
			case 'show':
			default:
				var tpl = $('#my_popover');

				tpl.find('.popover-title-text').text((this).data('my_popover_title'));
				tpl.find('.popover-content').html($(this).data('my_popover_content'));
				el.show();
				break;
		}

		$('#my_popover').popoverX(options);
	} else {
		$(this).data('my_popover_content', options.content())
			   .data('my_popover_target', options.target)
			   .data('my_popover_placement', options.placement)
			   .data('my_popover_title', options.title);

		$('#my_popover').popoverX({
			placement: options.placement,
			target: options.target
		}).on('hidden.bs.modal', function (e) {
			$('#my_popover_shadow').hide();
			$(that_).trigger('hidden.my_popover');
		}).on('shown.bs.modal', function (e) {
			$(that_).trigger('shown.my_popover');
		});
	}
};
