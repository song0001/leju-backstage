(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ee97983"],{"0c6d":function(e,t,n){"use strict";n("d3b7");var r=n("bc3a"),s=n.n(r),o=n("5c96"),a=n("2f4d"),i=n("a18c"),c=s.a.create({timeout:5e3});c.interceptors.request.use((function(e){var t=Object(a["b"])();return t&&(e.headers["token"]=t),e}),(function(e){return console.log(e),Promise.reject(e)})),c.interceptors.response.use((function(e){var t=e.data;return 20002==t.code&&(Object(a["a"])(),i["b"].push("/login")),t}),(function(e){return console.log("err"+e),Object(o["Message"])({message:e.message,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=c},2017:function(e,t,n){"use strict";n("cafe")},"7ded":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return o}));var r=n("0c6d");function s(e){return Object(r["a"])({url:"/lejuAdmin/index/login",method:"POST",data:e})}function o(){return Object(r["a"])({url:"/lejuAdmin/dashboard/baseData",method:"GET"})}},"9ed6":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[e._v("Login Form")])]),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),n("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),n("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("Login")]),n("div",{staticClass:"tips"},[n("span",{staticStyle:{"margin-right":"20px"}},[e._v("username: admin")]),n("span",[e._v(" password: any")])])],1)],1)},s=[],o=n("61f7"),a=n("2f4d"),i=n("7ded"),c={name:"Login",data:function(){var e=function(e,t,n){Object(o["b"])(t)?n():n(new Error("Please enter the correct user name"))},t=function(e,t,n){t.length<6?n(new Error("The password can not be less than 6 digits")):n()};return{loginForm:{username:"admin",password:"123456"},loginRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,Object(i["b"])(e.loginForm).then((function(t){console.log(t),t.success?(Object(a["d"])(t.data.token),Object(a["e"])(t.data.userInfo),e.$router.push({path:"/"})):console.error("登录失败,密码或者账号错误"),e.loading=!1}))}))}}},l=c,u=(n("2017"),n("a5a4"),n("2877")),d=Object(u["a"])(l,r,s,!1,null,"15c70fce",null);t["default"]=d.exports},a5a4:function(e,t,n){"use strict";n("f835")},cafe:function(e,t,n){},f835:function(e,t,n){}}]);