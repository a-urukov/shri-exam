/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-lecture', {
    
    edit : function(dialog) {
        var form = dialog.findBlockInside('b-dialog-content').elem('form');
        
        if (!form) {
            return;
        }
        
        var rawParams = form.serializeArray();
        var proceedParams = new Object();
        
        for (var i=0; i < rawParams.length; i++) {
            proceedParams[rawParams[i].name] = rawParams[i].value;
        }
        
        if (!this.calendarBlock) {
            this.calendarBlock = this.findBlockOutside('b-page').findBlockInside('b-month-calendar');
        }
        
        var date = lecturesShedule.getLectureById(this.params.lectureId).date;
        var l = lecturesShedule.editLecture(this.params.lectureId, proceedParams['caption'], proceedParams['lector'], 
                           dateAndTimeStringToFullDate(date, proceedParams['time-start']), proceedParams['duration'].slice(0,-5), 
                           proceedParams['presentation']);
                                    
        BEM.DOM.update(this.domElem, $(BEMHTML.apply(this.findBlockOutside('b-day-sheduler').getBemjsonForLecture(l))).html());
        
        this.calendarBlock.updateDayBlock(l.date);
    },

    onSetMod : {

        'js' : function() {
            /* ... */
        }

    }

});

})();
