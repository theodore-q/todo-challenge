# True layer Todo app with history

A responsive SPA to do app for True Layer. A working demo can be found here: https://true-layer-todo-list.herokuapp.com/ (the free teir may take a little longer to load)

## Getting Started

This repo has two build modes production and development. It also comes with a development server.

### Installing

Install dependencies:

```
yarn install
```

### Running the dev server (Quick Start)

Get your development enviroment up and running quickly:

```
yarn run start-dev
```

### Running the dev build

Build a dev version of the site with source maps:

```
yarn run build-dev
```

### Running the production build

Build a production ready bundle

```
yarn run build
```

## Running the tests

Run the tests:

```
yarn run test
```

## Deployment

Whilst not used in the project, this project is compatible with the create-react-app buildpack.
Configure server to use the create app and depoloy.


## Potential for improvements

* Write the whole thing in typescript for legibility.
* Add react PropTypes
* Add icons from font awesome instead of text.
* Display how long a recording is and when it plays your progress.
* Add the ability to pause recording.
* Make name or description optional in each task list.
* If there is no recording hide the Play recording and Clear recording buttons.
