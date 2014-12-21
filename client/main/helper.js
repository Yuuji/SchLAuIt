i18n.setLanguage('de');

Template.Layout.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current();
		return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
	}
});
