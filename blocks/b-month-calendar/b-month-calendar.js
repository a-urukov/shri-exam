/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-month-calendar', {

    // Возвращает массив Date, представляющий месяц (month, year) в каледаре
    initCalendarMonth: function (date) {
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
        while (((date.getMonth() <= month) && (date.getYear() <= year) || (date.getYear() < year)) || (date.getDay() != 1)) {
            calendarMonth.push(new Date(date.valueOf()));
            date.setDate(date.getDate() + 1);
        }
    
        return calendarMonth;
    },

    // смена месяца
    onChangeMonth: function (date) {
        var dateArray = this.initCalendarMonth(new Date(date));
        var bemjson = new Array();
        
        for (var i=0; i < dateArray.length; i++) {
            bemjson.push( {
                block: 'b-day-in-calendar',
                content: [
                    {
                        elem: 'day-num',
                        content: dateArray[i].getDate()
                    }
                ],
                js: { date: dateArray[i] }
            });
        };
        
        BEM.DOM.update(this.domElem, BEMHTML.apply(bemjson));
    },

    onSetMod : {

        'js' : function() {
            /* ... */
        }
    }
    
});

})();
