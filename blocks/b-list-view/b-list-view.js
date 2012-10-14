/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-list-view', {

    // смена месяца
    setActiveMonth: function (date) {
        var lecturesByDays = lecturesShedule.getLecturesByDate(date.getYear()+1900, date.getMonth());
        
        var bemjson = [];
        
        for (var i = 0; i < lecturesByDays.length; i++) {
            bemjson.push( {
                block: 'b-day',
                mods: { view: 'list' },
                day: {
                    num: dateToDayAndMonthString(lecturesByDays[i].date),
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
        
        if (bemjson.length) {
            BEM.DOM.update(this.domElem, BEMHTML.apply(bemjson));
        }
        else {
            BEM.DOM.update(this.domElem, BEMHTML.apply({ elem: 'empty', content: 'Нет лекций в этом месяце' }));
        }
    }
})
})();
