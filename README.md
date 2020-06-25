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

因为博客列表页和首页非常类似，只是列表页多了“面包屑导航”,我们先把首页的代码index.js，拷贝到list.js页面中，把样式改为list.css

然后就可以写面包屑导航了，直接用Ant Design自带的Breadcrumb就可以，用法也是非常简单，先进行引入,再添加

list.js
```js
import Head from 'next/head'
// useState的作用？
import React, { useState } from 'react'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'

const List = () => {
	// 这里复习一下react基础传值
	const [ mylist, setMylist ] = useState(
		[
			{ title: '50元加入小密圈 胖哥带你学一年', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React实战视频教程-技术胖Blog开发(更新04集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React服务端渲染框架Next.js入门(共12集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React Hooks 免费视频教程(共11集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
		]
	)
	return ( <>
		<Head>
			<title>List</title>
		</Head>
		<Header />
		<Row className="comm-main" type="flex" justify="center">
			<Col className="comm-left" xs={ 24 } sm={ 24 } md={ 16 } lg={ 18 } xl={ 14 }  >
				<div>

					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
							<Breadcrumb.Item>视频列表</Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<List
						header={ <div>最新日志</div> }
						itemLayout="vertical"
						dataSource={ mylist }
						renderItem={ item => (
							<List.Item>
								<div className="list-title">{ item.title }</div>
								<div className="list-icon">
									<span><Icon type="calendar" /> 2019-06-28</span>
									<span><Icon type="folder" /> 视频教程</span>
									<span><Icon type="fire" /> 5498人</span>
								</div>
								<div className="list-context">{ item.context }</div>
							</List.Item>
						) }
					/>
				</div>
			</Col>

			<Col className="comm-box" xs={ 0 } sm={ 0 } md={ 7 } lg={ 5 } xl={ 4 }>
				<Author />
			</Col>
		</Row>
		<Footer />
	</> )
}
export default List
```
list.css
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

### p07:博客详情页面制作1——编写基本页面结构

详细页做主要的一点是对Markdown语法的解析。

#### 一、编写基本页面结构

在编写页面前，在/static/style/pages文件夹下建立一个detailed.css文件，代码如下：

```css
.bread-div{
    padding: .5rem;
    border-bottom:1px solid #eee;
    background-color: #e1f0ff;
}
.detailed-title{
    font-size: 1.8rem;
    text-align: center;
    padding: 1rem;
}
.center{
    text-align: center;
}
.detailed-content{
    padding: 1.3rem;
    font-size: 1rem;
}
code {
    display: block ;
     background-color:#f3f3f3;
     padding: .5rem !important;
     overflow-y: auto;
     font-weight: 300;
     font-family: Menlo, monospace;
     border-radius: .3rem;
}

.title-anchor{
    color:#888 !important;
    padding:4px !important;
    margin: 0rem !important;
    height: auto !important;
    line-height: 1.2rem !important;
    font-size: .9rem !important;
    border-bottom: 1px dashed #eee;
}
.active{
    color:rgb(30, 144, 255) !important;
}
.nav-title{
    text-align: center;
    color: #888;
    border-bottom: 1px solid rgb(30, 144, 255);

}
```

有了样式文件后,打开以前我们准备好的detailed.js，然后检查一下页面的引入:

detailed.js

