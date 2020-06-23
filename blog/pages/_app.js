import App from 'next/app'
import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'

// 自定义<App>组件来初始化页面。你可以重写它来控制页面初始化，如下面的事：

// 当页面变化时保持页面布局
// 当路由变化时保持页面状态
// 使用componentDidCatch自定义处理错误
// 注入额外数据到页面里 (如 GraphQL 查询)
export default App