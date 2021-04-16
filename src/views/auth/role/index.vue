<template>
  <div class="user-main">

    <div class="container">
      <el-card class="card" shadow="never">
        <div slot="header">
          <el-button type="primary" size="small" @click="goAdd">新增角色</el-button>
        </div>
        <el-table :data="roleList" border stripe>
          <el-table-column
            label="#"
            type="index"
            width="50"
            fixed
          />
          <el-table-column
            label="角色名称"
            prop="roleName"
            width="200"
            fixed
          />
          <el-table-column
            label="角色编码"
            prop="roleCode"
            width="200"
          />

          <el-table-column
            label="备注"
            prop="remark"
          />
          <el-table-column
            label="添加时间"
            prop="createTime"
            width="200"
          />
          <el-table-column
            label="操作"
            prop="nickName"
            width="300"
          >
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
              <el-button type="error" size="mini" @click="goDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px;text-align:right;"
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
    <RoleForm ref="roleForm" :menu-list="menuList" @refresh="getRoleList" />

  </div>
</template>

<script>
import roleApi from '@/api/auth/role'
import permissionApi from '@/api/auth/permission'
import RoleForm from './components/RoleForm'
export default {
    name: 'AuthUser',
    components: {
        RoleForm
    },
    data() {
        return {
            search: {
                username: 'abc'
            },
            roleList: [],
            page: {
                start: 1,
                limit: 10,
                sizes: [10, 20, 30, 40],
                totalCount: 0
            },
            menuList: []
        }
    },
    created() {
        this.getRoleList()
        this.getAllMenuList()
    },
    methods: {
        goAdd() {
            this.$refs.roleForm.openDialog()
        },
        goEdit(id) {
            this.$refs.roleForm.openDialog(id)
        },
        getRoleList() {
            roleApi.findRolesByPage(this.page.start, this.page.limit)
                .then(res => {
                    if (res.success) {
                        this.roleList = res.data.rows
                        this.page.totalCount = res.data.total
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        doReset() {
            // 重置表单  前提:prop属性必须存在
            this.$refs.searchForm.resetFields()
        },
        doSearch() {

        },
        sizeChange(v) {

        },
        currentChange(v) {

        },
        // 初始化所有菜单备用
        getAllMenuList() {
            permissionApi.findAllPermissions().then((res) => {
                if (res.success) {
                    this.menuList = res.data.menus
                } else {
                    this.$message.error('获取数据失败!')
                }
                this.loading = false
            })
        },
        goDel(id) {
            this.$confirm('确认删除角色?')
                .then(res => {
                    roleApi.removeRole(id)
                        .then(res => {
                            if (res.success) {
                                this.$message.success('删除成功!')
                                this.getRoleList()
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                })
        }

    }
}
</script>

<style lang="scss" scoped>
  .user-main{
    .card{
      margin: 30px;
    }
    .avatar-img{
      width: 120px;
      height: 80px;
    }
  }
</style>
