/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-list-view', {

    // смена месяца
    setActiveMonth: function (date) {
        var dateArray = this.findBlockOutside('b-view-container').getCalendarMonth(new Date(date));
        var lecturesByDays = lecturesShedule.getLecturesByInterval(dateArray[0], dateArray[dateArray.length-1]);
        
        var bemjson = [];
        
        for (var i = 0; i < lecturesByDays.length; i++) {
            bemjson.push( {
                block: 'b-day',
                mods: { view: 'list' },
                day: {
                    num: lecturesByDays[i].date.getDate(),
                    interval: lecturesShedule.getLecturesIntervalForDay(lecturesByDays[i])
                },
            });
            
            var bemjsomForLectures = []; 
            for (var j = 0; j < lecturesByDays[i].lectures.length; j++) {
                var lecture = lecturesByDays[i].lectures[j];
                
                bemjsomForLectures.push({
                    block: 'b-lecture',
                    lecture:  { 
                        caption: lecture.caption,
                        lector: lecture.lector,
                        timeStart: dateToTimeString(lecture.date),
                        timeEnd: dateToTimeString(getEndTime(lecture.date, lecture.duration)),
                        duration: lecture.duration,
                        presentation: lecture.presentation
                    },
                    js: { lectureId: lecture.id }
                });
            }
            
            bemjson.push( {
                block: 'b-lectures-list',
                mods: { view: 'list' },
                content: bemjsomForLectures
            });
        };
        
        BEM.DOM.update(this.domElem, BEMHTML.apply(bemjson));
    }
})
})();
