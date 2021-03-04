define([
  'core/js/adapt',
  'core/js/views/menuView',
  './adapt-hotspotMenuItemView'
], function(Adapt, MenuView, HotspotMenuItemView) {

  var HotspotMenuView = MenuView.extend({

    postRender: function() {
      this.setUpItems();
    },

    setUpItems: function() {
      var items = this.model.getAvailableChildModels();
      var $items = this.$('.js-children');

      for (var i = 0, j = items.length; i < j; i++) {
        $items.append(new HotspotMenuItemView({ model: items[i] }).$el);
      }
    }

  }, {
    childView: HotspotMenuItemView,
    className: 'hotspotmenu',
    template: 'hotspotMenu'
  });

  Adapt.on('router:menu', function(model) {
    $('#wrapper').append(new HotspotMenuView({ model: model }).$el);
  });

});
