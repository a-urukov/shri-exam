/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-view-mode-switcher', {

    setViewMode: function(view, isFirstInit) {
        if ((view == this.params.view) && !isFirstInit){
            return;
        }
        
        if (!isFirstInit) {
            this.findBlockInside({ blockName : 'b-link', modName : 'view', modVal : this.params.view }).setMod('active', 'no');
            this.findBlockInside({ blockName : 'b-link', modName : 'view', modVal : view }).setMod('active', 'yes');
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
