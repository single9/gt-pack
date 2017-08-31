var gtPack = require('./gtPack.js');


var html = new gtPack.js(
{
    entry:
    {
        main: './pack/js/main.js',
    },
    output:
    {
        filename: '[name].js',
        path: __dirname + '/www', 
    }
},
{
    filename: '[name].html',
});


// js 獨立
var js = new gtPack.js(
{
    entry:
    {
        main: './pack/js/main.js',
    },
    output:
    {
        filename: 'public/js/[name].js',
        path: __dirname + '/www', 
    }
});

// CSS 獨立
var css = new gtPack.css(
{
    entry:
    {
        main: './pack/style/style.less',
        workMode: './pack/style/workMode.less',
    },
    output:
    {
        filename: 'public/style/[name].css',
        path: __dirname + '/www', 
    }
},
{
    filename: 'public/style/[name].css',
});
module.exports = [js, css];
