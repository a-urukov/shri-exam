/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-view-container', {
    // Возвращает массив Date, представляющий месяц (month, year) в каледаре
    getCalendarMonth: function (date) {
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
    
        var calendarMonth = [];
        var y = date.getYear();
        
        while (((date.getMonth() <= month) && (y <= year) || (y < year)) || (date.getDay() != 1)) {
            y = date.getYear();
            calendarMonth.push(new Date(date.valueOf()));
            date.setDate(date.getDate() + 1);
        }
    
        return calendarMonth;
    },
    
    onSetMod : {
        
        'js' : function() {
            var monthSwitcherBlock = this.findBlockOutside('b-page').findBlockInside('b-month-switcher');
            var viewBlock = (this.getMod('view') == 'calendar-view') ? this.findBlockInside('b-calendar-view') : this.findBlockInside('b-list-view');
            
            monthSwitcherBlock.removeAllListenerToChangeMonthEvent();
            monthSwitcherBlock.addListenerToChangeMonthEvent(jQuery.proxy(viewBlock.setActiveMonth, viewBlock));
            viewBlock.setActiveMonth(monthSwitcherBlock.params.curMonthValue);
        }
    }
})

})();
