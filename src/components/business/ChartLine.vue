<template>
  <div class="line" ref="line"></div>
</template>

<script>
import echarts from 'echarts'
import { tenThousand } from '@/filter/global/money'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    xList: {
      type: Array,
      required: true
    },
    yList: {
      type: Array,
      required: true
    },
    formatter: {
      type: Function,
      required: true
    },
    xformatter: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      chart: {},
      change: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      const ref = this.$refs.line
      this.chart = echarts.init(ref)

      this.update()
    })
  },
  methods: {
    getOption() {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'unset',
          formatter: params => this.formatter(params),
          axisPointer: {
            lineStyle: {
              color: '#e3e1e6'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xList,
          offset: 10,
          axisLine: {
            lineStyle: {
              width: 1,
              type: 'solid',
              color: '#E1E4E6'
            }
          },
          axisLabel: {
            formatter: params =>
              this.xformatter ? this.xformatter(params) : params
          }
        },
        yAxis: {
          type: 'value',
          name: this.getName(this.type),
          nameTextStyle: {
            padding: [0, 0, 0, -30] // 四个数字分别为上右下左与原位置距离
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          offset: 10,
          axisLabel: {
            formatter: value => {
              return tenThousand(value)
            }
          }
        },
        grid: [
          {
            top: '14%',
            left: '12%',
            right: '7%',
            bottom: '12%'
          }
        ],
        series: [
          {
            type: 'line',
            data: this.yList,
            symbolSize: 8,
            symbol: 'circle',
            color: '#7F57FF',
            showAllSymbol: false,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "top",
            //     formatter: (params) => {
            //       return tenThousand(params.value);
            //     },
            //   },
            // },
            emphasis: {
              itemStyle: {
                symbolSize: 12,
                color: '#7F57FF',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: 'rgba(127,87,255, 0.5)',
                shadowBlur: 10
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(127,87,255,0)'
                },
                {
                  offset: 1,
                  color: 'rgba(127,87,255,1)'
                }
              ])
            },
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#fff',
                label: {
                  show: true,
                  position: 'top',
                  color: '#333'
                },
                lineStyle: {
                  width: 3,
                  type: 'solid',
                  color: '#7F57FF'
                }
              }
            }
          }
        ],
        textStyle: {
          color: '#999'
        }
      }
    },

    update() {
      this.chart['setOption'](this.getOption())
      this.change = false
    },
    getName(type) {
      let name
      switch (type) {
        case 'month_final_price':
          name = '元'
          break
        case 'day_30_rate':
          name = '%'
          break
        default:
          name = ''
          break
      }
      return name
    }
  },
  watch: {
    yList() {
      if (this.change === false) {
        this.change = true
        this.update()
      }
    },
    xList() {
      if (this.change === false) {
        this.change = true
        this.update()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.line
  // width: 100%
  width: 490px
  height: 240px

  ::v-deep .chart-tip
    box-sizing: border-box
    width: 150px
    padding: 10px 20px

    border-radius: 8px
    background-color: rgba(0, 0, 0, 0.8)

    .chart-tip-title
      font-size: 14px
      margin-bottom: 10px

    .chart-tip-data
      font-size: 12px

      >li
        >ul >li
          display: flex
          align-items: center
          justify-content: space-between

        &:not(:last-child)
          margin-bottom: 10px

        &.chart-tip-data-channel >ul >li >span:last-child
          color: #3585FC
</style>
