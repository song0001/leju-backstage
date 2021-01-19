<template>

  <div ref="EchartsBox" style="width:100%;height:100%" />

</template>

<script>
import echarts from 'echarts'
// github地址: https://github.com/ecomfe/echarts-wordcloud
// 项目演示地址:https://www.makeapie.com/editor.html?c=xBJ11Hguze
require('echarts-wordcloud')
export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            var chart = echarts.init(this.$refs.EchartsBox)

            var option = {

                tooltip: {
                    show: true
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 6,
                    shape: 'diamond',
                    sizeRange: [30, 60],
                    width: 800,
                    height: 500,
                    textStyle: {
                        normal: {
                            color: function() {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')'
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: [{
                        name: ' 特斯拉Model S',
                        value: 30
                    },
                    {
                        name: '天生要强',
                        value: 24
                    },
                    {
                        name: ' 华为p20',
                        value: 21
                    },
                    {
                        name: '杜兰特',
                        value: 19
                    },
                    {
                        name: '三只松鼠',
                        value: 18
                    },
                    {
                        name: 'Mac Pro',
                        value: 18
                    },
                    {
                        name: 'Iphone12 Pro',
                        value: 17
                    },
                    {
                        name: '玛莎拉蒂',
                        value: 12
                    },
                    {
                        name: '小米手机',
                        value: 12
                    },
                    {
                        name: '保时捷',
                        value: 11
                    }

                    ]
                }]

            }
            chart.setOption(option)
        }
    }
}
</script>

<style scoped lang="scss">

</style>
