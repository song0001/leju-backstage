<template>
  <div class="role-form">

    <el-dialog
      title="编辑角色"
      :visible.sync="dialog"
      width="30%"
      @close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" size="small" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="form.roleCode" size="small" />
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input v-model="form.remark" type="textarea" size="small" />
        </el-form-item>
        <el-form-item label="选择菜单">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-checkbox v-model="isExpand" :indeterminate="false" @change="handelExpand">展开/关闭</el-checkbox>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-checkbox v-model="isSelectAll" :indeterminate="false" @change="handleSelectAll">全选/取消权限</el-checkbox>
            </el-col>
          </el-row>
          <!-- 选择菜单 -->
          <el-tree ref="tree" v-loading="treeLoad" node-key="id" show-checkbox :data="menuList" :props="defaultProps" />

        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="doSave">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import permissionApi from '@/api/auth/permission'
import roleApi from '@/api/auth/role'
export default {
    name: 'AuthUser',
    props: {
        menuList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            treeLoad: false,
            dialog: false,
            isExpand: false,
            isSelectAll: false,
            defaultProps: {
                label: 'title',
                children: 'children'
            },
            form: {},
            rules: {
                roleName: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ],
                menuIds: []
            },
            selectKeys: []
        }
    },
    created() {

    },
    methods: {
        openDialog(id) {
            this.dialog = true
            // 如果有id 是编辑
            if (id) {
                this.treeLoad = true
                roleApi.getRolePermissions(id)
                    .then(res => {
                        if (res.success) {
                            if (res.data.role.permissionIds) {
                                this.$refs.tree.setCheckedKeys(res.data.role.permissionIds)
                                // 避免form的无效数据
                                delete res.data.role.permissionIds
                            }
                            this.form = res.data.role
                        } else {
                            this.$message.error('查询失败!')
                        }
                        this.treeLoad = false
                    })
            }
        },
        handleClose() {
            this.dialog = false
            this.$refs.form.resetFields()
            this.$refs.tree.setCheckedKeys([])
        },
        // 执行保存
        doSave() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    var api = null

                    var role = {
                        ... this.form,
                        // 不包含半选
                        permissionIds: this.$refs.tree.getCheckedKeys()
                    }
                    if (role.id) {
                        api = roleApi.updateRolePermissions
                    } else {
                        api = roleApi.saveRolePermissions
                    }
                    api(role)
                        .then(res => {
                            if (res.success) {
                                this.$message.success('保存成功!')
                                this.handleClose()
                                this.$emit('refresh')
                            } else {
                                this.$message.error('保存失败!')
                            }
                        })
                } else {
                    this.$message.error('请注意表单验证!')
                    return false
                }
            })
        },
        handelExpand(v) {
            this.setAllExpand(v)
        },
        setAllExpand(state) {
            var nodes = this.$refs.tree.store.nodesMap
            for (var i in nodes) {
                nodes[i].expanded = state
            }
        },
        handleSelectAll(v) {
            if (v) {
                this.seltAllSelect(this.menuList)
                this.$refs.tree.setCheckedKeys(this.selectKeys)
            } else {
                this.$refs.tree.setCheckedKeys([])
            }
        },
        // 递归处理
        seltAllSelect(menuList) {
            for (var i = 0; i < menuList.length; i++) {
                var item = menuList[i]
                this.selectKeys.push(item.id)
                if (item.children && item.children.length > 0) {
                    this.seltAllSelect(item.children)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .role-form{

  }
</style>
