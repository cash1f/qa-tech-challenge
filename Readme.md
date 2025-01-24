# Accredit Solutions - QA Tech Challenge
## Submitted by Syed Haider

This guide explains how to set up and execute the test suite which uses Playwright (JavaScript)


## **1. Prerequisites**

### 1.1. Install Dependencies

Ensure you have the following installed on your machine:

- **Node.js** (LTS version as JavaScript is used as the scripting language)
- **Playwright**: Installed as part of the project dependencies.

### 1.2. Install Project Dependencies

Run the following command in the project directory to install Playwright and other dependencies:

```
npm install
```

## **2. Running the Tests**

To execute the tests, use any of the following command:

```
npx playwright test
or
npx playwright test --reporter=html
or
npx playwright test --ui
```

This will run all test files (all the test cases are in a single .spec.js file) in the `tests` directory.

### **2.1. Viewing Test Results**

- **Command Line**: Test results will appear in the terminal when "npx playwright test" used.
- **HTML Report**: To view a detailed report, run the following if "npx playwright test --reporter=html" were used:
  ```
  npx playwright show-report
  ```

## **3. Explanation of Files**

### **3.1. `pages\contactFormPage.js`** (Page Object Model)

It makes sure that modular and maintainable test code by separating UI interactions from test logic and making any future changes will be easier to maintain.

### **3.2. `tests\contact-form.spec.js`** (Test Suite)

This file contains 6 test cases for now.

### **3.3. `bug-reports\Accredit QA Exercise - Bug report.docx`** (Test Suite)

This file contains a few of the bugs being detected.

