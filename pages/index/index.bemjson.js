([
    {
        block: 'b-page',
        title: 'Школа разработки интерфейсов — расписание занятий',
        head: [
            { elem: 'js', url: 'jquery.min.js' },
            { elem: 'js', url: 'jquery-ui.js' },
            { elem: 'js', url: 'timepicker.js' },
            { elem: 'js', url: '_index.bemhtml.js' },
            { elem: 'js', url: '_index.js' },
            { elem: 'css', url: '_index.css' },
            { elem: 'css', url: 'timepicker.css' },
            {
                /* Через элемент css блока b-page не подключается */
                tag: 'link',
                attrs: { rel: 'stylesheet', href: 'jquery-ui.css' }
            }
        ],
        content: [
            {
                block: 'b-page-layout',
                content: [
                    {
                        block: 'b-header',
                        tag: 'h1',
                        content: 'Расписание занятий'
                    },
                    {
                        block: 'b-view-mode-switcher',
                        js: { view: 'calendar-view' }
                    },
                    {
                        block: 'b-month-switcher',
                        js: { curMonthValue: new Date() },
                    },
                    {
                        block: 'b-lectures-content-wrapper',
                    },
                    {
                        block: 'b-dialog',
                        js: true
                    }
                ]
            }
        ]
    }
])
