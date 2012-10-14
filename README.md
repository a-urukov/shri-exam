Экзаменационное задания ШРИ Яндекса

С целью удобства отображения, расписание занятий может быть представлено плоским списком и в календарном виде. В каждой ячейке календаря отображается общий интервал 
лекций в этот день. При клике на ячейку отображается список лекций в этот день, с возможностью добавления/удаления/редактирования.В правом верхнем углу страницы доступны кнопки экспорта/импорта расписания.
Для удаления или редактирования лекции необходимо навести курсор на лекцию в списке справа и кликнуть по соответвующей ссылке.

Формат данных: [c:название_лекции;l:имя_лектора;d:MON DD YYY hh:mm;dr:длительность_лекции]

Пример данных для импорта:
[c:Фреймворки. Обзор;l:Александр Андросов;d:Oct 09 2012 19:00;dr:60][c:jQuery;l:Алексей Бережной;d:Oct 09 2012 20:00;dr:60][c:БЭМ (2 лекции);l:Владимир Варанкин;d:Oct 11 2012 19:00;dr:120][c:Шаблонизаторы;l:Сергей Бережной ;d:Oct 13 2012 12:00;dr:60][c:Дизайн;l:Константин Горский;d:Oct 13 2012 13:00;dr:60][c:Дизайн глазами разработчика;l:Михаил Трошев ;d:Oct 13 2012 14:00;dr:60]

## Installation

Prerequisites:

* [Node.JS](http://nodejs.org)
* [npm](http://npmjs.org)

### setup

Clone git repo

    git clone git://github.com/a-urukov/shri-exam.git

Install dependencies

    npm install

`bem` utility will be installed as `./node_modules/.bin/bem`.

If you want to type `bem` and run locally installed `bem` utility you should add `./node_modules/.bin` to your `PATH`

    export PATH=./node_modules/.bin:$PATH

To install latest unstable version of `bem` globally you should run

    npm install -g bem@unstable

## bem make

To build your project run

    bem make

This will build all files. Sequental executions of `bem make` will rebuild nothing but you can force rebuild by running

    bem make --force

You can also build individual files by running

    bem make pages/example/example.html

or force rebuild by running

    bem make pages/example/example.html --force

You can also use GNU make proxy to `bem make`. Here are some examples

    make
    make clean
    make pages/example/example.html

To rebuild all files run (specifying `-B` option to `make` will not work).

    make clean all

## bem server

To build your project dynamically run

    bem server

Then point your browser to http://localhost:8080/example/example.html and you will get just built html page.

## More options

For more info see `bem make --help` and `bem server --help`.
