const webpack = require('react-scripts/config/webpack.config')
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    //Customize the webpack configuration here.
    config.resolve.fallback = {
        ...config.resolve.fallback,
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        asset: require.resolve('assert'),
    };

    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ];
    return config;
}
module.exports = {}