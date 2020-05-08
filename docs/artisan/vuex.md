# 状态
### Getter
- store 中的 state 中派生出一些状态
- 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

### 辅助函数
- 总结一句话：全局映射到组件

### Module 和命名空间
- 模块拥有自己的 state、mutation、action、getter，也可以有嵌套模块。
- 模块内部的 action、mutation 和 getter 是注册在全局命名空间的。通过添加 namespaced: true 的方式使其成为带命名空间的模块。

### 表单处理
- 在属于 Vuex 的 state 上使用 v-model 会比较棘手，建议使用带有 setter 的双向绑定计算属性