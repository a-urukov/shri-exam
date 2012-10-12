/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-dialog-content', modName: 'type', modVal: 'add-edit-lecture'}, {

    onSetMod : {

        'js' : function() {
            this.elem('input-time-start').timepicker();
            if (this.params.lecture) {
                this.elem('input-caption').val(this.params.lecture);
            }
        }

    }

});


})();
