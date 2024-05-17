## UI Automated Test Task:

This repository contains automated UI tests for the provided task.

## Pre-requisites:

Node.js 18+

## Running Tests Locally

### Clone this repository:

```bash
https://github.com/mendi-J/ui_test_playwright.git
```

### Navigate to the project directory:

`bash cd ui_test_playwright `

### Install Dependencies:

```bash
npm install
```

### Run Tests:

To run the tests, execute the following command.

```bash
npx playwright test
```

This command will run, generate, and open the test report in your default browser.

### Generate report:

The report is generated using the default playwright reporter. To view the report, run the following command.

```bash
npx playwright show-report
```

### Running Tests in GitHub Action CI/CD Pipeline:

GitHub Actions is used for the pipeline configuration. The event trigger is configured to run the automated test using GitHub Actions triggered on every push to the repository.
To run the test, make a push to the repository, and the pipeline will be triggered and start running automatically.
To monitor or check the status of the pipeline runs, click on the **Actions** tab to see the workflow.

### Author:

| Name           | GitHub   | LinkedIn       |
| -------------- | -------- | -------------- |
| Ndifreke Jacob | @Mendi-J | Ndifreke Jacob |

```

```
