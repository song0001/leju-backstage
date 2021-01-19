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
                    :key="item.id"
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
        <el-button type="primary" @click="addProduct" size="mini"
          >新增</el-button
        >
        <el-button type="primary" @click="exportExcel" size="mini"
          >导出商品列表excle文件</el-button
        >
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
              <span>编辑</span>
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
    <!-- 修改sku信息 -->
    <el-dialog width="65%" title="sku列表" :visible.sync="open">
      <div slot="footer" class="dialog-footer">
        <el-button
          style="margin-bottom: 20px"
          type="primary"
          size="default"
          @click="addSku"
          >新增</el-button
        >

        <!-- 生成sku的列表 -->
        <el-table size="mini" :data="skuList" border stripe>
          <el-table-column type="index" label="#" fixed="left" />

          <el-table-column label="图片" :width="120">
            <template slot-scope="scope">
              <el-upload
                style="width: 100px; height: 100px"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleTableSuccess"
                @click.native="getTableItem(scope.row)"
              >
                <img
                  v-if="scope.row.pic"
                  style="width: 100px; height: 100px"
                  :src="scope.row.pic"
                  class="avatar"
                />
                <i
                  v-else
                  style="width: 100px; height: 100px; margin-top: -31px"
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="颜色" :width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spData[0].value" size="mini" />
            </template>
          </el-table-column>
          <el-table-column label="大小" :width="160">
            <template slot-scope="scope">
              <!-- 这里必须加 v-if，因为有些没有大小， 不加v-if会报错 -->
              <el-input
                v-if="scope.row.spData[1]"
                v-model="scope.row.spData[1].value"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.stock"
                size="mini"
                placeholder="自定义库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="预警库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lowStock"
                size="mini"
                placeholder="预警库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="锁定库存" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lockStock"
                size="mini"
                placeholder="锁定库存"
              />
            </template>
          </el-table-column>
          <el-table-column label="sku编码" :width="200">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.skuCode"
                size="mini"
                placeholder="自定义sku编码"
              />
            </template>
          </el-table-column>
          <el-table-column label="价格" :width="160">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                size="mini"
                placeholder="价格,单位:分"
              />
            </template>
          </el-table-column>
          <el-table-column label="销量" :width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sale" size="mini" />
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" :width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.id">
                <el-button
                  style="color: red"
                  size="mini"
                  type="text"
                  @click="removeSku(scope.row)"
                  >删除
                </el-button>
                <el-button size="mini" type="text" @click="editSku(scope.row)"
                  >修改编辑
                </el-button>
              </span>
              <span v-else>
                <el-button
                  style="color: red"
                  size="mini"
                  type="text"
                  @click="removeNewSku(scope.row)"
                  >删除
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="saveNewSku(scope.row)"
                  >保存
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>

        <el-button style="margin-top: 20px" @click="open = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { brandList } from '@/api/product/brand/index'
