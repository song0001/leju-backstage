<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
    <el-form-item label="所在页面" prop="pid">
      <el-cascader
        ref="menuTree"
        v-model="form.pid"
        :options="menuOptions"
        size="small"
        :props="{ expandTrigger: 'hover', emitPath: false, checkStrictly: true , label: 'title', value: 'id' }"
        clearable
        @change="menuTreeChange"
      />
    </el-form-item>
    <el-form-item label="按钮名称" prop="title">
      <el-input v-model="form.title" size="small" placeholder="按钮名称,比如: 新增" />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-form-item label="排序">
          <el-input-number
            v-model.number="form.sort"
            size="small"
            placeholder="排序:值越大,越靠前"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-form-item label="层级">
          <el-input-number
            v-model.number="form.level"
            size="small"
            placeholder="层级"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item prop="permissionValue" label="权限标识" size="normal">
      <el-input v-model="form.permissionValue" type="textarea" placeholder="按钮权限标识,比如: productList.list" size="normal" clearable />
    </el-form-item>
  </el-form>

</template>

<script>
export default {
    name: 'BtnMenuForm',
    props: {
        menuOptions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            form: {
                pid: '',
                type: 2,
                sort: 0,
                level: 0
            },
            rules: {
                pid: [{ required: true, message: '页面id不能为空', trigger: 'blur' }],
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                permissionValue: [
                    { required: true, message: '权限标识不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        removeMetaItem(tempId) {
            this.metaList = this.metaList.filter(item => item.tempId != tempId)
        },
        menuTreeChange(v) {
            console.log(v)
        },
        /**
         * 提交的数据格式  参考: menu.d.js  { topMenuModel }
         */
        formatSubmitData() {
            return {
                ...this.form
            }
        }
    }
}
</script>

<style>

</style>
