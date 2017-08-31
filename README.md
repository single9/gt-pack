GT Pack
======

簡介
-----

啊就一個 webpack 的通用使用整合包。

使用 Webpack 2.x，理論上可相容 3.x 版本。

安裝
-----

    npm install gt-pack

使用
-----

在 `webpack.config.js` 加入：

    const gtPack = require('gt-pack');

### 分別設定範例 ###

#### JS #### 

    module.exports = new gtPack.js(
    {
        entry:
        {
            index: '__dirname + '/js/index.js',
        },
        output:
        {
            filename: 'public/js/[name].js',
            path: __dirname + '/', 
        }
    });

#### TS ####

    module.exports = new gtPack.ts(
    {
        entry:
        {
            index: '__dirname + '/js/index.ts',
        },
        output:
        {
            filename: 'public/js/[name].js',
            path: __dirname + '/', 
        }
    });

在專案根目錄新增：`tsconfig.webpack.json`

    {
        "compilerOptions": {
            "removeComments": true,
            "sourceMap": true
        }
    }

    // 可以自由增加自己的設定

#### CSS #### 

    module.exports = new gtPack.css(
    {
        entry:
        {
            index: '__dirname + '/less/index.less'
        },
        output:
        {
            filename: 'public/style/[name].css',
            path: __dirname + '/', 
        }
    },
    {
        filename: 'public/style/[name].css',
    });

#### JS + CSS #### 

    // JS
    let js = new gtPack.js(
    {
        entry:
        {
            index: __dirname + '/js/index.js',
        },
        output:
        {
            filename: 'public/js/[name].js',
            path: __dirname, 
        }
    });

    // CSS
    let css = new gtPack.css(
    {
        entry:
        {
            index: __dirname + '/less/index.less'
        },
        output:
        {
            filename: 'public/style/[name].css',
            path: __dirname, 
        }
    },
    {
        filename: 'public/style/[name].css',
    });

    module.exports = [js, css];
    
    
### 整合設定 ### 

    let x = gtPack.GuanTing(
    {
        dirName: __dirname + '/views/output',   // 輸出位置
        html:
        {
            index: __dirname + '/dev/index.ejs',
            register: __dirname + '/dev/register.ejs'
        },
        css:
        {
            index: __dirname + '/dev/css/index.less',
            register: __dirname + '/dev/css/register.less',
        },
        js:
        {
            index: __dirname + '/dev/js/index.js',
            register: __dirname + '/dev/js/register.js',
        }
    });

    module.exports = x;
    
### ㄋㄡˋㄉㄜˊ 冠霆樹狀PACK ### 

這是一個樹狀節點版本的結構，讓`webpack`可以在不同的資料夾中有不同的設定。

    let noder = require('gt-pack').noder;
    let List = 
    [
        require('./dirA/webpack.config.js'),    //其他PACK
        require('./dirB/webpack.config.js'),     //其他PACK
    ];
    
    module.exports = noder(List);


