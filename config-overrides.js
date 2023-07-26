const { override } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = override(
    // Add customizations here
    (config, env) => {
        // Enable production mode for better optimizations
        // config.mode = 'production';
// Update Webpack configuration to enable stats.children
        config.stats = {
            children: true,
        };
        // Add necessary fallbacks to support browserify modules
        config.resolve.fallback = {
            ...config.resolve.fallback,
            process: require.resolve('process/browser'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
            buffer: require.resolve('buffer'),
            assert: require.resolve('assert'), // Use 'assert' instead of 'asset'
            url: require.resolve('url'), // Use 'url' instead of 'url/'
        };

        // Add the TerserPlugin to compress and minify the JavaScript code
        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.* statements in production
                    },
                    keep_classnames: true,
                    keep_fnames: true,
                },
                parallel: true, // Enable parallel processing for better build speed
            }),
            new CssMinimizerPlugin(), // Add the plugin for CSS minification
        ];
        // Add React Fast Refresh plugin for development
        if (env === 'development') {
            // Add any development-specific configurations here
        }

        // Update Webpack Dev Server configuration with the 'before' function
        if (env === 'development') {
            config.devServer = {
                ...config.devServer,
                before: (app, server, compiler) => {
                    // Add any development-specific middleware here
                },
            };
        }

        return config;
    }
);



