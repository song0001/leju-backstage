<template>
  <div class="user-main">
    <el-card class="search-bar card" shadow="never">
      <el-form
        ref="searchForm"
        :model="search"
        label-width="80px"
        :inline="false"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="昵称" size="mini" prop="nickName">
              <el-input
                v-model="search.nickName"
                placeholder="昵称模糊搜索"
                size="mini"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="用户名" size="mini" prop="username">
              <el-input
                v-model="search.username"
                placeholder="用户名模糊搜索"
                size="mini"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-button
              type="default"
              size="mini"
              @click="doReset"
            >重置</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="doSearch"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <div class="container">
      <el-card class="card" shadow="never">
        <div slot="header">
          <el-button type="primary" size="small" @click="goAdd">新增</el-button>
        </div>
        <el-table v-loading="loading" :data="userList" border stripe>
          <el-table-column label="#" type="index" width="50" fixed />
          <el-table-column label="用户名" prop="username" width="200" fixed />
          <el-table-column label="昵称" prop="nick_name" width="200" />
          <el-table-column label="头像" width="200">
            <template slot-scope="scope">
              <img class="avatar-img" :src="scope.row.salt" alt="">
            </template>
          </el-table-column>
          <el-table-column label="角色" prop="roles" />
          <el-table-column label="添加时间" prop="create_time" width="200" />
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="goEdit(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="doDel(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px; text-align: right"
          :current-page.sync="page.start"
          :page-sizes="page.sizes"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalCount"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </el-card>
    </div>
    <UserForm ref="userForm" :role-list="roleList" @refresh="getUserList" />
  </div>
</template>

<script>
import userApi from '@/api/auth/user'
import roleApi from '@/api/auth/role'
import UserForm from './components/UserForm'
export default {
    name: 'AuthUser',
    components: {
        UserForm
    },
    data() {
        return {
            loading: false,
            search: {
                username: ''
            },
            userList: [],
            roleList: [], // 所有角色列表
            page: {
                start: 1,
                limit: 10,
                sizes: [10, 20, 30, 40],
                totalCount: 0
            }
        }
    },
    created() {
        this.getUserList()
        this.getRoleList()
    },
    methods: {
        getRoleList() {
            roleApi.findAllRoles()
                .then(res => {
                    this.roleList = res.data.items
                })
        },
        getUserList() {
            this.loading = true
            userApi.findUsersByPage(this.page.start, this.page.limit).then((res) => {
                if (res.success) {
                    this.userList = res.data.rows
                    this.page.totalCount = res.data.total
                } else {
                    this.$message.error(res.message)
                }
                this.loading = false
            })
        },
        goAdd() {
            this.$refs.userForm.openDialog()
        },
        goEdit(id) {
            this.$refs.userForm.openDialog(id)
        },
        doDel(id) {
            this.$confirm('确认删除?').then((res) => {
                userApi.removeUser(id).then((res) => {
                    if (res.success) {
                        this.$message.success('删除成功!')
                        this.getUserList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            })
        },
        doReset() {
            // 重置表单  前提:prop属性必须存在
            this.$refs.searchForm.resetFields()
        },
        doSearch() {},
        sizeChange(v) {},
        currentChange(v) {}
    }
}
</script>

<style lang="scss" scoped>
.user-main {
  .card {
    margin: 30px;
  }
  .avatar-img {
    width: 120px;
    height: 80px;
  }
}
</style>
