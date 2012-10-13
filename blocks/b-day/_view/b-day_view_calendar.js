/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-day', modName: 'view', modVal: 'calendar' }, {

    _onClick : function(e) {
        this.activate();
    },

    activate : function() {
        if (!this.container) {
            this.container = this.findBlockOutside('b-calendar-view');
        }
        this.container.changeActiveDay(this);
    },
    
    onSetMod : {

        'js' : function() {
            this.params.date = new Date(this.params.date);
        }
    }
})

})();
