import {DateTime, DurationUnit} from 'luxon';
import {EDateTimeFormat} from "./EDateTimeFormat";


export class LocalDate {
	private readonly _dateTime: DateTime;
	public static readonly MAXIMUM_GERMAN_DATE = '31.12.9999';

	get dateTime(): DateTime {
		return this._dateTime;
	}

	public constructor(date: Date | DateTime | LocalDate) {
		if (date instanceof Date) {
			this._dateTime = DateTime.fromJSDate(date, {zone: 'utc'});
		} else if (date instanceof LocalDate) {
			this._dateTime = date._dateTime;
		} else if (date instanceof DateTime) {
			this._dateTime = date as DateTime;
		}
	}

	public static fromString(dateString: string, format: string): LocalDate {
		return new LocalDate(DateTime.fromFormat(dateString, format));
	}

	public toString(format: EDateTimeFormat): string {
		return this._dateTime.toFormat(format);
	}

	public static now(): LocalDate {
		return new LocalDate(DateTime.local().setZone('utc'));
	}

	public static future(options?: LocalDateOptions): LocalDate {
		let dateTime = DateTime.local().setZone('utc');

		if (options?.days) {
			dateTime = dateTime.plus({days: options.days});
		}
		if (options?.months) {
			dateTime = dateTime.plus({months: options.months});
		}

		if (options?.time) {
			const [hours, minutes] = options.time.split(':').map(Number);
			dateTime = dateTime.set({hour: hours, minute: minutes});
		}

		if (options?.includeWeekends === false) {
			while (dateTime.weekday === 6 || dateTime.weekday === 7) {
				dateTime = dateTime.plus({days: 1});
			}
		}
		return new LocalDate(dateTime);
	}

	public static past(options?: LocalDateOptions): LocalDate {
		let dateTime = DateTime.local().setZone('utc');

		if (options?.days) {
			dateTime = dateTime.minus({days: options.days});
		}
		if (options?.months) {
			dateTime = dateTime.minus({months: options.months});
		}
		if (options?.time) {
			const [hours, minutes] = options.time.split(':').map(Number);
			dateTime = dateTime.set({hour: hours, minute: minutes});
		}
		if (options?.includeWeekends === false) {
			while (dateTime.weekday === 6 || dateTime.weekday === 7) {
				dateTime = dateTime.minus({days: 1});
			}
		}
		return new LocalDate(dateTime);
	}

	public static ofJSDate(date: Date): LocalDate {
		return new LocalDate(date);
	}

	public toJSDate(): Date {
		return this._dateTime.toJSDate();
	}

	public diff(date: DateTime, unit: DurationUnit): number {
		return Math.trunc(this._dateTime.diff(date, unit).as(unit));
	}

	public toUnixMilliseconds(): number {
		return this._dateTime.toMillis();
	}

	public setToLocalMidnight(): LocalDate {
		const offset = this._dateTime.offset;
		return new LocalDate(this._dateTime.set({hour: 0 - offset / 60, minute: 0, second: 0, millisecond: 0}));
	}

	public addDays(days: number, excludeWeekends: boolean = false): LocalDate {
		let newDate = this._dateTime;

		for (let addedDays = 0; addedDays < days;) {
			newDate = newDate.plus({days: 1});
			if (!excludeWeekends || (excludeWeekends && !newDate.isWeekend)) {
				addedDays++;
			}
		}
		return new LocalDate(newDate);
	}

	public subtractDays(days: number): LocalDate {
		return new LocalDate(this._dateTime.minus({day: days}));
	}

	public addMonths(months: number): LocalDate {
		return new LocalDate(this._dateTime.plus({month: months}));
	}

	public subtractMonths(months: number): LocalDate {
		return new LocalDate(this._dateTime.minus({month: months}));
	}

	public addYears(years: number): LocalDate {
		return new LocalDate(this._dateTime.plus({year: years}));
	}

	public subtractYears(years: number): LocalDate {
		return new LocalDate(this._dateTime.minus({year: years}));
	}

	public addHours(hours: number): LocalDate {
		return new LocalDate(this._dateTime.plus({hour: hours}));
	}

	public subtractHours(hours: number): LocalDate {
		return new LocalDate(this._dateTime.minus({hour: hours}));
	}

	public addMinutes(minutes: number): LocalDate {
		return new LocalDate(this._dateTime.plus({minute: minutes}));
	}

	public subtractMinutes(minutes: number): LocalDate {
		return new LocalDate(this._dateTime.minus({minute: minutes}));
	}

	public getYear(): number {
		return this._dateTime.year;
	}

	public getMonth(): number {
		return this._dateTime.month;
	}

	public getDay(): number {
		return this._dateTime.day;
	}

	public getHours(): number {
		return this._dateTime.hour;
	}

	public getMinutes(): number {
		return this._dateTime.minute;
	}

	public getSeconds(): number {
		return this._dateTime.second;
	}

	public isBefore(date: LocalDate): boolean {
		return this._dateTime < date.dateTime;
	}

	public isAfter(date: LocalDate): boolean {
		return this._dateTime > date.dateTime;
	}

	public isEqual(date: LocalDate): boolean {
		return this.toUnixMilliseconds() === date.toUnixMilliseconds();
	}
}
