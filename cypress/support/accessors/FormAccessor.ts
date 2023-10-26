import {ButtonAccessor} from "./user-input/ButtonAccessor";
import {CheckboxAccessor} from "./user-input/CheckboxAccessor";
import {DropdownAccessor} from "./user-input/DropdownAccessor";
import {InputboxAccessor} from "./user-input/InputboxAccessor";
import {SelectboxAccessor} from "./user-input/SelectboxAccessor";
import {IForm} from "./interfaces/IForm";
import {Accessor} from "./Accessor";
import {LabelAccessor} from "./LabelAccessor";
import {TableAccessor} from "./TableAccessor";
import {IFormItem} from "./interfaces/IFormItem";

export class FormAccessor extends Accessor {

    buttons: Record<string, ButtonAccessor> = {};
    inputBoxes: Record<string, InputboxAccessor> = {};
    dropdowns: Record<string, DropdownAccessor> = {};
    listboxes: Record<string, SelectboxAccessor> = {};
    checkboxes: Record<string, CheckboxAccessor> = {};
    labels: Record<string, LabelAccessor> = {};
    tables: Record<string, TableAccessor> = {};


    public withDefinition(definition: IForm): this {
        // iterate through the form definition
        Object.keys(definition).forEach(key => {
            const formItem: IFormItem = definition[key];
            switch (formItem.type) {
                case ButtonAccessor:
                    this.addButtonAccessor(formItem);
                    break;
                case LabelAccessor:
                    this.addLabelAccessor(formItem);
                    break;
                case InputboxAccessor:
                    this.addInputboxAccessor(formItem);
                    break;
                case DropdownAccessor:
                    this.addDropdownAccessor(formItem);
                    break;
                case SelectboxAccessor:
                    this.addListboxAccessor(formItem);
                    break;
                case CheckboxAccessor:
                    this.addCheckboxAccessor(formItem)
                    break;
                case TableAccessor:
                    this.addTableAccessor(formItem)
                    break;
                default:
                    throw new Error(`Invalid component type: ${formItem.type}`);
            }
        });
        return this;
    }

	private addButtonAccessor(item: IFormItem) {
        this.buttons[item.name] = ButtonAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.buttons[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

    private addInputboxAccessor(item: IFormItem) {
        this.inputBoxes[item.name] = InputboxAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.inputBoxes[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

	private addDropdownAccessor(item: IFormItem) {
        this.dropdowns[item.name] = DropdownAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.dropdowns[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

	private addListboxAccessor(item: IFormItem) {
        this.listboxes[item.name] = SelectboxAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.listboxes[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

	private addCheckboxAccessor(item: IFormItem) {
        this.checkboxes[item.name] = CheckboxAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.checkboxes[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

    private addLabelAccessor(item: IFormItem) {
        this.labels[item.name] = LabelAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.labels[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

    private addTableAccessor(item: IFormItem) {
        this.tables[item.name] = TableAccessor.withSelector(`${this.selector} ${item.selector}`);
        if (item.isDefaultVisible != null) {
            this.tables[item.name].withDefaultVisibility(item.isDefaultVisible);
        }
    }

    public getButton(name: string): ButtonAccessor {
        return this.buttons[name];
    }


    public getAllButtons(): Record<string, ButtonAccessor> {
        return this.buttons;
    }

    public getInputbox(name: string): InputboxAccessor {
        return this.inputBoxes[name];
    }

    public getAllInputboxes(): Record<string, InputboxAccessor> {
        return this.inputBoxes;
    }

    public getDropdown(name: string): DropdownAccessor {
        return this.dropdowns[name];
    }

    public getAllDropdowns(): Record<string, DropdownAccessor> {
        return this.dropdowns;
    }

    public getListbox(name: string): SelectboxAccessor {
        return this.listboxes[name];
    }

    public getAllListboxes(): Record<string, SelectboxAccessor> {
        return this.listboxes;
    }

    public getCheckbox(name: string): CheckboxAccessor {
        return this.checkboxes[name];
    }

    public getAllCheckboxes(): Record<string, CheckboxAccessor> {
        return this.checkboxes;
    }

    public getLabel(name: string): LabelAccessor {
        return this.labels[name];
    }

    public getAllLabels(): Record<string, LabelAccessor> {
        return this.labels;
    }

    public getTable(name: string): TableAccessor {
        return this.tables[name];
    }

    public getAllTables(): Record<string, TableAccessor> {
        return this.tables;
    }
}
