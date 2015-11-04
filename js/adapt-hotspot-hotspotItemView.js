define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');

    var HotspotItemView = MenuView.extend({

        events: {
            "click .menu-item-hotspot":"showDetails",
            "click .menu-item-done":"hideDetails"
        },

        className: function() {
            return [
                'menu-item',
                'menu-item-' + this.model.get('_id') ,
                // 'nth-child-' + this.options.nthChild,
                // this.options.nthChild % 2 === 0  ? 'nth-child-even' : 'nth-child-odd'
            ].join(' ');
        },

        preRender: function() {
            //this.model.getCompleteComponentsAsPercentage();
            this.listenTo(Adapt, "hotspotMenu:itemOpen", this.checkIfShouldClose);
        },

        postRender: function() {
            this.setReadyStatus();
            this.$el.addClass("hotspot-menu");
        },

        showDetails: function(event) {
            if(event) event.preventDefault();
            var $element = $(event.currentTarget);
            this.$(".menu-item-inner").addClass("show-item");
            Adapt.trigger("hotspotMenu:itemOpen", $element.attr("data-id"));
        },

        hideDetails: function(event) {
            if(event) event.preventDefault();
            this.$(".menu-item-inner").removeClass("show-item");
        },

        checkIfShouldClose: function(id) {
            if(this.model.get("_id") != id) {
                this.hideDetails();
            }
        }

    }, {
        template:'hotspot-menu-item'
    });
    
    return HotspotItemView;
    
});
