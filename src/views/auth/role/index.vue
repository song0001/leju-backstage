<template >
  <div>
    <el-card class="card" shadow="never">

    </el-card>
    <!-- 角色列表 -->
    <el-card class="card">
      <div slot="header">
        <el-button type="primary" size="mini">新增角色</el-button>
      </div>
      <el-table border :data="userRoleList" style="width: 100%">
        <el-table-column
          fixed="left"
          type="index"
          prop="date"
          label="#"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
          width="120"
        >
        </el-table-column>
         <el-table-column label="角色编码" prop="roleCode" width="200" align="center" />
          
          <el-table-column label="备注" prop="remark" align="center" width="300" />
          <el-table-column label="添加时间" prop="createTime"  align="center"  />
        <el-table-column label="操作" width="300"  align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import {
    findRolesByPage,
    removeRole,
    saveRolePermissions,
    updateRolePermissions,
    findAllRoles,
    role
} from '@/api/auth/role'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      userRoleList:[]
    }
  },
  created() {
    this.getRoleInfo()
  },
  methods: {
    // 获取角色信息
    getRoleInfo() {
      findRolesByPage(
        this.page.currentPage,
        this.page.size
      ).then((res) => {
        console.log(res)
        this.userRoleList = res.data.rows
        this.page.total = res.data.total
      })
    },
    edit(row) {
      //编辑
      console.log(row)
    },
    del(row) {
      //删除
      console.log(row)
    },

    // 改变每页显示数量
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.getRoleInfo()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getRoleInfo()
    },
 
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.avatar-img{
  width: 100px;
  height: 100px;
}
</style>