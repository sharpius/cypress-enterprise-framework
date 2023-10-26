import {BaseApi} from "../BaseRestApi";

export class ExampleApi extends BaseApi {
    private customersPath: string = "/api/customers"

    interceptCustomersRequest() {
        return this.interceptAndWait('GET', this.customersPath, "GetAllCutomers");
    }
    getCustomers(queryParams?: Record<string, string | number | boolean>) {
        return this.getRequest(this.customersPath + this.buildQueryString(queryParams));
    }
    postCustomers(requestBody: any) {
        return this.postRequest(this.customersPath, requestBody)
    }
}
