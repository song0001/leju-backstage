(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5605f93f"],{"0c6d":function(e,t,s){"use strict";s("d3b7");var a=s("bc3a"),o=s.n(a),r=s("5c96"),n=s("2f4d"),i=s("a18c"),d=o.a.create({timeout:5e3});d.interceptors.request.use((function(e){var t=Object(n["b"])();return t&&(e.headers["token"]=t),e}),(function(e){return console.log(e),Promise.reject(e)})),d.interceptors.response.use((function(e){var t=e.data;return 20002==t.code&&(Object(n["a"])(),i["b"].push("/login")),t}),(function(e){return console.log("err"+e),Object(r["Message"])({message:e.message,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=d},"1b62":function(e,t,s){"use strict";var a=s("2f4d");t["a"]={data:function(){return{page:{currentPage:1,size:10,pageSizes:[10,20,30,40],total:0},uploadUrl1:"/lejuAdmin/material/uploadFileOss",uploadUrl:"/lejuAdmin/material/uploadFileOssSave",uploadHeaders:{token:Object(a["b"])()}}}}},3256:function(e,t,s){"use strict";s("9d1a")},8298:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-card",{staticClass:"card",attrs:{shadow:"never"}},[s("div",{attrs:{slot:"header"},slot:"header"},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.add}},[e._v("新增")])],1),s("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.addressList}},[s("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{fixed:"left",type:"index",prop:"date",label:"#",align:"center"}}),s("el-table-column",{attrs:{label:"地址名称",prop:"addressName",align:"center",width:"200"}}),s("el-table-column",{attrs:{label:"默认发货地址",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("p",[e._v(" 默认发货地址: "),s("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(s){return e.changeSendStatus(t.row)}},model:{value:t.row.sendStatus,callback:function(s){e.$set(t.row,"sendStatus",s)},expression:"scope.row.sendStatus"}})],1)]}}])}),s("el-table-column",{attrs:{align:"center",prop:"name",label:"收货人姓名",width:"150"}}),s("el-table-column",{attrs:{align:"center",prop:"phone",label:"收货人电话",width:"150"}}),s("el-table-column",{attrs:{label:"收货人地址",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.province+" "+t.row.city+" "+t.row.region+" "+t.row.detailAddress)+" ")]}}])}),s("el-table-column",{attrs:{label:"默认收货地址",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("p",[e._v(" 默认收货地址: "),s("el-switch",{attrs:{size:"small","active-value":1,"inactive-value":0},on:{change:function(s){return e.changeReceiveStatus(t.row)}},model:{value:t.row.receiveStatus,callback:function(s){e.$set(t.row,"receiveStatus",s)},expression:"scope.row.receiveStatus"}})],1)]}}])}),s("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建时间",width:"200"}}),s("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return e.edit(t.row)}}},[s("span",[e._v("编辑")])]),s("el-button",{attrs:{type:"text"},on:{click:function(s){return e.del(t.row)}}},[s("span",{staticStyle:{color:"red"}},[e._v("删除")])])]}}])})],1)],1),s("el-dialog",{attrs:{title:"地址详情",visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"130px"}},[s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"发货地址",prop:"addressName"}},[s("el-input",{attrs:{placeholder:"发货地址"},model:{value:e.addForm.addressName,callback:function(t){e.$set(e.addForm,"addressName",t)},expression:"addForm.addressName"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"发货人姓名",prop:"name"}},[s("el-input",{attrs:{placeholder:"发货人姓名"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"发货人手机号",prop:"phone"}},[s("el-input",{attrs:{placeholder:"发货人手机号"},model:{value:e.addForm.phone,callback:function(t){e.$set(e.addForm,"phone",t)},expression:"addForm.phone"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"邮政编码",prop:"postCode"}},[s("el-input",{attrs:{placeholder:"邮政编码"},model:{value:e.addForm.postCode,callback:function(t){e.$set(e.addForm,"postCode",t)},expression:"addForm.postCode"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"收货地址",prop:"postCode"}},[s("el-cascader",{staticClass:"inner-input",attrs:{options:e.options},on:{change:e.addChange},model:{value:e.addForm.cityCode,callback:function(t){e.$set(e.addForm,"cityCode",t)},expression:"addForm.cityCode"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"详细地址",prop:"detailAddress"}},[s("el-input",{attrs:{placeholder:"详细地址"},model:{value:e.addForm.detailAddress,callback:function(t){e.$set(e.addForm,"detailAddress",t)},expression:"addForm.detailAddress"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"是否默认收货地址",prop:"receiveStatus"}},[s("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:e.addForm.receiveStatus,callback:function(t){e.$set(e.addForm,"receiveStatus",t)},expression:"addForm.receiveStatus"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"是否默认发货地址",prop:"sendStatus"}},[s("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:e.addForm.sendStatus,callback:function(t){e.$set(e.addForm,"sendStatus",t)},expression:"addForm.sendStatus"}})],1)],1)],1),s("el-row",[s("el-col",{staticClass:"footer",attrs:{span:10}},[s("el-form-item",[s("span",{staticClass:"dialog-footer"},[s("el-button",{on:{click:function(t){return e.resetForm("addFormRef")}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("addFormRef")}}},[e._v("确 定")])],1)])],1)],1)],1)],1)],1)},o=[],r=s("5530"),n=(s("ac1f"),s("1276"),s("a15b"),s("0c6d"));function i(){return Object(n["a"])({url:"/lejuAdmin/companyAddress/addressList",method:"get"})}function d(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/setReceiveOne",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/setSendOne",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/update",method:"post",data:e})}function u(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/".concat(e),method:"delete"})}function m(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/".concat(e),method:"get"})}function p(e){return Object(n["a"])({url:"/lejuAdmin/companyAddress/save",method:"post",data:e})}var f=s("ef6c"),g=s("1b62"),h={mixins:[g["a"]],data:function(){return{addressList:[],loading:!1,dialogVisible:!1,isEdit:!1,addForm:{addressName:"",name:"",phone:"",postCode:"",cityCode:[],detailAddress:"",receiveStatus:1,sendStatus:1},addFormRules:{addressName:[{required:!0,message:"发货地址不能为空",trigger:"blur"}]},options:f["regionDataPlus"],id:""}},created:function(){this.getAddressList()},methods:{getAddressList:function(){var e=this;i().then((function(t){console.log("地址",t),e.addressList=t.data.items}))},addChange:function(e){console.log(e),console.log(this.addForm.cityCode),console.log(this.addForm)},add:function(){this.isEdit=!1,this.dialogVisible=!0,this.addForm=this.$options.data().addForm},edit:function(e){this.dialogVisible=!0,console.log("当前行",e),this.isEdit=!0,e.cityCode.constructor===Array||(e.cityCode=e.cityCode.split(","),console.log("字符串"),console.log("2222222222",e.cityCode)),this.addForm=e,console.log(this.addForm),this.getAddressDetail(e.id)},getAddressDetail:function(e){m(e).then((function(e){}))},del:function(e){var t=this;this.$confirm("此操作将永久删除该地址, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){u(e.id).then((function(e){e.success?(t.getAddressList(),t.$message({type:"success",message:"删除地址成功!"})):t.$message.error(e.message)}))})).catch((function(e){console.log(e)}))},submitForm:function(e){var t=this;console.log(this.addForm),this.$refs[e].validate((function(s){if(!s)return t.$message.error("请填写必要信息"),!1;t.$confirm("是否确认".concat(t.isEdit?"修改":"新增","地址信息"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var s=Object(r["a"])(Object(r["a"])({},t.addForm),{},{province:f["CodeToText"][t.addForm.cityCode[0]],city:f["CodeToText"][t.addForm.cityCode[1]],region:f["CodeToText"][t.addForm.cityCode[2]]}),a=Object(r["a"])(Object(r["a"])({},s),{},{cityCode:t.addForm.cityCode.join(",")});console.log(a),t.isEdit?c(a).then((function(s){console.log(s),s.success?(t.getAddressList(),t.dialogVisible=!1,t.isEdit=!1,t.$refs[e].resetFields(),t.$message({type:"success",message:"修改成功!"})):t.$message.error(s.message)})):p(a).then((function(s){console.log(s),s.success?(t.getAddressList(),t.dialogVisible=!1,t.$refs[e].resetFields(),t.$message({type:"success",message:"添加成功!"})):t.$message.error(s.message)}))})).catch((function(e){console.log(e)}))}))},resetForm:function(e){this.$refs[e].resetFields(),this.dialogVisible=!1,this.isEdit=!1},changeSendStatus:function(e){var t=this;console.log(e);var s=0===e.receiveStatus?1:0;l({id:e.id}).then((function(a){a.success?(t.getAddressList(),t.$message.success("修改默认发货地址成功")):(t.$message.error("修改默认发货地址失败"),e.sendStatus=s)})).catch((function(a){e.sendStatus=s,t.$message.error("修改默认发货地址失败")}))},changeReceiveStatus:function(e){var t=this;console.log(e);var s=0===e.receiveStatus?1:0;d({id:e.id}).then((function(a){a.success?(t.getAddressList(),t.$message.success("修改默认收货地址成功")):(t.$message.error("修改默认收货地址失败"),e.receiveStatus=s)})).catch((function(a){e.receiveStatus=s,t.$message.error("修改默认收货地址失败")}))}}},b=h,v=(s("3256"),s("2877")),F=Object(v["a"])(b,a,o,!1,null,"3926c89e",null);t["default"]=F.exports},"9d1a":function(e,t,s){}}]);