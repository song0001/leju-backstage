<template>
  <div class="pro-main">
    <div class="num" :style="{ left: per }">{{ percentage }}%</div>
    <div class="pro-bar">
      <div :style="{ width: per }" class="pro-inner" />
    </div>
    <div :style="{ left: per }" class="triangle" />
  </div>
</template>

<script>
export default {
    props: ['percentage'],
    data() {
        return {
          // percentage:55
        }
    },
    computed: {
        per() { 
            return this.percentage + '%'
        
        }
    },
    created() {
      this.init()
    },
    mounted() {},
    methods: {
      init(){
   console.log(this.percentage);
      }
     
    }
}
</script>

<style scoped lang="scss">
.pro-main {
  position: relative;
  margin: 20px auto;
  width: 100%;
  // background-color: red;
  height: 50px;
  .num {
    font-family: 'Microsoft Yahei';
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    width: 45px;
    text-align: center;
    margin-left: -30px;
    transition: ease .4s all;

  }
  .pro-bar {
    position: absolute;
    top: 65%;
    transform: translate(0, -50%);
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: #283052;

    .pro-inner {
    transition: ease .4s all;

      // width: 77%;
      border-radius: 5px;
      height: 10px;
      background: linear-gradient(
        to right,
        rgb(36, 203, 255) 30%,
        rgb(144, 0, 255) 100%
      );
    }
  }
  .triangle {
    transition: ease .4s all;

    position: absolute;
    top: 40px;

    margin-left: -10px;
    width: 0;
    height: 0;
    border-top: 0px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid rgb(255, 255, 255);
  }
}
</style>
