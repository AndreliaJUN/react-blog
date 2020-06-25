import Head from 'next/head'
import marked from 'marked'
import hljs from "highlight"
import 'highlight.js/styles/atom-one-dark.css'
// useState的作用？
import React, { useState } from 'react'
import { Row, Col, List, Icon, Breadcrumb,Affix} from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import axios from 'axios'

const Detail = (props) => {

	const renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
	smartypants: false,
	// 高亮显示代码
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

    let html = marked(props.article_content) 
	return ( <>
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
							
						</div>

					</div>

				</div>
			</Col>

			<Col className="comm-box" xs={ 0 } sm={ 0 } md={ 7 } lg={ 5 } xl={ 4 }>
				{/* className： 可以为导航定义一个class名称，从而进行style样式的定义。
source：要解析的内容，也就是你的Markdown内容。
headingTopOffset:描点距离页面顶部的位置，默认值是0.
ordered: 显示数字编码，默认是显示的，也就是true，设置为false就不显示了。 */}
			<Affix offsetTop={5}>
				<div className="detailed-nav comm-box">
					<div className="nav-title">文章目录</div>
					
				</div>
				</Affix>
			</Col>
		</Row>
		<Footer />
	</> )
}

export default Detail

Detail.getInitialProps = async(context)=>{

	console.log(context.query.id)
	let id =context.query.id
	const promise = new Promise((resolve)=>{
  
	  axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
		(res)=>{
		  resolve(res.data.data[0])
		}
	  )
	})
  
	return await promise
  }