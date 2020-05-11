(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{331:function(e,s,t){"use strict";t.r(s);var n=t(33),a=Object(n.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"自定义指令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义指令"}},[e._v("#")]),e._v(" 自定义指令")]),e._v(" "),t("ul",[t("li",[e._v("一个指令定义对象提供几个钩子函数")])]),e._v(" "),t("p",[e._v("在 src/directives/index.js 定义指令对象")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const permission = {\n    inserted: function (el, binding) {\n        const result = checkBtnPermission(binding.value)\n        if (!result) {\n            el.parentNode.removeChild(el)\n        }\n    }\n}\n\nexport default permission\n")])])]),t("p",[e._v("在 src/directives/permission.js 注册指令对象")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Vue.directive('permission', permission)\n")])])]),t("p",[e._v("在 src/main.js 引用")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import @/directives\n")])])])])}),[],!1,null,null,null);s.default=a.exports}}]);