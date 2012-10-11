/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-month-calendar', {

    // Возвращает массив Date, представляющий месяц (month, year) в каледаре
    initCalendarMonth: function (date) {
        date.setDate(1);
        var dayOfWeek = date.getDay(date);
        var month = date.getMonth();
        var year = date.getYear(); 
        
        dayOfWeek = (dayOfWeek == 0) ? 6 : dayOfWeek - 1;
    
        if (dayOfWeek != 0) {
            date.setDate(0);
            if (dayOfWeek > 1) {
                date.setDate(date.getDate() - (dayOfWeek - 1));
            }
        }
    
        var calendarMonth = new Array();
        var y = date.getYear();
        
        while (((date.getMonth() <= month) && (y <= year) || (y < year)) || (date.getDay() != 1)) {
            y = date.getYear();
            calendarMonth.push(new Date(date.valueOf()));
            date.setDate(date.getDate() + 1);
        }
    
        return calendarMonth;
    },
    
    changeActiveDay : function(day) {
        if (!this.dayShedulerBlock) {
            this.dayShedulerBlock = this.findBlockOutside('b-page').findBlockInside('b-day-sheduler');
        }
        if (this.activeDay) {
            this.activeDay.setMod('active', 'no');
        }
        
        this.activeDay = day;
        this.activeDay.setMod('active', 'yes');
        
        this.dayShedulerBlock.onChangeActiveDay(day.params.date);
    },
    
    // смена месяца
    onChangeMonth: function (date) {
        var dateArray = this.initCalendarMonth(new Date(date));
        var bemjson = new Array();
        var lecturesByDay = lecturesShedule.getLecturesByInterval(dateArray[0], dateArray[dateArray.length-1])
        
        var j = 0;
        for (var i = 0; i < dateArray.length; i++) {
            var rangeLections = '';
           
            if (j < lecturesByDay.length) {
                if (checkEqualsDateWithoutTime(dateArray[i], lecturesByDay[j].date)) {
                    rangeLections =  dateToTimeString(lecturesByDay[j].lectures[0].date) + '—' 
                                     + dateToTimeString(lecturesByDay[j].lectures[lecturesByDay[j].lectures.length-1].date);
                    j++;
                }
            }
            
            bemjson.push( {
                block: 'b-day-in-calendar',
                content: [
                    {
                        elem: 'day-num',
                        content: dateArray[i].getDate()
                    },
                    {
                        elem: 'rangeLectionsTime',
                        content: rangeLections
                    }
                ],
                js: { date: dateArray[i] }
            });
        };
        
        BEM.DOM.update(this.domElem, BEMHTML.apply(bemjson));
        
        // смена активного дня
        this.activeDay = undefined;
        
        var now = new Date();
        var selectedMonth = date.getMonth();
        var searchingDay = ((now.getYear() == date.getYear()) && (now.getMonth() == selectedMonth)) ? now.getDate() : 1;
        var daysBlocks = this.findBlocksInside('b-day-in-calendar');
        
        for (var i=0; i < daysBlocks.length; i++) {
            if ((daysBlocks[i].params.date.getMonth() == selectedMonth) && (daysBlocks[i].params.date.getDate() == searchingDay)) {
                this.changeActiveDay(daysBlocks[i]);
                break;
            }
        };
    },
    
    onSetMod : {

        'js' : function() {
            /* ... */
        }
    }
    
});

})();
