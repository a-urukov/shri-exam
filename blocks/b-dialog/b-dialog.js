/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-dialog', {
    
    show: function (content, callback, title) {
        BEM.DOM.update(this.elem('content'), content);
        BEM.DOM.update(this.elem('title'), title); 
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