```js
import Head from 'next/head'
// useState的作用？
import React, { useState } from 'react'
import { Row, Col,List,Icon ,Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'

const Detail = () => {
	// 这里复习一下react基础传值
	const [ mylist, setMylist ] = useState(
		[
			{ title: '50元加入小密圈 胖哥带你学一年', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React实战视频教程-技术胖Blog开发(更新04集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React服务端渲染框架Next.js入门(共12集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
			{ title: 'React Hooks 免费视频教程(共11集)', context: '50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。' },
		]
	)
	return(<>
		<Head>
			<title>Detail</title>
		</Head>
		<Header />
		<Row className="comm-main" type="flex" justify="center">
			<Col className="comm-left" xs={ 24 } sm={ 24 } md={ 16 } lg={ 18 } xl={ 14 }  >
			<div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                  <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                React-Hooks学习笔记
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> 2019-06-28</span>
                  <span><Icon type="folder" /> 视频教程</span>
                  <span><Icon type="fire" /> 5498人</span>
                </div>

                <div className="detailed-content" >
                  详细内容，下节课编写
                </div>

             </div>

            </div>
			</Col>

			<Col className="comm-box" xs={ 0 } sm={ 0 } md={ 7 } lg={ 5 } xl={ 4 }>
				<Author/>
      </Col>
		</Row>
		<Footer/>
	</>)
}
export default Detail
```

初步写的都是布局，下一步来解析Marckdown

### p08:博客详情页面制作2——解析Markdown语法

对Markdown文件的解析是前端必须要作的一件事。这里使用react-markdown.

#### 一、认识react-markdown组件

react-markdown是react专用的markdown解析组件，它支持代码高亮，表格，而且解析的非常好。
github网址：https://github.com/rexxars/react-markdown

#### 二、react-markdown的安装和引入

可以直接使用yarn add 来进行安装，代码如下:
```
yarn add react-markdown
```
安装好后，使用import进行引入，代码如下:
```
import ReactMarkdown from 'react-markdown'
```

#### 三、准备md相关数据

因为目前还没有后端程序，所以需要伪造一个md数据，让web页面可以渲染。

这里声明一个markdown变量,当然内容全部是胡乱写的，为的就是可以顺利渲染出来。

```

let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  ```

  #### 四、使用react-marckdown渲染markdown

  现在组件和markdown文件都准备好了，可以进行渲染了。代码如下:

  ```js
  <div className="detailed-content" >
    <ReactMarkdown 
      source={markdown} 
      escapeHtml={false}  
    />
</div>
```

现在可以到浏览器中预览一下了，如果一切正常，应该可以正常接卸markdown语法了。

### p09:博客详细页面制作3-markdown导航制作

博客文章都是长文章，所以需要一个类似书籍目录的东西，对文章进行导航。这个导航方便阅读，大大提升了博客的体验度。**React有着极好的技术生态**，基本能想到的技术需求都可以找到对应的轮子，所以依然适应第三方组件markdown-navbar.

#### 一、认识markdown-navbar组件

markdown-navbar组件是一款第三方提供的组件，因为这个是比较小众的需求，所以使用的人并不多。目前只有18star,这个是国人开发的，我用起来还不错，希望作者可以一直维护下去（目前开来是不进行维护了，但是用起来还是挺好用）。

markdown-navbar的基本属性：

className： 可以为导航定义一个class名称，从而进行style样式的定义。
source：要解析的内容，也就是你的Markdown内容。
headingTopOffset:描点距离页面顶部的位置，默认值是0.
ordered: 显示数字编码，默认是显示的，也就是true，设置为false就不显示了。

#### 二、Markdown-navbar的安装和使用

用npm install进行安装，命令如下：
```
npm install --save markdown-navbar
```
用yarn add进行安装，命令如下：
```
yarn add markdown-navbar
```

安装完成后，直接在要使用的页面用import进行引入,需要注意的是还需要引入css。
```js
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
```

这样就引入成功了，现在就可以制作导航了，代码如下：
```js
<div className="detailed-nav comm-box">
  <div className="nav-title">文章目录</div>
  <MarkNav
    className="article-menu"
    source={markdown}
    ordered={false}
  />
</div>
``` 
有一个需求，就是这个导航要一直在页面的右侧。我们经常叫这个需求为固钉。Ant Desgin中提供了Affix.
先用import引入Affix组件。
```js
import {Row, Col ,Affix, Icon ,Breadcrumb  } from 'antd'
```
引入后在需要固钉的外层加上Affix组件就可以了。
```js
<Affix offsetTop={5}>
  <div className="detailed-nav comm-box">
    <div className="nav-title">文章目录</div>
    <MarkNav
      className="article-menu"
      source={markdown}

      ordered={false}
    />
  </div>
</Affix>
```

