<template>
  <div ref="mapEchartsBox" style="width:100%;height:100%" />
</template>

<script>
import echarts from 'echarts'
// 引入echafts的地图json
import china from 'echarts/map/json/china.json'
export default {
    props: ['mapData'], //接收父組件的數據
    data() {
        return {
        }
    },
    created() {

    },
    mounted() {
        this.initMapEcharts()
    },
    methods: {
        // 初始化地图
        initMapEcharts() {
            // 需要注册地图 https://www.makeapie.com/editor.html?c=xMpGBbTEKU
            echarts.registerMap('china', china)
            var myEcharts = echarts.init(this.$refs.mapEchartsBox)
            var outname = this.mapData.outname
            var outvalue = this.mapData.outvalue
            var outdata = []

            var max = 6000
            var min = 10
            // 改变涟漪圈从内到外的大小maxSize4Pin   minSize4Pin
            var maxSize4Pin = 30
            var minSize4Pin = 6

            for (var i = 0; i < outname.length; i++) {
                outdata.push({
                    name: outname[i],
                    value: outvalue[i]
                })
            }
            // 对应的省份和编码
            var geoCoordMap = {}
            /* 注册地图后可以使用getMap 获得地图信息 获取地图数据*/
            var mapFeatures = echarts.getMap('china').geoJson.features
            mapFeatures.forEach(function(v) {
                // 地区名称
                var name = v.properties.name
                // 地区经纬度
                // 把对应的省份和编码放入geoCoordMap
                geoCoordMap[name] = v.properties.cp
            })
            var convertData = function(outdata) {
                var res = []
                for (var i = 0; i < outdata.length; i++) {
                    // 获取outdata里边省份的 编码
                    var geoCoord = geoCoordMap[outdata[i].name]
                    if (geoCoord) {
                        res.push({
                            name: outdata[i].name,
                            value: geoCoord.concat(outdata[i].value)
                        })
                    }
                }
                return res
            }

            var option = {
                // backgroundColor: '#0F1 C3C',
                title: {
                    text: '全国订单人数分布图',
                    textStyle: {
                        color: '#9AA8D4',
                        fontSize: 22,
                        fontWeight: 'normal'
                    }
                },
                // 左下角条状数据
                // visualMap: {
                //     min: 0,
                //     max: 1100,
                //     text: ['多', '少'],
                //     realtime: false,
                //     calculable: true,
                //     inRange: {
                //         color: ['#073684', '#53D9FF']
                //     }
                // },
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        // console.log(params)
                        if (params.value.length > 1) {
                            return (
                                '&nbsp;&nbsp;' +
                                params.name +
                                '&nbsp;&nbsp;&nbsp;' +
                                params.value[2] +
                                '人&nbsp;&nbsp;'
                            )
                        } else {
                            return (
                                '&nbsp;&nbsp;' +
                                params.name +
                                '&nbsp;&nbsp;&nbsp;' +
                                params.value +
                                '人&nbsp;&nbsp;'
                            )
                        }
                    }
                },

                geo: {
                    map: 'china',
                    show: true,
                    roam: false,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    layoutSize: '100%',
                    itemStyle: {
                        normal: {
                            borderColor: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#00F6FF'
                                    },
                                    {
                                        offset: 1,
                                        color: '#53D9FF'
                                    }
                                ],
                                false
                            ),
                            borderWidth: 3,
                            shadowColor: 'rgba(10,76,139,1)',
                            shadowOffsetY: 0,
                            shadowBlur: 60
                        }
                    }
                },
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        // 地图的长宽比
                        aspectScale: 0.75,

                        // 不显示省份名称
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },

                        itemStyle: {
                            // 省份的背景色和样式
                            normal: {
                                areaColor: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#073684' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#061E3D' // 100% 处的颜色
                                        }
                                    ]
                                },
                                borderColor: '#215495',
                                borderWidth: 1
                            },
                            // 鼠标移到省份时候hover显示的背景色和样式
                            emphasis: {
                                areaColor: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#073684' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#061E3D' // 100% 处的颜色
                                        }
                                    ]
                                }
                            }
                        },
                        data: outdata
                    },
                    {
                        // 省份上显示的数字涟漪
                        type: 'effectScatter',
                        // 该系列使用的坐标系'geo',使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
                        coordinateSystem: 'geo',
                        // 涟漪特效相关配置
                        rippleEffect: {
                            brushType: 'fill'
                        },
                        // 配置何时显示特效。
                        showEffectOn: 'render',
                        /*
                            图形样式。
                            颜色可以使用 RGB 表示，比如 'rgb(128, 128, 128)'，如果想要加上 alpha 通道表示不透明度，可以使用 RGBA，比如 'rgba(128, 128, 128, 0.5)'，也可以使用十六进制格式，比如 '#ccc'。除了纯色之外颜色也支持渐变色和纹理填充
                        */
                        itemStyle: {
                            normal: {
                                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(5,80,151,0.2)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(5,80,151,0.8)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0,108,255,0.7)'
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                        label: {
                            normal: {
                                show: false,
                                color: '#fff',
                                fontWeight: 'bold',
                                position: 'inside',
                                formatter: function(para) {
                                    return '{cnNum|' + para.data.value[2] + '}'
                                },
                                // 在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。
                                rich: {
                                    // cnNum和formatter里的 return '{cnNum|' + para.data.value[2] + '}'对应
                                    cnNum: {
                                        fontSize: 12,
                                        color: '#D4EEFF'
                                    }
                                }
                            }
                        },
                        // 涟漪的样式 circle 是圆圈,还有'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' 等
                        symbol: 'circle',
                        symbolSize: function(val) {
                            if (val[2] === 0) {
                                return 0
                            }
                            var a = (maxSize4Pin - minSize4Pin) / (max - min)
                            var b = maxSize4Pin - a * max
                            return a * val[2] + b * 1.2
                        },
                        data: convertData(outdata),
                        zlevel: 1
                    }
                ]
            }

            myEcharts.setOption(option)
            // setTimeout(() => {
            //     // 让地图自适应屏幕的宽度
            //     window.onresize = function() {
            //         myEcharts.resize()
            //     }
            // }, 200)
        }
    }
}
</script>

<style scoped lang="scss">

</style>
