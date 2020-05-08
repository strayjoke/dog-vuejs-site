# 图标
### 制作svg-sprite
- 需要使用 `svg-sprite-loader`
- 需要在 `vue.config.js`中配置, 如下：
```
module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('svg') // 重点：删除默认配置中处理svg
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .add(resolve('src/icons/menu'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    }

}
```

### 自动加载icons
在`src/icons/index.js`中：
```
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/icons/', false, /\.svg$/)
requireAll(req)
```