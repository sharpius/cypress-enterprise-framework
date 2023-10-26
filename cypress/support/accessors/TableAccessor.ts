import {Accessor} from "./Accessor";
import {TableRowAccessor} from "./TableRowAccessor";


export class TableAccessor extends Accessor {
	static override defaultSelector = () => 'table';
	public rowSelector = "table-row"
	public columnSelector = "table-column"
	public cellSelector = "table-cell"

	public sortByColumnHeader(columnHeader: string): Cypress.Chainable {
		return this.getElement().contains(columnHeader).click();
	};

	public getColumnByIndex(columnIndex: number): Cypress.Chainable {
		return this.getElement().find(`${this.rowSelector}-${columnIndex}`).then(($cells) => {
			return Cypress._.map($cells, ($c) => $c.innerText);
		});
	}

	public getCell(columnIndex: number, rowIndex: number): Cypress.Chainable {
		return this.getElement().find(`${this.rowSelector}-${rowIndex}`)
			.find(`div:nth-child(${columnIndex}) > ${this.cellSelector}`)
			.invoke('text')
			.then(text => text.trim());
	}

	public getNumberOfRecords(): Cypress.Chainable<number> {
		return this.getElement().find(this.rowSelector).then(rows => rows.length);
	}

	public getFirstRowWithValueInColumn(value: string, columnIndex: number): Cypress.Chainable<TableRowAccessor> {
		return this.getColumnByIndex(columnIndex).then((columnValues) => {

			const rowIndex = columnValues.findIndex(columnValue => columnValue === value);

			if (rowIndex === -1) {
				throw new Error(`Value '${value}' not found in column ${columnIndex}`);
			}

			const selector = `${this.rowSelector}-${rowIndex + 1}`;

			return TableRowAccessor.withSelector(selector);
		});
	}

	public getRowByIndex(index: number): TableRowAccessor {
		return TableRowAccessor.withParentSelector(this.selector, `${this.rowSelector}-${index}"`);
	}


	public getAllRows(): Cypress.Chainable<TableRowAccessor[]> {
		return this.getNumberOfRecords().then((numRows) => {
			const rows = [];
			for (let i = 0; i < numRows; i++) {
				rows.push(TableRowAccessor.withParentSelector(this.selector, `${this.rowSelector}-${i}"`));
			}
			return cy.wrap(rows);
		});
	}
}