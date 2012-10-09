BEM.TEST.decl({ block : 'i-lectures' }, function(undefined) {
    describe('add lecture', function() {
        var lengthBefore = lecturesShedule.lecturesIdList.length;
        var nextIdBefore = lecturesShedule.nextId;
         
        it('should be added one lecture', function () {
            lecturesShedule.addLecture('caption', 'lector', new Date());
            expect(lecturesShedule.lecturesIdList.length).toEqual(lengthBefore+1);
            expect(lecturesShedule.lecturesIdList[lecturesShedule.lecturesIdList.length-1]).toEqual(nextIdBefore);
            lecturesShedule.removeLecture(nextIdBefore);
        });
    });
});