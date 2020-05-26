# SimpleMailer Frontend

| Automation                | Status                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| CD/CI Pipeline (`master`) | ![CD/CI Workflow](https://github.com/SimoneStefani/simple-mailer-frontend/workflows/CD/CI%20Workflow/badge.svg)                                |
| Dependency Auditing       | ![Audit Workflow](https://github.com/SimoneStefani/simple-mailer-frontend/workflows/Audit%20Workflow/badge.svg)                                |
| Dependency Management     | [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=SimoneStefani/simple-mailer-frontend)](https://dependabot.com) |

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Project Details](#project-details)
  - [Dependencies](#dependencies)
  - [Code Style](#code-style)
  - [Security Analysis](#security-analysis)
  - [Continuous Integration](#continuous-integration)
  - [Continuous Deployment](#continuous-deployment)
  - [Project Architecture](#project-architecture)
  - [Observability](#observability)
- [Further Considerations](#further-considerations)

## About The Project

SimpleMailer Frontend is a web app written in [Typescript](https://www.typescriptlang.org) using [React](https://reactjs.org/) and [Material-UI](https://material-ui.com) as components framework. This project is built to work as a web interface for [SimpleMailer Backend](https://github.com/SimoneStefani/simple-mailer-backend). This application is a proof-of-concept and not expected to work in production.

## Getting Started

To get a local copy of this project up and running follow these steps.

1. Clone the repository:

```sh
git clone git@github.com:SimoneStefani/simple-mailer-frontend.git
```

2. Copy the `.env.example` configuration file and rename it `.env`. Fill the missing configuration values:

```sh
cp .env.example .env
```

3. Install all the JavaScript dependencies:

```sh
yarn install
```

4. Start the application:

```sh
yarn start
```

## Project Details

### Dependencies

The JavaScript dependencies are listed in the `package.json` file and can be easily updated with `yarn upgrade-interactive --latest`; in this way not only the `yarn.lock` but also the `package.json` is updated. This codebase contains configuration to run [Dependabot](https://dependabot.com/) monthly, automatically creating PRs for dependencies _bumps_. PRs for security updates in dependencies are immediately created.

### Code Style

This project uses [ESLint](https://eslint.org/) (and TSLint) in multiple environments and we suggest you to use it also during development. You can run the basic linting task with `yarn run lint`. While ESLint will find the style inconsistencies we use [Prettier](https://prettier.io/) to format the code according to well-accepted and unified style. This repository does only contain ESLint configuration (`.eslintrc`) and Prettier configuration (`.prettierrc`).

### Security Analysis

Yarn offers an [auditing tool](https://yarnpkg.com/lang/en/docs/cli/audit/) which scans the project dependencies for vulnerabilities in published CVE. This security verification is part of the continuous integration pipeline.

### Continuous Integration

This project uses GitHub Actions for continuous integration (CI) and deployment. The complete configuration can be found in `.github/workflows/cdci-workflow.yml`. Common steps in the CI process are building, linting and dependencies auditing. The developer will get promptly notified of failures of CI jobs.

### Continuous Deployment

This project is automatically deployed (CD) to Heroku by GitHub Actions. The deployment pattern is dependent on the Git branches in the way that code merged into a branch triggers a deployment of such branch to a specific environment. While this project currently provides only one environment (prod) this kind setup makes it easier to extend to multiple environments.

| Environment | Git Branch | Heroku App                                                                         |
| ----------- | ---------- | ---------------------------------------------------------------------------------- |
| Production  | `master`   | [simple-mailer-frontend](https://dashboard.heroku.com/apps/simple-mailer-frontend) |

In order to deploy to Heroku GitHub Actions make use of the `HEROKU_API_KEY` which is provided as a [secret](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) to the job.

### Project Architecture

This application reflects the standard React structure which is provided through the toolchain [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started). As a major design choice we try to use only functional components leveraging [React Hooks](https://reactjs.org/docs/hooks-intro.html) for local state handling. [react Context](https://reactjs.org/docs/context.html) is used to distribute global state (e.g. authentication details) to the app. Due to simple nature of this project the project is organized in a flat manner, only grouping pages (views) and components.

On top of React we use the [Material UI](https://material-ui.com/) component library which allows for a Google Material-like styling. We also follow the design choice of such library of styling components with a [CSS-in-JS approach](https://material-ui.com/styles/basics/). The project uses [Axios](https://github.com/axios/axios) as a JavaScript HTTP client to communicate with the backend.

### Observability

Heroku provides a [simple monitoring solution](https://devcenter.heroku.com/categories/monitoring-metrics) which is very valuable for simple projects such this one. On top of this we use [Sentry](https://sentry.io/) for error reporting and [Timber](https://timber.io/) for logs management. Such tools are accessible as Heroku add-ons.

## Further Considerations

- Forms and fields state is simply managed through component local state but would be nicer to use something more structured such as [Formik](https://github.com/jaredpalmer/formik) to simplify form handling
- Due to the limited development time this project doesn't implement any form schema/input validation which would be necessary for a production grade app and could be implemented through something like [Yup](https://github.com/jquense/yup).
- Security implementation is of moderate level but could be enhanced further both in the area of authentication (i.e. better token system) and of networking, for example by supporting HSTS.
- TypeScript could also be made stricter which is nice especially when working on a long living project (i.e. not a PoC) and in larger teams.
- Regarding scalability this application should perform quite well since this application is served as a static app from an Nginx proxy. The limit is simply the amount of dedicated resources on Heroku and for heavy traffic a solution such deployment on a Kubernetes cluster may be recommended.
