# webpack 相关

### css 相关
Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。

#### scss 全局变量
在 `main.js` 中可以引入`scss`文件，作为全局样式。`webpack`不能识别`scss全局变量`。
在 `vue.config.js`中配置`scss全局变量`：
```
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/css/variables.scss";`
            }
        }
    }

}
```





