/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-view-mode-switcher', {

    setViewMode: function(view, isFirstInit) {
        if ((view == this.params.view) && !isFirstInit){
            return;
        }
        
        BEM.DOM.update(this.lectionsViewContainer.domElem, BEMHTML.apply({ block: 'b-view-container', js: true, mods: { view: view } }));
        this.params.view = view;
    },

    onSetMod : {

        'js' : function() {
            this.lectionsViewContainer = this.findBlockOutside('b-page').findBlockInside('b-lectures-content-wrapper');
            this.setViewMode(this.params.view, true);
        }

    }

})

})();
