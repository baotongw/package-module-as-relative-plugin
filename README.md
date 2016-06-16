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

Ok，就是这样