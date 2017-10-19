const NODE_ENV = process.env.NODE_ENV;
/*冠霆佩克喔!!*/
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function htmlPack(sets, extractSet)
{
    var extract = new ExtractTextPlugin(extractSet);
    var extractLess = new ExtractTextPlugin("css/[name].css");
    this.entry = cleanEntry(sets);
    this.output = sets.output;
    this.resolve = sets.resolve || {};
    let limitValue = sets.limitValue || 10000;
    this.module = {
        rules: [
        {
            test: /\.(html|ejs)$/,
            use: extract.extract(
            {
                use: [
                {
                    loader: "html-loader",
                    query:
                    {
                        interpolate: 'require',
                        attrs: ['img:src', 'audio:src', 'source:src', 'video:src']
                    }
                }]
            })
        },
        {
            test: /\.(png|jpg|JPG|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options:
            {
                limit: limitValue,
                name: '/public/imgs/[name].[ext]',
            }
        },
        {
            test: /\.(mp3|ogg|wav|mp4)$/,
            loader: 'file-loader',
            options:
            {
                limit: limitValue,
                name: '/public/audio/[name].[ext]',
            }
        },
        {
            test: /\.gthtml$/,
            use: ["html-loader"]
        },
        {
            test: /\.less$/,
            use: ["css-loader", "less-loader"]
        }]
    };
    this.plugins = [
        extract,
    ];
}

function jsPack(sets)
{
    this.entry = cleanEntry(sets);
    this.output = sets.output;
    this.resolve = sets.resolve ||
    {};
    this.plugins = [
        new webpack.BannerPlugin('沒看過冠霆JSPACK!?'),
    ];
    //可能之後會用到圖片的LOADER 還有ES6 紀錄 TODO
    this.module = {
        rules: [
        { // ES6
            test: /\.js$/,
            exclude: function(modulePath)
            {
                return /node_modules/.test(modulePath) &&
                    !/node_modules\/gt-games/.test(modulePath);
            },
            use:
            {
                loader: 'babel-loader',
                options:
                {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        },
        {
            test: /\.vue$/,
            loader: "vue-loader"
        }]
    };
}

function cssPack(sets, extractLessSet)
{
    var extractLess = new ExtractTextPlugin(extractLessSet);
    this.entry = cleanEntry(sets);
    this.output = sets.output;
    let limitValue = sets.limitValue || 10000;
    this.module = {
        rules: [
        {
            test: /\.(png|jpg|JPG|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options:
            {
                limit: limitValue,
                name: '/public/imgs/[name].[ext]',
            }
        },
        {
            test: /\.less$/,
            use: extractLess.extract(
            {
                use: [
                {
                    loader: "css-loader"
                },
                {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            }),
        }]
    };
    this.resolve = sets.resolve || {};
    this.plugins = [
        extractLess,
        new webpack.BannerPlugin(''),
    ];
}

class tsPack
{
    constructor(sets)
    {
        this.entry = cleanEntry(sets),
            this.output = sets.output;
        this.resolve = {
            // Add '.ts' and '.tsx' as a resolvable extension.
            extensions: ['.ts', '.tsx', '.js']
        };
        this.module = {
            loaders: [
                // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader?" + JSON.stringify(
                    {
                        configFile: process.cwd() + '/tsconfig.webpack.json'
                    })
                }
            ]
        };
    }
}

var check = {
    html: function(gtSet)
    {
        return new htmlPack(
        {
            entry: gtSet.html,
            output:
            {
                filename: '[name].html',
                path: gtSet.html.dirName || gtSet.dirName,
            }
        },
        {
            filename: '[name].html',
        });
    },
    ejs: function(gtSet)
    {
        return new htmlPack(
        {
            entry: gtSet.ejs,
            output:
            {
                filename: '[name].ejs',
                path: gtSet.ejs.dirName || gtSet.dirName,
            }
        },
        {
            filename: '[name].ejs',
        });
    },
    css: function(gtSet)
    {
        return new cssPack(
        {
            entry: gtSet.css,
            output:
            {
                filename: 'css/[name].css',
                path: gtSet.css.dirName || gtSet.dirName,
            }
        },
        {
            filename: 'css/[name].css',
        });
    },
    js: function(gtSet)
    {
        return new jsPack(
        {
            entry: gtSet.js,
            output:
            {
                filename: 'js/[name].js',
                path: gtSet.js.dirName || gtSet.dirName,
            },
            resolve: gtSet.js.resolve
        });
    },
    ts: function(gtSet)
    {
        return new tsPack(
        {
            entry: gtSet.ts,
            output:
            {
                filename: 'js/[name].js',
                path: gtSet.ts.dirName || gtSet.dirName,
            }
        });
    }
};

function GuanTing(gtSet)
{
    var out = [];
    for (var x in gtSet)
    {
        try
        {
            if (x != 'dirName')
            {
                console.log(x);
                out.push(check[x](gtSet));
            }
        }
        catch (e)
        {
            console.log('e04: ' + e);
            continue;
        }
    }
    return out;
}

function cleanEntry(sets)
{
    let set = {};
    for (let s in sets.entry)
    {
        if (s === 'dirName' || s === 'resolve' || s === 'ext') continue;
        set[s] = sets.entry[s];
    }
    return set;
}

function noder(packs)
{
    let output = [];
    for (var i = 0; i < packs.length; i++)
    {
        output = output.concat(packs[i]);
    }
    return output;
}

module.exports = GuanTing;
module.exports.css = cssPack;
module.exports.js = jsPack;
module.exports.html = htmlPack;
module.exports.GuanTing = GuanTing;
module.exports.noder = noder;