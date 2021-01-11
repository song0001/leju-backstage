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
              <el-form-item label="商品品牌" prop="brandId">
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
                   <!-- 超过五个时候 换个不能点击按钮 -->
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- sku设置 -->
          <el-row>
            <el-col>

               </el-col>
          </el-row>
        </div>
        <!-- 第三个页面 详情描述 -->
        <div v-show="step == 3">
          <div slot="header">
            <span>详情描述</span>
          </div>
          <el-divider></el-divider>
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
import { getCategory } from '@/api/product/category/index'
import { brandList } from '@/api/product/brand/index'
export default {
  mixins: [mixin],
  data() {
    return {
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
        detailTitle: '' //标题
      },
      serviceIds: [], // 产品服务
      dialogVisible: false,
      dialogImageUrl: '', // 点开大图 图片地址
      fileList: [], // 文件列表 画册反显要用
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCategory()
    this.getBrandList()
  },
  methods: {
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
    
    },
    // 点击画册图片，查看大图
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 画册上传成功
    imgUploadSuccess(res, file) {
    
    },
    // 获取分类
    getCategory() {
      getCategory().then((res) => {
        // console.log('分类列表',res);
        this.productCategoryList = res.data.items[1].children
        // console.log(this.productCategoryList);
      })
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  gggg
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
</style>