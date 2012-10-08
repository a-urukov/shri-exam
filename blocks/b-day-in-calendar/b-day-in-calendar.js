/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-day-in-calendar', {

    _onClick : function(e) {
        alert(this.params.date);
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
