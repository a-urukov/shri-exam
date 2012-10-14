({
    mustDeps: [
        {
            block: 'i-bem',
            elem: 'dom',
            mods: { init: 'auto'}
        },
        {
            block: 'i-bem',
            elem: 'i18n'
        },
        {
            block: 'i-bem',
            mods: { type: 'add-edit-lecture' }
        },
        {
            block: 'i-lectures'
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes', action: 'next-month' }
        },
        {
            block: 'b-dialog-content', 
            mods: { type: 'add-edit-lecture' }
        },
        {
            block: 'b-dialog-content', 
            mods: { type: 'remove-lecture' }
        },
        {
            block: 'b-dialog-content', 
            mods: { type: 'export-import' }
        },
        {
            block: 'b-view-container'
        },
        {
            block: 'b-calendar-view'
        },
        {
            block: 'b-day',
            mods: { view: 'calendar' }
        },
        {
            block: 'b-list-view'
        },
        {
            block: 'b-day',
            mods: { view: 'list' }
        },
        {
            block: 'b-day-sheduler'
        },
        {
            block: 'b-lecture'
        },
        {
            block: 'b-lectures-list'
        }
    ]
})

