i18n.setLanguage('de');

Template.Layout.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current();
		return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
	}
});

$.fn.my_popover = function(type) {
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

	switch(type) {
		case 'hide':
			el.hide();
			break;
		case 'show':
		default:
			el.show();
			break;
	}

	$.fn.popover.apply(this, arguments);
};
