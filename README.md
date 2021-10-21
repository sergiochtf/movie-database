# The Movie Database

We will have to create an application to show a catalog of films using [The Movie Database API][movie-database].

## Description / Architecture

I have decided to go with _Vue_ and _Nuxt_ to solve this challenge.

## Prerequisites

- Node version v12.19.0 or higher.
- npm version 7.0.15 or higher.

## Development

To develop on this application is necessary run firt the following command to install all the dependencies:

```bash
$ npm install

```

After that, we can run the application on develop mode using the following command:

```bash
# serve with hot reload at localhost:3000
$ npm run dev
```

## Deployment

To deploy the application as static site is necessary run:

```bash
# generate static project
$ npm run generate

```

And then a folder with the name dist will be created and it's already to deploy in AWS S3, Nextify or wherever you want deploy it.

## Testing

### Unit-tests

The project is configured to use the jest framework for unit-tests and coverage for test coverage reports.

```bash
$ npm run test
```

## Documentation

### JSDoc

The project is configured to use the jsdoc framework to create the code's documentation. As requirement is necessary to have installed `jsdoc` as global package:

```bash
$ npm install -g jsdoc
```

To generate the documentation run:

```bash
$ npm run docs
```

The documentation generated will be under the folder `out`

## TODOs

- The detailed film view should contain information about the main cast (max. 10 members). It should include their name and one image.
- The detailed film view should contain a list of all movie reviews paginated. The reviews should include the following information:
  - Username
  - Rating
  - Content
  - Created at date
- Add SonarQube to check the test coverage and the quality
- Improvement the simple search method.


[movie-database]: https://www.themoviedb.org/
