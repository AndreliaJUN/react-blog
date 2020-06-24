import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
	return (
		<div  className="author-div comm-box">
			<div><Avatar size={ 100 } src="https://andreliajun.github.io/about/index/me1.png" /></div>
		<div>
			<div className="author-introduction">
				菜鸟前端工程师，专注于WEB和移动前端开发。
                <Divider>社交账号</Divider>
				<Avatar size={ 28 } icon="github" className="account" />
				<Avatar size={ 28 } icon="qq" className="account" />
				<Avatar size={ 28 } icon="wechat" className="account" />

			</div>
		</div>
		</div >
	)
}
export default Author