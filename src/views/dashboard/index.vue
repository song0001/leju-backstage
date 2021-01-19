<template>
  <div class="dashboard-container">
    <div ref="dashboard_main" class="dashboard_main">
      <div class="top-main">
        <span class="fullScreenWraper"
          ><svg-icon icon-class="full" @click="fullScreen"
        /></span>
        <div class="title">
          <span>不凡数据大屏</span>
        </div>
        <!-- <div class="time">2021-01-19 14:35:15</div> -->
        <div class="time">{{ timeText }}</div>
      </div>

      <div class="content-main">
        <!-- 左侧数据 -->
        <div class="content-left content-item">
          <div class="title">电商数据 <span>Shell Data</span></div>
          <div class="left-data">
            <div class="left-title">
              销售量
              <span class="num-unit">万元</span>
            </div>
                <div class="num-content">
                <!-- 判断是否有小数点 -->
                <div
                  v-for="(item, index) in numData.saleNum"
                  :key="index"
                  :class="item === '.' ? 'dot' : 'num-div'"
                >
                  {{ item }}
                </div>
              </div>
          </div>
          <div class="left-data">
            <div class="left-title">完成百分比</div>
            <div class="pro-wrapper">
              <Progress :percentage="percentage" />
            </div>
          </div>

          <!-- 字符云 echarts -->
          <div class="title">热门搜索词 <span>Top Search</span></div>
          <div ref="wordsEcharts" class="words-echarts">
            <WordEcharts />
          </div>
        </div>
        <!-- 中间数据 -->
        <div class="content-center content-item">
          <!-- 柱状图echarts组件 -->
          <div class="barEchartsBox">
            <BarEcharts />
          </div>
          <div class="bottom-charts-wrapper">
            <!-- 中國地圖 -->
            <div class="item">
              <MapEcharts :mapData="mapData" />
            </div>
            <!-- 餅狀圖  -->
            <div class="item">
              <PieEcharts />
            </div>
          </div>
        </div>
        <!-- 右侧数据 -->
        <div class="content-right content-item">
          <div class="title">统计数据 <span>Statistics Data</span></div>
          <div class="statistics-content">
            <div
              v-for="item in numData.statisticsData"
              :key="item.id"
              class="statistics-item"
            >
              <div class="left">
                <img :src="item.img" alt="" />
              </div>
              <div class="right">
                <div class="wrapper">
                  <div class="value">{{ item.value }}</div>
                  <div class="text">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- table -->
          <div style="margin: 20px 0" class="title">
            大额订单Top <span>Supper Orders</span>
          </div>
          <div class="table-wrapper">
            <!-- 大额订单组件 -->
            <MyTable />
          </div>
        </div>
      </div>
       <!-- 底部动态背景 -->
      <div class="bottom-bg">
        <CanvasBg ref="canvasBg" />
      </div>
    </div>  
  </div>
</template>

