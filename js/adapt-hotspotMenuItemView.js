define([
  'core/js/views/menuItemView'
], function(MenuItemView) {

  var HotspotMenuItemView = MenuItemView.extend({

    events: {
      'click .js-btn-click' : 'onClickMenuItemButton'
    },

    postRender: function() {
      this.$el.imageready(function() {
        this.setPosition();
        this.setReadyStatus();
      }.bind(this));
    },

    setPosition: function() {
      var config = this.model.get('_hotspotMenu');

      if (config) {
        this.$el.css({
          top: config._top + '%',
          left: config._left + '%'
        });
      }
    },

    onClickMenuItemButton: function(event) {
      if (event && event.preventDefault) event.preventDefault();
      if (this.model.get('_isLocked')) return;
      Backbone.history.navigate('#/id/' + this.model.get('_id'), {trigger: true});
    }

  }, {
    className: 'hotspotmenu-item',
    template: 'hotspotMenuItem'
  });

  return HotspotMenuItemView;

});
