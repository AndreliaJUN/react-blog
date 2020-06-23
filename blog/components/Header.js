import React from 'react'
import '../static/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'
const Header = () => (
	<div className="header">
		{/* 这个布局要回头看看antd */ }
		<Row type="flex" justify="center">
			<Col xs={ 24 } sm={ 24 } md={ 10 } lg={ 10 } xl={ 10 }>
				<span className="header-logo">Andrelia</span>
				<span className="header-txt">不经审视的生活不值得过</span>
			</Col>
			<Col className="memu-div" xs={ 0 } sm={ 0 } md={ 14 } lg={ 8 } xl={ 6 }>
				<Menu mode="horizontal">
					<Menu.Item key="home">
						{/* <Icon type="home" /> */}
                    首页
                </Menu.Item>
				<Menu.Item key="video">
						{/* <Icon type="smile" /> */}
                    技术
                </Menu.Item>
					<Menu.Item key="life">
						{/* <Icon type="smile" /> */}
                    生活
                </Menu.Item>
				</Menu>
			</Col>
		</Row>
	</div>
)

export default Header