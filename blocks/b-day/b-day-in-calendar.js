/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-day-in-calendar', {

    _onClick : function(e) {
        this.activate();
    },
    
    activate : function() {
        if (!this.container) {
            this.container = this.findBlockOutside('b-month-calendar');
        }
        this.container.changeActiveDay(this);
    },
    
    onSetMod : {

        'js' : function() {
            this.params.date = new Date(this.params.date);
        }
    }
},
{
    live : function() {
        this.__base.apply(this, arguments);

        this.liveBindTo('click', function(e) {
            this._onClick(e);
        });
    }

})

})();
