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

先在/blog/components/目录下新建一个Header.js文件。
然后在/static/style/components/header.css,用来编写CSS文件。

Header.js文件

```js
import React from 'react'
import '../static/style/components/header.css'

import {Row,Col, Menu, Icon} from 'antd'
const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
        <Col  xs={24} sm={24} md={10} lg={10} xl={10}>
            <span className="header-logo">技术胖</span>
            <span className="header-txt">专注前端开发,每年100集免费视频。</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu  mode="horizontal">
                <Menu.Item key="home">
                    <Icon type="home" />
                    首页
                </Menu.Item>
                <Menu.Item key="video">
                    <Icon type="youtube" />
                    视频
                </Menu.Item>
                <Menu.Item key="life">
                    <Icon type="smile" />
                    生活
                </Menu.Item>
            </Menu>
        </Col>
    </Row>
 </div>
)

export default Header
```

header.css文件

```js
.header{
    background-color: #fff;

    padding: .4rem;
    overflow: hidden;
    height: 2.8rem;
    border-bottom:1px solid #ccc;
}
.header-logo{
    color:#1e90ff;
    font-size: 1.4rem;
    text-align: left;

}
.header-txt{
    font-size: 0.6rem;
    color: #999;
    display: inline-block;
    padding-left: 0.3rem;
}
.ant-meu{
    line-height: 2.6rem;

}
.ant-menu-item{
    font-size:.7rem !important;
    padding-left:1rem;
    padding-right:1rem;

}
```

写完以后把/Header.js文件引入到首页，看一下效果。

index.js

```js

import React from 'react'
import Head from 'next/head'
import {Button} from 'antd'
import Header from '../components/Header'
const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <div><Button>我是按钮</Button></div>
 </>
)

export default Home
```

### p03：完成首页主体的两栏布局

可以看到博客主体分为左右两栏布局，左边是主要的文章列表，右边是个人信息和一些广告的东西。并且也是在不同的终端中有不同的表现。我们先制作出两栏布局。

#### 一、对公用头部的微调

公用头部还是不那么好看，先对公用头部的CSS进行调整

header.css
```css
.header{
    background-color: #fff;
    padding: .4rem;
    overflow: hidden;
    height: 3.2rem;
    border-bottom:1px solid #eee;
}
.header-logo{
    color:#1e90ff;
    font-size: 1.4rem;
    text-align: left;
}
.header-txt{
    font-size: 0.6rem;
    color: #999;
    display: inline-block;
    padding-left: 0.3rem;
}
.ant-meu{
    line-height: 2.8rem;
}
.ant-menu-item{
    font-size:1rem !important;
    padding-left:1rem;
    padding-right:1rem;
}
```

#### 二、编写首页的左右两列布局

可以看到博客是分为左右两列布局的，而且也是适配各终端的，有了上节课的经验，我们得知，可以用Row和Col组件来完成。

index.js

#### 三、其他页面的大结构复制

因为博客的列表页、详细页都采用了这种页面的总体形式，所以我们在Pages目录新建list.js和detailed.js文件，然后把index.js代码复制到里边，并进行简单的修改。

```js
import Head from 'next/head'
import React from 'react'
import {Row, Col} from 'antd'
import Header from '../components/Header'
const Detailed=()=>(
	<>
	  <Head>
	  	<title>Detailed</title>
	  </Head>
	  <Header/>
	  <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        左侧
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        右侧
      </Col>
    </Row>
	</>
)
export default Detailed
```
```js
import Head from 'next/head'
import React from 'react'
import {Row, Col} from 'antd'
import Header from '../components/Header'
const List=()=>(
	<>
	  <Head>
	  	<title>List</title>
	  </Head>
	  <Header/>
	  <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        左侧
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        右侧
      </Col>
    </Row>
	</>
)
export default List
```
这样，我们就确定了博客的整体结构，并且是统一的。

### p04:利用List组件 

左右两边的基本布局完成后，需要对列表的单元项进行制作，也就是首页列表中的每一项。这个制作起来涉及的内容不多，因为以后要解析Markdown代码，所以这里只是先模拟一下，把基本的样式完成。

#### 一、编写列表项的基本结构

由于Ant Design本身就有列表相关的组件，所以我们不用把这部分独立出去，而是使用Ant Design本身所有的List组件。

