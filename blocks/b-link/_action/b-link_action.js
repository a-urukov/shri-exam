/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'next-month' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        if (!this.monthSwitcher) {
            this.monthSwitcher = this.findBlockOutside('b-month-switcher');
        }
        this.monthSwitcher.nextMonth();
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'prev-month' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        if (!this.monthSwitcher) {
            this.monthSwitcher = this.findBlockOutside('b-month-switcher');
        }
        this.monthSwitcher.prevMonth();
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'add-lecture' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        var content = BEMHTML.apply({ block: 'b-dialog-content', mods: { type: 'add-lecture' }});
        
        if (!this.daySheduler) {
            this.daySheduler = this.findBlockOutside('b-day-sheduler');
        }
        
        var callback = jQuery.proxy(this.daySheduler, "addLectureFormDialog"); 
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback);
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'dialog-ok' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        if (!this.dialogBlock) {
            this.dialogBlock = this.findBlockOutside('b-dialog');
        }
        this.dialogBlock.submit();
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'dialog-cancel' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        if (!this.dialogBlock) {
            this.dialogBlock = this.findBlockOutside('b-dialog');
        }
        this.dialogBlock.hide();
    }
});

})();
