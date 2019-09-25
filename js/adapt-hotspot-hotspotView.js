define([
    'core/js/adapt',
    'core/js/view/menuView',
    './adapt-hotspot-hotspotItemView'
], function(Adapt, MenuView, HotspotItemView) {

    var HotspotView = MenuView.extend({
        preRender: function() {

            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    var assessment = _.find(item.getChildren().toJSON(), function(it) { return typeof it._assessment !== 'undefined'; } );
                    if (assessment != undefined) {
                        var assessmentState = Adapt.assessment.get()[0].getState();
                        item.set('_assessment', {
                            isComplete : assessmentState.isComplete,
                            hasScore: true,
                            scoreAsPercentage : assessmentState.scoreAsPercent,
                            isPassed : assessmentState.isPass === true,
                            isFailed : assessmentState.isPass === false
                        });
                    }
                    item.set('_locked', false);
                    if (item.get('_lock')) {
                        var contentObjects = item.get('_lock');
                        var completeCount = 0;
                        for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get('_isComplete')) completeCount++;
                        if (completeCount < contentObjects.length) {
                            item.set('_locked', true);
                        }
                    }
                }
            });

            this.model.set({_areChildrenReady: false});
            this.listenToOnce(this.model, 'change:_areChildrenReady', this.onChildrenReady);

            this.model.checkReadyStatus = function () {
                // Filter children based upon whether they are available
                var availableChildren = new Backbone.Collection(this.getChildren().where({_isAvailable: true}));
                // Check if any return _isReady:false
                // If not - set this model to _isReady: true
                if (availableChildren.findWhere({_isReady: false})) return;

                this.set({_areChildrenReady: true});
            };

            MenuView.prototype.preRender.call(this);
        },

        onChildrenReady: function() {
            if (this.$('img').length > 0) {
                this.$el.imageready(this.setReadyStatus.bind(this));
                return;
            }
            this.setReadyStatus();
        },

        postRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    nthChild ++;
                    this.$('.hotspot-items').append(new HotspotItemView({model: item, nthChild: nthChild}).$el);
                }
            });
            $('.menu').addClass('hotspot-menu');
        }

    }, {
        template:'hotspotView'
    });

    return HotspotView;

});