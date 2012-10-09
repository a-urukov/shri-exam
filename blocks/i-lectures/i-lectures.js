/** @requires BEM */
/** @requires BEM */

/**
* Лекция (конструктор)
* @constructor
* @param {String} caption название лекции 
* @param {String} lector ФИО лектора
* @param {Date} date дата проведения лекции
* @this {Lecture}
*/
function Lecture(caption, lector, date) {
    this.caption = caption;
    this.lector = lector;
    this.date = date;
}

(function(undefined) {
    
    /**
    * Расписание лекций (конструктор)
    * @constructor
    * @this {LecturesShedule}
    */
    function LecturesShedule() {
        this.lectures = new Object();
        this.nextId = 1;
        
        // в списке лекций в LocalStorage храним только id, чтобы минимизировать чтение/запись в хранилище
        var storageLecturesIdList;
        
        if (!(storageLecturesIdList = localStorage['lecturesIdList'])) {
            this.lecturesIdList = new Array();
            localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);   
        }
        else {
            this.lecturesIdList = JSON.parse(storageLecturesIdList);
            
            for (var i = 0; i < this.lecturesIdList.length; i++) {
                var lecture = localStorage['l' + this.lecturesIdList[i]];
                
                if (lecture) {
                    lecture = JSON.parse(lecture);
                    lecture.date = new Date(lecture.date);
                    this.lectures[this.lecturesIdList[i]] = lecture;                
                    
                    if (this.nextId <= lecture.id) {
                        this.nextId = lecture.id + 1;
                    }
                }
            }
        }
    }
    
    /**
    * Возвращает список лекций заданного дня
    * @param {Date} data дата проведения лекций
    * @this {LecturesShedule}
    * @returns {Array} Лекции
    */
    LecturesShedule.prototype.getLecturesByDate = function (date) {
        var result = new Array();
        
        for (var id in this.lectures) {
            if ((this.lectures[id].date.getDate() == date.getDate()) &&
                (this.lectures[id].date.getDate() == date.getDate()) &&
                (this.lectures[id].date.getDate() == date.getDate()))
            {
                result.push(this.lectures[id]);
            };
        };
        
        return result;
    }
    
    /**
    * Добавить лекцию в расписание
    * @this {LecturesShedule}
    * @param {String} caption название лекции 
    * @param {String} lector ФИО лектора
    * @param {Date} date дата проведения лекции
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.addLecture = function (caption, lector, date) {
        var lecture = new Lecture(caption, lector, date);
        
        lecture.id = this.nextId++;
        this.lectures[lecture.id] = lecture;    
        localStorage['l' + lecture.id] = JSON.stringify(lecture);
        
        // обновляем глобальный список лекций
        this.lecturesIdList.push(lecture.id);
        localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
        
        return this;
    }
    
    /**
    * Редактировать лекцию
    * @this {LecturesShedule}
    * @param {Number} id лекции
    * @param {String} caption название лекции 
    * @param {String} lector ФИО лектора
    * @param {Date} date дата проведения лекции
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.editLecture = function (id, caption, lector, date) {
        if (this.lectures.hasOwnProperty(id)) {
            this.lectures[id] = new Lecture(caption, lector, date);
            localStorage['l' + id] = JSON.stringify(this.lectures[id]);
        }
    
        return this;
    }
    
    /**
    * Удалить лекцию
    * @this {LecturesShedule}
    * @param {Number} id лекции
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.removeLecture = function (id) {
        if (this.lectures.hasOwnProperty(id)) {
            delete this.lectures[id];
            
            for (var i = 0; i < this.lecturesIdList.length; i++) {
                if (this.lecturesIdList[i] == id) {
                    this.lecturesIdList = this.lecturesIdList.slice(0, i).concat(this.lecturesIdList.slice(i + 1));
                    localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
                    
                    break;
                }
            }
        }
    
        return this;
    }
    
    /**
    * Очистка расписания
    * @this {LecturesShedule}    
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.clearShedule = function (str) {
        this.lectures = new Object();
        this.lecturesIdList = new Array();
        localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
        this.nextId = 1;
        
        return this;
    }
    
    /**
    * Экспорт расписания
    * @this {LecturesShedule}
    * @returns {String} расписание в строковом формате
    */
    LecturesShedule.prototype.exportShedule = function () {
        var result = '';
        
        for (var id in this.lectures) {
            var l = this.lectures[id];
            result += '[c:' + l.caption + ';l:' + l.lector + ';d:' + l.date.toString().substring(4, 21) + ']';
        }
    
        return result;
    }
    
    /**
    * Импорт расписания (из строки)
    * @this {LecturesShedule}
    * @param {String} cтрока с набором блоков формата: [c:название_лекции;l:имя_лектора;d:MON DD YYY hh:mm]
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.importShedule = function (str) {
        var regExp = /\[c:(.+?);l:(.+?);d:(\S{3}\s\d{2}\s\d{4}\s\d{2}:\d{2})]/g;
        var buffer;
        
        this.clearShedule();
        
        while ((buffer = regExp.exec(str)) != null) {
            this.addLecture(buffer[1], buffer[2], new Date(buffer[3]));
        }
    
        return this;
    }
    
    lecturesShedule = new LecturesShedule();
})();
