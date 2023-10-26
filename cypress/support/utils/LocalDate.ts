export class LocalDate {
	private date: Date;

	constructor(date?: Date) {
		this.date = date || new Date();
	}

	static parseByFormat(format: string, dateString: string): Date {
		const formatParts = format.split(/[-/.: ]/);
		const dateParts = dateString.split(/[-/:. ]/);

		let year, month, day, hours = 0, minutes = 0;

		for (let i = 0; i < formatParts.length; i++) {
			switch (formatParts[i]) {
				case 'DD':
					day = Number(dateParts[i]);
					break;
				case 'MM':
					month = Number(dateParts[i]);
					break;
				case 'YYYY':
					year = Number(dateParts[i]);
					break;
				case 'HH':
					hours = Number(dateParts[i]);
					break;
				case 'mm':
					minutes = Number(dateParts[i]);
					break;
			}
		}

		return new Date(year, month - 1, day, hours, minutes);
	}

	toDate(): Date {
		return this.date;
	}

	now(): this {
		this.date = new Date();
		return this;
	}

	addDays(days: number): this {
		this.date.setDate(this.date.getDate() + days);
		return this;
	}

	subtractDays(days: number): this {
		return this.addDays(-days);
	}

	addMonths(months: number): this {
		this.date.setMonth(this.date.getMonth() + months);
		return this;
	}

	subtractMonths(months: number): this {
		return this.addMonths(-months);
	}

	getCurrentYear(): number {
		return this.date.getFullYear();
	}

	getCurrentMonth(): number {
		return this.date.getMonth();
	}

	getCurrentDay(): number {
		return this.date.getDate();
	}

	getFirstDayOfMonth(): Date {
		return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
	}

	getLastDayOfMonth(): Date {
		let nextMonth = this.date.getMonth() + 1;
		return new Date(this.date.getFullYear(), nextMonth, 0);
	}

	/**
	 * @returns String in YYYY-MM-DD format.
	 */
	toDateIsoString(): string {
		return this.date.toISOString()
			.split('T')[0];
	}

	/**
	 * @returns String in YYYY-MM-DD HH:MM:SS format.
	 */
	toDateTimeString(): string {
		return this.date.toISOString()
			.replace('T', ' ')
			.split('.')[0];
	}

	toTimeString(): string {
		return this.date.toTimeString()
			.split(' ')[0];
	}

	toLocaleDateString(locales: Intl.LocalesArgument = "DE-de", options?: Intl.DateTimeFormatOptions) {
		return this.date.toLocaleDateString(locales, options);
	}

	toLocaleString(locales: Intl.LocalesArgument = "DE-de", options?: Intl.DateTimeFormatOptions) {
		return this.date.toLocaleString(locales, options);
	}
}
