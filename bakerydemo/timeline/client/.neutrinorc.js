// timeline/client/.neutrinorc.js
const airbnb = require('@neutrinojs/airbnb');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb(),
    reactComponents({
      /** Change options related to starting a webpack-dev-server
       * https://webpack.js.org/configuration/dev-server/#devserverproxy
       * Proxy requests to /api to Wagtail local Django server
       */
      devServer: { proxy: { '/api': 'http://localhost:8000' } },
    }),
    jest(),
    /**
     * Ensure that react is read from global - and webpack-node-externals is NOT used.
     *
     * By default the react-components plugin uses webpack-node-externals to build
     * the externals object. This will simply get all dependencies and assume they are
     * external AND assume that requirejs is used.
     *
     * However, for a web usage, we want only some external dependencies set up and
     * want them to read from global (aka root), hence we map the 'react' import to 'React' global.
     * See:
     * 
     * https://www.npmjs.com/package/webpack-node-externals
     * https://webpack.js.org/configuration/externals/#externals
     */
    neutrino => {
      neutrino.config.when(process.env.NODE_ENV === 'production', config => {
        config.externals({ react: 'React' });
      });
    },
  ],
};