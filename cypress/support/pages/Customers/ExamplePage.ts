import {BasePage} from "../BasePage";
import {ButtonAccessor} from "../../accessors/user-input/ButtonAccessor";
import {InputboxAccessor} from "../../accessors/user-input/InputboxAccessor";
import {DropdownAccessor} from "../../accessors/user-input/DropdownAccessor";
import {TableAccessor} from "../../accessors/TableAccessor";

export class ExamplePage extends BasePage {
    submitButton = ButtonAccessor.withSelector("super-selector1");
    nameInputbox = InputboxAccessor.withSelector("super-selector2");
    genderDropdown = DropdownAccessor.withSelector("super-selector3");
    customersTable = TableAccessor.withDefaultSelector();

    constructor() {
        super();
        this.url = "www.dominiksAwesomePage.com"
    }
}