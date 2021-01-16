<template >
  <div>
    <el-card class="card" shadow="never">
      <!-- <div slot="header">
        <span> 条件查询</span>
      </div> -->
      <el-form
        :model="searchForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input
                v-model="searchForm.nick_name"
                size="mini"
                placeholder="昵称模糊搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="searchForm.username"
                size="mini"
                placeholder="用户名模糊搜索"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="right">
            <el-form-item>
              <el-button @click="resetForm" size="mini">重置</el-button>
              <el-button type="primary" @click="searchOrder" size="mini"
                >搜索</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 用户列表 -->
    <el-card class="card">
      <div slot="header">
        <el-button type="primary" size="mini">新增</el-button>
      </div>
      <el-table border :data="userInfoList" style="width: 100%">
        <el-table-column
          fixed="left"
          type="index"
          prop="date"
          label="#"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="120"
        >
        </el-table-column>
         <el-table-column label="昵称" prop="nick_name" width="200" align="center" />
          <el-table-column label="头像" width="300" align="center">
            <template slot-scope="scope">
              <img class="avatar-img" :src="scope.row.salt" alt="">
            </template>
          </el-table-column>
          <el-table-column label="角色" prop="roles" align="center" width="300" />
          <el-table-column label="添加时间" prop="create_time"  align="center"  />
    
      
       
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
  findUsersByPage,
  removeUser,
  saveUserRoles,
  updateUserRoles,
  user
} from '@/api/auth/user'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      searchForm: {
       nick_name:'',
       username:''
      },
      userInfoList:[]
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 搜索订单
    searchOrder() {
      this.page.currentPage = 1
      this.getUserInfo()
    },
    // 获取用户信息
    getUserInfo() {
      findUsersByPage(
        this.page.currentPage,
        this.page.size
      ).then((res) => {
        console.log(res)
        this.userInfoList = res.data.rows
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
      this.getUserInfo()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getUserInfo()
    },
    // 重置表单
    resetForm() {
      this.searchForm = this.$options.data().searchForm
    }
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