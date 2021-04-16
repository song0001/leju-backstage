<template>
  <div class="top-menu-form">

    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="路由名称" prop="name">
        <el-input
          v-model="form.name"
          size="small"
          :rules="rules.name"
          placeholder="前端路由name,唯一"
        />
      </el-form-item>

      <el-form-item label="路径" prop="path">
        <el-input
          v-model="form.path"
          size="small"
          :rules="rules.path"
          placeholder="前端路由path,忽略父节点路径"
        />
      </el-form-item>
      <el-form-item label="组建路径" prop="component">
        <el-input
          v-model="form.component"
          :rules="rules.component"
          size="small"
          placeholder="前端路由组件路径,比如@/views/foo/foo.vue"
        />
      </el-form-item>
      <el-form-item label="重定向">
        <el-input
          v-model.number="form.redirect"
          size="small"
          placeholder="redirect属性"
        />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          v-model.number="form.sort"
          size="small"
          placeholder="排序:值越大,越靠前"
        />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="是否隐藏">
            <el-radio-group v-model="form.hidden">
              <el-radio :label="true">
                否
              </el-radio>
              <el-radio :label="false">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="是否展开">
            <el-radio-group v-model="form.alwaysShow">
              <el-radio :label="false">
                否
              </el-radio>
              <el-radio :label="true">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="meta属性" size="normal">
        <el-row
          v-for="meta in metaList"
          :key="meta.tempId"
          style="margin-left: 0"
          :gutter="30"
        >
          <el-col style="padding-left: 0" :span="9">
            <el-input
              v-model="meta.key"
              placeholder="meta的key"
              size="mini"
              clearable
            />
          </el-col>
          <el-col :span="9" :offset="0">
            <el-input
              v-model="meta.value"
              :placeholder="meta.placeholder"
              size="mini"
              clearable
            />
          </el-col>
          <el-col :span="6" :offset="0">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-plus"
              @click="createMetaItem"
            />
            <el-button
              v-if="!meta.hiddenDel"
              type="text"
              style="color: red"
              size="mini"
              icon="el-icon-minus"
              @click="removeMetaItem(meta.tempId)"
            />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
    name: 'TopMenuForm',
    data() {
        return {
            metaList: [
                {
                    key: 'title',
                    value: '未命名',
                    placeholder: '比如商品管理',
                    hiddenDel: true
                },
                {
                    key: 'icon',
                    value: 'el-icon-menu',
                    placeholder: '比如 el-icon-menu',
                    hiddenDel: true
                }
            ],
            form: {
                pid: '0',
                type: 1,
                level: 0,
                hidden: false,
                alwaysShow: false, // 默认展开 false
                sort: 0,
                meta: {}
            },
            rules: {
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                name: [{ required: true, message: 'name不能为空', trigger: 'blur' }],
                path: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
                component: [
                    { required: true, message: '组建不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {

    },
    methods: {
        createMetaItem() {
            this.metaList.push({
                tempId: new Date().getTime(),
                key: '',
                value: ''
            })
        },
        removeMetaItem(tempId) {
            this.metaList = this.metaList.filter(item => item.tempId != tempId)
        },
        /**
         * 提交的数据格式  参考: menu.d.js  { topMenuModel }
         */
        formatSubmitData() {
            this.metaList.forEach(item => {
                this.form.meta[item.key] = item.value
            })
            var { icon, title } = this.form.meta
            // 序列化meta
            this.form.meta = JSON.stringify(this.form.meta)
            return {
                ...this.form,
                icon,
                title
            }
        }
    }
}
</script>

<style>
</style>
