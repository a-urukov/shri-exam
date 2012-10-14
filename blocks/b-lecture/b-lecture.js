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
        
        var date = lecturesShedule.getLectureById(this.params.lectureId).date;
        var l = lecturesShedule.editLecture(this.params.lectureId, proceedParams['caption'], proceedParams['lector'], 
                           dateAndTimeStringToFullDate(date, proceedParams['time-start']), proceedParams['duration'].slice(0,-5), 
                           proceedParams['presentation']);
                                    
        BEM.DOM.update(this.domElem, $(BEMHTML.apply(this.findBlockOutside('b-day-sheduler').getBemjsonForLecture(l))).html());
        
        // обновляем интервал в ячейке дня на календаре
        if (!this.calendarBlock) {
            this.calendarBlock = this.findBlockOutside('b-page').findBlockInside('b-calendar-view');
        }
        this.calendarBlock.updateDayBlock(l.date);
    },
    
    remove : function() {
        if (!this.calendarBlock) {
            this.calendarBlock = this.findBlockOutside('b-page').findBlockInside('b-calendar-view');
        }
        var date = lecturesShedule.getLectureById(this.params.lectureId).date;
        lecturesShedule.removeLecture(this.params.lectureId);
        this.calendarBlock.updateDayBlock(date);
        this.findBlockOutside('b-day-sheduler').onChangeActiveDay(date);
    },

    onSetMod : {

        'js' : function() {
            /* ... */
        }

    }

});

})();
