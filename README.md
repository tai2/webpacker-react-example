# Webpacker 3 modern front-end example todo app

## Dependency

* [Rails 5.2](http://guides.rubyonrails.org/5_2_release_notes.html)
* [Webpacker 3.5.5](http://weblog.rubyonrails.org/2017/8/30/webpacker-3-0/)

## Features

* **No Sprockets**. Using webpacker for overall asset management.
* Both [React](https://reactjs.org/) client app and normal Rails MVC.
* Full npm support for [sprinkles](http://guides.rubyonrails.org/working_with_javascript_in_rails.html) including `import` statement.
* CSRF protection for API call.
* Add hash suffix to static asset filenames for production(cache-buster).
* Apply [bootstrap](http://getbootstrap.com/) CSS both server and client side.
* [TypeScript](https://www.typescriptlang.org/index.html) support for sprinkles and client app.
* Flux for client architecture using React [Redux](http://redux.js.org/) with static type checking.
* Using [CSS Modules](https://glenmaddern.com/articles/css-modules) for client compoents styling.
* Faster UI development using [Storybook](https://storybook.js.org/).
* Simple API and comprehensive message for assertion by [power-assert](https://github.com/power-assert-js/power-assert).
* Component testing written by TypeScript using [mocha](https://mochajs.org/) and [enzyme](https://github.com/airbnb/enzyme).
* Automatic code formatting using [pretteir](https://github.com/prettier/prettier)
* Static code analysis using [TSLint](https://palantir.github.io/tslint/)
* Code size analysis using [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).
* Using [lodash](https://lodash.com/) and just actually imported functions are bundled by webpack's tree-shaking.
* Using [Babel](https://babeljs.io/) to  transpile esnext.
* [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/) for development.

## Out of the scope

* Server side rendering
* Client side routing

## How to run

```
yarn install
bundle install
bin/rails db:setup
bin/rails db:migrate
foreman start
```

Then open http://localhost:3000/

## How to deploy

Run webpacker to build.

```
RAILS_ENV=production bin/rails webpacker:compile
```

Then compiled assets will be generated to `public/packs/`.
Copy these files to public directory and run server.

## Run client side unit tests

```
yarn test
```

## Show storybook client UI catalog

```
yarn storybook
```

## Run client code formatting

```
yarn prettier
```

## Run client code lint

```
yarn lint
```

## Bundle size analysis

`public/packs/report.html` is generated after build finished.
