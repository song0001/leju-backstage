<template>
  <div class="article-main">
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="作者" prop="author">
                <el-input
                  v-model="ruleForm.author"
                  placeholder="作者"
                  label-width="100px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input
                  v-model="ruleForm.title"
                  placeholder="标题"
                  label-width="100px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="编辑类型" prop="editorType">
                <el-select v-model="ruleForm.editorType" placeholder="编辑类型">
                  <el-option label="富文本" :value="0"></el-option>
                  <el-option label="markDown" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="18">
              <el-form-item>
                <el-button size="mini" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="submitForm('ruleForm')"
                  >搜索</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="card">
      <el-button type="primary" size="mini" @click="addContent">新增</el-button>
      <el-divider></el-divider>
      <el-table
        v-loading="listLoading"
        :data="articleList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
          fixed="left"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          align="center"
          prop="title"
          label="文章标题"
          width="250"
        >
        </el-table-column>
        <!-- 显示文章图片 -->
        <el-table-column label="展示图片" align="center" width="200">
          <template slot-scope="scope">
            <img class="list_img" :src="scope.row.coverImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center">
        </el-table-column>
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="200"
        >
        </el-table-column>
        <!-- 文章是否展示 -->
        <el-table-column label="文章是否展示" align="center" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              :active-value="1"
              :inactive-value="0"
              @change="showChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 内容 -->
        <el-table-column label="内容" align="center" width="200">
          <template slot-scope="scope">
            <el-tag>{{
              scope.row.editorType == 0 ? "富文本框" : "Markdown"
            }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)"
              >编辑文章</el-button
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
  getArticleList,
  delArticle,
  changeShowStatus,
} from "@/api/content/article";
import mixin from "@/mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      listLoading: false, // 文章列表加载动画
      articleList: [], // 文章数据数组
      ruleForm: {
        author: "",
        title: "",
        editorType: "",
      },
    };
  },

  created() {
    // 取出当前页面
    this.page.currentPage = Number(localStorage.getItem("pagination")) || 1;
    this.init();
  },
// 刷新页面保持当前页面 不重置为第一页
  beforeUpdate() {
    localStorage.setItem("pagination", this.page.currentPage);
  },
  beforeDestroy() {
    localStorage.setItem("pagination", "1");
  },
  methods: {
    init() {
      this.listLoading = true;
      // 获取文章列表
      getArticleList(this.page.currentPage, this.page.size, this.ruleForm).then(
        (res) => {
          console.log(res);
          if (res.success) {
            this.articleList = res.data.rows;
            // 声明多少条数据
            this.page.total = res.data.total;
          } else {
            this.$message.error("请求失败");
          }
          this.listLoading = false;
        }
      );
    },
    handleSizeChange(e) {
      console.log(e);
      this.page.size = e;
      this.page.currentPage = 1;
      this.init();
    },
    handleCurrentChange(e) {
      //  console.log(e)
      this.page.currentPage = e;
      this.init();
    },
    // 修改文章
    edit(row) {
      this.$router.push({ name: "EditArticle", params: { id: row.id } });
    },
    // 删除
    del(row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delArticle(row.id).then((res) => {
          if (res.success) {
            // 删除成功以后再刷新 table
            this.init();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        });
      });
    },
    // 重置表单
    resetForm(ruleForm) {
      console.log(111);
      this.$refs[ruleForm].resetFields();
    },
    // 搜索
    submitForm() {
      // 每次模糊查询时,应该让我们的分页变成第一页
      this.page.currentPage = 1;
      this.init();
    },
    // 更新文章显示状态
    showChange(row) {
      changeShowStatus({
        id: row.id,
        isShow: row.isShow,
      }).then((res) => {
        // console.log(res);
        var tempStatus = row.isShow === 0 ? 1 : 0;
        if (res.success) {
          this.$message.success("更新文章状态成功");
        } else {
          this.$message.error("更新显示状态失败");
          row.isShow = tempStatus;
        }
      });
    },
    // 新增文章
    addContent() {
      this.$router.push("addArticle");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/myScss";
.article-main {
  .list_img {
    width: 100px;
    height: 100px;
  }
}
</style>