(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b6ed015"],{"0c6d":function(e,t,a){"use strict";a("d3b7");var s=a("bc3a"),r=a.n(s),l=a("5c96"),o=a("2f4d"),i=a("a18c"),n=r.a.create({timeout:5e3});n.interceptors.request.use((function(e){var t=Object(o["b"])();return t&&(e.headers["token"]=t),e}),(function(e){return console.log(e),Promise.reject(e)})),n.interceptors.response.use((function(e){var t=e.data;return 20002==t.code&&(Object(o["a"])(),i["b"].push("/login")),t}),(function(e){return console.log("err"+e),Object(l["Message"])({message:e.message,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=n},"1b62":function(e,t,a){"use strict";var s=a("2f4d");t["a"]={data:function(){return{page:{currentPage:1,size:10,pageSizes:[10,20,30,40],total:0},uploadUrl1:"/lejuAdmin/material/uploadFileOss",uploadUrl:"/lejuAdmin/material/uploadFileOssSave",uploadHeaders:{token:Object(s["b"])()}}}}},"7e17":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"card",attrs:{shadow:"never"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.add}},[e._v("新增")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.adsList}},[a("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{fixed:"left",type:"index",prop:"date",label:"序号",align:"center"}}),a("el-table-column",{attrs:{label:"广告图片",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticClass:"table_img",attrs:{src:e.row.pic}})]}}])}),a("el-table-column",{attrs:{prop:"productSn",label:"时间",align:"center",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v("开始时间: "+e._s(t.row.startTime))]),a("p",[e._v("结束时间: "+e._s(t.row.endTime))])]}}])}),a("el-table-column",{attrs:{prop:"name",label:"广告名称",align:"center",width:"150"}}),a("el-table-column",{attrs:{prop:"clickCount",label:"点击数",align:"center",width:"150"}}),a("el-table-column",{attrs:{prop:"orderCount",label:"下单数",align:"center",width:"150"}}),a("el-table-column",{attrs:{align:"center",prop:"type",label:"轮播位置",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.type?a("p",[e._v("首页轮播")]):a("p",[e._v("其他")])]}}])}),a("el-table-column",{attrs:{prop:"url",label:"链接地址",align:"center",width:"150"}}),a("el-table-column",{attrs:{prop:"note",label:"备注",align:"center",width:"150"}}),a("el-table-column",{attrs:{align:"center",label:"上下线状态",width:150},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(" "+e._s(1===t.row.status?"上线":"下线")+" ")])]}}])}),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.edit(t.row)}}},[a("span",[e._v("编辑")])]),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.del(t.row)}}},[a("span",{staticStyle:{color:"red"}},[e._v("删除")])])]}}])})],1)],1),a("el-dialog",{attrs:{title:"广告详情",visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"广告名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"广告名称"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注",prop:"note"}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:e.addForm.note,callback:function(t){e.$set(e.addForm,"note",t)},expression:"addForm.note"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{attrs:{placeholder:"排序"},model:{value:e.addForm.sort,callback:function(t){e.$set(e.addForm,"sort",t)},expression:"addForm.sort"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产品数量",prop:"orderCount"}},[a("el-input",{attrs:{placeholder:"产品数量"},model:{value:e.addForm.orderCount,callback:function(t){e.$set(e.addForm,"orderCount",t)},expression:"addForm.orderCount"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"链接",prop:"url"}},[a("el-input",{attrs:{placeholder:"链接"},model:{value:e.addForm.url,callback:function(t){e.$set(e.addForm,"url",t)},expression:"addForm.url"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"首页轮播位置",prop:"type"}},[a("el-select",{attrs:{placeholder:"订单状态"},model:{value:e.addForm.type,callback:function(t){e.$set(e.addForm,"type",t)},expression:"addForm.type"}},[a("el-option",{attrs:{label:"APP首页轮播",value:"0"}}),a("el-option",{attrs:{label:"1",value:"1"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"上下线状态",prop:"status"}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,placeholder:"上下线状态"},model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开始时间",prop:"startTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间"},model:{value:e.addForm.startTime,callback:function(t){e.$set(e.addForm,"startTime",t)},expression:"addForm.startTime"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"结束时间",prop:"endTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间"},model:{value:e.addForm.endTime,callback:function(t){e.$set(e.addForm,"endTime",t)},expression:"addForm.endTime"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{size:"mini",label:"图片",prop:"pic"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl1,headers:e.uploadHeaders,"show-file-list":!1,"on-success":e.handleBigPicSuccess}},[e.addForm.pic?a("img",{staticClass:"avatar",attrs:{src:e.addForm.pic}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),a("el-row",[a("el-col",{staticClass:"footer",attrs:{span:6}},[a("el-form-item",[a("span",{staticClass:"dialog-footer"},[a("el-button",{on:{click:function(t){return e.resetForm("addFormRef")}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("addFormRef")}}},[e._v("确 定")])],1)])],1)],1)],1)],1)],1)},r=[],l=a("0c6d");function o(e){return Object(l["a"])({url:"/lejuAdmin/advertise/addAds",method:"post",data:e})}function i(){return Object(l["a"])({url:"/lejuAdmin/advertise/adsList",method:"get"})}function n(e){return Object(l["a"])({url:"/lejuAdmin/advertise/delAds/".concat(e),method:"delete"})}function d(e){return Object(l["a"])({url:"/lejuAdmin/advertise/updateAds",method:"post",data:e})}var c=a("1b62"),u={mixins:[c["a"]],data:function(){return{loading:!1,adsList:[],dialogVisible:!1,isEdit:!1,addForm:{name:"",note:"",sort:"",orderCount:"",url:"",type:"",status:"",startTime:"",endTime:"",pic:""},addFormRules:{name:[{required:!0,message:"请输入用户名称",trigger:"blur"}]}}},created:function(){this.getAdsList()},methods:{getAdsList:function(){var e=this;this.loading=!0,i().then((function(t){console.log("广告列表",t),e.adsList=t.data.items,e.loading=!1}))},add:function(){this.isEdit=!1,this.dialogVisible=!0,this.addForm=this.$options.data().addForm},edit:function(e){this.dialogVisible=!0,console.log(e),this.isEdit=!0,this.addForm=e,console.log(this.isEdit)},del:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n(e.id).then((function(e){e.success?(t.getAdsList(),t.$message({type:"success",message:"删除成功!"})):t.$message.error(e.message)}))})).catch((function(e){console.log(e)}))},handleBigPicSuccess:function(e){console.log(e),this.addForm.pic=e.data.fileUrl},submitForm:function(e){var t=this;this.$refs[e].validate((function(a){if(!a)return t.$message.error("请填写必要信息"),!1;t.$confirm("是否确认".concat(t.isEdit?"修改":"新增","广告"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.isEdit?d(t.addForm).then((function(a){console.log(a),a.success?(t.getAdsList(),t.dialogVisible=!1,t.isEdit=!1,t.$refs[e].resetFields(),t.$message({type:"success",message:"修改成功!"})):t.$message.error(a.message)})):o(t.addForm).then((function(a){console.log(a),a.success?(t.getAdsList(),t.dialogVisible=!1,t.$refs[e].resetFields(),t.$message({type:"success",message:"添加成功!"})):t.$message.error(a.message)}))})).catch((function(e){console.log(e)}))}))},resetForm:function(e){this.$refs[e].resetFields(),this.dialogVisible=!1,this.isEdit=!1}}},m=u,p=(a("7f1c"),a("2877")),f=Object(p["a"])(m,s,r,!1,null,"f1a07858",null);t["default"]=f.exports},"7f1c":function(e,t,a){"use strict";a("d672")},d672:function(e,t,a){}}]);