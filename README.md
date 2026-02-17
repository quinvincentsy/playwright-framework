# Playwright Automation Framework

This is a Playwright automation framework using TypeScript.

## Preconditions

Before running the project, make sure you have installed:

- VS Code (or any code editor)
- Node.js and npm
- Git
- TypeScript (if using TypeScript)
- Playwright

## How to Clone

```bash
git clone https://github.com/quinvincentsy/playwright-framework.git
cd playwright-framework

Install Dependencies
npm install
npx playwright install

npm install installs all project dependencies.
npx playwright install installs the required browsers.

Run Test (UI)
npm run test:ui-mode

Project Structure:
playwright-automation/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
│
├── tests/
│   ├── api/
│   │   └── login.api.spec.ts
│   │
│   └── ui/
│       └── login.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
│
├── fixtures/
│   └── users.json
│
└── utils/
    └── apiClient.ts
