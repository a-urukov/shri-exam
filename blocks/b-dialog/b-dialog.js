/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-dialog', {
    
    show: function (content, callback) {
        BEM.DOM.update(this.findBlockInside('b-dialog-box').elem('content'), content); 
        this.domElem.fadeIn(200);
        this.callback = callback;
    },
    
    hide: function (content) {
        this.domElem.fadeOut(200);
    },
    
    submit: function () {
        if (this.callback) {
            this.callback(this);
        }
        this.hide();
    },
        
    onSetMod : {

        'js' : function() {
            /* ... */
        }

    }

}, {

    live : function() {
        /* ... */
    }

});

})();
