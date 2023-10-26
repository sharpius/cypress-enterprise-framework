import {UserInputAccessor} from "./UserInputAccessor";

export class CheckboxAccessor extends UserInputAccessor {
    static override defaultSelector = () => 'input[type="checkbox"]';
}