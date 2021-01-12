<template >
  <div>
    <el-card shadow="never">
      <el-steps :active="step" finish-status="success">
        <el-step title="基本商品信息"></el-step>
        <el-step title="添加库存信息"></el-step>
        <el-step title="添加移动端详情"></el-step>
      </el-steps>
    </el-card>
    <!-- 基本信息 -->
    <el-card class="card" shadow="never">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 第一个页面 -->
        <div v-show="step == 1">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-divider></el-divider>
          <!-- 基本信息 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称" prop="name" size="small">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="商品名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品编码" prop="productSn" size="small">
                <el-input
                  v-model="ruleForm.productSn"
                  placeholder="商品编码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品分类" size="small">
                <el-select
                  v-model="ruleForm.productCategoryId"
                  placeholder="商品分类"
                  clearable
                >
                  <el-option
                    v-for="item in productCategoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品品牌">
                <el-select
                  v-model="ruleForm.brandId"
                  placeholder="商品品牌"
                  size="small"
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
            <el-col :span="18">
              <el-form-item label="商品描述">
                <el-input
                  type="textarea"
                  v-model="ruleForm.description"
                  placeholder="商品描述"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span>商品属性</span>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品原价" size="small">
                <el-input-number
                  v-model="ruleForm.originalPrice"
                  :min="0"
                  placeholder="商品原价"
                  @input="originalPriceChange"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="促销类型" size="small">
                <el-select
                  v-model="ruleForm.promotionType"
                  class="myInput"
                  placeholder="促销类型"
                  clearable
                  disabled
                >
                  <el-option
                    label="没有促销使用原价"
                    :value="ruleForm.promotionType"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动价格" size="small">
                <el-input-number value="0" disabled :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重量(kg)" size="small">
                <el-input-number
                  v-model="ruleForm.weight"
                  :min="0"
                  placeholder="重量"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态" size="small">
                <el-switch
                  v-model="ruleForm.verifyStatus"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否上架" size="small">
                <el-switch
                  v-model="ruleForm.publishStatus"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="缩略图" size="small">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl1"
                  :headers="uploadHeaders"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="ruleForm.pic" :src="ruleForm.pic" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <span>其他信息</span>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="推荐状态" size="small">
                <el-switch
                  v-model="ruleForm.recommendStatus"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新品状态" size="small">
                <el-switch
                  v-model="ruleForm.newStatus"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预告商品" size="small">
                <el-switch
                  v-model="ruleForm.previewStatus"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="搜索关键词" size="small">
                <el-input
                  v-model="ruleForm.keywords"
                  class="myInput"
                  placeholder="关键词"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="库存预警" size="small">
                <el-input-number
                  v-model="ruleForm.lowStock"
                  :min="0"
                  class="myInput"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="商品排序" size="small">
                <el-input-number
                  v-model="ruleForm.sort"
                  class="myInput"
                  :min="0"
                  placeholder="排序"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="0">
              <el-form-item label="产品服务" size="small">
                <el-checkbox-group v-model="serviceIds">
                  <el-checkbox label="1" name="type">无忧退货</el-checkbox>
                  <el-checkbox label="2" name="type">快速退款</el-checkbox>
                  <el-checkbox label="3" name="type">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 第二个页面 商品sku信息 -->
        <div v-show="step == 2">
          <div slot="header">
            <span>商品sku信息</span>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题" size="small">
                <el-input
                  v-model="ruleForm.detailTitle"
                  placeholder="标题"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="副标题" size="small">
                <el-input v-model="ruleForm.detailDesc" placeholder="副标题" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item class="albumPics" label="画册图片" size="small">
                <el-upload
                  :action="uploadUrl1"
                  :headers="uploadHeaders"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :on-success="imgUploadSuccess"
                  :limit="5"
                  :on-preview="handlePictureCardPreview"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus" />
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb,文件不超过5个
                  </div>
                </el-upload>
                <!-- 画册图片 -->
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- sku设置 -->
          <el-row>
            <el-col>
              <el-form-item label="sku设置" size="small">
                <div v-show="skuColorList.length > 0" style="display: flex">
                  颜色:
                  <el-checkbox-group
                    v-model="skuColorSel"
                    @change="handleCheckAllChange"
                  >
                    <el-checkbox
                      v-for="(item, index) in skuColorList"
                      :key="index"
                      :label="item"
                    >
                      <span>{{ item.text }}</span>
                      <el-button
                        size="mini"
                        type="text"
                        style="color: red; margin-left: 10px"
                        @click="delParam(item, 'skuColorList', 'skuColorSel')"
                        >删除</el-button
                      >
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-show="skuSizeList.length > 0" style="display: flex">
                  大小:
                  <el-checkbox-group v-model="skuSizeSel">
                    <el-checkbox
                      v-for="(item, index) in skuSizeList"
                      :key="index"
                      :label="item"
                    >
                      <span>{{ item.text }}</span>
                      <el-button
                        size="mini"
                        type="text"
                        style="color: red; margin-left: 10px"
                        @click="delParam(item, 'skuSizeList', 'skuSizeSel')"
                        >删除</el-button
                      >
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div style="display: flex">
                <el-form-item size="small">
                  <el-input
                    v-model="skuColorObj.text"
                    style="width: 180px"
                    size="small"
                    placeholder="颜色描述：比如土豪金"
                  >
                  </el-input>
                  <el-button
                    style="margin-left: 10px"
                    @click="addSkuObj('skuColorObj', 'skuColorList')"
                    >创建颜色选项</el-button
                  >
                </el-form-item>
                <el-form-item size="small">
                  <el-input
                    v-model="skuSizeObj.text"
                    style="width: 180px"
                    size="small"
                    placeholder="大小"
                  >
                  </el-input>
                  <el-button
                    style="margin-left: 10px"
                    @click="addSkuObj('skuSizeObj', 'skuSizeList')"
                    >创建大小选项</el-button
                  >
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="margin-left: 200px">
                <el-button type="primary" size="small" @click="createSkus"
                  >生成sku列表</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="createSkus('add')"
                  >新增sku</el-button
                >
              </div>
            </el-col>
            <el-col>
              <!-- 生成表格 -->
              <el-form-item>
                <el-table
                  class="sku_table"
                  v-show="skuList.length > 0"
                  size="mini"
                  :data="skuList"
                  border
                >
                  <el-table-column type="index" label="#" fixed="left" />
                  <el-table-column label="图片" :width="120" align="center">
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
                  <el-table-column label="颜色" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.spData[0].value"
                        size="mini"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="大小" :width="200" align="center">
                    <template slot-scope="scope">
                      <!-- 这里必须加 v-if，因为有些没有大小， 不加v-if会报错 -->
                      <el-input
                        v-if="scope.row.spData[1]"
                        v-model="scope.row.spData[1].value"
                        size="mini"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.stock"
                        size="mini"
                        placeholder="自定义库存"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="预警库存" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.lowStock"
                        size="mini"
                        placeholder="预警库存"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="锁定库存" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.lockStock"
                        size="mini"
                        placeholder="锁定库存"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="sku编码" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.skuCode"
                        size="mini"
                        placeholder="自定义sku编码"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="价格" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.price"
                        size="mini"
                        placeholder="价格,单位:分"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="销量" :width="200" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sale" size="mini" />
                    </template>
                  </el-table-column>

                  <el-table-column
                    fixed="right"
                    label="操作"
                    :width="120"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        style="color: red"
                        size="mini"
                        type="text"
                        @click="removeSku(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 第三个页面 详情描述 -->
        <div v-show="step == 3">
          <div slot="header">
            <span>详情描述</span>
          </div>
          <el-divider></el-divider>
          <el-form-item size="small" label="商品详情">
            <TEditor ref="Ti" />
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input
              v-model="ruleForm.note"
              type="textarea"
              class="myInput"
              placeholder="备注"
            />
          </el-form-item>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item class="btnFa">
              <div class="btns">
                <el-button v-if="step > 1" @click="pre" size="mini"
                  >返回上一步</el-button
                >
                <el-button
                  v-if="step < 3"
                  type="primary"
                  @click="next"
                  size="mini"
                  >{{
                    step == 1 ? '下一步,填写库存信息' : '下一步,填写移动端详情'
                  }}</el-button
                >
                <el-button
                  v-if="step == 3"
                  type="primary"
                  size="mini"
                  @click="submitForm('ruleForm')"
                  >提交保存</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