### p10:中台搭建1-安装egg.js开发环境

博客系统的服务端（或者叫做中台），采用Koa的上层框架egg.js，所谓上层框架就是在Koa的基础上，封装的框架。他主要针对于企业级开发，所以性能和稳定性上都非常不错，而且在国内有很高的声望，由阿里技术团队支持。

#### 一、认识egg.js框架

egg.js是由阿里开源的面向企业级开发的Node.js服务端框架，目的就是帮助团队和开发人员降低开发和维护成本。需要说的是他的底层是Koa2来搭建的。
Koa2虽然已经很好了，但是它并没有任何约定和规范，这样在团队开发中，会出现混乱的现象。

#### 二、搭建开发环境

先进入到项目的根文件夹中，然后在根文件夹下，建立一个service的文件夹，这就是中台的文件夹了。

全局安装egg.js的脚手架工具egg-init：

```
npm i egg-init -g
```
因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。
```
egg-init --type=simple
```
如果不成功，需要多试几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。
```
npm install
```
安装完成后，就可以启动服务查看一下结果了。
```
npm run dev
```
然后在浏览器中打开网址:http://127.0.0.1:7001/

如果在页面中显示hi.egg说明环境搭建完成。

### p11:中台搭建2-egg.js目录结构和约定规范

已经搭建好了egg.js开发环境，简单讲解一下egg.js的目录结构和约定规范。只有明白了这些，才能更好的进行开发。

#### 一、egg.js目录结构介绍

只介绍比较重要的文件：

- app文件夹:项目开发文件，程序员主要操作的文件，项目的大部分代码都会写在这里。
- config文件夹：这个是整个项目的配置目录，项目和服务端的配置都在这里边进行设置。
- logs文件夹：日志文件夹，正常情况下不用修改和查看里边内容。
- node_modules:项目所需要的模块文件，这个前端应该都非常了解，不多作介绍。
- run文件夹：运行项目时，生成的配置文件，基本不修改里边的文件。
- test文件夹：测试使用的配合文件，这个在测试时会使用。
- .autod.conf.js: egg.js自己生成的配置文件，不需要进行修改。
- eslinttrc和eslintignore：代码格式化的配置文件。
- gitgnore：git设置忽略管理的配置文件。
- package.json： 包管理和命令配置文件，这个文件经常进行配置。

比较重要的是app文件夹、config文件夹和package.json文件。

#### 二、Egg.js目录约定规范

Koa2框架虽然小巧好用，但是在团队开发中使用，是缺少规范的，所以不擅长企业级开发。Egg.js框架就是在Koa2的基础上规范了这些约定，所以也带来了一些文件目录的限制。

在app目录下，egg要求我们必须要有下面的文件：

- controller文件夹：控制器，渲染和简单的业务逻辑都会写道这个文件里。配置路由时也会用到（路由配置需要的文件都要写在控制器里）。
- public文件夹：公用文件夹，把一些公用资源都放在这个文件夹下。
- router.js: 项目的路由配置文件，当用户访问服务的时候，在没有中间件的情况下，会先访问router.js文件。
- service文件夹：这个是当我们的业务逻辑比较复杂或和数据库打交道时，会把业务逻辑放到这个文件中。
- view文件夹：模板文件夹，相当于表现层的专属文件夹，这个项目，我们使用接口的形式，所以不需要建立view文件夹。
- extend文件：当我们需要写一些模板中使用的扩展方法时，我们会放到这个文件夹里。
- middleware：中间件文件夹，用来写中间件的，比如最常用的路由首位。

### p12:中台搭建3-RESTful API设计简介和路由配置

