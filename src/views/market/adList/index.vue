<template >
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <el-table border :data="adsList" style="width: 100%">
        <el-table-column
          v-loading="loading"
          fixed="left"
          type="index"
          prop="date"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column label="广告图片" align="center" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column
          prop="productSn"
          label="时间"
          align="center"
          width="250"
        >
          <template slot-scope="scope">
            <p>开始时间: {{ scope.row.startTime }}</p>
            <p>结束时间: {{ scope.row.endTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="clickCount"
          label="点击数"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="下单数"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="轮播位置"
          width="150"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.type === 0">首页轮播</p>
            <p v-else>其他</p>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="链接地址" align="center" width="150">
        </el-table-column>
        <el-table-column prop="note" label="备注" align="center" width="150">
        </el-table-column>
        <el-table-column align="center" label="上下线状态" :width="150">
          <template slot-scope="scope">
            <p>
              {{ scope.row.status === 1 ? '上线' : '下线' }}
            </p>
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
    </el-card>
    <!-- 新增 编辑 广告详情 -->
    <el-dialog title="广告详情" :visible.sync="dialogVisible" width="60%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
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
            <el-form-item label="备注" prop="note">
              <el-input v-model="addForm.note" placeholder="备注"></el-input>
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
                v-model="addForm.orderCount"
                placeholder="产品数量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链接" prop="url">
              <el-input v-model="addForm.url" placeholder="链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页轮播位置" prop="type">
              <el-select v-model="addForm.type" placeholder="订单状态">
                <el-option label="APP首页轮播" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上下线状态" prop="status">
              <el-switch
                v-model="addForm.status"
                :active-value="1"
                :inactive-value="0"
                placeholder="上下线状态"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="addForm.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="addForm.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item size="mini" label="图片" prop="pic">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleBigPicSuccess"
              >
                <img v-if="addForm.pic" :src="addForm.pic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="footer">
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
import { addAds, adsList, delAds, updateAds } from '@/api/market/adList/index'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      loading: false,
      adsList: [], //广告列表
      dialogVisible: false, //对话框
      // 判断是否编辑
      isEdit: false,
      addForm: {
        //提交表单value
        name: '',
        note: '',
        sort: '',
        orderCount: '',
        url: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        pic: ''
      },
      addFormRules: {
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getAdsList()
  },
  methods: {
    // 获取广告列表
    getAdsList() {
      this.loading = true
      adsList().then((res) => {
        console.log('广告列表', res)
        this.adsList = res.data.items
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
          delAds(row.id).then((res) => {
            if (res.success) {
              this.getAdsList()
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
      console.log(val) 
      this.addForm.pic = val.data.fileUrl
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
                addAds(this.addForm).then((res) => {
                  console.log(res)
                  if (res.success) {
                    this.getAdsList()
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
                updateAds(this.addForm).then((res) => {
                  console.log(res)
                  if (res.success) {
                    this.getAdsList()
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