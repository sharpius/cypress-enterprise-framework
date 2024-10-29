export enum EDateTimeFormat {
    DATE_DASH_SEPARATOR = 'yyyy-MM-dd',
    DATE_DOT_SEPARATOR = 'dd.MM.yyyy',
    DATE_DOT_SEPARATOR_WITH_TIME = 'dd.MM.yyyy HH:mm',
    DATE_LONG = 'd. MMMM yyyy',
    DATE_COMPACT = 'yyyyMMdd',
    DATE_SHORT = 'dd.MM.',
    DATE_MONTH_DAY = 'MMMM dd',
    TIME_COMPACT = 'HHmmss',
    TIME_COLON_SEPARATOR = 'HH:mm',
    //format 10:00 AM
    TIME_LONG = 'h:mm a',
    TIMESTAMP_COMPACT = 'yyyyMMddHHmmss',
    ISO_DATETIME_T_SEPARATOR = 'yyyy-MM-dd\'T\'HH:mm:ss',
    ISO_DATETIME_SPACE_SEPARATOR = 'yyyy-MM-dd HH:mm:ss',
    ISO_DATETIME_MS = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS',
    ISO_DATETIME_Z = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',

}