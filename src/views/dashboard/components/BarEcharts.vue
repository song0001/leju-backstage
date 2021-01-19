<template>
  <!-- echarts的挂在对象 -->
  <div ref="barEchartsBox" style="width:100%;height:100%" />
</template>

<script>
import echarts from 'echarts'

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
            var xAxisData = []
            var data1 = []
            var data2 = []
            // 模拟80条数据
            for (var i = 0; i < 80; i++) {
                xAxisData.push('date' + i)
                data1.push(Math.ceil(Math.random() * 10))
                data2.push(Math.ceil(Math.random() * 10))
            }

            var option = {
                // 标题的参数
                title: {
                    text: '订单退单柱状图',
                    // 标题字体样式
                    textStyle: {
                        color: '#9AA8D4',
                        fontSize: 22,
                        fontWeight: 'normal'
                    }
                },
                // 两个按钮的样式
                legend: {
                    // 对应 series里的 name
                    data: ['订单', '退单'],
                    // 距离底部
                    bottom: 10,
                    // 字体样式
                    textStyle: {
                        color: '#A8AAB3', // 坐标值得具体的颜色
                        fontSize: 12
                    }
                },
                // toolbox: {
                //     // y: 'bottom',
                //     // 右上角工具栏
                //     feature: {
                //         magicType: {
                //             type: ['stack', 'tiled']
                //         },
                //         dataView: {},
                //         saveAsImage: {
                //             pixelRatio: 2
                //         }
                //     }
                // },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    // 网格是否显示
                    splitLine: {
                        show: false
                    },
                    // x线的样式
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#A8AAB3', // 左边线的颜色
                            width: '1'// 坐标线的宽度
                        }
                    },
                    axisLabel: {
                        // 坐标轴字体样式
                        textStyle: {
                            color: '#A8AAB3', // 坐标值得具体的颜色
                            fontSize: 12
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    // y线的样式
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#A8AAB3', // 左边线的颜色
                            width: '1'// 坐标线的宽度
                        }
                    },
                    axisLabel: {
                        // 坐标轴字体样式
                        textStyle: {
                            color: '#A8AAB3', // 坐标值得具体的颜色
                            fontSize: 12
                        }
                    }
                },
                series: [{
                    name: '订单',
                    type: 'bar',
                    data: data1,
                    itemStyle: {
                        normal: {
                            // 渐变柱状图
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#7D05E2' }, // 柱图渐变色
                                    { offset: 0.5, color: '#B600FF' }, // 柱图渐变色
                                    { offset: 1, color: '#BC04E2' } // 柱图渐变色
                                ]
                            )
                        }

                    }

                }, {
                    name: '退单',
                    type: 'bar',
                    data: data2,
                    itemStyle: {
                        normal: {
                            // 渐变柱状图
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#24CBFF' }, // 柱图高亮渐变色
                                    { offset: 0.5, color: '#24A3FF' }, // 柱图高亮渐变色
                                    { offset: 1, color: '#2492FF' } // 柱图高亮渐变色
                                ]
                            )
                        }

                    }

                }],
                // 柱子弹出来的动画样式
                animationEasing: 'elasticOut',
                animationDelayUpdate: function(idx) {
                    return idx * 5
                }
            }
            var myEcharts = echarts.init(this.$refs.barEchartsBox)
            myEcharts.setOption(option)
        }
    }
}
</script>

<style scoped lang="scss">

</style>
