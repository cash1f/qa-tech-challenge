const { test, expect } = require('@playwright/test');
const ContactFormPage = require('../pages/contactFormPage').default;

test.describe('Accredit-TechTest', () => {
    let contactFormPage;

    test.beforeEach(async ({ page }) => {
        contactFormPage = new ContactFormPage(page);
        await contactFormPage.openForm();
    });

    test('Validate error messages on missing data', async () => {
        await contactFormPage.submitForm();
        await contactFormPage.validateErrorMessages({
            name: 'Name is required.',
            email: 'Valid email is required.',
            company: 'Company name is required.',
            dob: 'Enter a valid date of birth (within the last 80 years).'
        });
    });

    test('Validate successful submission', async () => {
        await contactFormPage.fillForm({
            name: 'John Doe',
            email: 'john.doe@example.com',
            company: 'Test Company',
            dob: '1990-01-01',
            contactMethod: 'email'
        });
        await contactFormPage.submitForm();
        await contactFormPage.checkSuccessMessage('Form submitted successfully. You will hear a response in the next 3-5 working days.');
    });

    test('"Post" form submission with valid data', async () => {
        await contactFormPage.fillForm({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            company: 'Another Company',
            dob: '1985-07-15',
            contactMethod: 'post'
        });

        await expect(contactFormPage.addressFields).toBeVisible();
        await expect(contactFormPage.phoneFields).toBeHidden();
    });

    test('"Phone" form submission with invalid data', async () => {
        await contactFormPage.fillForm({
            name: 'Alex Smith',
            email: 'alex.smith@example.com',
            company: 'Tech Solutions',
            dob: '1995-03-10',
            contactMethod: 'phone',
            landline: '123456', // Invalid landline
            mobile: '07123456789' // Valid mobile
        });

        await contactFormPage.submitForm();
        await contactFormPage.validateErrorMessages({
            landline: 'Valid UK landline is required.'
        });
    });

    test('"Phone" form submission with valid data', async () => {
        await contactFormPage.fillForm({
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            company: 'Digital World',
            dob: '1992-12-25',
            contactMethod: 'phone',
            landline: '02012345678',
            mobile: '07987654321'
        });
        await contactFormPage.submitForm();
        await contactFormPage.checkSuccessMessage('Form submitted successfully. You will hear a response in the next 3-5 working days.');
    });

    test('"Email" form submission with invalid data', async () => {
        await contactFormPage.fillForm({
            name: 'Some User',
            email: '123@123', // Invalid email format
            company: 'Company',
            dob: '1983-02-01',
            contactMethod: 'email'
        });
        await contactFormPage.submitForm();
        await contactFormPage.validateErrorMessages({
            email: 'Valid email is required.'
        });
    });
});