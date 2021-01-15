<template >
  <div>
    <el-card class="card">
      <el-steps :active="steps">
        <el-step
          :title="item.name"
          :description="item.time ? item.time : ''"
          v-for="(item, index) in stepList"
          :key="index"
        ></el-step>
      </el-steps>
      <el-divider></el-divider>

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
              待付款
            </el-tag>
            <el-tag
              v-else-if="status === 1"
              size="small"
              type="warning"
              effect="dark"
              >待发货</el-tag
            >
            <el-tag v-else-if="status === 2" size="small"> 已发货 </el-tag>
            <el-tag v-else-if="status === 3" size="small" effect="dark"
              >已完成</el-tag
            >
            <el-tag
              v-else-if="status === 4"
              size="small"
              type="info"
              effect="dark"
              >已关闭</el-tag
            >
            <el-tag v-else type="info" size="small"> 无效订单 </el-tag>
          </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              订单金额:
              <span class="totalAmount">{{ detailObj.totalAmount }}</span>
            </el-col>
            <el-col :span="6"> 订单编号 :{{ detailObj.orderSn }} </el-col>
            <el-col :span="6">
              用户账号 :{{ detailObj.memberUsername }}
            </el-col>
            <el-col :span="6"> 备注 :{{ detailObj.note }} </el-col>
          </el-row>
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6"> 下单时间 :{{ detailObj.createTime }} </el-col>
            <el-col :span="6"> 付款时间 :{{ detailObj.paymentTime }} </el-col>
            <el-col :span="6"> 发货时间 :{{ detailObj.deliveryTime }} </el-col>
            <el-col :span="6"> 收货时间 :{{ detailObj.receiveTime }} </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <!-- 收货人信息 -->
        <div class="table-title">
          收货人信息:
          <span style="margin-left: 10px"> </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6"> 收货人:{{ detailObj.receiverName }} </el-col>
            <el-col :span="6">
              用户姓名 :{{ detailObj.memberUsername }}
            </el-col>
            <el-col :span="6"> 手机号码 :{{ detailObj.receiverPhone }} </el-col>
            <el-col :span="6">
              邮政编码 :{{ detailObj.receiverPostCode }}
            </el-col>
          </el-row>
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              地市 :{{
                detailObj.receiverProvince + ' ' + detailObj.receiverCity
              }}
            </el-col>
            <el-col :span="6">
              详细地址 :{{ detailObj.receiverDetailAddress }}
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <!-- 商品信息 -->
        <div class="table-title">
          商品信息:
          <span style="margin-left: 10px"> </span>
          <el-table style="margin-top: 20px" :data="orderItemList" border>
            <el-table-column
              prop="productName"
              label="商品名称"
              align="center"
            />
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
            <el-table-column
              prop="isReturn"
              label="是否退货"
              width="250px"
              align="center"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.isReturn == 1"
                  style="color: red; cursor: pointer"
                  @click="goReturn(scope.row)"
                  >是</span
                >
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="productBrand"
              label="品牌"
              width="200px"
              align="center"
            />
            <el-table-column
              prop="productPrice"
              label="价格"
              width="200px"
              align="center"
            />
            <el-table-column
              prop="productQuantity"
              label="商品数量"
              width="200px"
              align="center"
            />

            <el-table-column
              fixed="right"
              prop="totalPrice"
              label="小计"
              width="250px"
              align="center"
            />
          </el-table>
        </div>

        <!-- 费用信息 -->
        <div class="table-title">
          费用信息:
          <span style="margin-left: 10px"> </span>
        </div>
        <div class="info">
          <el-row :gutter="20" class="orderInfo">
            <el-col :span="6">
              <span class="totalAmount">运费金额:0 </span>
            </el-col>
            <el-col :span="6">
              订单总金额 :
              <span class="totalAmount">{{ detailObj.totalAmount }}</span>
            </el-col>
            <el-col :span="6">
              实际金额 :
              <span class="totalAmount">{{ detailObj.payAmount }}</span>
            </el-col>
            <el-col :span="6">
              促销优惠价格 :
              <span class="totalAmount">
                {{
                  detailObj.promotionAmount ? detailObj.promotionAmount : 0
                }}</span
              >
            </el-col>
          </el-row>
        </div>
        <el-divider v-if="status > 1" />
        <!-- 物流信息 -->
        <div v-if="status > 1" class="table-main">
          <div class="table-title">
            物流信息:
            <span style="color: gray"
              >{{ detailObj.deliveryCompany }} [
              {{ detailObj.deliverySn }} ]</span
            >
          </div>
          <el-table
            :data="expressData"
            border
            stripe
            style="width: 100%; margin-top: 25px"
          >
            <el-table-column prop="AcceptTime" label="时间" width="180" />
            <el-table-column prop="AcceptStation" label="状态" />
            <el-table-column prop="Remark" label="备注" width="450" />
          </el-table>
        </div>
        <!-- 待发货 就是已付款状态 status==1   form表单-->
        <div v-if="status == 1">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :inline="false"
            size="mini"
          >
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item prop="deliveryCompany" label="物流公司">
                  <el-select
                    v-model="form.deliveryCompany"
                    class="myInput"
                    size="mini"
                    placeholder="请选择物流公司"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="0">
                <el-form-item prop="deliverySn" label="物流单号">
                  <el-input
                    v-model="form.deliverySn"
                    class="myInput"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 按钮 -->
        <div class="button_main">
          <!-- v-if="step===1" -->
          <el-button
            v-if="status === 1"
            type="primary"
            style="width: 150px"
            size="small"
            @click="sendOrder"
            >确认发货</el-button
          >
          <div v-if="status === 2">
            <el-button
              v-if="forceSendShow"
              type="primary"
              style="width: 150px"
              size="small"
              @click="forceFinishOrder"
            >
              强制确认收货
            </el-button>
          </div>
          <div v-if="status === 3">
            <el-button
              type="primary"
              style="width: 150px"
              size="small"
              @click="finishOrder"
              >关闭订单</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  findOrdersByPage,
  orderDetail,
  sendDone,
  finishOrder,
  receiveProductsForce
} from '@/api/order/index'
import kdExpressData from '../../kdExpress/kdExpress.json'
export default {
  data() {
    return {
      options: [
        {
          id: 0,
          name: '顺丰快递'
        },
        {
          id: 1,
          name: '韵达快递'
        },
        {
          id: 2,
          name: '中国邮政'
        },
        {
          id: 3,
          name: '申通快递'
        },
        {
          id: 4,
          name: '中通快递'
        }
      ],
      // 待发货验证表单
      form: {
        deliverySn: '',
        deliveryCompany: ''
      },
      rules: {
        deliveryCompany: [
          {
            required: true,
            message: '请填写物流公司',
            trigger: 'change'
          }
        ],
        deliverySn: [
          {
            required: true,
            message: '请填写物流单号',
            trigger: 'blur'
          }
        ]
      },
      steps: 1,
      id: '',
      stepList: [
        { name: '待付款' },
        { name: '待发货' },
        { name: '已发货' },
        { name: '已完成' },
        { name: '已关闭' }
      ],
      status: 1,
      detailObj: {}, // 订单基础信息
      orderItemList: [],
      forceSendShow: false //是否强制收货
    }
  },
  created() {
    this.getOrderDetail()
  },
  computed: {
    // 处理物流信息
    expressData() {
      return kdExpressData.Traces
    }
  },
  methods: {
    getOrderDetail() {
      this.id = this.$route.query.id
      // console.log(this.id);
      orderDetail(this.id).then((res) => {
        this.detailObj = res.data.orderDetail.orderBase
        this.orderItemList = res.data.orderDetail.orderItems
        console.log('订单详情', res)
        this.status = res.data.orderDetail.orderBase.status
        this.steps = this.status + 1
        // console.log(this.steps);
        // 获取数据后在请求
        this.isQZsh()
        this.initStepList() //初始化进度条信息
      })
    },
    // 确认发货
    sendOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          sendDone({
            orderId: this.id,
            deliverySn: this.form.deliverySn,
            deliveryCompany: this.form.deliveryCompany
          })
            .then((res) => {
              if (res.success) {
                this.$message.success('确定发货成功')
                this.getOrderDetail()
              } else {
                this.$message.error('确定发货失败')
              }
            })
            .catch((res) => {
              this.$message.error('确认发货失败')
            })
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    },
     // 初始化进度条信息
        initStepList() {
            this.stepList[0].time = this.detailObj.createTime
            this.stepList[1].time = this.detailObj.paymentTime
            this.stepList[2].time = this.detailObj.deliveryTime
            this.stepList[3].time = this.detailObj.receiveTime
            this.stepList[4].time = this.detailObj.finishTime
            this.status = this.detailObj.status
        },
    // 是否强制收货
    isQZsh() {
      console.log(1111)
      this.orderItemList.forEach((item) => {
        if (item.isReturn === 1) {
          console.log(item.isReturn)
          this.forceSendShow = true
          console.log(this.forceSendShow)
        }
      })
    },
     //点击强制确认收货
    forceFinishOrder() {
      receiveProductsForce(this.id).then((res) => {
        if (res.success) {
          this.$message.success('强制确认收货成功')
          this.getOrderDetail()
        } else {
          this.$message.error('强制确认收货失败')
        }
      })
    },
          //关闭订单
    finishOrder() {
     finishOrder(this.id).then((res) => {
        if (res.success) {
          this.$message.success('关闭订单成功')
          this.getOrderDetail()
        } else {
          this.$message.error('关闭订单失败')
        }
      })
    },
    // 去退货 详情页面
    goReturn(row) {
          this.$router.push({
                path: 'backDetail',
                query: { id: row.returnId }
            })
    }
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
</style>










