<template>
  <div class="dashboard-container">
    <div class="dashboard-text">乐居首页</div>
  </div>
</template>

<script>
import {getDashboardData} from '@/api/login'

export default {
  name: 'Dashboard',
  computed: {
  
  },
  created(){
    getDashboardData().then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
