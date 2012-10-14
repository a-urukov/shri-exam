/** @requires BEM */
/** @requires BEM */

/** Лекция (конструктор)
* @constructor
* @param {String} caption название лекции 
* @param {String} lector ФИО лектора
* @param {Date} date дата проведения лекции
* @param {Number} duration длительность лекции в минутах
* @param {String} presentation ссылка на презентацию
* @this {Lecture}
*/
function Lecture(caption, lector, date, duration, presentation) {
    this.caption = caption;
    this.lector = lector;
    this.date = date;
    this.duration = parseInt(duration);
    this.presentation = presentation;
}

/** Функция сравнивает две даты без учета времени
*/
function checkEqualsDateWithoutTime(date1, date2) {
    return ((date1.getYear() == date2.getYear()) &&
            (date1.getMonth() == date2.getMonth()) &&
            (date1.getDate() == date2.getDate()));
} 

(function(undefined) {
    
        /**
    * Расписание лекций (конструктор)
    * @constructor
    * @this {LecturesShedule}
    */
    function LecturesShedule() {
        // отсортированный массив лекций сгрупированный по дням
        this.lecsGrpByDay = [];
        // id следующей добавленной лекции
        this.nextId = 1;
        
        // в списке лекций в LocalStorage храним только id, чтобы минимизировать чтение/запись в хранилище
        var storageLecturesIdList;
        
        if (!(storageLecturesIdList = localStorage['lecturesIdList'])) {
            this.lecturesIdList = [];
            localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
        }
        else {
            this.lecturesIdList = JSON.parse(storageLecturesIdList);
            
            for (var i = 0; i < this.lecturesIdList.length; i++) {
                var lecture = localStorage['l' + this.lecturesIdList[i]];
                
                if (lecture) {
                    lecture = JSON.parse(lecture);
                    lecture.date = new Date(lecture.date);
                    if (!isValidDate(lecture.date)) {
                        lecture.date = new Date();
                    }
                    
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
                if (this.lecsGrpByDay[i].lectures[j].id == id) {
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
    LecturesShedule.prototype.getLecturesByDate = function (year, month, day) {
        var result = [];
        
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
    * Возвращает список лекций начиная с dateStart до dateEnd
    * @param {Date} dateStart задает начало интервала лекций (может отсутствовать)
    * @param {Date} dateEnd задает конец интервала лекций (может отсутствовать)    *
    * @this {LecturesShedule}
    * @returns {Array} Лекции, сгруппированные по дням
    */
    LecturesShedule.prototype.getLecturesByInterval = function (dateStart, dateEnd) {
        var result = [];
        
        if (dateStart) {
            dateStart.setHours(0, 0, 0, 0);
        }
        if (dateEnd) {
            dateEnd.setHours(23, 59, 59, 999);
        }
        
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            if (dateStart) {
                if (dateStart > this.lecsGrpByDay[i].date) {
                    continue;
                }
            }
            
            if (dateEnd) {
                if (dateEnd < this.lecsGrpByDay[i].date) {
                    continue;
                }
            }
            
            result.push(this.lecsGrpByDay[i]);
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
        var lectionsByDay = this.getLecturesByDate(date.getYear()+1900, date.getMonth(), date.getDate());
        
        if (lectionsByDay.length == 1) {
            return lectionsByDay[0].lectures;
        } 
        return [];
    }
    
    /**
    * Возвращает интервал лекций за определенный день
    * @param {LectionsByDay} День с лекциями
    * @this {LecturesShedule}
    * @returns {String} Интервал
    */
    LecturesShedule.prototype.getLecturesIntervalForDay = function (lectionsByDay) {
        if (lectionsByDay) {
            return dateToTimeString(lectionsByDay.lectures[0].date) + '—' 
                        + dateToTimeString(getEndTime(lectionsByDay.lectures[lectionsByDay.lectures.length-1].date, lectionsByDay.lectures[lectionsByDay.lectures.length-1].duration));
        }
        
        return '';
    }
        /**
    * Возвращает интервал лекций для кажого дня периода
    * @param {Date} dateStart задает начало интервала лекций (может отсутствовать)
    * @param {Date} dateEnd задает конец интервала лекций (может отсутствовать)
    * @this {LecturesShedule}
    * @returns {String} Интервалs
    */
    LecturesShedule.prototype.getLecturesIntervalForPeriod = function (dateStart, dateEnd) {
        var lectionsByDays = this.getLecturesByInterval(dateStart, dateEnd);
        var result = [];
        var dateCounter = new Date(dateStart);
        var i = 0;
        
        while (dateCounter <= dateEnd) {
            
            if (lectionsByDays.length > i) {
                if (checkEqualsDateWithoutTime(lectionsByDays[i].date, dateCounter)) {
                    result.push(this.getLecturesIntervalForDay(lectionsByDays[i]));
                    i++;
                    dateCounter.setDate(dateCounter.getDate() + 1);
                    
                    continue;
                }
            }
            
            result.push('');
            dateCounter.setDate(dateCounter.getDate() + 1);
        }
        
        return result;
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
            if (checkEqualsDateWithoutTime(lecture.date, this.lecsGrpByDay[i].date)) {
                for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                    if (lecture.date < this.lecsGrpByDay[i].lectures[j].date) {
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
    LecturesShedule.prototype.addNewLecture = function (caption, lector, date, duration, presentation) {
        var lecture = new Lecture(caption, lector, date, duration, presentation);
        
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
    LecturesShedule.prototype.editLecture = function (id, caption, lector, date, duration, presentation) {
        for (var i=0; i < this.lecsGrpByDay.length; i++) {
            for (var j=0; j < this.lecsGrpByDay[i].lectures.length; j++) {
                if (this.lecsGrpByDay[i].lectures[j].id == id) {
                    var l = new Lecture(caption, lector, date, duration, presentation);
                    l.id = id;
                    
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
                if (this.lecsGrpByDay[i].lectures[j].id == id) {
                    
                    // удаляем элемент из списка id's лекций
                    for (var k = 0; k < this.lecturesIdList.length; k++) {
                         if (this.lecturesIdList[k] == id) {
                            this.lecturesIdList.splice(k, 1);
                            localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
                            
                            break;
                         }
                    }
                    
                    if (this.lecsGrpByDay[i].lectures.length == 1) {
                        this.lecsGrpByDay.splice(i, 1);
                    } 
                    else {
                        this.lecsGrpByDay[i].lectures.splice(j, 1);
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
        this.lecsGrpByDay = [];
        this.lecturesIdList = [];
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
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    return months[date.getMonth()] + ' ' + (date.getYear() + 1900);
}

/** По заданной дате возвращает строку датой и названием месяца
 *  @param {Date} date дата  
**/
function dateToDayAndMonthString(date) {
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    return date.getDate() + ' ' + months[date.getMonth()];
}


/** По заданной дате возвращает строку с временем в формате hh:mm*
 *  @param {Date} date дата  
**/
function dateToTimeString(date) {
    var hour = date.getHours().toString();
    var min = date.getMinutes().toString();
    
    return ((hour.length == 1) ? '0'+ hour : hour) + ':' + ((min.length == 1) ? '0'+ min : min);
}

/** По заданной дате и строке с временем в формате hh:mm* возвращает дату и время 
 *  @param {Date} date дата  
 *  @param {String} time время в строковом формате 
**/
function dateAndTimeStringToFullDate(date, time) {
    var timeArray = time.split(':');
    
    return new Date(date.getYear()+1900,  date.getMonth(), date.getDate(), parseInt(timeArray[0]), parseInt(timeArray[1]));
}

/** По времени начала и длительности возвращает время окончания 
 *  @param {Date} timeStart дата  
 *  @param {Number} duration длительность в минутах
**/
function getEndTime (timeStart, duration) {
    var result = new Date(timeStart);    
    result.setMinutes(result.getMinutes() + duration);
    return result;
}

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}
