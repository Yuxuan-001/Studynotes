# webpack

## 官方解释

从本质上来讲，webpack是一个现在的javaScript应用的静态模块化打包工具。（从两点概括这句话即**模块**和**打包**）

官方文档：https://www.webpackjs.com/

## 前端模块化

1. 前端模块化的一些方案：AMD、CMD、CommonJS、ES6（浏览器**不能识别**它们，但是**webpack**可以做它们的**底层支撑**，方可进行模块化开发）
2. **ES6**之前，要想进行模块化开发，就必须借助**于其他的工具**，让我们可以进行模块化开发。
3. 并且在通过模块化开发完成了项目后，还需要处理模块化间的**各种依赖**，并且将其进行**整合打包**。
4. 此时出现**webpack**，其中一个核心就是让我们可能进行**模块化**开发，并且会帮助我们处理模块间的**依赖关系**。
5. 不仅仅是**JavaScript**文件，我们的**CSS**、**图片**、**json文件**等等在webpack中都可以被当做**模块**来使用。

## 打包

1. webpack可以帮助我们进行**模块化**，并且处理**模块间**的各种**复杂关系**后，打包的概念就很好理解了。
2. **将webpack中的各种资源模块进行打包合并成一个多个包（Bundle）**
3. 打包的过程中，还可对**资源进行处理**，比如压缩图片，将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作。
4. 打包工具还有**grunt/gulp**。

## webpack的安装

**wepack**为了正常运行必须依赖**node**环境，而node环境为了可以正常的执行，必须使用**npm工具管理**node中各种依赖的包。

1. 因此安装webpack首先要安装Node.js，Node.js自带了软件包管理工具npm。

2. 全局安装webpack。

   ```
   npm install webpack@3.6.0 -g
   ```

3. 局部安装webpck。  –save-dev是开发时依赖，项目打包后不需要继续使用。

   ```
   npm install webpack@3.6.0 --save-dev
   ```

## webpack的配置

### 文件和文件夹解析

1. dist文件夹：**用于存放之后打包的文件**
2. src文件夹：**用于存放我们写的源文件**
   - **main.js**：项目的入口文件。
   - **mathUtils.js**:定义了一些数学工具函数，可以在其他地方引用，并且使用。
   - **index.html**: 浏览器打开展示的首页html（在这里引用的是src内最终打包的文件即**dist文件夹的内容**）。
   - **package.json**：通过npm init生成的，npm包管理的文件。

### JS打包

在webpack目录下创建配置文件webpack.config.js

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件名称
    }
}
```

读取当前项目目录下src文件夹中的main.js（入口文件）内容，分析资源依赖，把相关的js文件打包，打包后的文件放入当前目录的dist文件夹下，打包后的js文件名为bundle.js

**entry：**为打包的入口

**output：** 为打包的出口

### html打包

```
npm install html-webpack-plugin --save-dev 
```

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ]
}
```

### css打包

1. 安装style-loader和 css-loader

   Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

   Loader 可以理解为是模块和资源的转换器。

   ```
   npm install --save-dev style-loader css-loader 
   ```

2. 修改webpack.config.js

   ```javascript
   const path = require("path"); //Node.js内置模块
   module.exports = {
       entry: './src/main.js', //配置入口文件
       output: {
           path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
           filename: 'bundle.js' //输出文件
       },
       module: {
           rules: [  
               {  
                   test: /\.css$/,    //打包规则应用到以css结尾的文件上
                   use: ['style-loader', 'css-loader']
               }  
           ]  
       },
       plugins: [
           new HtmlWebpackPlugin({
               title: '首页',  //生成的页面标题<head><title>首页</title></head>
               filename: 'index.html', // dist目录下生成的文件名
               template: './src/index.html' // 我们原来的index.html，作为模板
           })
       ]
   }
   ```

### less打包

安装style-loader和 css-loader之外还需安装less-loader

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ]
}
```

### sass打包

与less打包一致。

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ]
}
```

### 图片文件处理

```javascript
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                //将图片打包到发布环境中的images目录下
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 1,
                        name: 'images/[hash:8].[ext]',
                        publicPath: 'dist/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ]
}
```

1. limiet的意思是：图片大小小于limit时，使用base64转码。大于limit时，正常打包。
2. name：通过name属性改变图片的打包目录和文件名。
3.  hash：图片经过处理后，会在输出文件夹中生成图片，此时图片的名字为hash。ext代表图片的格式。
4. publicPath：为你的文件配置自定义 public 发布目录。
5. outputPath：为你的文件配置自定义 output输出目录 。

### ES6转ES5

webpack并不能将ES6语法转化成ES5语法，因此我们需要使用babel转化，webpack可以直接使用babel的loader。

1. 安装babel-loader

   ```
   npm install --save-dev babel-loader @babel/core @babel/preset-env
   ```

