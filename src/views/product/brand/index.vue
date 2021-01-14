<template >
  <div>
<el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <el-table border :data="brandList" style="width: 100%">
        <el-table-column
          v-loading="loading"
          fixed="left"
          type="index"
          prop="date"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column label="品牌名称"   prop="name" align="center" width="200">
        </el-table-column>
         <el-table-column label="展示状态"   align="center" width="200">
        
        <template slot-scope="scope">
            <p>
              是否展示:
              <el-switch
                v-model="scope.row.showStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="switchCode(scope.row)"
              />
            </p>
          </template>
          </el-table-column>
        <el-table-column
          label="logo"
          align="center"
          width="200"
        >
        <template slot-scope="scope">
            <img :src="scope.row.logo" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column
          label="专区大图"
          align="center"
          width="200"
        >
        <template slot-scope="scope">
            <img :src="scope.row.bigPic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandStory"
          label="品牌故事"
          width="150"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="300"
        />
        <el-table-column
          align="center"
          prop="sort"
          label="排序"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCommentCount"
          label="产品评论数量"
          width="150"
        />
        <el-table-column
          align="center"
          prop="productCount"
          label="产品数量"
          width="150"
        />
        <el-table-column align="center" label="是否品牌制造商" width="150">
          <template slot-scope="scope">
            <p>{{ scope.row.factoryStatus===1?"是":"不是" }}</p>
          </template>
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
    <!-- 新增 编辑 品牌详情 -->
    <el-dialog title="品牌详情" :visible.sync="dialogVisible" width="60%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="广告名称" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="广告名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首字母" prop="note">
              <el-input v-model="addForm.firstLetter" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" placeholder="排序"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品数量" prop="orderCount">
              <el-input
                v-model="addForm.productCount"
                placeholder="产品数量"
              ></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
            <el-form-item label="是否展示" prop="status">
              <el-switch
                v-model="addForm.showStatus"
                :active-value="1"
                :inactive-value="0"
             
              ></el-switch>
            </el-form-item>
          </el-col>
      
          <el-col :span="12">
            <el-form-item label="是否为品牌制造商" prop="status">
              <el-switch
                v-model="addForm.factoryStatus"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item size="mini" label="上传专区大图" prop="pic">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleBigPicSuccess"
              >
                <img v-if="addForm.bigPic" :src="addForm.bigPic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
                 <el-col :span="12">
            <el-form-item size="mini" label="上传logo" prop="pic">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleLogoPicSuccess"
              >
                <img v-if="addForm.logo" :src="addForm.logo" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" class="footer">
            <el-form-item>
              <span class="dialog-footer">
                <el-button @click="resetForm('addFormRef')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addFormRef')"
                  >确 定</el-button
                >
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  addBrand,
  brandList,
  switchShowStatus,
  updateBrand,
  deleteBrand,
  brandPageList
} from '@/api/product/brand/index'
import mixin from '@/mixins/index'
export default {
  mixins:[mixin],
  data() {
    return {
      brandList:[],
           loading: false,
      dialogVisible: false, //对话框
      // 判断是否编辑
      isEdit: false,
        addForm: {
                detailObj: '', // 编辑时获取的Obj
                bigPic: '', // 大图专区
                logo: '', // logo
                name: '', // 名称
                firstLetter: '', // 首字母
                sort: '', // 排序
                productCount: '', // 产品数量
                productCommentCount: '', // 产品评价熟料
                showStatus: 1, // 是否展示
                factoryStatus: 1 // 是否品牌制造商
            },
            addFormRules: {
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }]
      }
    }
  },
   created() {
    this.getBrandList()
  },
  methods: {
    // 获取广告列表
    getBrandList() {
      this.loading = true
      brandPageList(this.page.currentPage, this.page.size).then((res) => {
        console.log('品牌列表', res)
        this.brandList = res.data.rows
           this.page.total = res.data.total
        this.loading = false
      })
    },
    // 打开弹窗
    add() {
      this.isEdit=false
      this.dialogVisible = true
      // 重置表单
  this.addForm=this.$options.data().addForm
    },
    // 编辑
    edit(row) {
      this.dialogVisible = true
      console.log(row)
      this.isEdit = true
      this.addForm = row
      console.log(this.isEdit)
    },
    // 删除
    del(row) {
      // console.log(row.id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 请求api
          deleteBrand(row.id).then((res) => {
            if (res.success) {
           this.getBrandList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch((rej) => {
          console.log(rej)
        })
    },
    handleBigPicSuccess(val) {
      // console.log(val)
      this.addForm.bigPic = val.data.fileUrl
      console.log(this.addForm.bigPic);
    },
    handleLogoPicSuccess(val){
        console.log(val)
       this.addForm.logo = val.data.fileUrl
       console.log(this.addForm.logo);
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            `是否确认${this.isEdit ? '修改' : '新增'}广告`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              // 请求api
              if (!this.isEdit) {
                //新增
                addBrand(this.addForm).then((res) => {
                  console.log(res)
                  if (res.success) {
                    this.getBrandList()
                    this.dialogVisible = false
                    this.$refs[formName].resetFields()
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    })
                  } else {
                    this.$message.error(res.message)
                  }
                })
              } else {
                //修改
                updateBrand(this.addForm).then((res) => {
                  console.log(res)
                  if (res.success) {
                   this.getBrandList()
                    this.dialogVisible = false
                    this.isEdit = false
                    this.$refs[formName].resetFields()
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    })
                  } else {
                    this.$message.error(res.message)
                  }
                })
              }
            })
            .catch((rej) => {
              console.log(rej)
            })
        } else {
          this.$message.error('请填写必要信息')
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.isEdit = false
    },
       handleSizeChange(val) {
    //   console.log(val);
      this.page.size = val;
       this.page.currentPage = 1
       this.getBrandList()
    },
    handleCurrentChange(val) {
      //  console.log(e)
      this.page.currentPage = val;
      this.getBrandList()
    },
  // 改变展示状态
  switchCode(row){
 var tempStatus = row.showStatus === 0 ? 1 : 0
          switchShowStatus({
                id: row.id + '',
                status: row.showStatus
            })
                .then(res => {
                    if (res.success) {
                        this.$message.success('修改状态成功')
                    } else {
                        this.$message.error('修改状态失败')
                        row.showStatus = tempStatus
                    }
                })
                .catch((res) => {
                    row.showStatus = tempStatus
                    this.$message.error('修改状态失败')
                })
  }
  }
      
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.table_img {
  width: 100px;
  height: 100px;
}
.el-input {
  width: 300px;
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
.footer {
  float: right;
}
</style>