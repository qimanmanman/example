var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var LIB_PATH = path.resolve(ROOT_PATH, 'lib');
console.log(APP_PATH);
console.log(APP_PATH);

module.exports = {
    entry: APP_PATH,
    output: {
        path: ROOT_PATH,
        filename: 'bundle.js'
    },
    module: {
    	perLoaders: [
	        {
	            test: /\.jsx?$/,
	            include: APP_PATH,
	            loader: 'jshint-loader'
	        }
	    ],
	    loaders: [
	        {
		        test: /\.css$/,
		        loaders: ['style', 'css'],
		        include: [
			      APP_PATH,
			      LIB_PATH
			    ],
		    },
		    {
		        test: /\.jsx?$/,
		        loader: 'babel',
		        include: APP_PATH,
		        query: {
		          presets: ['es2015']
		        }
		    },
		    {
		        test: /\.(png|jpg)$/,
		        loader: 'url?limit=40000'
		    },
		    {
		        test: /\.js$/, 
			    exclude: /node_modules/, 
			    loader: "babel", 
			    include: [
			      APP_PATH,
			      LIB_PATH
			    ],
			    query: {
			        presets:['react']
			    }
		    },
		    {
		        test: /\.html$/,
		        loader: "file?name=[name].[ext]"
		    }
	    ]
	},
	resolve: {
        extensions: ['', '.js', '.json', '.coffee', '.jsx']
    },
	devtool: 'eval-source-map',
	jshint: {
	  	"esnext": true
	}
}