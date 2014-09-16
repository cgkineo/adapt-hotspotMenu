define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');
    var HotspotView = require("menu/adapt-hotspot-menu/js/adapt-hotspot-hotspotView");
    
    Adapt.on('router:menu', function(model) {

        $('#wrapper').append(new HotspotView({model:model}).$el);
    
    });
    
});
