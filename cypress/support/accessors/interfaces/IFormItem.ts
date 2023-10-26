import {Accessor} from "../Accessor";


export interface IFormItem {
    name: string;
    type: typeof Accessor;
    selector: string;
    isDefaultVisible?: boolean;
}