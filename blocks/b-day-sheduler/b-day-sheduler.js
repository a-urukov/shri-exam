/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-day-sheduler', {
    
    getBemjsonForLecture : function(lecture) {
        return  {
                    block: 'b-lecture',
                    lecture:  { 
                        caption: lecture.caption,
                        lector: lecture.lector
                    }
                }
    },
    
    onChangeActiveDay : function (date) {
        this.activeDay = new Date(date);
        var lectures = lecturesShedule.getLecturesByDay(date);
        var bemjson = new Array();
                 
        for (var i=0; i < lectures.length; i++) {
            bemjson.push(this.getBemjsonForLecture(lectures[i]));
        };
        
        if (!this.lecturesContainer) {
            this.lecturesContainer = this.findBlockInside('b-lectures-container');
        };
        
        BEM.DOM.update(this.lecturesContainer.domElem, BEMHTML.apply({ block: 'b-lectures-list', content: bemjson }));
    },
    
    addLectureFormDialog : function (dialog) {
          
        var form = dialog.findBlockInside('b-add-lecture-form');
        
        if (!form) {
            return;
        }
        
        var rawParams = form.domElem.serializeArray();
        var proceedParams = new Object();
        
        for (var i=0; i < rawParams.length; i++) {
            proceedParams[rawParams[i].name] = rawParams[i].value;
        }
        
        var newLecture = lecturesShedule.addNewLecture(proceedParams['caption'], 'testLecture', this.activeDay);
        
        var lecturesBlock = this.findBlockInside('b-lectures-list');
        
        if (lecturesBlock.findBlockInside('b-lecture')) {
            BEM.DOM.append(lecturesBlock.domElem, BEMHTML.apply(this.getBemjsonForLecture(newLecture)));
        }
        else {
            BEM.DOM.update(this.lecturesContainer.domElem, BEMHTML.apply({ block: 'b-lectures-list', content: [ this.getBemjsonForLecture(newLecture) ]}));
        }
        
        if (!this.calendarBlock) {
            this.calendarBlock = this.findBlockOutside('b-page').findBlockInside('b-month-calendar');
        }
        
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
