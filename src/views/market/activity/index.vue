<template >
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="dialogVisible = true"
          >新增</el-button
        >
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
    <!-- dialog对话框 -->
    <el-dialog title="热销详情" :visible.sync="dialogVisible" width="80%"   style="margin-top: -100px">
      <div class="dialog-main">
        <el-card class="main" shadow="never">
          <div slot="header">
            <span>条件查询</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input
                v-model="search.name"
                size="mini"
                placeholder="商品名称/模糊查询"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="search.productSn"
                size="mini"
                placeholder="商品货号"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <!-- 通过品牌id可以查询商品 -->
              <el-select
                v-model="search.brandId"
                placeholder="品牌"
                size="mini"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="search.publishStatus"
                clearable
                size="mini"
                placeholder="上架状态"
              >
                <el-option label="上架" value="1"> </el-option>
                <el-option label="未上架" value="0"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="0">
              <el-select
                v-model="search.verifyStatus"
                class="search-input"
                size="mini"
                clearable
                placeholder="审核状态"
              >
                <el-option label="审核" value="1" />
                <el-option label="未审核" value="0" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button type="default" @click="doReset" size="mini"
                >重置</el-button
              >
              <el-button type="primary" size="mini" @click="doSearch"
                >搜索</el-button
              >
            </el-col>
          </el-row>
        </el-card>
        <!-- 商品列表 -->
        <el-card class=" table_main" shadow="never">
          <div slot="header">
            <span>商品列表</span>
          </div>
          <el-radio-group
            v-model="productId"
            style="width: 100%"
            @change="radioChange"
          >
            <el-table border :data="productList" style="width: 100%">
              <el-table-column
                v-loading="loading"
                fixed="left"
                type="index"
                prop="date"
                label="序号"
                align="center"
              >
              </el-table-column>
              <el-table-column label="选择" align="center" width="100">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id"><span /></el-radio>
                </template>
              </el-table-column>
              <el-table-column label="商品图片" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.pic" class="table_img img" />
                </template>
              </el-table-column>

              <el-table-column prop="productSn" label="商品名称" align="center">
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
                  <p>品牌: {{ scope.row.brandName }}</p>
                  <p>{{ scope.row.description }}</p>
                </template>
              </el-table-column>

              <el-table-column prop="name" label="商品价格" align="center">
                <template slot-scope="scope">
                  <p>原价: {{ scope.row.originalPrice }}</p>
                  <p>现价: {{ scope.row.price }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="productCategoryName"
                label="商品类别"
                align="center"
              >
              </el-table-column>
                <el-table-column prop="weight" label="重量" align="center" >
        </el-table-column>
            </el-table>
          </el-radio-group>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <el-dialog title="编辑限时活动" :visible.sync="isEditOpen" width="50%">
      <el-row :gutter="10">
        <el-form
          ref="form"
          :model="form"
          :inline="true"
          label-width="100px"
          size="mini"
        >
          <el-col :span="12" :offset="0">
            <el-form-item label="商品原价">
            
              <span>{{ productDetail.price }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品名称">
              <span>{{ productDetail.name }}</span>
            </el-form-item>
          </el-col>
          <!-- 需要编辑的内容 -->
          <el-col :span="12" :offset="0">
            <el-form-item label="促销价格">
              <el-input-number v-model="form.promotionPrice" class="myInput" />
            </el-form-item>
          </el-col>

          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" class="myInput" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.promotionStartTime"
                class="myInput"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.promotionEndTime"
                class="myInput"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="活动限购数量">
              <el-input v-model="form.promotionPerLimit" class="myInput" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品图片">
              <img
                style="width: 150px; height: 150px"
                :src="productDetail.pic"
                alt=""
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer">
        <el-button @click="isEditOpen = false">取消</el-button>
        <el-button
          type="primary"
          :loading="couldNext"
          @click="onSubmit"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addRecommend,
  delRecommend,
  findAllRecommends,
  updateRecommend,
} from "@/api/market/index";
import { brandList } from "@/api/product/brand/index";
import { productList } from "@/api/product/index";
import mixin from "@/mixins/index";
export default {
  mixins: [mixin],
  data() {
    return {
       // 是否显示
            isEditOpen: false,
      loading: false,
      list: [],
      dialogVisible: false, //对话框
      search: {
        //条件查询
        name: "",
        productSn: "",
        brandId:'',
        publishStatus: "",
        verifyStatus: "",
      },
      // 品牌列表
      brandList: [],
      // 商品列表
      productList: [],
       couldNext: false, // 是否可以下一步
      productId: "", // radio选中 商品id
       form: {
                productId: '', // 商品ID
                promotionPrice: '',
                promotionPerLimit: '',
                sort: '',
                promotionStartTime: '',
                promotionEndTime: ''
            },
        productDetail: {} // 编辑商品的详情

    };
  },
  created() {
    this.init();
    this.getBrandList();
    this.getProductList();
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
    //   获取商品列表
    getProductList() {
      this.loading = true;
      productList(this.page.currentPage, this.page.size, this.search).then(
        (res) => {
          console.log('商品列表',res);
          this.productList = res.data.rows;
          this.page.total = res.data.total;
          this.loading = false;
        }
      );
    },
    // 获取品牌列表
    getBrandList() {
      brandList().then((res) => {
        console.log('品牌列表',res);
        this.brandList = res.data.items;
      });
    },
    // 重置
    doReset() {
      this.search = this.$options.data().search;
    },
    // 搜索
    doSearch() {
       this.page.currentPage = 1
        this.getProductList()
    },
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
              this.init();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch((rej) => {
          console.log(rej);
        });
    },
    radioChange(val) {
      // console.log(val); //当前商品的id
       this.isEditOpen = true
            this.productList.forEach((item) => {
                if (item.id === val) {
                    this.productDetail = Object.assign({}, item)
                }
            })
            this.form = {}

            this.productId = val
    },
    // 是否过期
    isJudgeTime(startTime, endTime) {
      var num = new Date().getTime() - new Date(endTime).getTime();
      return num > 0 ? "过期" : "否";
    },
    // 改变每页显示数量
    handleSizeChange(val) {
      this.page.size = val;
      this.page.currentPage = 1;
      this.getProductList();
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getProductList();
    },
  // 提交
        onSubmit() {
            this.$confirm(`是否确认新增最热推荐商品?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    console.log('ss')
                    this.couldNext = true // 打开btn  loding
                   addRecommend({
                            ...this.form,
                            productId: this.productId

                        })
                        .then((res) => {
                            console.log('res', res)
                            if (res.success) {
                                this.isEditOpen = false // 关闭编辑弹窗
                                this.dialogVisible = false // 关闭新增弹窗
                                this.productId = ''
                                this.$emit('success')
                                this.$message.success('添加成功')
                            } else {
                                this.$message.error('添加失败')
                            }
                            this.couldNext = false
                        })
           
                })
                .catch((rej) => {
                    console.log('quxiao')
                })
        }
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/myScss.scss";
.dialog-main{
  position: relative;
  height: 700px;
  overflow: auto;
}
 .table_main {
   margin-top: 20px;
    height: 500px;
    overflow: auto;
  }
.table_img {
  width: 100px;
  height: 100px;
}
.dialog-footer {
  display: flex;
}
</style>