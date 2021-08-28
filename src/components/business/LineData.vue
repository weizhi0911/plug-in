<template>
  <div class="data g-f-center-co show-scroll">
    <div class="g-f info" v-if="hadCharts">
      <div class="g-f-align info-left">
        <img src="@img/data/high.png" alt="" />

        <span class="coupon">最高价：</span>

        <span class="price">{{ stat['max']['value'] | price | none }}</span>
        <i class="time">（{{ stat['max']['key'] | none }}）</i>
      </div>

      <div class="g-f-align info-right">
        <img src="@img/data/low.png" alt="" />
        <span class="coupon">最低价：</span>
        <span class="price">{{ stat['min']['value'] | price | none }}</span>
        <i class="time">（{{ stat['min']['key'] | none }}）</i>
      </div>
    </div>

    <p class="dt-loading g-dfc" v-if="loading">
      最新数据获取中，预计30s，请稍后查看
      <img
        src="http://cloudpush.ss.bscstorage.com/16279753751823671231627975375"
        alt=""
      />
    </p>
    <div class="echart-line">
      <ChartLine
        v-if="hadCharts"
        class="trend-echart"
        :xList="chartXList"
        :yList="chartYList"
        :formatter="chartLineFormatter"
        :type="'month_final_price'"
        :xformatter="xformatter"
      ></ChartLine>
      <div v-else class="no-data g-f-center-column">
        <img
          src="http://cloudpush.ss.bscstorage.com/1627465419880288674"
          alt=""
        />
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from '@bizCmp/ChartLine.vue'

import { price } from '@/filter/global/money'
import { endZero } from '@/filter/global/number'

export default {
  name: 'LineData',
  data() {
    return {}
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array
    },
    stat: {
      type: Object
    }
  },
  computed: {
    chartXList() {
      return this.list.map(item => item['date'].substring(0, 11))
    },
    chartYList() {
      return this.list.map(item => endZero(item['price']))
    },
    hadCharts() {
      return this.list.length > 0
    }
  },
  methods: {
    xformatter(value) {
      return value.substring(5)
    },
    chartLineFormatter(params) {
      const { name, data } = params[0]
      const content = `
      <div class="chart-tip">
        <h3 class="chart-tip-title">${name}</h3>
        <ul class="chart-tip-data">
          <li>
              <span>价格</span>
              <span>${price(data)}</span>
          </li>
        </ul>
      </div>
    `

      return content
    }
  },
  components: {
    ChartLine
  }
}
</script>

<style scoped lang="sass">
.data
  height: 100%
  width: 100%

  .data-tab
    margin-top: 10px

  .info
    width: 450px
    height: 24px
    background: #F5F5F5
    border-radius: 6px
    margin: 8px auto
    font-size: 12px
    padding: 3px 0px
    box-sizing: border-box
    &>div
      flex: 1
      .coupon
        margin-left: 4px
        color: #333

      .price
        font-weight: bold

      .time
        color: #999

    .info-left
      margin-left: 4px
      .price
        color: #FA6936

    .info-right
      justify-content: flex-end

      .price
        color: #26C06D
  .dt-loading
    color: #8964FF
    img
      margin-left: 5px
  ::v-deep.echart-line
    flex: 1

    .no-data
      height: 300px !important

    .line

      width: 560px
      height: 280px

      .chart-tip-data

        li
          display: flex
          justify-content: space-between
          width: 100px
</style>