所有数据的获得和业务逻辑的操作都是通过中台实现的，也就是说中台只提供接口，这里的设计我们采用RESTful的规则，让egg为前端提供Api接口，实现中台主要的功能。

#### 一、RESTful简介和约束方式

RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。这种形式更直观并且接口也有了一定的约束性。

约束的请求方式和对应的操作。

- GET(SELECT) ： 从服务端取出资源，可以同时取出一项或者多项。
- POST(CREATE) ：在服务器新建一个资源。
- PUT(UPDATE) ：在服务器更新资源（客户端提供改变后的完整资源）。
- DELETE(DELETE) ：从服务器删除资源。

还有一些不常用的请求方式，不一一介绍了。

#### 二、在egg.js中Api接口的路由配置

首先打开service根目录下的controller文件夹
在这个文件夹中新建两个文件夹
admin（管理端使用的所有API接口）
default（客户端使用的所有API接口）文件夹
目前只有客户端（前台）的页面
所以先在default目录下建立一个home.js文件，用于**前台首页所需要的api接口**
代码：
/service/app/controller/default/home.js
```js
'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        this.ctx.body="api接口"
    }
}

module.exports = HomeController
```
接口写好以后，需要配置一下路由。
**为了把路由也分成前后端分离的**，所以在app文件夹下新建一个router文件夹。
在文件夹下新建两个文件default.js和admin.js
default.js文件
```js

module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)
}
```
router.js文件
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  require('./router/default')(app)
};
```

编写好以后，使用yarn dev命令进行开启服务器，然后到浏览器中输入地址http://127.0.0.1:7001/default/index,如果能出现api接口字样，说明已经完成了基本的路由设置。

接下来学习egg.js如何连接数据库和实现相关的操作。

### p13：中台搭建4-Egg.js中连接mysql数据库

#### 一、egg-mysql模块安装

如果要在egg.js中使用mysql数据库，那需要先进行安装egg-mysql模块，这个模块可以使用npm或者yarn来进行安装。
npm安装命令如下:`npm i egg-mysql --save`

yarn安装命令如下:`yarn add egg-mysql`

#### 二、进行插件配置

在安装完成以后，还不能正常使用，egg.js要求我们**对于外部模块在plugin.js中进行配置**。配置方法如下：
文件/server/config/plugin.js
```js
'use strict';

//配置插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
```
这个配置完，也就说明egg.js可以支持mysql数据库的使用和连接了。

以后还会多次配置这个文件，所以这里要对这个config.js有所印象，他的左右就是配置egg.js项目的。

#### 三、数据库连接配置

先确认已经有一台安装mysql的服务器或者是主机
打开/config/config.default.js文件，作下面的配置（这段配置可以在https://www.npmjs.com/ 网址中找到这个配置）

```js
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '12345678',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
```

这个配置完成后，就可以连接到数据库了。

#### 四、创建数据库

数据库写好了需要验证一下，数据库是否已经连接上了。

#### 五、验证数据库是否连接（使用get进行表的查询）

打开/app/controller/defalut/home.js文件，改写index方法。
```js
'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        //获取用户表的数据

        let result = await this.app.mysql.get("article",{})
        console.log(result)
        this.ctx.body=result
    }


}

