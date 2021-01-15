<template >
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <el-table border :data="addressList" style="width: 100%">
        <el-table-column
          v-loading="loading"
          fixed="left"
          type="index"
          prop="date"
          label="#"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="地址名称"
          prop="addressName"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column label="默认发货地址" align="center" width="200">
          <template slot-scope="scope">
            <p>
              默认发货地址:
              <el-switch
                v-model="scope.row.sendStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="changeSendStatus(scope.row)"
              />
            </p>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="name"
          label="收货人姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="phone"
          label="收货人电话"
          width="150"
        />
        <el-table-column label="收货人地址" align="center">
          <template slot-scope="scope">
            {{
              `${scope.row.province} ${scope.row.city} ${scope.row.region} ${scope.row.detailAddress}`
            }}
          </template>
        </el-table-column>
        <el-table-column label="默认收货地址" align="center" width="200">
          <template slot-scope="scope">
            <p>
              默认收货地址:
              <el-switch
                v-model="scope.row.receiveStatus"
                size="small"
                :active-value="1"
                :inactive-value="0"
                @change="changeReceiveStatus(scope.row)"
              />
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="200"
        >
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
    <!-- 新增 编辑 地址 -->
    <el-dialog title="地址详情" :visible.sync="dialogVisible" width="60%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货地址" prop="addressName">
              <el-input
                v-model="addForm.addressName"
                placeholder="发货地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发货人姓名" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="发货人姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发货人手机号" prop="phone">
              <el-input
                v-model="addForm.phone"
                placeholder="发货人手机号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码" prop="postCode">
              <el-input
                v-model="addForm.postCode"
                placeholder="邮政编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址" prop="postCode">
              <el-cascader
                v-model="addForm.cityCode"
                class="inner-input"
                :options="options"
                @change="addChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input
                v-model="addForm.detailAddress"
                placeholder="详细地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否默认收货地址" prop="receiveStatus">
              <el-switch
                v-model="addForm.receiveStatus"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="是否默认发货地址" prop="sendStatus">
              <el-switch
                v-model="addForm.sendStatus"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
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
  addressList,
  setReceiveOne,
  setSendOne,
  updateAddress,
  deleteAddress,
  addressDetail,
  saveAddress
} from '@/api/order/address/index'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      addressList: [],
      loading: false,
      dialogVisible: false, //对话框
      // 判断是否编辑
      isEdit: false,
      addForm: {
        addressName: '', // 地址名称 如:河南发货点
        name: '', // 发货人姓名
        phone: '',
        postCode: '', // 邮政编码
        cityCode: [], // 地址编码,英文逗号隔开,比如
        detailAddress: '', // 详细收货地址
        receiveStatus: 1,
        sendStatus: 1
      },
      addFormRules: {
        addressName: [
          { required: true, message: '发货地址不能为空', trigger: 'blur' }
        ]
      },
      options: regionDataPlus, // 省市区三级联动data
      id: ''
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    // 获取地址列表
    getAddressList() {
      addressList().then((res) => {
        console.log('地址', res)
        this.addressList = res.data.items
      })
    },
    addChange(val) {
      //选择地址
      console.log(val)

      console.log(this.addForm.cityCode)
      console.log(this.addForm)
    },
    // 打开弹窗
    add() {
      this.isEdit = false
      this.dialogVisible = true
      // 重置表单
      this.addForm = this.$options.data().addForm
    },
    // 编辑
    edit(row) {
      this.dialogVisible = true
      console.log('当前行', row)
      this.isEdit = true
      //  row.cityCode=row.cityCode.split(',')
      if (row.cityCode.constructor === Array) {
        //  console.log('数组');
        //  console.log('1111111111',row.cityCode);
      } else {
        row.cityCode = row.cityCode.split(',')
        console.log('字符串')
        console.log('2222222222', row.cityCode)
      }
      this.addForm = row
      console.log(this.addForm)
      // console.log(row.cityCode.constructor==Array);
      // if(val.cityCode.constructor)
      // this.addForm.cityCode=res.data.cityCode.split(',')
      this.getAddressDetail(row.id)
    },
    getAddressDetail(id) {
      addressDetail(id).then((res) => {
        //  console.log('地址详情',res);
        //  this.addForm=res.data.address
        //  this.addForm={
        //    ...res.data.address,
        //    cityCode:res.data.address.cityCode.split(',')
        //  }
        // this.addForm.cityCode=res.data.cityCode.split(',')
      })
    },
    // 删除地址
    del(row) {
      // console.log(row.id);
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 请求api
          deleteAddress(row.id).then((res) => {
            if (res.success) {
              this.getAddressList()
              this.$message({
                type: 'success',
                message: '删除地址成功!'
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
    // 提交
    submitForm(formName) {
      console.log(this.addForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            `是否确认${this.isEdit ? '修改' : '新增'}地址信息`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              var obj = {
                ...this.addForm,
                province: CodeToText[this.addForm.cityCode[0]],
                city: CodeToText[this.addForm.cityCode[1]],
                region: CodeToText[this.addForm.cityCode[2]]
              }
              var obj2 = {
                ...obj,
                cityCode: this.addForm.cityCode.join(',')
              }
              console.log(obj2)
              if (!this.isEdit) {
                //新增

                saveAddress(obj2).then((res) => {
                  console.log(res)
                  if (res.success) {
                    this.getAddressList()
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
                updateAddress(obj2).then((res) => {
                  console.log(res)
                  if (res.success) {
                    this.getAddressList()
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

    // 改变默认发货地址
    changeSendStatus(row) {
      console.log(row)
      var tempStatus = row.receiveStatus === 0 ? 1 : 0
      setSendOne({
        id: row.id
      })
        .then((res) => {
          if (res.success) {
            this.getAddressList()
            this.$message.success('修改默认发货地址成功')
          } else {
            this.$message.error('修改默认发货地址失败')
            row.sendStatus = tempStatus
          }
        })
        .catch((res) => {
          row.sendStatus = tempStatus
          this.$message.error('修改默认发货地址失败')
        })
    },
    // 改变默认收货地址
    changeReceiveStatus(row) {
      console.log(row)
      var tempStatus = row.receiveStatus === 0 ? 1 : 0
      setReceiveOne({
        id: row.id
      })
        .then((res) => {
          if (res.success) {
            this.getAddressList()
            this.$message.success('修改默认收货地址成功')
          } else {
            this.$message.error('修改默认收货地址失败')
            row.receiveStatus = tempStatus
          }
        })
        .catch((res) => {
          row.receiveStatus = tempStatus
          this.$message.error('修改默认收货地址失败')
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