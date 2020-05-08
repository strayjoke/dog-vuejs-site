# 过滤器
- 自定义过滤器，可用于一些常见的文本格式化。
- 用于双花括号和`v-bind`表达式

在 src/filters/index.js 定义过滤器
```
export function formatTime(val, format = 'YYYY-MM-DD HH:mm') {
    if (val) {
        return moment(val).format(format)
    }
}
```

在 main.js 引入
```
import * as filters from '@/filters'

//注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```