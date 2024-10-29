interface LocalDateOptions {
    includeWeekends?: boolean; // do we include weekends in the past/future date
    days?: number; // how many days in the past/future
    months?: number; // how many months in the past/future
    time?: string; // time of the day
}