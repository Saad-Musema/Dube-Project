CI Workflow for Dube Project

This GitHub Actions workflow automates key development checks for Dube Project. It runs on all pushes and pull requests to main and redo branches, ensuring code quality and dependency security.
Workflow Summary

File Location: .github/workflows/test-server.yml
Triggers

    Push: Triggers on any push to main or redo.
    Pull Request: Triggers on pull requests to main or redo.

Job Overview: build

Runs on ubuntu-latest with the following steps:

    Checkout Code
        Pulls the latest code using actions/checkout@v4.

    Set Up Node.js
        Installs Node.js (20.x) with actions/setup-node@v4.

    Install Dependencies
        Installs project dependencies in ./server directory.

    Fix Vulnerabilities
        Runs npm audit fix --force to address vulnerabilities.

    Show Secrets (Debug)
        Prints the MONGO_URL secret (for debugging).

    Run ESLint
        Executes ESLint using eslint.config.mjs in ./server to ensure code quality.

Key Notes

    Node.js Compatibility: Currently runs on Node.js version 20.x.
    ESLint Configuration: Make sure eslint.config.mjs is present in ./server and set up for ESLint v9+.
    Secrets Management: Define MONGO_URL and other secrets in repository settings.

This CI workflow helps maintain code quality, security, and consistency in Dube Project.
