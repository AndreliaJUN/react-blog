# react-hooks实现多人博客

## 项目介绍

项目分为三个部分：BLOG前台（用户使用、博客展现），接口中台（数据接口，业务逻辑），后台管理（文章类别管理，系统设置）

前端主要完成功能就是用户的访问，文章列表和文章详情页面。
因为Blog的前台需要SEO操作，所以我们一定会选用Next.js框架来辅助我们开发。
然后减少CSS和各种组件的重复开发，选用阿里的Ant Desgin来作为UI交互库。
## 技术栈

react16,redux,react router,react hooks,react服务端渲染框架Next.js,Ant Desgin

## 开发流程

### p01：项目前端基础开发环境搭建

#### 一、用create-next-app快速创建项目

create-next-app就是Next.js的脚手架工具，有了它可以直接一句命令就建立好项目目录和基本结构，省去了我们很多的麻烦。
如果没有使用过create-next-app,可以先进行全局安装，安装命令如下.

```
npm install -g create-next-app
```
先创建一个总的目录，因为我们的项目会分为三个大模块，所以需要一个顶层目录。 创建完成后，再进入目录。 安装完成后，进入你要建立项目的位置，使用npx来进行安装。

```
npx create-next-app blog
```

#### 二、建立博客首页

用create-next-app建立好后，主页是默认的，所以我们要删除一下默认的文件和代码。把首页改成下面的代码。

```js
import Head from 'next/head'
import React from 'react'
const Home=()=>(
	<>
	  <Head>
	  	<title>Home</title>
	  </Head>
	</>
)
export default Home
```
这样基本的前台结构就算搭建完成了，但是我们还要使用Ant Desgin轮子来写我们的UI部分。

#### 三、让Next支持CSS文件

先用yarn命令来安装@zeit/next-css包，它的主要功能就是让Next.js可以加载CSS文件，有了这个包才可以进行配置。
```
yarn add @zeit/next-css
```
包下载完成后，在blog根目录下，新建一个next.config.js文件。这个就是Next.js的总配置文件。写入下面的代码:
```js
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```
这样我们的Next.js就支持CSS文件了。

#### 四、按需加载Ant Design

1. 接下来用yarn来安装antd，在命令行里输入：
```
yarn add antd 
```
2. 然后再安装一下babel-plugin-import，命令如下：
```
yarn add babel-plugin-import
```
在 Babel 配置中引入该插件，可以针对 antd, antd-mobile, lodash, material-ui等库进行按需加载.

3. 安装完成后，在项目根目录建立.babelrc文件，然后写入如下配置文件。
```js
{
    "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
    "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
        [
            "import",
            {
                "libraryName":"antd"
            }
        ]
    ]
}
```
4. 在pages目录下，新建一个_app.js文件，然后把CSS进行全局引入.
```
import App from 'next/app'

import 'antd/dist/antd.css'

export default App
```
这样Ant Design就可以按需引入了。现在index.js加入一个按钮，看看是否可以正常使用,代码如下。 如果能正常使用，我们的基本环境就已经建立完成了。

### p02：制作博客公用头部并形成组件

博客的头部每个页面都一样，所以可以制作成一个组件。这样就可以保持每个博客的页面头部都是统一的，而且易于上线后的维护。博客头部还要能支持适配大部分终端，比如PC、手机和平板。适配终端使用Ant Design提供的24格栅格化的技术进行布局。

#### 一、通用CSS文件的编写

博客需要一个浅灰背景色，并且每个页面的背景色都是一样的，所以需要一个公共的css样式文件，在/static文件夹下新建一个/style/,在/style文件夹下新建两个文件夹/pages和/components，然后再/pages文件夹下新建立comm.css文件。以后只要每个页面都用到的CSS样式，都放入这个文件中。

建立文件后，写入下面的CSS样式，就是把背景设置成浅灰色。

```
body{
  background-color: #f6f6f6;  
}
```
修改/pages/_app.js引入这个CSS，这个文件引入后，每个页面都会起作用。
```js
import App from 'next/app'
import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'

export default App
```

#### 二、Ant Design的24格栅格化系统

接下来就可以编写公用的头部了，遇到的第一个问题是如何让界面适配各种屏幕。如果自己编写还是挺麻烦的，幸运的是可以直接使用Ant Design的轮子来制作。

Ant Design做好了栅格化系统，可以适配多种屏幕，简单理解成把页面的分成均等的24列，然后进行布局。

需要对适配几个属性熟悉一下：

- xs: <576px响应式栅格。
- sm：≥576px响应式栅格.
- md: ≥768px响应式栅格.
- lg: ≥992px响应式栅格.
- xl: ≥1200px响应式栅格.
- xxl: ≥1600px响应式栅格.

