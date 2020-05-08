# 自定义指令
- 一个指令定义对象提供几个钩子函数

在 src/directives/index.js 定义指令对象
```
const permission = {
    inserted: function (el, binding) {
        const result = checkBtnPermission(binding.value)
        if (!result) {
            el.parentNode.removeChild(el)
        }
    }
}

export default permission
```

在 src/directives/permission.js 注册指令对象
```
Vue.directive('permission', permission)
```

在 src/main.js 引用
```
import @/directives
```

