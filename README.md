# Amsterdam React Maps

A repo with components / utilities to be used in projects published by [Amsterdam](https://github.com/Amsterdam).
It also contains an "stories" directory where we put so-called "recipes" that developers at Amsterdam can basically copy/paste in their own projects

[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/Amsterdam/amsterdam-react-maps.svg?branch=master)](https://travis-ci.org/Amsterdam/amsterdam-react-maps)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

[This is the link to the demo site with examples](https://amsterdam.github.io/amsterdam-react-maps)

## Motivation

Currently we have a few applications that use leaflet with own developed components. The problem with this approach is that it's unable to share certain components / logic.
Because we know we cannot create a one-size-fits-all leaflet application, we decided to create this repo that serves two responsibilities:

1. Inspecting examples of implementations, so these can simply be copied to the user's project
2. Providing compound-components / utilities / configurations for amsterdam-specific projects, so these can be maintained on one place: this repo.

## Usage

- With npm: `npm install --save @datapunt/arm-core`
- With yarn: `yarn add @datapunt/arm-core`

## Docs

- [Getting Started](./docs/GETTING_STARTED.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Changelog](./docs/CHANGELOG.md)
- [Maintainers](./docs/MAINTAINERS.md)
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
