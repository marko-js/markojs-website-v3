markojs.com source code
=======================

[![Greenkeeper badge](https://badges.greenkeeper.io/marko-js/markojs-website-v3.svg)](https://greenkeeper.io/)

# Running locally

```
git clone https://github.com/marko-js/markojs.com
cd markojs.com
npm install
npm start
```

Then visit: `http://localhost:8080/`

[browser-refresh](https://github.com/patrick-steele-idem/browser-refresh) is also supported for instant page refreshes:

```
browser-refresh
```

The documentation is pulled from the [marko](https://github.com/marko-js/marko) and [marko-widgets](https://github.com/marko-js/marko-widgets) modules that are npm installed with this project. Specifically:

- `node_modules/marko/docs`
- `node_modules/marko-widgets/docs`

If you want, you can `npm link` those modules into this project:

```
npm link marko
npm link marko-widgets
```

# Production preview

```
npm run preview
```

This will do a production build and start a local HTTP server.

To preview the production build, visit: `http://localhost:8080/`

# Production publish

Make sure the following Github repo is in a sibling directory to this project:

```
cd ../
git clone https://github.com/marko-js/marko-js.github.io
```

Then run the `npm run publish` command which will do a build and copy the files over to `../marko-js.github.io` and then finally do a `git push origin master`.

```
npm run publish
```