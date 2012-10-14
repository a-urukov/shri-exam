/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-dialog-content', modName: 'type', modVal: 'add-edit-lecture'}, {

    onSetMod : {

        'js' : function() {
            this.elem('input-time-start').timepicker();
            
            var that = this;
            var sliderParam = {
                value: 60,
                min: 15,
                max: 180,
                step: 5,
                slide: function( event, ui ) {
                        that.elem('input-duration').val(ui.value + ' мин.' );
                }
            }
            
            this.elem('input-time-start').val('12:00');
            
            if (this.params.lectureId) {
                var l = lecturesShedule.getLectureById(this.params.lectureId);
                
                if (l.caption) {
                    this.elem('input-caption').val(l.caption.replace(/\'/g,""));
                }
                if (l.lector) {
                    this.elem('input-lector').val(l.lector.replace(/\'/g,""));
                }
                if (l.date) {
                    this.elem('input-time-start').val(dateToTimeString(l.date));
                }
                if (l.duration) {
                    sliderParam.value = l.duration;
                }
                if (l.presentation) {
                    this.elem('input-presentation').val(l.presentation);
                }
            }
            
            this.elem('slider-duration').slider(sliderParam);
            this.elem('input-duration').val(sliderParam.value + ' мин.');
        }
    }
});


})();
