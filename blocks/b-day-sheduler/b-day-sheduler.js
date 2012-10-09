/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-day-sheduler', {
    
    onChangeActiveDay : function (date) {
        this.activeDay = new Date(date);
        var lectures = lecturesShedule.getLecturesByDate(date);
        var bemjson = new Array();
                 
        for (var i=0; i < lectures.length; i++) {
            bemjson.push({
                block: 'b-lecture',
                caption: lectures[i].caption
            });
        };
        
        BEM.DOM.update(this.findBlockInside('b-lectures-container').domElem, BEMHTML.apply({ block: 'b-lectures-list', content: bemjson }));
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