在使用时先引入List,代码如下:

index.js
```js
import {Row, Col , List ,Icon} from 'antd'
```
然后把useState也引入过来，以后要进行使用。
```js
import React,{useState} from 'react'
```
用useState,伪造一些假数据，然后在jsx中进行使用。
```js
const [ mylist , setMylist ] = useState(
    [
      {title:'50元加入小密圈 胖哥带你学一年',context:'50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你许的最低收费了。'}   
    ]
  )
  ```
有了数据后，就可以用这些数据来构建List布局了。代码如下：
```js
 <div>    
  <List
    header={<div>最新日志</div>}
    itemLayout="vertical"
    dataSource={mylist}
    renderItem={item => (
      <List.Item>
        <div className="list-title">{item.title}</div>
        <div className="list-icon">
          <span><Icon type="calendar" /> 2019-06-28</span>
          <span><Icon type="folder" /> 视频教程</span>
          <span><Icon type="fire" /> 5498人</span>
        </div>
        <div className="list-context">{item.context}</div>  
      </List.Item>
    )}
  />    
</div>
```

#### 二、列表页CSS样式的编写

在/static/style/pages文件夹下，新建立一个index.css文件。 CSS样式我们依然采用复制的方式，这里给出了CSS样式的代码。

```css

.list-title{
    font-size:1.3rem;
    color: #1e90ff;
    padding: 0 0.5rem;
}
.list-context{
    color:#777;
    padding:.5rem;
}
.list-icon{
    padding:.5rem 0;
    color:#AAA;
}
.list-icon span{
    display: inline-block;
    padding: 0 10px;
}
```

### p05:编写“博主介绍”组件

博客的文章列表有了，接下来开始完善博客右侧的功能，右侧的绝大部分都是需要在其他页面复用的，所以尽量制作成组件，减少以后的开发和维护成本。

#### 一、编写Author组件

在/components文件夹下面，新建一个Author.js文件。这个组件里要包括头像、自我介绍和社交账号标识。

代码如下:
```js
import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"  /></div>
            <div className="author-introduction">
                光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />

            </div>
        </div>
    )

}

export default Author
```

这里的Avatat组件时Ant Desgin提供的，专门用来编辑头像的，通过这个可以制作原型或者方形的头像。 Divider是分割线组件，也是Ant Desgin提供的组件，特点是可以在分割线左、中、右，根据自己需要插入文字。

#### 二、CSS样式的编写

```css
.author-div{
    text-align: center;
    padding: 1rem;

}
.author-div div{
    margin-bottom: 1rem;

}
.author-introduction{
    font-size:.8rem;
    color: #999;
}
.account{
    background-color: #999;
    margin-left: .5rem;
    margin-right: .5rem;
}
```

改写了comm.css，把里边的comm-box名称，改为了comm-box，这样只要到边框的时候，直接使用这个样式就可以了。
```css
body{
  background-color: #f6f6f6;  
}

.comm-left{
  background-color: #FFF;
  padding:.3rem;
  border-radius: .3rem;
  border:1px solid #eee;
}
.comm-box{
  background-color: #FFF;
  margin-left: .5rem;
  padding:.3rem;
  border-radius: .3rem;
  border:1px solid #eee;


}
.comm-main{
  margin-top: .5rem;
}
```
#### 三、把组件引入首页查看效果

打开index.js文件，然后在文件头部先引入Author组件，代码如下：
```js
import Author from '../components/Author'
```

### p06:博客列表页面快速制作

先把博客底部(脚部)制作一下，然后在快速制作博客的列表页面，通过这个就能感觉到React组件化开发的魅力，有了这些通用组件，能很快完成列表页的开发。

#### 一、博客底部的制作

每个博客在底部都会放置一些类似版权，联系方式，友情连接的东西。并且每个页面也都是一样的，所以我们要作一个通用的博客底部组件（Footer.js）。

在/components目录下，新建立一个Footer.js的文件，然后写入下面代码.

```js
import '../static/style/components/footer.css'
const Footer=()=>(
	<div className="footer-div">
      <div>系统由 React+Node+Ant Desgin驱动</div>
	  <div>Andrelia的博客</div>
	</div>
)
export default Footer
```

编写完成后引入到index.js里，就可以完成底部菜单的开发

#### 二、博客列表页的制作

