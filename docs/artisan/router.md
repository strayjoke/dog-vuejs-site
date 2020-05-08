# 路由
### 导航守卫
分为全局守卫、路由独享的守卫和组件内的守卫

### 路由懒加载
结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现以下两个步骤，达到懒加载的目的。
```
1. 把每个路由所包含的组件，都分割成一个单独的 bundle
2. 当路由被访问的时候才加载该路由对应的 bundle
```

#### webpack 代码分割功能
- Webpack 的动态分割主要方式是使用符合 ECMAScript 提案的 import() 语法。
```
import('path/to/module') -> Promise
```
传入模块的路径，import() 会返回一个Promise。这个模块就会被当作分割点。意味着这个模块和它的子模块都会被分割成一个单独的 chunk。

#### 异步组件
- Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。

### 过渡效果
transition 可以添加过渡效果，可以定义过渡类名：
`v-enter`、`v-enter-active`、`v-enter-to`、`v-leave`、`v-leave-active`、`v-leave-to`。

在项目中的应用

/src/layout/components/TheMain.vue 文件中
```
            <transition
                name="fade-transform"
                mode="out-in"
            >
                <router-view />
            </transition>
```

/src/assets/css/transition.scss 文件中
```
.fade-transform-enter-active,
.fade-transform-leave-active{
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/*breadcrumb*/
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

```