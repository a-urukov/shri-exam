/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'next-month' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        this.findBlockOutside('b-month-switcher').nextMonth();
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'prev-month' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        this.findBlockOutside('b-month-switcher').prevMonth();
    }
});


})();
