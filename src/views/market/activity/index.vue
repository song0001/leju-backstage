<template >
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <el-table border :data="list" style="width: 100%">
        <el-table-column
          v-loading="loading"
          fixed="left"
          type="index"
          prop="date"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="商品图片"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>

        <el-table-column
          prop="productSn"
          label="活动时间"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <p>开始时间: {{ scope.row.promotionStartTime }}</p>
            <p>结束时间: {{ scope.row.promotionEndTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productSn"
          label="是否过期"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <p>
              {{
                isJudgeTime(
                  scope.row.promotionEndTime,
                  scope.row.promotionStartTime
                )
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称"
          align="center"
          width="250"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="350"
        >
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row)">
              <span style="color: red">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {
  addRecommend,
  delRecommend,
  findAllRecommends,
  updateRecommend,
} from "@/api/market/index";
export default {
  data() {
    return {
      loading: false,
      list: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      findAllRecommends().then((res) => {
        console.log(res);
        if (res.success) {
          this.list = res.data.items;
        }
        this.loading = false;
      });
    },
    // 新增活动
    add() {},
    del(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRecommend(row.recommendId).then((res) => {
            if (res.success) {
              this.init()
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }else{
                 this.$message.error(res.message)
            }
          });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    // 是否过期
    isJudgeTime(startTime, endTime) {
      var num = new Date().getTime() - new Date(endTime).getTime();
      return num > 0 ? "过期" : "否";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/myScss.scss";
.table_img {
  width: 100px;
  height: 100px;
}
</style>