# 混入
混入的目的在于**复用**
- 混入对象可以包含任意组件选项。
- 组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。


在 src/mixins/initData.js 中封装加载列表和分页等功能
```
export default {
    data() {
        return {
            data: [],
            page: 1,
            size: 10,
            total: 0,
            url: '',
            params: {},
            isAdd: false
        }
    },
    methods: {
        beforeInit() {
            return true
        }
    }
}
```

在组件中 src/views/system/user/UserList.vue 调用
```
import initData form '@/mixins/initData'
```
```
export default{
    mixins:[initData]
}
```

