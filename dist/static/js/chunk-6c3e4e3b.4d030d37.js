(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c3e4e3b"],{4868:function(t,i,e){},"58e4":function(t,i,e){"use strict";e("4868")},"6f30":function(t,i,e){"use strict";e("e8da")},a434:function(t,i,e){"use strict";var s=e("23e7"),n=e("23cb"),a=e("a691"),c=e("50c4"),o=e("7b0b"),l=e("65f0"),r=e("8418"),m=e("1dde"),p=e("ae40"),g=m("splice"),u=p("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,f=Math.min,h=9007199254740991,d="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!g||!u},{splice:function(t,i){var e,s,m,p,g,u,v=o(this),w=c(v.length),y=n(t,w),C=arguments.length;if(0===C?e=s=0:1===C?(e=0,s=w-y):(e=C-2,s=f(b(a(i),0),w-y)),w+e-s>h)throw TypeError(d);for(m=l(v,s),p=0;p<s;p++)g=y+p,g in v&&r(m,p,v[g]);if(m.length=s,e<s){for(p=y;p<w-s;p++)g=p+s,u=p+e,g in v?v[u]=v[g]:delete v[u];for(p=w;p>w-s+e;p--)delete v[p-1]}else if(e>s)for(p=w-s;p>y;p--)g=p+s-1,u=p+e-1,g in v?v[u]=v[g]:delete v[u];for(p=0;p<e;p++)v[p+y]=arguments[p+2];return v.length=w-s+e,m}})},e8da:function(t,i,e){},fee5:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"person-main"},[e("el-card",{staticClass:"card",attrs:{shadow:"never"}},[e("div",{staticClass:"flex_wrapper"},[e("el-card",{staticClass:"slide-left",attrs:{shadow:"never"}},[e("div",{staticClass:"slide_item head"},[e("div",{staticStyle:{"text-align":"center","margin-bottom":"10px"}},[e("el-avatar",{staticStyle:{width:"100px",height:"100px"},attrs:{size:"large",src:t.userInfo.icon}})],1),e("div",{staticClass:"text_center",staticStyle:{"font-size":"20px"}},[t._v(" "+t._s(t.userInfo.username)+" ")]),e("div",{staticClass:"text"},[e("i",{staticClass:"el-icon-collection-tag"}),t._v(" 交互专家 ")]),e("div",{staticClass:"text"},[e("i",{staticClass:"el-icon-s-check"}),t._v(" 腾讯－某某某事业群－某某平台部－某某技术部－UED ")]),e("div",{staticClass:"text"},[e("i",{staticClass:"el-icon-location-outline"}),t._v(" 深圳市南山区科技园科技中一路 ")])]),e("div",{staticClass:"slide_item"},[e("div",{staticClass:"text",staticStyle:{"font-size":"16px"}},[t._v("标签")]),e("div",{staticClass:"text"},[t._l(t.tagList,(function(i,s){return e("el-tag",{key:s,staticStyle:{"margin-right":"8px","margin-bottom":"8px"},attrs:{size:"mini"}},[t._v(t._s(i)+" "),e("i",{staticClass:"el-icon-close",on:{click:function(e){return t.deleteTag(i)}}})])})),e("span",{staticStyle:{"margin-left":"8px","margin-bottom":"8px"}},[e("span",{staticClass:"tagInput"},[e("el-input",{directives:[{name:"show",rawName:"v-show",value:t.isInput,expression:"isInput"}],staticClass:"input",attrs:{placeholder:"标签",size:"mini"},on:{blur:t.onInputBlur},model:{value:t.tag,callback:function(i){t.tag=i},expression:"tag"}})],1),e("i",{directives:[{name:"show",rawName:"v-show",value:!t.isInput,expression:"!isInput"}],staticClass:"el-icon-plus",staticStyle:{cursor:"pointer"},on:{click:t.goAdd}})])],2)]),e("div",{staticClass:"slide_item"},[e("div",{staticClass:"team"},t._l(t.teamList,(function(i){return e("div",{key:i.name,staticClass:"team_item"},[e("img",{staticClass:"teamImg",staticStyle:{"margin-top":"10px","margin-right":"10px"},attrs:{src:i.icon,alt:""}}),t._v(" "+t._s(i.name)+" ")])})),0)])]),e("el-card",{staticClass:"slide-right",attrs:{shadow:"never"}},[e("el-tabs",{model:{value:t.activeName,callback:function(i){t.activeName=i},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"文章",name:"first"}},[e("div",{staticClass:"article_wrapper"},t._l(t.article_list,(function(i,s){return e("div",{key:s,staticClass:"article_item"},[e("div",{staticClass:"text article_title"},[t._v(t._s(i.title))]),e("div",{staticClass:"text article_tag"},t._l(i.tags,(function(i,s){return e("el-tag",{key:s,staticStyle:{"margin-right":"8px","margin-bottom":"8px"},attrs:{size:"mini"}},[t._v(t._s(i)+" ")])})),1),e("div",{staticClass:"text article_content"},[t._v(t._s(i.article))]),e("div",{staticClass:"text flexRight"},[e("span",[t._v(t._s(i.time))]),e("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(i.author))])]),e("div",{staticClass:"text article_icon"},[e("span",[e("i",{staticClass:"el-icon-s-flag"}),t._v(" "+t._s(i.collection))]),e("span",{staticStyle:{margin:"0 10px"}},[t._v("丨")]),e("span",[e("i",{staticClass:"el-icon-thumb"}),t._v(" "+t._s(i.good))]),e("span",{staticStyle:{margin:"0 10px"}},[t._v("丨")]),e("span",[e("i",{staticClass:"el-icon-chat-line-round"}),t._v(" "+t._s(i.comment))])])])})),0)]),e("el-tab-pane",{attrs:{label:"项目",name:"second"}},[e("div",{staticClass:"product_wrapper"},[e("el-row",{attrs:{gutter:20}},t._l(t.product_list,(function(i,s){return e("el-col",{key:s,attrs:{span:6,offset:0}},[e("el-card",{staticClass:"product_item",staticStyle:{padding:"0"},attrs:{shadow:"hover"}},[e("img",{staticStyle:{width:"100%",height:"150px"},attrs:{src:i.img,alt:""}}),e("div",{staticClass:"title",staticStyle:{"margin-left":"5px"}},[t._v(" "+t._s(i.title)+" ")]),e("div",{staticClass:"text",staticStyle:{"margin-top":"10px","font-size":"12px",margin:"4px"}},[t._v(" "+t._s(i.content)+" ")]),e("div",{staticClass:"bottom"},[e("span",{staticStyle:{"font-size":"12px",color:"gray","margin-left":"5px"}},[t._v(" "+t._s(i.time)+" ")]),e("span",{staticStyle:{"margin-right":"5px"}},[e("div",{staticClass:"img_group"},t._l(i.visitorList,(function(t,i){return e("img",{key:t,style:{zIndex:i},attrs:{src:t,alt:""}})})),0)])])])],1)})),1)],1)])],1)],1)],1)])],1)},n=[],a=(e("a434"),e("498a"),e("2f4d")),c={data:function(){return{teamList:[{name:"腾讯UI设计组",icon:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"},{name:"腾讯前端开发组",icon:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152042345120151821.jpg"},{name:"阿里支付组",icon:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"},{name:"vue小组",icon:"https://cn.vuejs.org/images/logo.png"},{name:"全员都是吴彦祖",icon:"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"},{name:"高逼格天团",icon:"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"}],article_list:[{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222},{title:"Vue",tags:["Element","饿了么","设计语言"],article:"段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",author:"周树人",time:"2020-11-20 10:33",collection:125,good:13453,comment:222}],product_list:[{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]},{img:"https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png",title:"Tencent",content:"那是一种内在的东西， 他们到达不了，也无法触及的",time:"1天前",visitorList:["https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg","https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png","https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"]}]}}},o={mixins:[c],data:function(){return{activeName:"first",isInput:!1,tag:"",tagList:["腾讯人","学霸","专业设计","高颜值","随便","无所谓"]}},computed:{userInfo:function(){return Object(a["c"])()}},created:function(){console.log(this.userInfo)},mounted:function(){},methods:{goAdd:function(){this.isInput=!0},deleteTag:function(t){var i=this.tagList.indexOf(t);this.tagList.splice(i,1)},onInputBlur:function(){this.isInput=!1,this.tag.trim()?this.tagList.push(this.tag.trim()):console.log("空")}}},l=o,r=(e("58e4"),e("6f30"),e("2877")),m=Object(r["a"])(l,s,n,!1,null,"5e7d4c97",null);i["default"]=m.exports}}]);