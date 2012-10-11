/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-month-switcher', {

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
        BEM.DOM.update(this.elem('current-month'), dateToMonthAndYearString(this.params.curMonthValue));
        
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