import { productList, productDelete } from '@/api/product/index'
import { getSkuList, deleteSku, addSkus, updateSkus } from '@/api/product/sku'
import mixin from '@/mixins/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  mixins: [mixin],
  data() {
    return {
      productList: [],
      // activeNames: ['1']
      search: {
        name: '',
        productSn: '',
        productId: '',
        brandId: '',
        publishStatus: '',
        verifyStatus: ''
      },
      brandList: [],
      skuList: [], //获取sku列表
      tempTableObj: {}, // 暂时存放的选中sku对象, 用于上传图片返显示
      open: false,
      productId:''
    }
  },
  created() {
    this.getProductList()
    this.getBrandList()
  },
  methods: {
// 导出商品excel文件
exportExcel(){
   import('@/vendor/Export2Excel').then((excel) => {
        // console.log(excel)
        // excel第一行
        const tHeader = ['商品名称', '商品重量(kg)', '商品类别']
        const keys = ['name', 'weight', 'productCategoryName']
        // excel数据
        const data = this.getJson(keys)

        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '商品信息列表', // 导出的excel名称
          autoWidth: true, // 自适应宽度
          bookType: 'xlsx' // 非必填
        })
      })
},
    // 处理要导出的数据
    getJson(keys) {
      // 先循环文章列表
      return this.productList.map(out => {
        // 再循环需要筛选出来keys数组
        return keys.map(inner => {
          return out[inner]
        })
      })
    },

    //   获取商品列表
    getProductList() {
      this.loading = true
      productList(this.page.currentPage, this.page.size, this.search).then(
        (res) => {
          console.log(res)
          this.productList = res.data.rows
          this.page.total = res.data.total
          this.loading = false
        }
      )
    },
    // 获取品牌列表
    getBrandList() {
      brandList().then((res) => {
        console.log(res)
        this.brandList = res.data.items
      })
    },
    //   搜索
    searchProduct() {
      this.page.currentPage = 1
      this.getProductList()
    },
    //   重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 改变每页显示数量
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.getProductList()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getProductList()
    },
    getSkuList(){
        this.skuList = []
    getSkuList(this.productId).then((res) => {
        console.log('sku信息', res)
        if (res.success) {
          res.data.items.forEach((item) => {
            this.skuList.push({
              ...item,
              spData: JSON.parse(item.spData)
            })
          })
          this.open = true
        }
      })
    },
   
    // 编辑sku
    skuDetail(row) {
      // console.log(row.id)
      this.productId=row.id
      this.skuList = []
        this.getSkuList()
    },
    // 删除
    removeSku(row) {
      this.$confirm(`是否删除sku?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSku(row.id).then((res) => {
            if (res.success) {
              this.$message.success('删除sku成功')
              this.getSkuList()
            } else {
              this.$message.error('删除sku失败')
            }
          })
        })
        .catch((rej) => {
          console.log(rej)
        })
    },
    // 修改编辑
    editSku(row) {
      const obj = {
        id: row.id,
        lockStock: row.lockStock,
        lowStock: row.lowStock,
        stock: row.stock,
        pic: row.pic,
        price: row.price,
        productId: row.productId,
        sale: row.sale,
        skuCode: row.skuCode,
        spData: JSON.stringify(row.spData)
      }
      updateSkus(obj).then((res) => {
        if (res.success) {
          this.$message.success('修改sku成功')
        } else {
          this.$message.error('修改sku失败')
        }
      })
    },
    // 删除手动添加的
    removeNewSku(row) {
      this.$confirm(`是否删除sku?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.skuList = this.skuList.filter(
            (item) => item.tempId != row.tempId
          )
        })
        .catch((rej) => {
          console.log(rej)
        })
    },
    // 保存 新增sku
    saveNewSku(row) {
      delete row.tempId
      addSkus({
        ...row,
        spData: JSON.stringify(row.spData)
      }).then((res) => {
        if (res.success) {
          this.$message.success('新增成功')
          this.getSkuList()
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    // 添加
    addSku() {
      var obj = {
        productId: this.productId,
        lockStock: '',
        lowStock: '',
        stock: '',
        pic: '',
        price: '',
        sale: '',
        skuCode: '',
        spData: [
          { key: '颜色', value: '' },
          { key: '容量', value: '' }
        ],
        tempId: uuidv4()
      }
      this.skuList.push(obj)
    },
    getTableItem(value) {
      this.tempTableObj = value
    },
    handleTableSuccess(res) {
      // console.log(res.data.material.ossUrl);
      this.skuList.forEach((item) => {
        if (item === this.tempTableObj) {
          item.pic = res.data.fileUrl
        }
      })
    },
    // 编辑
    edit(row) {
      this.$router.push({ path: 'addDetail', query: { id: row.id } })
    },
    // 删除
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 请求api
          //  console.log(row.id);
          productDelete(row.id).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getProductList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch((rej) => {
          console.log(rej)
        })
    },
    // 新增商品
    addProduct() {
      this.$router.push('addDetail')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>