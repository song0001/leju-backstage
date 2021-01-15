<template >
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <span> 条件查询</span>
      </div>
      <el-form
        :model="searchForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input
                v-model="searchForm.orderSn"
                size="mini"
                placeholder="请填写订单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型">
              <el-select
                v-model="searchForm.orderType"
                placeholder="订单类型"
                size="mini"
              >
                <el-option
                  v-for="item in orderTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付方式">
              <el-select
                v-model="searchForm.payType"
                placeholder="支付方式"
                size="mini"
              >
                <el-option
                  v-for="item in payTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select
                v-model="searchForm.status"
                placeholder="订单状态"
                size="mini"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="right">
            <el-form-item>
              <el-button @click="resetForm" size="mini">重置</el-button>
              <el-button type="primary" @click="searchOrder" size="mini"
                >搜索</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 订单列表 -->
    <el-card class="card">
      <el-table border :data="orderList" style="width: 100%">
        <el-table-column
          fixed="left"
          type="index"
          prop="date"
          label="#"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单编号"
          align="center"
          width="300"
        >
        </el-table-column>

        <el-table-column
          prop="payType"
          label="支付方式"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType === 0" type="info" effect="dark"
              >未支付</el-tag
            >
            <el-tag
              v-if="scope.row.payType === 1"
              effect="dark"
              style="font-size: 25px"
              ><svg-icon icon-class="aliPay" class="aliPay"></svg-icon
            ></el-tag>
            <el-tag
              v-if="scope.row.payType === 2"
              style="font-size: 25px"
              type="success"
              effect="dark"
              ><svg-icon icon-class="weixin" ></svg-icon
            ></el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger" effect="dark"
              >待付款</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 1"
              type="warning"
              effect="dark"
              >待发货</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2">已发货</el-tag>
            <el-tag v-else-if="scope.row.status === 3" effect="dark"
              >已完成</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="info" effect="dark"
              >已关闭</el-tag
            >
            <el-tag v-else type="info">无效订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="添加时间"
          prop="createTime"
          width="300"
        />
        <el-table-column
          align="center"
          label="用户账号"
          prop="memberUsername"
          width="200"
        />
        <el-table-column align="center" label="订单类型" width="200">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderType === 1" type="warning"
              >秒杀订单</el-tag
            >
            <el-tag v-else type="success">正常订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="200" prop="note" />
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="width: 150px"
              size="mini"
              @click="goOrderDetail(scope.row)"
            >
              <i
                style="margin-right: 6px"
                class="el-icon-view"
              />查看订单</el-button
            >
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
import {
  findOrdersByPage,
  orderDetail,
  sendDone,
  finishOrder,
  receiveProductsForce
} from '@/api/order/index'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      orderTypeList: [
        { name: '正常订单', id: 0 },
        { name: '秒杀订单', id: 1 }
      ],
      payTypeList: [
        { name: '未支付', id: 0 },
        { name: '支付宝', id: 1 },
        { name: '微信', id: 2 }
      ],
      statusList: [
        { name: '待付款', id: 0 },
        { name: '待发货', id: 1 },
        { name: '已发货', id: 2 },
        { name: '已完成', id: 3 },
        { name: '已关闭', id: 4 },
        { name: '无效订单', id: 5 }
      ],
      searchForm: {
        orderSn: '', // 订单编号
        orderType: '', // 订单类型
        payType: '', // 支付方式
        status: '' // 订单状态
      },

      orderList: [] //订单列表
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 搜索订单
    searchOrder() {
      this.page.currentPage = 1
      this.getOrderList()
    },
    getOrderList() {
      findOrdersByPage(this.page.currentPage, this.page.size,this.searchForm).then((res) => {
        console.log(res)
        this.orderList = res.data.rows
        this.page.total = res.data.total
      })
    },

    // 改变每页显示数量
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.getOrderList()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getOrderList()
    },
    // 重置表单
    resetForm() {
      this.searchForm = this.$options.data().searchForm
    },
    // 查看订单
    goOrderDetail(row){
    console.log('查看订单',row);
    this.$router.push({path:'orderDetail',query:{id:row.id}})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
</style>