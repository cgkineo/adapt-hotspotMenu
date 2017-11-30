define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');

    var HotspotItemView = MenuView.extend({

        events: {
            "click .hotspot-menu-item-button":"showDetails",
            "click .hotspot-menu-item-done":"hideDetails",
            "click .hotspot-menu-item-action":"onClickMenuItemButton"
        },

        className: function() {
            return [
                'hotspot-menu-item',
                'hotspot-menu-item-' + this.model.get('_id') ,
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
        },

        showDetails: function(event) {
            if(event) event.preventDefault();
            var $element = $(event.currentTarget);
            this.$(".hotspot-menu-item-inner").addClass("show-item");
            Adapt.trigger("hotspotMenu:itemOpen", $element.attr("data-id"));
        },

        hideDetails: function(event) {
            if(event) event.preventDefault();
            this.$(".hotspot-menu-item-inner").removeClass("show-item");
        },

        checkIfShouldClose: function(id) {
            if(this.model.get("_id") != id) {
                this.hideDetails();
            }
        },

        onClickMenuItemButton: function() {
            if(event) event.preventDefault();
            if(this.model.get('_isLocked')) return;
            Backbone.history.navigate('#/id/' + this.model.get('_id'), {trigger: true});
        },


    }, {
        template:'hotspot-menu-item'
    });
    
    return HotspotItemView;
    
});
