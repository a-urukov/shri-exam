/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-day-in-calendar', {

    _onClick : function(e) {
        this.activate();
    },
    
    activate : function() {
      this.findBlockOutside('b-page').findBlockInside('b-day-sheduler').onChangeActiveDay(this.params.date);
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
