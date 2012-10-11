/** @requires BEM */
/** @requires BEM */

/** Лекция (конструктор)
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
        // отсортированный массив лекций сгрупированный по дням
        this.lecsGrpByDay = new Array();
        // id следующей добавленной лекции
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
                    
                    jQuery.proxy(_addLectureToGroupedList, this)(lecture);
                    
                    if (this.nextId <= lecture.id) {
                        this.nextId = lecture.id + 1;
                    }
                }
            }
        }
    }
    
    /**
    * Возвращает лекцию с заданным id 
    * @param {Number} id лекции
    * @this {LecturesShedule}
    * @returns {Array} Лекции
    */
    LecturesShedule.prototype.getLectureById = function (id) {
        
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                if (this.lecsGrpByDay[i].lectures[j] == id) {
                    return this.lecsGrpByDay[i].lectures[j];
                }
            }
        }
        
        return null;
    }
    
    /**
    * Возвращает список лекций по заданному интервалу день/месяц/год
    * @param {Number} year задает годовой интервал лекций (может отсутствовать)
    * @param {Number} month задает месячный интервал лекций (может отсутствовать)
    * @param {Number} day задает дневной интервал лекций (может отсутствовать)
    * @this {LecturesShedule}
    * @returns {Array} Лекции, сгруппированные по дням
    */
    LecturesShedule.prototype.getLecturesByInterval = function (year, month, day) {
        var result = new Array();
        
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            if (year) {
                var y = this.lecsGrpByDay[i].date.getYear() + 1900;
                
                if (y > year) {
                    break;
                }
                else if (y == year) {
                    if (month) {
                        var m = this.lecsGrpByDay[i].date.getMonth();
                        
                        if (m > month) {
                            break;
                        }
                        else if (m == month) {
                            if (day) {
                                var d = this.lecsGrpByDay[i].date.getDate();
                                
                                if (d > day) {
                                    break;
                                }
                                else if (d != day) {
                                    continue;
                                }
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    continue;
                }
            }
            
            result.push(this.lecsGrpByDay[i])
        }
        
        return result;
    }
    
    /**
    * Возвращает список лекций за определенный день
    * @param {Date} День
    * @this {LecturesShedule}
    * @returns {Array} Лекции
    */
    LecturesShedule.prototype.getLecturesByDay = function (date) {
        var lectionsByDay = this.getLecturesByInterval(date.getYear()+1900, date.getMonth(), date.getDate());
        
        if (lectionsByDay.length == 1) {
            return lectionsByDay[0].lectures;
        } 
        return [];
    }
    
    /**
    * private метод добавления уже существующей в расписании лекции в группированный по дате масив
    * вызывается через proxy
    * @this {LecturesShedule}
    * @param {Lecture} лекция
    * @returns {LecturesShedule}
    */
    function _addLectureToGroupedList (lecture) {
        var flagAdded = false;
        
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            if ((lecture.date.getYear() == this.lecsGrpByDay[i].date.getYear()) &&
                (lecture.date.getMonth() == this.lecsGrpByDay[i].date.getMonth()) &&
                (lecture.date.getDate() == this.lecsGrpByDay[i].date.getDate()))
            {
                for (var j=0; j < this.lecsGrpByDay[i].lectures; j++) {
                    if (lecture.date < this.lecsGrpByDay[i].lectures[j]) {
                        this.lecsGrpByDay[i].lectures.splice(j, 0, lecture);
                        flagAdded = true;
                        
                        break;
                    }
                }
                if (!flagAdded) {
                    this.lecsGrpByDay[i].lectures.push(lecture);
                    flagAdded = true;
                }
                    
                break;
            }
            else if (lecture.date < this.lecsGrpByDay[i].date) {
                this.lecsGrpByDay.splice(i, 0, { date: lecture.date, lectures: [ lecture ] });
                flagAdded = true;
               
                break;
            }
        }
            
            if (!flagAdded) {
                    this.lecsGrpByDay.push({ date: lecture.date, lectures: [ lecture ] });
            }
        
        return this;
    }
    
    /**
    * Добавить новую лекцию в расписание
    * @this {LecturesShedule}
    * @param {String} caption название лекции 
    * @param {String} lector ФИО лектора
    * @param {Date} date дата проведения лекции
    * @returns {Lecture}
    */
    LecturesShedule.prototype.addNewLecture = function (caption, lector, date) {
        var lecture = new Lecture(caption, lector, date);
        
        lecture.id = this.nextId++;
        localStorage['l' + lecture.id] = JSON.stringify(lecture);
        
        // обновляем список id's лекций
        this.lecturesIdList.push(lecture.id);
        localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
        
        jQuery.proxy(_addLectureToGroupedList, this)(lecture);
        
        return lecture;
    }
    
    /**
    * Редактировать лекцию
    * @this {LecturesShedule}
    * @param {Number} id лекции
    * @param {String} caption название лекции 
    * @param {String} lector ФИО лектора
    * @param {Date} date дата проведения лекции
    * @returns {Lecture}
    */
    LecturesShedule.prototype.editLecture = function (id, caption, lector, date) {
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                if (this.lecsGrpByDay[i].lectures[j] == id) {
                    var l = new Lecture(caption, lector, date);
                    
                    this.lecsGrpByDay[i].lectures[j] = l;
                    localStorage['l' + id] = JSON.stringify(l);
                    return l; 
                }
            }
        }
    
        return null;
    }
    
    /**
    * Удалить лекцию
    * @this {LecturesShedule}
    * @param {Number} id лекции
    * @returns {LecturesShedule}
    */
    LecturesShedule.prototype.removeLecture = function (id) {
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                if (this.lecsGrpByDay[i].lectures[j] == id) {
                    
                    // удаляем элемент из списка id's лекций
                    for (var k = 0; k < this.lecturesIdList.length; k++) {
                         if (this.lecturesIdList[k] == id) {
                            this.lecturesIdList.splice(k, 1);
                            localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
                            
                            break;
                         }
                    }
                    
                    if (this.lecsGrpByDay[i].lectures.length == 1) {
                        this.lecsGrpByDay[i].splice(i, 1);
                    } 
                    else {
                        this.lecsGrpByDay[i].lectures[j].splice(j, 1);
                    }
                    
                    return this;
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
        this.lecsGrpByDay = new Array();
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
        
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                var l = this.lecsGrpByDay[i].lectures[j];
                result += '[c:' + l.caption + ';l:' + l.lector + ';d:' + l.date.toString().substring(4, 21) + ']';
            }
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


/** По заданной дате возвращает строку с названием месяца и годом*
 *  @param {Date} date дата  
**/
function dateToMonthAndYearString(date) {
    var result;
    
    switch (date.getMonth()) {
        case 0:
            result = 'Январь';
            break;
        case 1:
            result = 'Февраль';
            break;
        case 2:
            result = 'Март';
            break;
        case 3:
            result = 'Апрель';
            break;
        case 4:
            result = 'Май';
            break;
        case 5:
            result = 'Июнь';
            break;
        case 6:
            result = 'Июль';
            break;
        case 7:
            result = 'Август';
            break;
        case 8:
            result = 'Сентябрь';
            break;
        case 9:
            result = 'Октябрь';
            break;
        case 10:
            result = 'Ноябрь';
            break;
        case 11:
            result = 'Декабрь';
            break;
    }
    return result + ' ' + (date.getYear() + 1900);
}