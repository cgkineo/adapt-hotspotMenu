define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');
    var HotspotItemView = require("menu/adapt-hotspot-menu/js/adapt-hotspot-hotspotItemView");
    
    var HotspotView = MenuView.extend({
        preRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    var assessment = _.find(item.getChildren().toJSON(), function(it) { return typeof it._assessment !== "undefined"; } );
                    if (assessment != undefined) {
                        var scoreAsPercentage = (Adapt.course.get('_isAssessmentAttemptComplete')) ? assessment.assessmentModel.getLastAttemptScoreAsPercent(): null;
                        var hasScore = (scoreAsPercentage != null && !isNaN(scoreAsPercentage));
                        item.set("_assessment", { 
                            isComplete : (typeof Adapt.course.get('_isAssessmentAttemptComplete') !== "undefined")
                                ? Adapt.course.get('_isAssessmentAttemptComplete')
                                : false,
                            hasScore: hasScore,
                            scoreAsPercentage : scoreAsPercentage,
                            isPassed : (typeof Adapt.course.get('_isAssessmentPassed') !== "undefined") ? Adapt.course.get('_isAssessmentPassed') : false
                        });
                    }
                    item.set("_locked", false);
                    if (item.get("_lock")) {
                        var contentObjects = item.get("_lock");
                        var completeCount = 0;
                        for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                        if (completeCount < contentObjects.length) {
                            item.set("_locked", true);
                        }
                    }
                }
            });
            MenuView.prototype.preRender.call(this);
        },
        postRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    nthChild ++;
                    this.$('.hotspot-items').append(new HotspotItemView({model:item, nthChild:nthChild}).$el);
                }
            });
            $(".menu").addClass("hotspot-menu");
        }

    }, {
        template:'hotspotView'
    });

    return HotspotView;
    
});