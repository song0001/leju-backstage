<template >
  <div>
    <el-card class="card">
      <span>注册用户列表</span>
      <el-divider></el-divider>
      <el-table border :data="userList" style="width: 100%">
        <el-table-column
          fixed
          type="index"
          prop="date"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="username" label="头像" align="center">
          <template slot-scope="scope">
            <el-avatar
              style="width: 60px; height: 60px"
              size="small"
              :src="scope.row.icon"
            />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="realname" label="真实姓名" align="center">
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.sex == 0 ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" align="center">
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
import { findMembersByPage } from "@/api/user/index";
import mixin from "@/mixins/index";
export default {
  mixins: [mixin],
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      findMembersByPage(this.page.currentPage, this.page.size).then((res) => {
        console.log(res);
        if (res.success) {
          this.userList = res.data.rows;
          this.page.total = res.data.total;
        }
      });
    },
    // 改变每页显示数量
    handleSizeChange(val) {
      this.page.size = val;
      this.page.currentPage = 1;
      this.init();
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/myScss.scss";
</style>