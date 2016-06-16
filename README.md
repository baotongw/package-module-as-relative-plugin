# package-module-as-relative-plugin
此插件支持以下的require写法

## Example
在fekit项目中，经常会加载本地相对路径下的文件，写法为
require('index')
require('index.js')
require('local/index')
require('local/index.js')

而这种写法在webpack以及node的常规require模式中是不支持的，如果遇到了开头是一个单词的require，那么会认为这里加载的是一个module，webpack会额外尝试使用resolve.extensions中配置的alias去替换再解析。所以以上的写法在所有支持的方法都找不到文件的时候就会throw error。

这个插件就是为了支持这种不规范的写法，在不改动现有代码的情况下兼容fekit项目代码。

## Usage

已经集成到了qwebpack-convert中，如果需要单独按照的话，先定位到项目根目录

npm install package-module-as-relative-plugin

在webpack.config.js中

var yourAliasName = require('package-module-as-relative-plugin');
在plugins配置节点数组中加入new yourAliasName()

模版地址：https://github.com/sdwangbaotong/qwebpack-convert/blob/master/templates/webpack.config.js