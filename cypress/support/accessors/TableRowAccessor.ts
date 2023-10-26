import {Accessor} from "./Accessor";
import {ButtonAccessor} from "./user-input/ButtonAccessor";
import {CheckboxAccessor} from "./user-input/CheckboxAccessor";
import {EButtonAccessor} from "./user-input/EButtonAccessor";


export class TableRowAccessor extends Accessor {

    public getButton(childSelector: EButtonAccessor = EButtonAccessor.default): ButtonAccessor {
        return ButtonAccessor.withParentSelector(this.selector, childSelector);
    }

    public getCheckbox(): CheckboxAccessor {
        return CheckboxAccessor.withParentSelector(this.selector, 'input[type="checkbox"]');
    }
}