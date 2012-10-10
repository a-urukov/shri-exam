([
    {
        block: 'b-page',
        title: 'Школа разработки интерфейсов — расписание занятий',
        head: [
            { elem: 'js', url: 'jquery.min.js' },
            { elem: 'js', url: '_index.bemhtml.js' },
            { elem: 'css', url: '_index.css' },
            { elem: 'js', url: '_index.js' }
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
                        block: 'b-month-switcher',
                        js: { curMonthValue: new Date() },
                        content: [
                            {
                                block: 'b-link',
                                mods: { pseudo: 'yes', action: 'prev-month' },
                                content: '←'
                            },
                            {
                                elem: 'current-month',
                                tag: 'span'
                            },
                            {
                                block: 'b-link',
                                mods: { pseudo: 'yes', action: 'next-month' },
                                content: '→'
                            }
                        ]
                    },
                    {
                        block: 'b-month-calendar'
                    },
                    {
                        block: 'b-day-sheduler',
                        js: true
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