<script>
import { getDashboardData } from '@/api/login'
// 引入全屏
import screenfull from 'screenfull'
// 引入柱状图
import BarEcharts from './components/BarEcharts'
// 引入进度条
import Progress from './components/Progress'
// 引入底部canvas动态效果
import CanvasBg from './components/CanvasBg'
import { statisticsData, mapData, tableData } from './dataJson' //引入数据 (假数据)
// 引入table表格
import MyTable from './components/MyTable'
import WordEcharts from './components/WordEcharts'
// 引入中國地圖echarts
import MapEcharts from './components/MapEcharts'
// 引入餅狀圖
import PieEcharts from './components/PieEcharts'
export default {
  components: {
    BarEcharts, //柱状图组件
    MyTable, //大额订单表格
    Progress,
    CanvasBg,
    WordEcharts, //熱門搜索詞
    MapEcharts,
    PieEcharts
  },
  name: 'Dashboard',
  data() {
    return {
      timeText: '', // 时间显示
      timer: null, // 定时器(时间显示的)
      numData: {
        saleNum: '1201028.4', // 电商数据的 销售量(假数据)
        statisticsData: statisticsData // 统计数据(假数据)
      },
      mapData: mapData, // 地图数据
      tableData: tableData, // 大额订单数据
      percentage: 55 //初始百分比
    }
  },
  computed: {
     per() {
            return this.percentage + '%'
        }
  },
  created() {
    // 緩動數字變化
    this.initChangeNum()
    // 设置定时器 展示百分比动画
    setTimeout(() => {
      this.percentage = 88
      // console.log(this.percentage)
    }, 3000)
    getDashboardData().then((res) => {
      console.log(res)
    })
    // 当前时间 需要处理
    console.log(new Date())
  },
  mounted() {
    // 开始计时
    this.timeStart()
  },
  // 销毁前的钩子
  beforeDestroy() {
    // 离开页面前清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
     initChangeNum(){
this.numChangeDelay(this.numData.saleNum)
     },
    // 封裝緩動資數字變化函數
         numChangeDelay(initNum) {
            // 先转换成string类型
            var numStr = initNum + ''
            // 打断点小数点
            var dotArr = numStr.split('.')
            // 为了去掉小数点,初始化倍数
            var mutiple = 1
            if (dotArr[1]) {
                // 倍数等于小数点后的小数的位数  **是指数的意思
                mutiple = 10 ** (dotArr[1].length)
            }
            // 去掉小数点后的数字
            var endNum = Number(initNum) * mutiple
            var startNum; var numTimer = null
            if (endNum > 100000) {
                // 设置开始数字
                startNum = endNum - 100000
                // 展示的数字字符串
                this.numData.saleNum = startNum / mutiple + ''
                // 设置定时器
                numTimer = setInterval(() => {
                    // 每次变化100
                    startNum = startNum + 1000
                    this.numData.saleNum = startNum / mutiple + ''
                    // 当起始的数 和结束的数相差小于 变化值的时候 ,清除定时器
                    if (endNum - startNum < 1000) {
                        clearInterval(numTimer)
                    }
                }, 10)
            } else if (endNum > 100 && endNum < 100000) {
                // 设置开始数字
                startNum = endNum - 100
                // 展示的数字字符串
                this.numData.saleNum = startNum / mutiple + ''
                // 设置定时器
                numTimer = setInterval(() => {
                    // 每次变化100
                    startNum = startNum + 100
                    this.numData.saleNum = startNum / mutiple + ''
                    // 当起始的数 和结束的数相差小于 变化值的时候 ,清除定时器
                    if (endNum - startNum < 100) {
                        clearInterval(numTimer)
                    }
                }, 10)
            }
        },
    // 切换全屏
    fullScreen() {
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.dashboard_main)
      }
    },
    timeStart() {
      // 设置定时器
      this.timer = setInterval(() => {
        this.timeText = this.formatDate(new Date())
      }, 1000)
    },
    // 格式化时间
    formatDate(date) {
      // 格式化时间为 YYYY-MM-DD HH:MM:SS
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      // 判断是不是小于10 返回01 02 03
      function check(num) {
        if (num < 10) {
          // 如果数字小于10,前边拼接个0
          return '0' + num
        } else {
          return num
        }
      }
      // 时间展示
      return `
            ${check(year)}-
            ${check(month)}-
            ${check(day)} 
            ${check(hours)}:
            ${check(minutes)}:
            ${check(seconds)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100vh;
  // height: calc(100vh - 50px);
  background-color: #0a1631;
  .dashboard_main {
    background-color: #0a1631;
    .top-main {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100px;
      //   background-color: red;
      .fullScreenWraper {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 25px;
        color: #9aa8d4;
      }
      .title {
        margin: 0 auto;
        background: url('~@/assets/titleBG.png');
        background-size: 100% 100%;
        background-position: center;
        width: 70%;
        height: 122px;
        text-align: center;
        line-height: 100px;
        font-size: 36px;
        span {
          font-family: 'Microsoft Yahei', Arial, sans-serif;
          font-size: 36px;
          color: rgb(255, 255, 255);
          text-shadow: rgb(255, 255, 255) 0px 0px 15px;
          font-weight: bold;
        }
      }
      .time {
        position: absolute;
        right: 30px;
        top: 20px;
        margin-right: 20px;
        font-family: 'Microsoft Yahei', Arial, sans-serif;
        font-size: 20px;
        color: rgb(255, 255, 255);
        font-weight: normal;
        justify-content: center;
      }
    }
    // 内容区样式
    .content-main {
      position: relative;
      width: 100%;
      height: 800px;
      .content-item {
        position: relative;
        float: left;
        overflow: hidden;
        box-sizing: border-box;
        // background-color: orange;
        padding: 10px 0 0 10px;
        width: 25%;
        //   height: 80%;
        .title {
          font-family: 'Microsoft Yahei', Arial, sans-serif;
          font-size: 22px;
          color: rgb(154, 168, 212);
          font-weight: normal;

          span {
            font-family: 'Microsoft Yahei', Arial, sans-serif;
            font-size: 20px;
            color: rgb(64, 77, 105);
            font-weight: normal;
            justify-content: center;
            text-align: center;
          }
        }
      }
      .content-left {
        .left-data {
          margin: 20px 0;
          .left-title {
            font-family: 'Microsoft Yahei', Arial, sans-serif;
            font-size: 16px;
            color: rgb(154, 168, 212);
            .num-unit {
              float: right;
              font-family: 'Microsoft Yahei', Arial, sans-serif;
              font-size: 16px;
              color: rgb(115, 170, 229);
              justify-content: center;
              text-align: center;
            }
          }

          .num-content {
            display: flex;
            //   margin-left: 10px;
            margin-top: 20px;
            .num-div {
              font-family: 'Microsoft Yahei';
              font-size: 55px;
              font-weight: bold;
              color: rgb(255, 255, 255);
              margin-left: 3px;
              margin-right: 3px;
              box-sizing: content-box;
              width: 10%;
              text-align: center;
              background-color: rgb(15, 57, 107);
            }
            .dot {
              font-family: 'Microsoft Yahei';
              font-size: 55px;
              font-weight: bold;
              color: rgb(255, 255, 255);
              margin-left: 3px;
              margin-right: 3px;
            }
          }
          .pro-wrapper { //进度条样式
            margin: 0 auto;
            position: relative;
            width: 85%;
          }
        }
        .words-echarts {
          margin-top: 20px;
          position: relative;
          width: 100%;
          height: 390px;
          background-color: #16223c;
        }
      }
      .content-center {
        width: 50%;
        .barEchartsBox {
          width: 95%;
          margin: 0 auto;
          height: 360px;
        }
        .bottom-charts-wrapper {
          width: 95%;
          margin: 0 auto;
          height: 360px;
          overflow: hidden;
          .item {
            float: left;
            width: 50%;
            height: 360px;
            // background-color: red;
          }
        }
      }
      .content-right {
        box-sizing: border-box;
        padding-right: 10px;
        .statistics-content {
          position: relative;
          width: 100%;
          height: 150px;
          margin-top: 20px;

          .statistics-item {
            position: relative;
            float: left;
            width: 50%;
            height: 50%;
            //   background-color: red;
            .left {
              position: relative;
              float: left;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              width: 35%;
              img {
                width: 80%;
              }
            }
            .right {
              position: relative;
              float: left;
              box-sizing: border-box;
              display: flex;
              // justify-content: center;
              align-items: center;
              height: 100%;
              width: 65%;
              padding-left: 15px;
              .wrapper {
                .value {
                  font-family: 'Microsoft Yahei';
                  font-size: 32px;
                  font-weight: bold;
                  color: rgb(255, 255, 255);
                }
                .text {
                  margin-top: 4px;
                  font-family: 'Microsoft Yahei';
                  font-size: 12px;
                  color: rgb(176, 194, 249);
                  align-self: flex-start;
                }
              }
              .table-wrapper {
                position: relative;
                width: 100%;
              }
            }
          }
        }
      }
    }
        .bottom-bg {
      position: absolute;
      z-index: 1;
      // margin-top: -10px;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 25%;
    }
  }
}
</style>
