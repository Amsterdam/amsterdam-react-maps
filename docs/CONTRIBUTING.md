# Contributing

## Development

1. Run `yarn` to install dependencies
2. Run `yarn build` to build the packages required by Storybook.
3. `yarn start` this will start storybook
4. Start `yarn build:ts:es --watch` in another terminal if you want to make changes to components in the `packages` directory.

Note that we have several packages: 
1. [`stories`](stories), which contains our 'recipes' in MDX format that will display in Storybook. If you need to create a story, mind that you're supposed to create a page per feature / functionality.
In case you first want to showcase a feature's functionality, but don't want users to use this yet, make sure you add this to the example's description (eg. adding "Prototype*") 
2. [`arm-core`](packages/arm-core), where we can export our compound-components / utilities / configurations for amsterdam-specific map-related projects. 
Please keep in mind that we strive to create components / utilities / configurations as generic as possible!
3. We have some other seperate packages for components that require other leaflet dependencies: 
 - [`arm-cluster`](packages/arm-cluster): Marker clustering component, useful when you need to show a lot of markers
 - [`arm-draw`](packages/arm-draw): A small tool that allows you to draw polygons or polylines
 - [`arm-nontiled`](packages/arm-nontiled): For when you need to render a non-tiled layer

Use npm link to link [ASC](https://github.com/Amsterdam/amsterdam-styled-components) or [react-maps](https://github.com/Amsterdam/react-maps) (please read [this](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).). From your either of your the packages, link leaflet and react to this package, for example: `npm link ../amsterdam-react-maps/node_modules/react && npm link ../amsterdam-react-maps/node_modules/leaflet`

## Troubleshooting

Sometimes you either can't build the project or run tests properly. Usually this is due to the fact
that a package is updated or you're not using the right node version. Please check if this is the
case. Otherwise just run this command (if you are using nvm):
`rm -Rf node_modules && nvm install --lts && nvm alias default --lts && yarn cache clean && yarn`

Still having trouble? Contact one of our [core maintainers](https://github.com/Amsterdam/amsterdam-react-maps/tree/master/docs/MAINTAINERS.md)
