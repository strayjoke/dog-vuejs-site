## 介绍
<a href="www.strayjoke.com" target="_blank">dog-vuejs</a> 是一个使用 <a href="https://github.com/vuejs/vue"   target="_blank">vuejs</a> 和 <a href="https://github.com/ElemeFE/element" target="_blank">element-ui</a> 开发的后台前端项目。集成了用户认证，动态路由，权限验证等基础功能，可以作为企业级的中后台项目模板。

在线预览：[https://strayjoke.github.io/dog-vuejs/](https://strayjoke.github.io/dog-vuejs/)    
    
项目源码：[https://github.com/strayjoke/dog-vuejs](https://github.com/strayjoke/dog-vuejs)

服务端源码: [git@github.com:strayjoke/dog-nodejs.git](git@github.com:strayjoke/dog-nodejs.git)


## 安装
```
# 克隆项目
git clone git@github.com:strayjoke/dog-vuejs.git

# 进入项目
cd dog-vuejs

# 安装依赖
npm install

# 本地开发 启动项目
npm run serve

# 部署
npm run build

```
## 目录结构
```
├─docs                                # vuepress 根目录
├─public                              # 静态资源
└─src                                 # 源代码
    ├─api                             # api接口
    ├─assets                          # 样式、图片等静态资源
    ├─components                      # 组件
    ├─directives                      # 自定义指令
    ├─filters                         # 自定义过滤器
    ├─icons                           # 图标
    ├─layout                          # 项目布局
    ├─mixins                          # 混入
    ├─plugins                         # 自定义插件
    ├─router                          # 路由
    ├─store                           # store 状态
    ├─utils                           # 工具
    └─views                           # 页面

```
## 页面布局
分为左右布局：左侧为`菜单栏`， 右侧再分为上下布局，上部为`顶部栏`，下部为`标签栏`和`内容区域`。
路由页面主要通过 `router-view` 标签渲染在`内容区域`。

![页面布局](/images/layout.jpg)

在 `src/layout/TheLayout.vue`
```
 <el-container class="layout">
        <the-aside />                                  #左侧栏
        <el-container direction="vertical" class="content">
            <the-header />                             #顶部栏
            <the-main />                               #包含标签栏和内容区域
            <the-footer />                             #支持添加footer
        </el-container>
</el-container>
```
## 用户认证
用户认证建议采用`localStorage` + `jwt` + `session` 方式。
- 采用`locacailStorage`，是基于目前移动端不支持`cookie`,为了保持PC端和移动端一致。
- 采用`jwt`，是因为自包含的特性，可以在服务端解析出登录用户信息，不需要查询一次数据库。
#### 为什么采用session
目前用户认证有三种方案：`session` 、 `jwt`、`OAuth2`
- 采用无状态的`jwt`， 优点在于服务端无需记录，缺点在于无法`续期`。那些通过重新刷新token，记录白名单等，虽然可以解决问题，却也增加了复杂度，属于`为了用而用`，偏离了`jwt`的初衷。
- 采用`OAuth2`，`OAuth2`共有四种方式，每种方式都需要预先在服务端登记客户端的信息，以识别客户端。主要用于第三方调用，场景不符且稍显笨重。

**建议采用 redis 作为 `session` 服务器。**

## 权限控制
权限分为四种：左侧栏菜单权限，页面路由权限，按钮权限，api接口权限。
- 左侧栏权限用于控制左侧栏的菜单选项是否可见
- 页面路由权限决定了跳转的页面是否可见
- 按钮权限用于控制一些 `新增`、 `编辑`、 `删除`、 `搜索`等增删改查按钮是否显示，按钮权限需要定义一个唯一标识
- api 接口权限用于控制 restful api 接口是否可以通过，主要通过 `url` 和 http 方法两个维度进行区分。

系统采用基于角色的访问控制模式
> 用户通过角色与权限进行关联。构成“用户-角色-权限”的授权模型。用户与角色，角色与权限之间，都是多对多的关系。

## 和服务端交互
系统使用 `axios` 库向服务端请求数据。通过定义http 头部 `Authorization`, 拼接`Bearer`+ 空格 + `token`传递用户登录凭证。

#### 统一封装 axios
在 `src/utils/request.js`中封装，统一处理 `网络超时`、`401`、`403`错误。
```
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: process.env.VUE_APP_TIMEOUT // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers.common['Authorization'] = `Bearer ` + store.state.token
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    error => {
        // 处理网络请求
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            Message({
                message: '网络请求超时，请稍后重试',
                type: 'error',
                duartion: 3000
            })
        }
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    MessageBox.confirm('会话过期，请重新登录', '确认', {
                        confirmButtonText: '重新登录',
                        showCancelButton: false,
                        showClose: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: 'warning'
                    }
                    ).then(() => {
                        store.dispatch('logout').then(() => {
                            router.push(`/login`)
                        })
                    })
                    break
                case 403:
                    MessageBox.confirm(error.response.data.msg, '警告', {
                        confirmButtonText: '确认',
                        showCancelButton: false,
                        showClose: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: 'warning'
                    }
                    )
                    break
                default:
                    Message({
                        message: error.response.data.msg || '网络请求异常，请联系管理员！',
                        type: 'error',
                        duration: 3000
                    })
            }
            return Promise.reject(error.response.data)
        }
    }
)
```

在`src/api/user.js`中使用
```
import request from '@/utils/request.js'

export function getUserList(query) {
    return request({
        url: '/api/userList',
        method: 'get',
        params: query
    })
}
```
## mockjs
`/src/main.js` 中,添加`mockjs`逻辑
```
import Mock from '@/mock'

Mock.mockData()
```

`src/mock` 中:
```
└─mock                                 # mock
    ├─auth                             # auth接口
    ├─dict                             # dict 接口
    ├─index                            # mock 入口
    ├─menu                             # 菜单接口
    ├─role                             # 角色接口
    ├─user                             # 用户接口
```
在 `src/mock/index.js`中:
```
import Auth from './auth.js'
import Menu from './menu.js'
import User from './user.js'
import Role from './role.js'
import Dict from './dict.js'

export default {
    mockData() {
        Auth.mockData()
        Menu.mockData()
        User.mockData()
        Role.mockData()
        Dict.mockData()
    }
}
```

## 对接服务端
服务端项目为 **nodejs** 项目, 源码地址: [git@github.com:strayjoke/dog-nodejs.git](git@github.com:strayjoke/dog-nodejs.git)
另外还需要做如下配置:
- `/src/main.js` 中,注释掉`mockjs`逻辑
```
import Mock from '@/mock'

Mock.mockData()
```

- 在`/.env.development` 和 `/.env.production `中,替换为服务端地址,如:
```
VUE_APP_BASE_API='localhost:3000' 
```


## 部署
- 在 `main.js`中:
```
Vue.config.silent = true // 取消 Vue 所有的日志与警告

Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示
```

- 在 `vue.config.js`中:
```
module.exports = {
    productionSourceMap: false, //禁止查看源码
}
```

## 环境变量
- 环境变量的引入需要结合vue-cli 中对模式的定义。模式共有：`development`、`production`、`test`。
- 环境变量文件名需要对应模式，如：`.env.development`、`.env.production`、`.env.test`。不同的模式下，会引入不同的环境配置文件。
- 环境变量需要以 `VUE_APP_` 开头

在 `.env.development` 中定义环境变量：
```
VUE_APP_BASE_API='/api'
VUE_APP_BASE_URL='/'  
VUE_APP_TIMEOUT=5000
```

在 `.env.production` 中定义环境变量：
```
VUE_APP_BASE_API='http://localhost:3000'  # 对接nodejs服务端
VUE_APP_BASE_URL='/'  
VUE_APP_TIMEOUT=5000
```

在 `src/utils/request.js`中使用环境变量
```
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: process.env.VUE_APP_TIMEOUT // request timeout
})
```


