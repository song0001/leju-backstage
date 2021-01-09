<template >
  <div>
    <el-collapse class="header1 c1">
      <el-collapse-item title="商品管理介绍" name="1" class="title-des">
        <div>
          商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 条件查询 -->
    <el-collapse class="header1 c2">
      <el-collapse-item title="条件查询" name="2" class="title-des">
        <el-form
          :model="search"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="商品名称" prop="name">
                <el-input
                  v-model="search.name"
                  size="mini"
                  placeholder="商品名称/模糊查询"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品货号" prop="productSn">
                <el-input
                  v-model="search.productSn"
                  size="mini"
                  placeholder="商品货号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌" prop="brandId">
                <el-select
                  v-model="search.brandId"
                  placeholder="品牌"
                  size="mini"
                >
                  <el-option
                    v-for="item in brandList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上架状态" prop="publishStatus">
                <el-select
                  v-model="search.publishStatus"
                  clearable
                  size="mini"
                  placeholder="上架状态"
                >
                  <el-option label="上架" :value="1"> </el-option>
                  <el-option label="未上架" :value="0"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="0">
              <el-form-item label="审核状态" prop="verifyStatus">
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
              </el-form-item>
            </el-col>
            <el-col :span="16" align="right">
              <el-form-item>
                <el-button @click="resetForm('ruleForm')" size="mini"
                  >重置</el-button
                >
                <el-button type="primary" @click="searchProduct" size="mini"
                  >搜索</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 商品列表 -->
    <el-card class="card">
        <div slot="header">
            <el-button  type="primary"
          size="mini">新增</el-button>
        </div>
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
        <el-table-column
          prop="username"
          label="商品图片"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img img" />
          </template>
        </el-table-column>

        <el-table-column
          prop="productSn"
          label="商品名称"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌: {{ scope.row.brandName }}</p>
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="商品价格"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <p>原价: {{ scope.row.originalPrice }}</p>
            <p>现价: {{ scope.row.price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="250"
        >
        </el-table-column>
        <!-- 标签 -->
        <el-table-column prop="price" label="标签" align="center" width="150">
          <template slot-scope="scope">
            <p>
              最新:
              <el-switch
                v-model="scope.row.newStatus"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
            <p>
              推荐:
              <el-switch
                v-model="scope.row.recommendStatus"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <!-- 标签 2-->
        <el-table-column prop="price" label="标签2" align="center" width="150">
          <template slot-scope="scope">
            <p>
              发布:
              <el-switch
                v-model="scope.row.publishStatus"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
            <p>
              审核:
              <el-switch
                v-model="scope.row.verifyStatus"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="sku"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" size="default" @click="skuDetail(scope.row)">
              编辑sku</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" align="center" width="80">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="150">
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">
              <span>删除</span>
            </el-button>
            <el-button type="text" @click="del(scope.row)">
              <span style="color: red">删除</span>
            </el-button>
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
import {brandList} from '@/api/product/brand/index'
import { productList } from "@/api/product/index";
import mixin from "@/mixins/index";
export default {
  mixins: [mixin],
  data() {
    return {
      productList: [],
      // activeNames: ['1']
      search: {
          name:'',
          productSn:'',
          productId:'',
          brandId:'',
          publishStatus:'',
          verifyStatus:''
      },
      brandList: [],
    };
  },
  created() {
    this.getProductList();
    this.getBrandList()
  },
  methods: {
    //   获取商品列表
    getProductList() {
      this.loading = true;
      productList(this.page.currentPage, this.page.size, this.search).then((res) => {
        console.log(res);
        this.productList = res.data.rows;
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    // 获取品牌列表
    getBrandList(){
brandList().then(res=>{
    console.log(res);
    this.brandList=res.data.items
})
    },
    //   搜索
    searchProduct() {
        this.page.currentPage = 1
        this.getProductList()
    },
    //   重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    // 编辑sku
    skuDetail(row) {},
    // 编辑
    edit(row) {},
    // 删除
    del(row) {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/myScss.scss";
.header1 {
  background-color: #fff;
}
.c1 {
  margin-bottom: 20px;
}
.c2 {
  width: 97%;
  margin: 0 auto;
}
.title-des {
  border-bottom: 1px solid #ebeef5;
  margin: 10px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>