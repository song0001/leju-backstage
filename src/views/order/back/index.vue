<template >
  <div>
    <!-- 搜索框 -->
    <el-card class="card" shadow="never">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form
        ref="searchForm"
        class="search-form"
        :model="searchForm"
        label-width="100px"
        size="mini"
      >
        <el-row :gutter="6">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input
                v-model="searchForm.orderSn"
                style="width: 200px"
                placeholder="请填写订单编号"
                size="mini"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="6" :offset="0">
            <el-form-item label="退单状态">
              <el-select
                v-model="searchForm.status"
                class="search-input"
                size="small"
                clearable
                placeholder="退单状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="20">
            <el-button
              style="margin: 0 20px"
              type="default"
              size="mini"
              @click="resetForm"
              >重置</el-button
            >
            <el-button type="primary" size="mini" @click="searchBack"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 退单列表 -->
    <el-card class="card" shadow="never">
      <el-table
        :data="orderList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" fixed="left" />

        <el-table-column
          align="center"
          label="订单编号"
          prop="orderSn"
          width="250"
        >
        </el-table-column>
        <el-table-column align="center" label="退单状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger" effect="dark">待处理</el-tag>
            <el-tag
              v-else-if="scope.row.status === 1"
              type="warning"
              effect="dark"
              >退货中</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2">已完成</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="info">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="description"
          width="250"
        />
        <el-table-column
          align="center"
          label="退单原因"
          prop="reason"
          width="250"
        />
        <el-table-column
          align="center"
          label="商品名称"
          width="150"
          prop="productName"
        />
        <el-table-column
          align="center"
          label="商品属性"
          width="190"
          prop="productAttr"
        >
          <template slot-scope="scope">
            <div v-for="item in JSON.parse(scope.row.productAttr)" :key="item.id">
                 <span>{{item.key}}:{{item.value}}</span>
              </div>
            <!-- <p>{{ scope.row.productAttr | initAttrArr }}</p> -->
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商家备注"
          width="150"
          prop="handleNote"
        />
        <el-table-column
          align="center"
          label="添加时间"
          prop="createTime"
          width="250"
        />

        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              style="width: 150px"
              size="mini"
              @click="goBackDetail(scope.row)"
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
      />
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
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      statusList: [
        { name: '待处理', id: 0 },
        { name: '退货中', id: 1 },
        { name: '已完成', id: 2 },
        { name: '已拒绝', id: 3 }
      ],
      searchForm: {
        orderSn: '', // 订单编号
        status: '' // 退单状态
      },

      orderList: [] //订单列表
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 搜索订单
    searchBack() {
      this.page.currentPage = 1
      this.getOrderList()
    },
    getOrderList() {
      findReturnApply(
        this.page.currentPage,
        this.page.size,
        this.searchForm
      ).then((res) => {
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
    goBackDetail(row) {
      console.log('查看订单', row)
        this.$router.push({path:'backDetail',query:{id:row.id}})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
</style>