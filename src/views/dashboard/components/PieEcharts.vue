<template>
  <div ref="pieEchartsBox" style="width: 100%; height: 100%" />
</template>

<script>
import echarts from 'echarts'

export default {
    data() {
        return {}
    },
    created() {},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            var option = {
                title: {
                    text: '购买终端',
                    // 标题字体样式
                    textStyle: {
                        color: '#9AA8D4',
                        fontSize: 22,
                        fontWeight: 'normal'
                    }
                },
                // hover扇面时候显示的内容 b是data的name  c是data的value
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}数量 : {c}个;占比 ({d}%)'
                },
                // legend: {
                //     left: 'center',
                //     top: 'bottom',
                //     data: ['ios', 'PC Web', 'Android', 'Wap Web']
                // },
                // toolbox: {
                //     show: true,
                //     feature: {
                //         mark: { show: true },
                //         dataView: { show: true, readOnly: false },
                //         magicType: {
                //             show: true,
                //             type: ['pie', 'funnel']
                //         },
                //         restore: { show: true },
                //         saveAsImage: { show: true }
                //     }
                // },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        // 最外圈和最内圈的比例大小
                        radius: ['25%', '50%'],

                        roseType: 'area',
                        data: [
                            {
                                value: 25,
                                name: 'Android',
                                label: {
                                    normal: {
                                        textStyle: {
                                            // 字体颜色渐变  扇颜色保持一致
                                            color: '#4B4CDC',
                                            fontSize: 12
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        // 渐变柱状图
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: '#6D48DC' }, // 柱图渐变色
                                            { offset: 0.5, color: '#6D48DC' }, // 柱图渐变色
                                            { offset: 1, color: '#4B4CDC' } // 柱图渐变色
                                        ])
                                    }
                                }
                            },
                            {
                                value: 20,
                                name: 'ios',
                                label: {
                                    normal: {
                                        // 字体颜色
                                        textStyle: {
                                            color: '#248DFF',
                                            fontSize: 12
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        // 渐变柱状图
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: '#24C9FF' }, // 柱图渐变色
                                            { offset: 0.5, color: '#24ABFF' }, // 柱图渐变色
                                            { offset: 1, color: '#248DFF' } // 柱图渐变色
                                        ])
                                    }
                                }
                            },
                            {
                                value: 15,
                                name: 'PC Web',
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#BD00FF',
                                            fontSize: 12
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        // 渐变柱状图
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: '#D200FF' }, // 柱图渐变色
                                            { offset: 0.5, color: '#BD00FF' }, // 柱图渐变色
                                            { offset: 1, color: '#BD00FF' } // 柱图渐变色
                                        ])
                                    }
                                }
                            },

                            {
                                value: 5,
                                name: 'Wap Web',
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#70218F',
                                            fontSize: 12
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        // 渐变柱状图
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: '#8A1D89' }, // 柱图渐变色
                                            { offset: 0.5, color: '#7C1D8C' }, // 柱图渐变色
                                            { offset: 1, color: '#70218F' } // 柱图渐变色
                                        ])
                                    }
                                }
                            }
                        ]
                    }
                ]
            }

            var myEcharts = echarts.init(this.$refs.pieEchartsBox)
            myEcharts.setOption(option)
        }
    }
}
</script>

<style scoped lang="scss">
</style>