2. 配置

   ```javascript
   const path = require("path"); //Node.js内置模块
   module.exports = {
       entry: './src/main.js', //配置入口文件
       output: {
           path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
           filename: 'bundle.js' //输出文件
       },
       module:{
           rules:[
               {
                   test:/\.css$/,
                   use:['style-loader','css-loader']
               },
               {
                   test: /\.scss$/,
                   use: ['style-loader', 'css-loader', 'sass-loader']
               },
               {
                   //将图片打包到发布环境中的images目录下
                   test: /\.(jpg|jpeg|gif|png|svg)$/,
                   use: {
                       loader: 'url-loader',
                       options: {
                           limit: 1024 * 1,
                           name: 'images/[hash:8].[ext]',
                           publicPath: 'dist/'
                       },
                   },
               },
               {
                   test:/\.js$/, //已作为js扩展名这样类型的文件
                   exclude:/node_modules/, //排除node_modules文件夹
                   use:{
                       loader:'babel-loader', //转换成es5
                       options:{
                           presets:['@babel/preset-env'], //设置编译的规则
                       }
                   }
               }
           ]
       },
       plugins: [
           new HtmlWebpackPlugin({
               title: '首页',  //生成的页面标题<head><title>首页</title></head>
               filename: 'index.html', // dist目录下生成的文件名
               template: './src/index.html' // 我们原来的index.html，作为模板
           })
       ]
   }
   ```

   - 但是这样直接打包会失败 因为目前还解析不了我们的async/await语法
   - 需要安装一个`regeneratorRuntime`环境

3. regeneratorRuntime插件

   ```
   npm install --save-dev @babel/runtime //包含了regeneratorRuntime运行时候需要的内容
   ```

   ```
   npm install --save-dev @babel/plugin-transform-runtime // 这个插件 在需要regeneratorRuntime的地方自动导入包 就是在需要的时候会自动运行他
   ```

   ```javascript
   const path = require("path"); //Node.js内置模块
   module.exports = {
       entry: './src/main.js', //配置入口文件
       output: {
           path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
           filename: 'bundle.js' //输出文件
       },
       module:{
           rules:[
               {
                   test:/\.css$/,
                   use:['style-loader','css-loader']
               },
               {
                   test: /\.scss$/,
                   use: ['style-loader', 'css-loader', 'sass-loader']
               },
               {
                   //将图片打包到发布环境中的images目录下
                   test: /\.(jpg|jpeg|gif|png|svg)$/,
                   use: {
                       loader: 'url-loader',
                       options: {
                           limit: 1024 * 1,
                           name: 'images/[hash:8].[ext]',
                           publicPath: 'dist/'
                       },
                   }
               },
               {
                   test:/\.js$/, //已作为js扩展名这样类型的文件
                   exclude:/node_modules/, //排除node_modules文件夹
                   use:{
                       loader:'babel-loader', //转换成es5
                       options:{
                           presets:['@babel/preset-env'], //设置编译的规则
                           plugins:[ // 设置编译的插件
                               ['@babel/plugin-transform-runtime'] //设置编译的规则
                           ]
                       }
                   }
               }
           ]
       },
       plugins: [
           new HtmlWebpackPlugin({
               title: '首页',  //生成的页面标题<head><title>首页</title></head>
               filename: 'index.html', // dist目录下生成的文件名
               template: './src/index.html' // 我们原来的index.html，作为模板
           })
       ]
   }
   ```

### 配置vue

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                //将图片打包到发布环境中的images目录下
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 1,
                        name: 'images/[hash:8].[ext]',
                        publicPath: 'dist/'
                    },
                }
            },
            {
                test:/\.js$/, //已作为js扩展名这样类型的文件
                exclude:/node_modules/, //排除node_modules文件夹
                use:{
                    loader:'babel-loader', //转换成es5
                    options:{
                        presets:['@babel/preset-env'], //设置编译的规则
                        plugins:[ // 设置编译的插件
                            ['@babel/plugin-transform-runtime'] //设置编译的规则
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ],
    resolve: {
        // alias: 别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
```

### 配置vue相关loader

```
npm install --save-dev vue-loader vue-template-complier
```

```javascript
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                //将图片打包到发布环境中的images目录下
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 1,
                        name: 'images/[hash:8].[ext]',
                        publicPath: 'dist/'
                    },
                }
            },
            {
                test: /\.js$/, //已作为js扩展名这样类型的文件
                exclude: /node_modules/, //排除node_modules文件夹
                use: {
                    loader:'babel-loader', //转换成es5
                    options: {
                        presets: ['@babel/preset-env'], //设置编译的规则
                        plugins: [ // 设置编译的插件
                            ['@babel/plugin-transform-runtime'] //设置编译的规则
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',  //生成的页面标题<head><title>首页</title></head>
            filename: 'index.html', // dist目录下生成的文件名
            template: './src/index.html' // 我们原来的index.html，作为模板
        })
    ],
    resolve: {
        // alias: 别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
```

