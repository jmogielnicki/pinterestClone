 var webpack = require('webpack');

module.exports = {
    entry: "./public/scripts/app.js",
    output: {
        path: './public/lib',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style!css" },
            {
                // Test for js or jsx files.
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:
                    {
                        presets:['react']
                    }
            }
        ]
    },
    externals: {
        // Don't bundle the 'react' npm package with the component.
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        // Include empty string '' to resolve files by their explicit extension
        // (e.g. require('./somefile.ext')).
        // Include '.js', '.jsx' to resolve files by these implicit extensions
        // (e.g. require('underscore')).
        extensions: ['', '.js', '.jsx']
    }
};