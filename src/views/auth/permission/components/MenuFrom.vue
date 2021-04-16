<template>
  <div class="menu-form">
    <el-dialog
      title="编辑菜单"
      :visible.sync="dialog"
      width="50%"
      @close="handleClose"
    >
      <div style="margin-bottom: 22px;">
        <label style="width: 80px;padding-right: 12px;">菜单类型 </label>
        <el-radio-group v-model="menuType">
          <el-radio key="1" :label="1">顶级目录</el-radio>
          <el-radio key="2" :label="2">菜单</el-radio>
          <el-radio key="3" :label="3">按钮</el-radio>
        </el-radio-group>
      </div>

      <TopMenuForm v-if="menuType === 1" ref="form_tab1" key="1" />
      <NormalMenuForm v-if="menuType === 2" ref="form_tab2" key="2" :menu-options="optionsCom" />
      <BtnMenuForm v-if="menuType === 3" ref="form_tab3" key="3" :menu-options="optionsCom" />
      <span slot="footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="doSave">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import permissionApi from '@/api/auth/permission'
import TopMenuForm from './TopMenuForm'
import NormalMenuForm from './NormalMenuForm'
import BtnMenuForm from './BtnMenuForm'
export default {
    name: 'MenuForm',
    components: {
        TopMenuForm,
        NormalMenuForm,
        BtnMenuForm
    },
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            menuType: 1, // 选择菜单的类型
            menu: {
                sort: 0
            },
            menuTree: [],
            metaList: [
                {
                    key: 'title',
                    value: '未命名'
                }
            ], // meta属性列表
            rules: {
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                name: [{ required: true, message: 'name不能为空', trigger: 'blur' }],
                path: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
                component: [
                    { required: true, message: '组建不能为空', trigger: 'blur' }
                ],
                permissionValue: [
                    { required: true, message: '权限标识不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        optionsCom() {
            // 去掉空children 并且禁止最后一项
            var menus = _.cloneDeep(this.options)
            this.rebuildMenuTree(menus)
            return menus
        }
    },
    created() {
    // 初始化menuTree
    },
    methods: {
        openDialog() {
            this.dialog = true
        },
        handleClose() {
            this.dialog = false
        },
        doSave() {
            var currentComponent = this.$refs[`form_tab${this.menuType}`]
            var formComponent = currentComponent.$refs.form
            formComponent.validate(v => {
                if (v) {
                    var menuData = currentComponent.formatSubmitData()
                    permissionApi.savePermission(menuData).then((res) => {
                        if (res.success) {
                            this.$message.success('保存成功!')
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$message.error('请注意表单验证!')
                }
            })
        },
        doSave2() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    var rsMenu = {}
                    if (this.menuType === 1) {
                        // 合并属性
                        Object.assign(this.menu, rsMenu)
                        // 设置pid属性
                        this.menu.pId = '0'
                        delete rsMenu.title
                        delete rsMenu.permissionValue
                    } else if (this.menuType === 2) {
                        // 获取menuTree值
                        var menuSelNodes = this.$refs.menuTree.getCheckedNodes()
                        if (menuSelNodes && menuSelNodes.length > 0) {
                            // 因为id被覆盖 变成了value
                            rsMenu.pId = menuSelNodes[0].value
                            rsMenu.level = menuSelNodes[0].level + 1
                            console.log(menuSelNodes)
                        }
                        if (!this.menu.pId) {
                            this.$message.error('父类菜单必选!')
                            return
                        }
                        Object.assign(this.menu, rsMenu)

                        delete rsMenu.title
                        delete rsMenu.permissionValue
                    } else {
                        // 按钮类型
                        rsMenu = {
                            type: 2,
                            pId: this.menu.pId,
                            title: this.menu.title,
                            sort: this.menu.sort,
                            permissionValue: this.menu.permissionValue
                        }
                    }
                    // 再次构建 设置meta
                    if (this.menuType != 3) {
                        rsMenu.type = 1
                        for (var i = 0; i < this.metaList.length; i++) {
                            var item = this.metaList[i]
                            if (item.key || item.value) {
                                if (!rsMenu.meta) {
                                    rsMenu.meta = {}
                                }
                                rsMenu.meta[item.key] = item.value
                            }
                        }
                        if (rsMenu.meta) {
                            rsMenu.title = rsMenu.meta.title
                            // 后台接收字符串类型meta 必须是json格式
                            rsMenu.meta = JSON.stringify(rsMenu.meta)
                        }
                    }
                    console.log(rsMenu)
                    permissionApi.savePermission(rsMenu).then((res) => {
                        if (res.success) {
                            this.$message.success('保存成功!')
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$message.error('请注意表单验证!')
                    return false
                }
            })
        },
        menuTreeChange(v) {
            console.log(v)
        },
        rebuildMenuTree(menus) {
            for (var i = 0; i < menus.length; i++) {
                var item = menus[i]
                if (item.type == 2) {
                    item.disabled = true
                }
                if (item.children && item.children.length == 0) {
                    delete item.children
                } else {
                    this.rebuildMenuTree(item.children)
                }
            }
        },
        createMetaItem() {
            this.metaList.push({
                tempId: new Date().getTime(),
                key: '',
                value: ''
            })
        },
        removeMetaItem(tempId) {
            this.metaList = this.metaList.filter((item) => item.tempId != tempId)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
