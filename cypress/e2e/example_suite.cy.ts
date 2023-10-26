import {Database} from "../support/database/Database";
import {ExamplePage} from "../support/pages/Customers/ExamplePage";
import {ExampleApi} from "../support/rest-api/example-rest-api/ExampleApi";

describe("example suite", {}, () => {

    it("Working with database TC", {tags: 'smoke'}, () => {
        Database.exampleDatabase.selectCustomer("123456").then(customerNumber =>{
            // Do something with customer number
        });
    });

    it("Working with page objects", {tags: 'regression'}, () => {
        const examplePage = new ExamplePage();
        examplePage.visit().waitForLoad();

        examplePage.nameInputbox.fill("Gandalf");
        examplePage.genderDropdown.open().getOptionByText("Male").click();
        examplePage.submitButton.click();
        examplePage.customersTable.getColumnByIndex(4).then(column => {
            // Do something with column...
            expect(column).to.contain("Gandalf");
        });
    });

    it("Working with REST API", {tags: ['smoke', 'regression']}, () => {
        const exampleApi = new ExampleApi();

        /**
         * GET request example
         */
        exampleApi.getCustomers().then(response => {
            // Do something with response...
            expect(response.statusCode).to.deep.equal(200);
        });

        /**
         * POST request example
         */
        const customerBody = {
            id: 123123,
            firstName: "Joseph",
            lastName: "Samson"
        }
        exampleApi.postCustomers(customerBody).its("statusCode").should("equal", 200);


        /**
         * Request interception example
         */
        const examplePage = new ExamplePage();
        const customerInterception = exampleApi.interceptCustomersRequest(); // In this point Cypress start to intercepting Customer request
        examplePage.visit().waitForLoad();

        // Here we expect that page will call customers endpoint

        customerInterception.wait().then(interception =>{
            expect(interception.response.statusCode).to.deep.equal(200);
        })
    });
});