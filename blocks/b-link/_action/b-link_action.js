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

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'change-view-mode' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        
        if (!this.viewModeSwitcher) {
            this.viewModeSwitcher = this.findBlockOutside('b-view-mode-switcher');
        }
        
        this.viewModeSwitcher.setViewMode(this.getMod('view'));
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'export' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        var content = BEMHTML.apply({ block: 'b-dialog-content', js: { data: lecturesShedule.exportShedule() }, mods: { type: 'export-import' }});
        
        var callback = function (argument) { };
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback, 'Экспорт расписания');
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'import' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        
        var content = BEMHTML.apply({ block: 'b-dialog-content', mods: { type: 'export-import' }});
        var callback = jQuery.proxy(this.findBlockOutside('b-page').findBlockInside('b-view-container'), 'importShedule'); 
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback, 'Импорт расписания');
    }
});


BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'add-lecture' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        var content = BEMHTML.apply({ block: 'b-dialog-content', js: true, mods: { type: 'add-edit-lecture' }});
        
        if (!this.daySheduler) {
            this.daySheduler = this.findBlockOutside('b-day-sheduler');
        }
        
        var callback = jQuery.proxy(this.daySheduler, "addLectureFormDialog"); 
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback, 'Добавление лекции');
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'edit-lecture' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        
        if (!this.lectionBlock) {
            this.lectionBlock = this.findBlockOutside('b-lecture');
        }
                
        var content = BEMHTML.apply({ block: 'b-dialog-content', js: { lectureId: this.lectionBlock.params.lectureId }, mods: { type: 'add-edit-lecture' }});
        
        var callback = jQuery.proxy(this.lectionBlock, "edit"); 
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback, 'Редактирование лекции');
    }
});

BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'remove-lecture' }, {
    _onClick : function(e) {
        this.__base.apply(this, arguments);
        var content = BEMHTML.apply({ block: 'b-dialog-content', mods: { type: 'remove-lecture' }});
        
        if (!this.lectionBlock) {
            this.lectionBlock = this.findBlockOutside('b-lecture');
        }
        
        var callback = jQuery.proxy(this.lectionBlock, "remove"); 
        
        this.findBlockOutside('b-page').findBlockInside('b-dialog').show(content, callback, 'Удаление лекции');
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
