/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-month-switcher', {

    dateToMonthAndYear : function (date) {
        var result;
        switch (date.getMonth())
        {
            case 0: result = 'Январь'; break;
            case 1: result = 'Февраль'; break;
            case 2: result = 'Март'; break;
            case 3: result = 'Апрель'; break;
            case 4: result = 'Май'; break;
            case 5: result = 'Июнь'; break;
            case 6: result = 'Июль'; break;
            case 7: result = 'Август'; break;
            case 8: result = 'Сентябрь'; break;
            case 9: result = 'Октябрь'; break;
            case 10: result = 'Ноябрь'; break;
            case 11: result = 'Декабрь'; break;
        }
        return result + ' ' + (date.getYear() + 1900); 
    },
    
    nextMonth : function () {
        this.params.curMonthValue.setMonth(this.params.curMonthValue.getMonth()+1);
        this.onChangeMonth();
    },
    
    prevMonth : function () {
        var month = this.params.curMonthValue.getMonth();
        
        if (month) {
            this.params.curMonthValue.setMonth(month-1);
        }
        else {
            this.params.curMonthValue = new Date(this.params.curMonthValue.getYear()+1899, 11)
        };
        
        this.onChangeMonth();
    },
    
    onChangeMonth : function () {
        BEM.DOM.update(this.elem('current-month'), this.dateToMonthAndYear(this.params.curMonthValue));
        
        if (!this.monthCalendar) {
            this.monthCalendar = this.findBlockOutside('b-page').findBlockInside('b-month-calendar');
        };
                
        this.monthCalendar.onChangeMonth(this.params.curMonthValue);
    },

    onSetMod : {

        'js' : function() {
            this.params.curMonthValue = new Date(this.params.curMonthValue);
            this.onChangeMonth();
        }
    }
});

})();
