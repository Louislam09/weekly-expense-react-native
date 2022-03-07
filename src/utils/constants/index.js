export const CURRENT_PAGE = {
    HOME: 0,
    MAIN: 1,
    SETTING: 2,
}
Object.freeze(CURRENT_PAGE)

export const LANGS = {
    EN: 'EN',
    ES: 'ES'
}
Object.freeze(LANGS)

export const EMOJIS = {
    EN: '🇺🇸',
    ES: '🇪🇸',
    SETTING: '⚙️',
    DOLLAR: '💸',
}

Object.freeze(EMOJIS)

export const ASYNC_STORAGE_KEYS = {
    EXPENSE_KEY: '@expense_key',
    BUDGET_KEY: '@budget_key',
    CURRENT_PAGE: '@current_page',
    LANG: '@lang',
    NOTIFICATION: '@notification',
}
Object.freeze(ASYNC_STORAGE_KEYS)