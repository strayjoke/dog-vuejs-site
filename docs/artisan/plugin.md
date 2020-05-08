# 插件

- 插件通常用来为 Vue 添加全局功能。

- 通过全局方法 Vue.use() 使用插件。

- Vue.js 的插件应该暴露一个 install 方法

#### 例子
在 src/plugins/dict/index.js 文件：定义插件并混入 Vue 实例属性

```
const install = function (Vue) {
    Vue.mixin({
        data() {
            if (this.$options.dicts instanceof Array) {
                return {
                    dictData: {}
                }
            }
            return {}
        },
        created() {
            if (this.$options.dicts instanceof Array) {
                new Dict(this.dictData).init(this.$options.dicts, () => { })
            }
        }
    })
}

const dict = { install }

Vue.use(dict)
```

在 src/main.js 中引入
```
import './plugins/dict' //加载字典数据
```

