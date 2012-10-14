/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-calendar-view', {

    updateDayBlock: function(date) {
        var blocks = this.findBlocksInside('b-day');
        
        for (var i=0; i < blocks.length; i++) {
            if (checkEqualsDateWithoutTime(date, blocks[i].params.date)) {
                var bemjson = {
                    block: 'b-day',
                    mods: { view: 'calendar' },
                    day: {
                        num: blocks[i].params.date.getDate(),
                        interval: lecturesShedule.getLecturesIntervalForDay({  
                                                                                date: blocks[i].params.date, 
                                                                                lectures: lecturesShedule.getLecturesByDay(blocks[i].params.date)
                                                                            })
                    },
                    js: { date: blocks[i].params.date }
                };
                
                BEM.DOM.update(blocks[i].domElem, $(BEMHTML.apply(bemjson)).html());
                return;
            }
        }
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
    setActiveMonth: function (date) {
        var dateArray = this.findBlockOutside('b-view-container').getCalendarMonth(new Date(date));
        var bemjson = [];
        var intervalsForDays = lecturesShedule.getLecturesIntervalForPeriod(dateArray[0], dateArray[dateArray.length-1]);
        
        for (var i = 0; i < dateArray.length; i++) {
            bemjson.push( {
                block: 'b-day',
                mods: { view: 'calendar', hasLections: (intervalsForDays[i]) ? 'yes' : 'no' },
                day: {
                    num: dateArray[i].getDate(),
                    interval: intervalsForDays[i]
                },
                js: { date: dateArray[i] }
            });
        };
        
        var daysBlocks = this.findBlocksInside('b-day');
        
        BEM.DOM.update(this.elem('days-container'), BEMHTML.apply(bemjson));
        
        // смена активного дня
        this.activeDay = undefined;
        
        var now = new Date();
        var selectedMonth = date.getMonth();
        var searchingDay = ((now.getYear() == date.getYear()) && (now.getMonth() == selectedMonth)) ? now.getDate() : 1;
        var daysBlocks = this.findBlocksInside('b-day');
        
        for (var i=0; i < daysBlocks.length; i++) {
            if ((daysBlocks[i].params.date.getMonth() == selectedMonth) && (daysBlocks[i].params.date.getDate() == searchingDay)) {
                this.changeActiveDay(daysBlocks[i]);
                break;
            }
        };
    }
});

})();
