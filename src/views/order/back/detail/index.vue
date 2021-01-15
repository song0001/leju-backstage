<template >
  <div>
    <el-card class="card">
      <div class="table-main">
        <!-- 订单信息 -->
        <div class="table-title">
          订单信息:
          <span style="margin-left: 10px">
            <el-tag
              v-if="status === 0"
              type="danger"
              size="small"
              effect="dark"
            >
              {{ statusList[0].name }}
            </el-tag>
            <el-tag
              v-else-if="status === 1"
              size="small"
              type="warning"
              effect="dark"
              >{{ statusList[1].name }}</el-tag
            >
            <el-tag v-else-if="status === 2" size="small">
              {{ statusList[2].name }}
            </el-tag>
            <el-tag
              v-else-if="status === 3"
              size="small"
              type="info"
              effect="dark"
              >{{ statusList[3].name }}</el-tag
            >
          </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              订单编号:
              <span>{{ detailObj.orderSn }}</span>
              <el-button style="margin-left: 10px" type="text" @click="goOrderDetail"
                >查看订单详情</el-button
              >
            </el-col>
            <el-col :span="6"> 退单人姓名 : {{ detailObj.returnName }}</el-col>
            <el-col :span="6"> 退单理由 :{{ detailObj.reason }} </el-col>
            <el-col :span="6"> 退单描述 :{{ detailObj.description }} </el-col>
          </el-row>
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6"> 申请时间 :{{ detailObj.createTime }} </el-col>
          </el-row>
          <!-- 退单图片 -->
          <div v-if="imgList.length > 0" class="img_main">
            <div class="left">退单图片:</div>
            <div class="right">
              <el-image
                v-for="(item, index) in imgList"
                :key="index"
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="item"
                :preview-src-list="imgList"
              />
            </div>
          </div>
        </div>

        <el-divider></el-divider>
        <!-- 退货商品 -->
        <div>
          <span class="table-title">退货商品:</span>
          <span style="margin-left: 10px"> </span>
          <el-table style="margin-top: 20px" :data="productList" border>
            <el-table-column
              prop="productName"
              label="商品图片"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <img
                  style="width: 100px; height: 100px"
                  :src="scope.row.productPic"
                  alt=""
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品描述">
              <template slot-scope="scope">
                <p>{{ scope.row.productName }}</p>
                <p>品牌: {{ scope.row.productBrand }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品价格" width="250">
              <template slot-scope="scope">
                <span>{{ scope.row.productRealPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="productAttr"
              label="商品属性"
              width="250"
            >
              <template slot-scope="scope">
                <div
                  v-for="item in JSON.parse(scope.row.productAttr)"
                  :key="item.id"
                >
                  <span>{{ item.key }}:{{ item.value }}</span>
                </div>
                <!-- <p>{{ scope.row.productAttr | initAttrArr }}</p> -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="productCount"
              label="商品数量"
              width="250"
            />

            <el-table-column align="center" prop="returnAmount" label="总计">
              <template slot-scope="scope">
                <span>{{ scope.row.returnAmount }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider />
        <!-- 费用信息 -->
        <div class="table-title">
          用户信息:
          <span style="margin-left: 10px"> </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              <span>联系人:{{ detailObj.memberUsername }} </span>
            </el-col>
            <el-col :span="6">
              联系电话 :
              <span>{{ detailObj.returnPhone }}</span>
            </el-col>
          </el-row>
        </div>
        <el-divider v-if="status > 1" />
        <!-- 费用信息 -->
        <div class="table-title">
          费用信息:
          <span style="margin-left: 10px"> </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              退单金额:
              <span class="totalAmount">{{ detailObj.returnAmount }} </span>
            </el-col>
            <el-col :span="6">
              运费金额 :
              <span class="totalAmount">0</span>
            </el-col>
          </el-row>
        </div>

        <div
          v-if="status === 0"
          :style="{
            width: '100%',
            margin: '10px auto',
            fontSize: '16px'
          }"
        >
          <!-- 处理是否退货信息的表单 -->
          <el-form
            ref="handleForm"
            :model="handleForm"
            :rules="handleRules"
            size="mini"
            class="form-lable"
          >
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item prop="returnAmount" label="确认退款金额">
                  <el-input-number
                    v-model="handleForm.returnAmount"
                    class="myInput"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item prop="handleMan" label="处理人">
                  <el-input
                    v-model="handleForm.handleMan"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item prop="handleNote" label="处理备注">
                  <el-input
                    v-model="handleForm.handleNote"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-divider v-if="status > 1" />
        <!-- 处理结果 -->
        <div v-if="status !== 0">
          <div class="table-title">
            处理结果:
            <span style="margin-left: 10px"> </span>
          </div>
          <div class="info">
            <el-row :gutter="20" class="orderInfo">
              <el-col :span="6">
                处理人: <span>{{ detailObj.handleMan }} </span>
              </el-col>
              <el-col :span="6">
                处理备注 :
                <span>{{ detailObj.handleNote }}</span>
              </el-col>
              <el-col :span="6">
                处理时间 :
                <span>{{ detailObj.handleTime }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider v-if="status > 1" />
        <!-- 收货信息 -->
        <div v-if="status === 2">
          <div class="table-title">
            收货信息:
            <span style="margin-left: 10px"> </span>
          </div>
          <div class="info">
            <el-row :gutter="20" class="orderInfo">
              <el-col :span="6">
                退单收货人: <span>{{ detailObj.receiveMan }} </span>
              </el-col>
              <el-col :span="6">
                退单收货备注 :
                <span>{{ detailObj.receiveNote }}</span>
              </el-col>
              <el-col :span="6">
                退单收货时间 :
                <span>{{ detailObj.receiveTime }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 处理验证表单 收货人 收货备注 -->
        <div
          v-if="status === 1"
          :style="{
            width: '100%',
            margin: '10px auto',
            fontSize: '16px'
          }"
        >
          <el-form
            ref="receiveForm"
            :model="receiveForm"
            :rules="receiveRules"
            size="mini"
            class="form-lable"
          >
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="收货人" prop="receiveMan">
                  <el-input
                    v-model="receiveForm.receiveMan"
                    class="myInput myInput2"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="收货备注" prop="receiveNote">
                  <el-input
                    v-model="receiveForm.receiveNote"
                    class="myInput myInput2"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="button_main">
        <!-- v-if="step===1" -->
        <el-button
          v-if="status === 0"
          type="primary"
          style="width: 150px"
          size="small"
          @click="agreeReturn"
          >同意退款
        </el-button>
        <el-button
          v-if="status === 1"
          type="primary"
          style="width: 150px"
          size="small"
          @click="receiveReturn"
          >确认收货
        </el-button>
        <el-button
          v-if="status === 0"
          style="width: 150px"
          size="small"
          @click="rejectReturn"
          >拒绝退款
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  findReturnApply,
  orderReturn,
  agreeApply,
  rejectApply,
  receiveProduct
} from '@/api/order/index'
import kdExpressData from '../../kdExpress/kdExpress.json'
export default {
  data() {
    return {
      id: '',
      // 退单状态 状态按钮处理
      statusList: [
        { name: '待处理', id: 0 },
        { name: '退货中', id: 1 },
        { name: '已完成', id: 2 },
        { name: '已拒绝', id: 3 }
      ],
      imgList: [], //退单图片
      forceSendShow: false,
      status: -1, // 订单状态
      detailObj: {}, // 退单详情信息
      productList: [], //退货商品列表
      handleForm: {
        //同意退款 拒绝退款 验证表单
        returnAmount: 0, // 退款金额
        handleNote: '', // 退款备注
        handleMan: '' // 处理人
      },
      receiveForm: {
        //确认收货证表单
        receiveNote: '', // 收货备注
        receiveMan: '' // 收货人
      },
      handleRules: {
        handleMan: [{ required: true, message: '处理人姓名', trigger: 'blur' }],
        handleNote: [{ required: true, message: '处理人备注', trigger: 'blur' }]
      },
      receiveRules: {
        receiveMan: [
          { required: true, message: '收货人姓名', trigger: 'blur' }
        ],
        receiveNote: [
          { required: true, message: '收货人备注', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrderReturn()
  },
  computed: {
    // 处理物流信息
    expressData() {
      return kdExpressData.Traces
    }
  },
  methods: {
    getOrderReturn() {
      this.id = this.$route.query.id
      console.log(this.id)
      orderReturn(this.id).then((res) => {
        console.log('退单详情', res)
        this.status = res.data.orderReturnApply.status
        this.detailObj = res.data.orderReturnApply
        this.initProductTable() // 初始化商品信息
        this.initImgs() //初始化退单图片
      })
    },
    // 初始化商品信息
    initProductTable() {
      const obj = {
        productPic: this.detailObj.productPic, // 商品图片
        productName: this.detailObj.productName, // 商品名字
        productAttr: this.detailObj.productAttr, // 属性
        productCount: this.detailObj.productCount, // 数量
        productBrand: this.detailObj.productBrand, // 品牌
        productRealPrice: this.detailObj.productRealPrice, // 价格
        returnAmount: this.detailObj.returnAmount // 总计
      }
      this.productList.push(obj)
    },
    initImgs() {
      if (this.detailObj.proofPics) {
        this.imgList = this.detailObj.proofPics.split(',')
      }
    },
      // 跳转查看订单详情页面
goOrderDetail(){
this.$router.push({path:'orderDetail',query:{id:this.detailObj.orderId }})
},
 
    agreeReturn() {
      //同意退款
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          agreeApply(this.id, {
            id: this.id,
            handleMan: this.handleForm.handleMan,
            handleNote: this.handleForm.handleNote,
            returnAmount: this.handleForm.returnAmount
          })
            .then((res) => {
              if (res.success) {
                this.$message.success('同意退款成功')
                this.getOrderReturn()
              } else {
                this.$message.error('请求失败')
              }
            })
            .catch((res) => {
              this.$message.error('请求失败')
            })
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    },
    receiveReturn() {
      //确认收货  (收到退货)
      this.$refs.receiveForm.validate((valid) => {
        if (valid) {
          receiveProduct(this.id, {
            id: this.id,
            receiveMan: this.receiveForm.receiveMan,
            receiveNote: this.receiveForm.receiveNote
          }).then((res) => {
            if (res.success) {
              this.$message.success('确认收货成功')
              window.location.reload()
            } else {
              this.$message.error('请求失败')
            }
          })
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    },
    rejectReturn() {
      //拒绝退款
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          rejectApply(this.id, {
            id: this.id,
            handleMan: this.handleForm.handleMan,
            handleNote: this.handleForm.handleNote
          })
            .then((res) => {
              if (res.success) {
                this.$message.success('拒绝退款成功')
                this.getOrderReturn()
              } else {
                this.$message.error('请求失败')
              }
            })
            .catch((res) => {
              this.$message.error('请求失败')
            })
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    },
    // 去退货
    goReturn(row) {}
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.el-steps {
  width: 80%;
  margin: 0 auto;
}

.table-main {
  margin: 20px 0;
  .table-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.info {
  .totalAmount {
    color: red;
  }
  .orderInfo {
    margin: 20px;
    font-size: 14px;
  }
  .el-col {
    height: 40px;
    line-height: 40px;
  }
}
.button_main {
  margin: 40px auto;
  display: flex;
  width: 100%;
  justify-content: center;
}
.el-input {
  width: 270px;
}
.img_main {
  width: 100%;
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 20px;
  .left {
    float: left;
    width: 5%;
  }
  .right {
    position: relative;
    overflow: hidden;
    float: left;
    width: 90%;
    margin-left: 20px;
    img {
      float: left;
      width: 150px;
      height: 150px;
      margin: 10px;
    }
  }
}
</style>










