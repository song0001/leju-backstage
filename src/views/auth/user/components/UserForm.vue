<template>
  <div class="user-form">
    <el-dialog
      title="编辑用户"
      :visible.sync="dialog"
      width="30%"
      @close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :readonly="form.id.length>0" size="small" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" size="small" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="密码">
          <el-input v-model="form.password" type="password" size="small" />
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="/lejuAdmin/material/uploadFileOss"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-avatar icon="el-icon-user-solid" :src="form.salt" />

          </el-upload>
        </el-form-item>
        <el-form-item label="选择角色" prop="username">
          <el-select v-model="form.roleIds" size="small" value-key="id" clearable multiple>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>

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

import userApi from '@/api/auth/user'
import { resetData } from '@/utils/index'
export default {
    name: 'AuthUser',
    props: {
        roleList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            treeLoad: false,
            dialog: false,
            form: {
                id: '',
                salt: '',
                roleIds: []
            },
            rules: {
                username: [
                    { required: true, message: '用户名名称不能为空', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }

        }
    },
    computed: {
        headers() {
            return {
                token: localStorage.getItem('token')
            }
        }
    },
    created() {

    },

    methods: {
        openDialog(id) {
            this.dialog = true
            // console.log('form.id', form.id)
            // 如果有id 是编辑
            if (id) {
                this.treeLoad = true
                userApi.findUserInfo(id).then((res) => {
                    if (res.success) {
                        this.form = res.data.user
                    } else {
                        this.$message.error('查询失败!')
                    }
                    this.treeLoad = false
                })
            }
        },
        handleClose() {
            this.dialog = false
            // this.$refs.form.resetFields()
            resetData(this, 'form')
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
            if (res.success) {
                this.form.salt = res.data.fileUrl
            } else {
                this.$message.error(res.message)
            }
        },
        beforeAvatarUpload(file) {
            var reg = /image\/(jpeg|png|gif|webp)/ig
            const isTypeOk = reg.test(file.type)
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isTypeOk) {
                this.$message.error('上传头像图片只能是 jpeg|png|gif|webp 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isTypeOk && isLt2M
        },
        // 执行保存
        doSave() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    var api = null
                    if (this.form.id) {
                        api = userApi.updateUserRoles
                    } else {
                        api = userApi.saveUserRoles
                    }
                    api(this.form)
                        .then(res => {
                            if (res.success) {
                                this.$message.success('保存成功!')
                                this.handleClose()
                                this.$emit('refresh')
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                } else {
                    this.$message.error('请注意表单验证!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-form {

}
</style>
