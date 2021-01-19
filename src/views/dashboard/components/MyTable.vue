<template>
  <div class="table-main">
    <div class="head">
      <div class="head-item">时间</div>
      <div class="head-item">物品</div>
      <div class="head-item">数量</div>
      <div class="head-item">金额</div>
    </div>
    <div v-for="item in tableData" :key="item.id" class="row">
      <div class="row-item">{{ item.date }}</div>
      <div class="row-item">{{ item.name }}</div>
      <div class="row-item">{{ item.number }}</div>
      <div class="row-item">{{ item.price }}</div>

    </div>

  </div>
</template>

<script>
import {tableData} from '../dataJson'
export default {
    data() {
        return {
          tableData:tableData
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style scoped lang="scss">
.table-main {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  .head {
    border: 1px solid rgb(51, 65, 107);
    font-size: 14px;
    color: rgb(154, 168, 212);
    height: 40px;
    .head-item {
      float: left;
      height: 100%;
      width: 25%;
      line-height: 40px;
      text-align: center;
      font-weight: 600;
    }
  }
  .row {
    overflow: hidden;
    width: 100%;
    font-size: 13px;
    text-align: center;
    color: rgb(154, 168, 212);
    border: 1px solid rgb(51, 65, 107);
    border-top: none;
    .row-item {
      float: left;
      width: 25%;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
