(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32fb2d81"],{"0c6d":function(e,t,r){"use strict";r("d3b7");var s=r("bc3a"),a=r.n(s),o=r("5c96"),n=r("2f4d"),i=r("a18c"),l=a.a.create({timeout:5e3});l.interceptors.request.use((function(e){var t=Object(n["b"])();return t&&(e.headers["token"]=t),e}),(function(e){return console.log(e),Promise.reject(e)})),l.interceptors.response.use((function(e){var t=e.data;return 20002==t.code&&(Object(n["a"])(),i["b"].push("/login")),t}),(function(e){return console.log("err"+e),Object(o["Message"])({message:e.message,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=l},"0ccb":function(e,t,r){var s=r("50c4"),a=r("1148"),o=r("1d80"),n=Math.ceil,i=function(e){return function(t,r,i){var l,c,u=String(o(t)),d=u.length,m=void 0===i?" ":String(i),f=s(r);return f<=d||""==m?u:(l=f-d,c=a.call(m,n(l/m.length)),c.length>l&&(c=c.slice(0,l)),e?u+c:c+u)}};e.exports={start:i(!1),end:i(!0)}},1148:function(e,t,r){"use strict";var s=r("a691"),a=r("1d80");e.exports="".repeat||function(e){var t=String(a(this)),r="",o=s(e);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(r+=t);return r}},3044:function(e,t,r){"use strict";r("9b9c")},"343c":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-main"},[r("el-card",{staticClass:"search-bar card",attrs:{shadow:"never"}},[r("el-form",{ref:"searchForm",attrs:{model:e.search,"label-width":"80px",inline:!1,size:"mini"}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:6,offset:0}},[r("el-form-item",{attrs:{label:"昵称",size:"mini",prop:"nickName"}},[r("el-input",{attrs:{placeholder:"昵称模糊搜索",size:"mini",clearable:""},model:{value:e.search.nickName,callback:function(t){e.$set(e.search,"nickName",t)},expression:"search.nickName"}})],1)],1),r("el-col",{attrs:{span:6,offset:0}},[r("el-form-item",{attrs:{label:"用户名",size:"mini",prop:"username"}},[r("el-input",{attrs:{placeholder:"用户名模糊搜索",size:"mini",clearable:""},model:{value:e.search.username,callback:function(t){e.$set(e.search,"username",t)},expression:"search.username"}})],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:6,offset:18}},[r("el-button",{attrs:{type:"default",size:"mini"},on:{click:e.doReset}},[e._v("重置")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.doSearch}},[e._v("查询")])],1)],1)],1)],1),r("div",{staticClass:"container"},[r("el-card",{staticClass:"card",attrs:{shadow:"never"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.goAdd}},[e._v("新增")])],1),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.userList,border:"",stripe:""}},[r("el-table-column",{attrs:{label:"#",type:"index",width:"50",fixed:""}}),r("el-table-column",{attrs:{label:"用户名",prop:"username",width:"200",fixed:""}}),r("el-table-column",{attrs:{label:"昵称",prop:"nick_name",width:"200"}}),r("el-table-column",{attrs:{label:"头像",width:"200"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticClass:"avatar-img",attrs:{src:e.row.salt,alt:""}})]}}])}),r("el-table-column",{attrs:{label:"角色",prop:"roles"}}),r("el-table-column",{attrs:{label:"添加时间",prop:"create_time",width:"200"}}),r("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(r){return e.goEdit(t.row.id)}}},[e._v("编辑")]),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(r){return e.doDel(t.row.id)}}},[e._v("删除")])]}}])})],1),r("el-pagination",{staticStyle:{"margin-top":"30px","text-align":"right"},attrs:{"current-page":e.page.start,"page-sizes":e.page.sizes,"page-size":e.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.page.totalCount},on:{"update:currentPage":function(t){return e.$set(e.page,"start",t)},"update:current-page":function(t){return e.$set(e.page,"start",t)},"size-change":e.sizeChange,"current-change":e.currentChange}})],1)],1),r("UserForm",{ref:"userForm",attrs:{"role-list":e.roleList},on:{refresh:e.getUserList}})],1)},a=[],o=(r("99af"),r("0c6d"));function n(e,t,r){return Object(o["a"])({url:"/admin/sysAuth/user/findUsersByPage/".concat(e,"/").concat(t),method:"POST",data:r})}function i(e){return Object(o["a"])({url:"/admin/sysAuth/user/saveUserRoles",method:"POST",data:e})}function l(e){return Object(o["a"])({url:"/admin/sysAuth/user/updateUserRoles",method:"PUT",data:e})}function c(e){return Object(o["a"])({url:"/admin/sysAuth/user/removeUser/".concat(e),method:"DELETE"})}function u(e){return Object(o["a"])({url:"/admin/sysAuth/user/".concat(e),method:"GET"})}var d={findUsersByPage:n,saveUserRoles:i,updateUserRoles:l,findUserInfo:u,removeUser:c},m=r("f7ab"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-form"},[r("el-dialog",{attrs:{title:"编辑用户",visible:e.dialog,width:"30%"},on:{"update:visible":function(t){e.dialog=t},close:e.handleClose}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px",inline:!1,size:"normal"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{readonly:e.form.id.length>0,size:"small"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"用户昵称",prop:"nickName"}},[r("el-input",{attrs:{size:"small"},model:{value:e.form.nickName,callback:function(t){e.$set(e.form,"nickName",t)},expression:"form.nickName"}})],1),e.form.id?e._e():r("el-form-item",{attrs:{label:"密码"}},[r("el-input",{attrs:{type:"password",size:"small"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),r("el-form-item",{attrs:{label:"用户头像"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/lejuAdmin/material/uploadFileOss",headers:e.headers,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[r("el-avatar",{attrs:{icon:"el-icon-user-solid",src:e.form.salt}})],1)],1),r("el-form-item",{attrs:{label:"选择角色",prop:"username"}},[r("el-select",{attrs:{size:"small","value-key":"id",clearable:"",multiple:""},model:{value:e.form.roleIds,callback:function(t){e.$set(e.form,"roleIds",t)},expression:"form.roleIds"}},e._l(e.roleList,(function(e){return r("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})})),1)],1)],1),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:e.handleClose}},[e._v("取消")]),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.doSave}},[e._v("确定")])],1)],1)],1)},p=[];r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");r("ac1f"),r("5319"),r("4d63"),r("25f0"),r("4d90"),r("1276"),r("159b");var h={name:"AuthUser",props:{roleList:{type:Array,required:!0}},data:function(){return{treeLoad:!1,dialog:!1,form:{id:"",salt:"",roleIds:[]},rules:{username:[{required:!0,message:"用户名名称不能为空",trigger:"blur"}],nickName:[{required:!0,message:"昵称不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]}}},computed:{headers:function(){return{token:localStorage.getItem("token")}}},created:function(){},methods:{openDialog:function(e){var t=this;this.dialog=!0,e&&(this.treeLoad=!0,d.findUserInfo(e).then((function(e){e.success?t.form=e.data.user:t.$message.error("查询失败!"),t.treeLoad=!1})))},handleClose:function(){this.dialog=!1,(void 0)(this,"form")},handleAvatarSuccess:function(e,t){console.log(e),e.success?this.form.salt=e.data.fileUrl:this.$message.error(e.message)},beforeAvatarUpload:function(e){var t=/image\/(jpeg|png|gif|webp)/gi,r=t.test(e.type),s=e.size/1024/1024<2;return r||this.$message.error("上传头像图片只能是 jpeg|png|gif|webp 格式!"),s||this.$message.error("上传头像图片大小不能超过 2MB!"),r&&s},doSave:function(){var e=this;this.$refs.form.validate((function(t){if(!t)return e.$message.error("请注意表单验证!"),!1;var r=null;r=e.form.id?d.updateUserRoles:d.saveUserRoles,r(e.form).then((function(t){t.success?(e.$message.success("保存成功!"),e.handleClose(),e.$emit("refresh")):e.$message.error(t.message)}))}))}}},g=h,b=(r("3044"),r("2877")),v=Object(b["a"])(g,f,p,!1,null,"5fbbbc6a",null),y=v.exports,w={name:"AuthUser",components:{UserForm:y},data:function(){return{loading:!1,search:{username:""},userList:[],roleList:[],page:{start:1,limit:10,sizes:[10,20,30,40],totalCount:0}}},created:function(){this.getUserList(),this.getRoleList()},methods:{getRoleList:function(){var e=this;m["a"].findAllRoles().then((function(t){e.roleList=t.data.items}))},getUserList:function(){var e=this;this.loading=!0,d.findUsersByPage(this.page.start,this.page.limit).then((function(t){t.success?(e.userList=t.data.rows,e.page.totalCount=t.data.total):e.$message.error(t.message),e.loading=!1}))},goAdd:function(){this.$refs.userForm.openDialog()},goEdit:function(e){this.$refs.userForm.openDialog(e)},doDel:function(e){var t=this;this.$confirm("确认删除?").then((function(r){d.removeUser(e).then((function(e){e.success?(t.$message.success("删除成功!"),t.getUserList()):t.$message.error(e.message)}))}))},doReset:function(){this.$refs.searchForm.resetFields()},doSearch:function(){},sizeChange:function(e){},currentChange:function(e){}}},k=w,U=(r("64f8"),Object(b["a"])(k,s,a,!1,null,"528c7979",null));t["default"]=U.exports},"4d90":function(e,t,r){"use strict";var s=r("23e7"),a=r("0ccb").start,o=r("9a0c");s({target:"String",proto:!0,forced:o},{padStart:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"64f8":function(e,t,r){"use strict";r("c013")},"9a0c":function(e,t,r){var s=r("342f");e.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(s)},"9b9c":function(e,t,r){},c013:function(e,t,r){},f7ab:function(e,t,r){"use strict";r("99af");var s=r("0c6d");function a(e,t,r){return Object(s["a"])({url:"/admin/sysAuth/role/findRolesByPage/".concat(e,"/").concat(t),method:"GET",data:r})}function o(){return Object(s["a"])({url:"/admin/sysAuth/role/findAllRoles",method:"GET"})}function n(e){return Object(s["a"])({url:"/admin/sysAuth/role/removeRole/".concat(e),method:"DELETE"})}function i(e){return Object(s["a"])({url:"/admin/sysAuth/role/saveRolePermissions",method:"POST",data:e})}function l(e){return Object(s["a"])({url:"/admin/sysAuth/role/updateRolePermissions",method:"PUT",data:e})}function c(e){return Object(s["a"])({url:"/admin/sysAuth/role/findRolePermissions/".concat(e),method:"GET"})}t["a"]={findRolesByPage:a,removeRole:n,saveRolePermissions:i,updateRolePermissions:l,getRolePermissions:c,findAllRoles:o}}}]);