/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-day' }, {
},

{
    live : function(arguments) {
        this.__base.apply(this, arguments);
        
        this.liveBindTo('click', function(e) {
                this._onClick(e);
        });
        
    }

})

})();
