import {IFormItem} from "./IFormItem";


export interface IForm {
	[key: string]: IFormItem;
}