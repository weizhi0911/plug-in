<template>
  <div class="product-list">
    <div class="img-head g-cursor-pointer" @click="openUrl(list.url)">
      <img v-if="index > 3" v-lazy="list.itempic" alt="" />
      <img v-else :src="list.itempic" alt="" />
    </div>
    <div class="list-bottom">
      <p class="title">
        今日已成交
        <span>{{ list.todaysale | none(0) }}</span>
        件
      </p>
      <div class="g-f-center">
        <img :src="icons[list.shoptype]" alt="" />
        <p :title="list.itemtitle" class="g-text-ellipsis">
          {{ list.itemtitle }}
        </p>
      </div>
      <div class="money g-f">
        <div class="after-coupons g-f-center-co">
          <i>{{ list.itemendprice | centToRmb | none }}</i>
          <span>券后价</span>
        </div>
        <div class="g-f-center-co">
          <i>{{ list.tkmoney | centToRmb | none }}</i>
          <span>佣金</span>
        </div>
      </div>
    </div>
    <div class="border"></div>
    <div class="sales-volume g-f-sp-be">
      <div class="coupons-box">
        <span class="">券</span>
        <p class="coupon">
          {{ list.couponmoney | zero | centToRmb | price }}
        </p>
        <!-- <a class="coupon g-df-vc g-bs-bb" :href="list.couponUrl" target="_blank"
          >{{ list.couponmoney | centToRmb | zero | price }}
        </a> -->
      </div>
      <div class="marketing">营销{{ list.tkrates | percent }}</div>
    </div>
    <div class="speed">
      <p :style="width"></p>
    </div>
    <div class="monthly-sales">
      月销
      <span>{{ list.itemsale | tenThousand | none(0) }}</span>
      / 2小时
      <span>{{ list.itemsale2 | tenThousand | none(0) }}</span>
    </div>
  </div>
</template>

<script>
import { icons } from '@config/shop.js'
export default {
  name: 'ProductList',
  props: ['list', 'index'],
  data() {
    return {
      icons
    }
  },
  computed: {
    width() {
      return {
        width:
          ((this.list.couponreceive / this.list.couponnum) * 140).toFixed(0) +
          'px'
      }
    }
  },
  methods: {
    openUrl(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="sass" scoped>
.product-list
  width: 152px
  height: 325px
  background: #FFFFFF
  border: 1px solid #EEEEEE
  .img-head
    width: 152px
    height: 152px
    img
      max-height: 100%
      max-width: 100%
  .list-bottom
    padding: 6px
    .title
      // width: 142px
      line-height: 28px
      text-align: center
      background: #F2F8FF
      border-radius: 3px
      margin: auto
      &+div
        margin-top: 5px
      span
        color: #3585FC
        font-weight: bold

      &+div
        img
          width: 12px
          height: 12px
        p
          width: 125px
          margin-left: 3px
    .money
      &>div
        flex: 1
        i
          font-size: 14px
          font-weight: bold
          color: #333
          height: 19px
        span
          color: #999
      .after-coupons
  .border
    width: 100%
    border-top: 1px dashed #EEEEEE

  .sales-volume
    padding: 9px 6px
    padding-bottom: 2px
    align-items: center
    .coupons-box
      line-height: 16px
      height: 18px
      display: flex
      background: linear-gradient(90deg, #FF855A, #FF4750)

      margin-right: 3px
      &>span
        background: linear-gradient(90deg, #F5341B, #FF7F47)
        display: inline-block
        width: 18px
        line-height: 16px
        // line-height: 18px
        text-align: center
        color: #fff
      p
        border: 1px solid
        border-image: linear-gradient(to right, #FF855A, #FF4750) 3 10
        border-left: none
        line-height: 12px

      .coupon
        padding: 2px 3px
        background: #fff
        color: #FA6936
    .marketing
      // width: 56px
      padding: 0px 2px
      color: #fff
      text-align: center
      line-height: 16px
      background: linear-gradient(90deg, #4D74FF, #69A4FF)
  .speed
    height: 3px
    background: #F2F2F2
    margin: 6px
    p
      background: #FF4C42
      height: 100%
  .monthly-sales
    margin: 6px
    // border-top: 3px solid #F2F2F2
    // padding-top: 7px
    span
      color: #FA6936
</style>