import {
  addProductAndSkus,
  productDetail,
  updateProductAndSkus
} from '@/api/product/index'
import { getCategory } from '@/api/product/category/index'
import { brandList } from '@/api/product/brand/index'
import TEditor from '@/components/Tinymce/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  mixins: [mixin],
  components: {
    TEditor // 富文本框组件
  },
  data() {
    return {
      id: '',
      step: 1,
      productCategoryList: [], //分类列表
      brandList: [], //商品品牌
      ruleForm: {
        name: '', // 商品名称
        productSn: '', //商品编码
        productCategoryId: '', //产品分类id
        brandId: '', //品牌id
        description: '', // 商品描述 ,
        originalPrice: '', //商品原价
        price: '', //现价
        promotionType: '', //促销类型
        weight: '', //商品重量
        verifyStatus: '', //审核状态
        publishStatus: '', //是否上架
        pic: '', //缩略图
        recommendStatus: '', //推荐状态
        newStatus: '', //新品状态
        previewStatus: '', //预告状态
        keywords: '', //搜索关键字
        lowStock: '', //库存预警
        sort: '', //排序
        detailTitle: '', //标题
        note: '' //备注
      },
      serviceIds: [], // 产品服务
      dialogVisible: false,
      dialogImageUrl: '', // 点开大图 图片地址
      fileList: [], // 文件列表 画册反显要用
      //sku表格 最后要提交的数组 需要处理 删除tempId
      tempSkuList: [], // 暂存的skuList
      skuList: [],
      tempTableObj: {}, // 暂时存放的table选中对象，在上传图片时反显用到
      // sku设置
      skuColorObj: {
        text: ''
      }, //颜色暂存
      skuColorList: [], // 颜色列表
      skuColorSel: [], //选中颜色列表

      skuSizeObj: {
        text: ''
      }, //大小暂存
      skuSizeList: [], //大小列表
      skuSizeSel: [], //选中的大小列表
      serviceIds: [], // 产品服务
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCategory()
    this.getBrandList()
    this.id = this.$route.query.id
    console.log(this.id)
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
        // 获取富文本内容
    getTi() {
      var res = this.$refs.Ti.getContent()
      return res
    },
    // 设置富文本框内容
    setTi(v) {
      this.$refs.Ti.setContent(v)
    },
    //  获取详情 修改的时候
    getDetail() {
      productDetail(this.id).then((res) => {
        console.log('修改详情', res)
        this.ruleForm = res.data.product
        // 处理sku
        res.data.skus.forEach((item) => {
          this.skuList.push({
            ...item,
            spData: JSON.parse(item.spData)
          })
          // 增加一个暂存的skuList，用于编辑时候新增sku
          this.tempSkuList.push({
            ...item,
            spData: JSON.parse(item.spData)
          })
        })
        // 处理画册
        // console.log(this.ruleForm);
        if (this.ruleForm.albumPics) {
          const imgArr = this.ruleForm.albumPics.split(',')
          imgArr.forEach((item) => {
            this.fileList.push({
              url: item
            })
          })
        }
        // 处理产品服务
        if (this.ruleForm.serviceIds && this.ruleForm.serviceIds.length > 0) {
          this.serviceIds = this.ruleForm.serviceIds.split(',')
        }
        // 富文本赋值
        this.setTi(this.ruleForm.detailMobileHtml)
      })
    },
    pre() {
      this.step--
    },
    next() {
      this.step++
    },
    // 缩略图提交成功回调
    handleAvatarSuccess(res) {
      console.log(res)
      this.ruleForm.pic = res.data.material.ossUrl
    },

    // 移除图片
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => {
        return item.url != file.url
      })
    },
    // 点击画册图片，查看大图
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 画册上传成功
    imgUploadSuccess(res, file) {
      if (res.success) {
        this.fileList.push({ url: res.data.material.ossUrl })
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    // 获取分类
    getCategory() {
      getCategory().then((res) => {
        // console.log('分类列表',res);
        this.productCategoryList = res.data.items[1].children
        // console.log(this.productCategoryList);
      })
    },
    handleTableSuccess(res, file) {
      // console.log(res);
      this.skuList.forEach((item) => {
        if (item === this.tempTableObj) {
          item.pic = res.data.material.ossUrl
        }
      })
    },
    // 上传图片点击时候获取当前需要上传的目标对象
    getTableItem(value) {
      this.tempTableObj = value
    },
    // 删除sku属性
    delParam(val, list, listSel) {
      this[list] = this[list].filter((item) => item.tempId !== val.tempId)
      this[listSel] = this[listSel].filter((item) => item.tempId !== val.tempId)
      console.log('删除后的', this[list])
    },
    // 更改价格
    originalPriceChange(v) {
      this.ruleForm.price = v
    },
    // 选中颜色
    handleCheckAllChange(val) {
      console.log('选中颜色', this.skuColorSel)
    },
    // 添加sku
    addSkuObj(skuObj, list) {
      const obj = Object.assign(
        {
          tempId: uuidv4()
        },
        this[skuObj]
      )
      this[list].push(obj)
      // 晴空暂存对象
      this[skuObj] = {}
    },
    //生成sku
    async createSkus(type) {
      if (this.skuColorSel.length <= 0) {
        this.$message.error('请选中颜色')
        return
      }
      const publicObj = {
        pic: '',
        price: this.ruleForm.price,
        sale: '',
        skuCode: '100000',
        stock: '',
        lowStock: ''
      }
      if (type !== 'add') {
        //添加
        await this.$confirm(
          '此操作将清空sku列表,并生成新的列表, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.skuList = []
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
        })
      }
      //生成表格  颜色大小都有(颜色必须有) 需要循环两层
      if (this.skuSizeSel.length > 0) {
        this.skuColorSel.forEach((item1) => {
          this.skuSizeSel.forEach((item2) => {
            var arr = [
              { key: '颜色', value: item1.text },
              { key: '大小', value: item2.text }
            ]
            this.skuList.push({
              spData: arr,
              tempId: uuidv4(),
              ...publicObj
            })
          })
        })
      } else {
        //只有颜色
        this.skuColorSel.forEach((item) => {
          const arr = [{ key: '颜色', value: item.text }]
          this.skuList.push({
            spData: arr,
            tempId: uuidv4(),
            ...publicObj
          })
        })
      }
      console.log(this.skuList)
    },
    // 删除表格
    removeSku(row) {
      this.skuList = this.skuList.filter((item) => item.tempId != row.tempId)
    },
    // 获取品牌列表
    getBrandList() {
      brandList().then((res) => {
        console.log(res)
        this.brandList = res.data.items
      })
    },


    // 提交
    submitForm(formName) {
      var brandName = ''
      var productCategoryName = ''
      const content = this.getTi()
      this.brandList.forEach((item) => {
        if (item.id === this.ruleForm.brandId) {
          brandName = item.name
        }
      })

      this.productCategoryList.forEach((item) => {
        if (item.id === this.ruleForm.productCategoryId) {
          productCategoryName = item.name
        }
      })
      const subSkuList = []
      this.skuList.forEach((item) => {
        if (item.tempId) {
          delete item.tempId
        }

        subSkuList.push({
          ...item,
          spData: JSON.stringify(item.spData)
        })
        console.log(subSkuList)
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const albumPicsArr = this.fileList.map((item) => item.url)
             const content = this.getTi()
          console.log(this.fileList)
          console.log(albumPicsArr)
          if (!this.id) {
            //新增
            addProductAndSkus({
              pmsSkuStockList: subSkuList,
              product: {
                ...this.ruleForm,
                productCategoryName,
                brandName,
                detailMobileHtml: content,
                albumPics: albumPicsArr.join(','),
                serviceIds: this.serviceIds.join(',')
              }
            }).then((res) => {
              console.log('提交', res)
              if (res.success) {
                this.$message.success('新增成功')
                this.$router.push('list')
              } else {
                this.$message.error('添加失败')
              }
            })
          } else {
            //修改
            updateProductAndSkus({
              pmsSkuStockList: subSkuList,
              product: {
                ...this.ruleForm,
                productCategoryName,
                brandName,
                detailMobileHtml: content,
                albumPics: albumPicsArr.join(','),
                serviceIds: this.serviceIds.join(',')
              }
            }).then((res) => {
              if (res.success) {
                this.$message.success('修改成功')
                this.$router.push('list')
              } else {
                this.$message.error('修改失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.el-steps {
  width: 60%;
  margin: 0 auto;
}
.btnFa {
  margin-left: 0;
  .btns {
    margin-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
}
.el-input,
.el-select,
.el-input-number {
  width: 370px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.sku_table .el-input {
  width: 150px;
}
</style>