module.exports = HomeController
```
改写后，在浏览器中输入http://127.0.0.1:7001/default/index.如果能在控制台打印出结果和页面中显示结果，说明数据库已经连接成功了。

### p14:中台搭建5-数据库设计和首页接口制作

现在已经可以连接数据库了，现在就要好好设计一下数据库结构，把文章的表和类别的表建立好，然后我们复制一些数据进去，形成一个列表，供首页调用。

#### 一、数据库中的表建立

建立两张表type和article表，表结构如下:

type表（文章类型表）

id : 类型编号 int类型
typeName: 文章类型名称 varchar类型
orderNum: 类型排序编号 int类型
建立好表之后，我们再写入一条数据，编号为1，名称是视频教程，排列需要为1

article表（文章内容表）

id : 文章编号 int类型
type_id : 文章类型编号 int类型
title : 文章标题，varchar类型
article_cointent : 文章主体内容，text类型
introduce： 文章简介，text类型
addTime : 文章发布时间，int(11)类型
view_count ：浏览次数， int类型
建立好之后，可以自己写一些对应的文章进去

#### 二、前端首页文章列表接口

现在文章相关的数据表已经建立完成了，也简单的写入了一些数据，那现在就可以利用RESTful的规范，建立前端首页所需要的接口了。

在/app/contoller/default/home.js文件夹中，写一个getArticleList的方法，代码如下：
```js
async getArticleList(){

   let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             'article.addTime as addTime,'+
             'article.view_count as view_count ,'+
             '.type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id'

    const results = await this.app.mysql.query(sql)

    this.ctx.body={
        data:results
    }
}
```

写完之后还需要配置一下路由（router），打开/app/router/default.js,新建立一个get形式的路由配置，代码如下：

```js
module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
}
```

这个配置完成后，可以现在浏览器中预览一下结果，看看是否可以正确输出结果。访问地址：http://127.0.0.1:7001/default/getArticleList。如果能出现结果，说明已经完成了数据和接口的开发。

### p15:前中台结合1-前台读取首页文章列表接口

现在数据库、表和接口都已经完成了，
可以试着从数据接口获得数据，然后现在在页面上了。
实现这个需求，将使用Axios模块来实现。

#### 一、安装Axios模块

先进入前台的文件夹
然后安装

```
yarn add axios
```

#### 二、新建getInitialProps方法并获取数据

当Axios安装完成后，就可以从接口获取数据了。打开/blog/pages/index.js文件，在文件下方编写getInitialProps。
```js
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      (res)=>{
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}
```
使用了经典的async/await的异步方法。我们可以在得到数据后在控制台打印一下，查看一下结果。

#### 三、把数据放入到界面中

当我们在getInitialProps方法里获得数据后，是可以直接传递到正式方法里，然后进行使用:
```js
const Home = (list) =>{

  console.log(list)
  //---------主要代码-------------start
  const [ mylist , setMylist ] = useState( list.data);
  //---------主要代码-------------end
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>

              <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>

                    <div className="list-title">{item.title}</div>
                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.addTime}</span>
                      <span><Icon type="folder" /> {item.typeName}</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

   </>
  )

} 
```
做完这步，内容就应该正确的显示在页面上了，但是还是有点小问题，比如日期格式还是不正确。

#### 四、修改时间戳为日期格式

其实这个有很多方法，有前端实现的方法，也有后端实现的方法，但是我觉的使用SQL语句来实现是最简单的一种方法。
打开/service/app/controller/home.js文件，找到拼凑SQL语句那部分代码，把代码修改成如下样式即可实现转换。
```js
let sql = 'SELECT article.id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 //主要代码----------start
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
                 //主要代码----------end
                 'article.view_count as view_count ,'+
                 '.type.typeName as typeName '+
				 'FROM article LEFT JOIN type ON article.type_id = type.Id'
```

### p16：前中台结合2-文章详细页面接口制作展示

首页的接口和展示已经差不多了，现在可以制作详细页的接口和内容。
通过一个ID查找出详细的信息。

#### 一、编写中台详细页面接口

先打开/service/app/controller/default/home.js文件，编写接口，代码如下。需要注意的是整个接口是需要接收文章ID，然后根据文章ID查出内容的。

home.js文件
```js
  async getArticleById(){
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id



        const result = await this.app.mysql.query(sql)


        this.ctx.body={data:result}

	}
	```

#### 二、编写前台链接导航

有了接口，先不着急编写详细页面，先把首页到详细页的链接做好。这个直接使用Next.js中的<Link>标签就可以了。找到首页中循环时文章的标题，在外边包括<Link>标签就可以了。

/blog/pages/index.js