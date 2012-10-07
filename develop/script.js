
// Возвращает массив Date, представляющий месяц (month, year) в каледаре
function initCalendarMonth(month, year) {
    var date = new Date(year, month);
    var dayOfWeek = date.getDay(date);
    dayOfWeek = (dayOfWeek == 0) ? 6 : dayOfWeek - 1;

    if (dayOfWeek != 0) {
        date.setDate(0);
        if (dayOfWeek > 1) {
            date.setDate(date.getDate() - (dayOfWeek - 1));
        }
    }

    var calendarMonth = new Array();
    while (((date.getMonth() <= month) && (1900 + date.getYear() <= year)) || (date.getDay() != 1)) {
        calendarMonth.push(new Date(date.valueOf()));
        date.setDate(date.getDate() + 1);
    }

    return calendarMonth;
}

function printCalendar(month, year) {
    var calendar = initCalendarMonth(month, year);

    for (var i = 0; i < calendar.length; i++) {
        document.write(calendar[i].getDate() + "." + (calendar[i].getMonth() + 1) + ";  ");
    }
    document.write("<br /> ");
}

// Лекция 
function Lecture(caption, lector, date) {
    this.caption = caption;
    this.lector = lector;
    this.date = date;
}

// Расписание лекций (конструктор)
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

// Добавить лекцию в расписание
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

// Редактировать лекцию 
LecturesShedule.prototype.editLecture = function (id, caption, lector, date) {
    if (this.lectures.hasOwnProperty(id)) {
        this.lectures[id] = new Lecture(caption, lector, date);
        localStorage['l' + id] = JSON.stringify(this.lectures[id]);
    }

    return this;
}

// Удалить лекцию
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

// Эспорт расписания (возвращает строку)
LecturesShedule.prototype.exportShedule = function () {
    var result = '';

    for (var id in this.lectures) {
        var l = this.lectures[id];
        result += '[c:' + l.caption + ';l:' + l.lector + ';d:' + l.date.toString().substring(4, 21) + ']';
    }

    return result;
}

// Импорт расписания (из строки формата: [c:название_лекции;l:имя_лектора;d:MON DD YYY hh:mm])
LecturesShedule.prototype.importShedule = function (str) {
    var regExp = /\[c:(.+?);l:(.+?);d:(\S{3}\s\d{2}\s\d{4}\s\d{2}:\d{2})]/g;
    var buffer;

    this.lectures = new Object();
    this.lecturesIdList = new Array();
    localStorage['lecturesIdList'] = JSON.stringify(this.lecturesIdList);
    this.nextId = 1;

    while ((buffer = regExp.exec(str)) != null) {
        this.addLecture(buffer[1], buffer[2], new Date(buffer[3]));
    }

    return this;
}

var a = new LecturesShedule();

//a.addLecture('лекция 1', 'лектор 1', new Date(10, 10, 10, 10, 10));
//a.addLecture('лекция 2', 'лектор 2', new Date(10, 10, 10, 10, 10));
//a.addLecture('лекция 3', 'лектор 3', new Date(10, 10, 10, 10, 10));

b = a.exportShedule();
c = a.importShedule(b);

