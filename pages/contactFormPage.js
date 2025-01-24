import { expect } from '@playwright/test';

const FORM_URL = 'file://' + __dirname + '/../QAExerciseNew.html'; //to access the local html file

class ContactFormPage {
    constructor(page) {
        this.page = page;

        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.companyInput = page.locator('#company');
        this.dobInput = page.locator('#dob');
        this.contactMethodDropdown = page.locator('#contactMethod');
        this.phoneFields = page.locator('#phoneFields');
        this.addressFields = page.locator('#addressFields');
        this.submitButton = page.locator('button[type="submit"]');
        this.successMessage = page.locator('.toast-message');

        // Error messages locators from the html file
        this.errors = {
            name: page.locator('#nameError'),
            email: page.locator('#emailError'),
            company: page.locator('#companyError'),
            dob: page.locator('#dobError'),
            landline: page.locator('#landlineError'),
            mobile: page.locator('#mobileError')
        };
    }

    async openForm() {
        await this.page.goto(FORM_URL); 
        await this.page.click('text=Open Contact Form');
    }

    async fillForm({ name, email, company, dob, contactMethod, landline, mobile }) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.companyInput.fill(company);
        await this.dobInput.fill(dob);
        await this.contactMethodDropdown.selectOption({ value: contactMethod });

        if (contactMethod === 'phone') {
            await this.phoneFields.waitFor();
            await this.page.fill('#landline', landline);
            await this.page.fill('#mobile', mobile);
        } else if (contactMethod === 'post') {
            await this.addressFields.waitFor();
        }
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async validateErrorMessages(expectedErrors) {
        for (const [field, message] of Object.entries(expectedErrors)) {
            if (message) {
                await expect(this.errors[field]).toHaveText(message);
            }
        }
    }

    async checkSuccessMessage(expectedText) {
        await expect(this.successMessage).toHaveText(expectedText);
    }
}

export default ContactFormPage;