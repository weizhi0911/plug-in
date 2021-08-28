<template>
  <Model
    v-bind="$attrs"
    v-on="$listeners"
    class="modal-gather-coupon"
    ref="model"
  >
    <template v-slot:header>
      <span>{{ "优惠券数" }}</span>
    </template>
    <template v-slot:content>
      <table class="g-table border normal modal center g-bs-bb">
        <thead>
          <th class="coupon-id text-c">优惠券</th>
          <th class="coupon-valid-period">有效期</th>
          <!-- <th class="coupon-type">券类型</th> -->
          <th class="coupon-quantity">领券量</th>
          <th class="coupon-gather">传播渠道</th>
          <th class="coupon-operate">操作</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="item.activity_id">
            <!-- TODO: 没有要做复制需求
              :data-clipboard-text="item.activity_id"
              @click="copyText($event)" -->
            <td
              class="coupon-id"
              :id="'coupon-id' + index"
              :data-clipboard-text="item.activity_id"
              @click="copyText('#coupon-id' + index)"
            >
              <span
                v-if="item.fullReduction"
                class="g-bgc-orange g-color-white box-radius full-reduction"
              >
                {{ item.fullReduction }}
              </span>
              <section class="coupon-id-content g-tip-wrap">
                <p class="g-color-primary" :title="item.couponUrl">
                  {{ item.activity_id | couponId }}
                </p>
                <!-- <section
                  class="g-tip top normal triangle-left white coupon-url-tip"
                >
                  <section class="g-text-ellipsis">
                    {{ item.couponUrl }}
                  </section>
                </section> -->
              </section>
            </td>
            <td class="coupon-valid-period">
              {{ item.couponStartDate | monthDay }}-{{
                item.couponEndDate | monthDay
              }}
            </td>
            <!-- <td class="coupon-type">{{ item.couponType }}</td> -->
            <td class="coupon-gather">
              <span class="g-color-orange">{{
                item.couponReceiveCount | tenThousand | none
              }}</span>
              /
              <span>{{ item.couponTotalCount | tenThousand | none }}</span>
            </td>
            <td class="coupon-gather">
              <ul class="channels">
                <template v-for="itemChannel in item.channels">
                  <li
                    v-if="itemChannel.quantity > 0"
                    :key="itemChannel.type"
                    class="g-cursor-pointer"
                    @click="
                      channel(itemChannel, {
                        activity_id: item.activity_id,
                        limit: itemChannel.quantity,
                      })
                    "
                  >
                    <section>
                      <!-- <img
                        :class="{ 'late-3': itemChannel.type !== 'hdk' }"
                        :src="channelImg[itemChannel.type]"
                        alt=""
                      /> -->

                      <svg class="icon late-5" aria-hidden="true">
                        <use
                          :xlink:href="'#' + channelImg[itemChannel.type]"
                        ></use>
                      </svg>
                    </section>
                    <span
                      class="g-color-primary"
                      :class="{ 'g-text-underline': itemChannel.quantity > 0 }"
                      >{{ itemChannel.quantity | tenThousandW | none }}</span
                    >
                  </li>
                </template>
              </ul>
            </td>
            <td class="coupon-operate">
              <a
                :href="item.couponUrl"
                target="_blank"
                class="g-bgc-orange g-color-white"
                >领取</a
              >
              <button
                :id="'coupon-url' + index"
                :data-clipboard-text="item.couponUrl"
                @click="copyText('#coupon-url' + index)"
                class="g-bgc-primary g-color-white"
              >
                复制链接
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Model>
</template>
<script>
import Model from "@bizCmp/model/Index.vue";

// import Scroll from '@globalUtils/scroll'
import Copy from "@u/copy";

import MixinChannel from "@mixins/business/channel";

import { couponImg } from "@config/channel";
export default {
  name: "Coupon",
  mixins: [MixinChannel],
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {
      channelImg: couponImg,
    };
  },
  methods: {
    copyText(selector) {
      new Copy(selector);
    },
  },
  components: { Model },
  mounted() {
    document.body.appendChild(this.$refs.model.$el);
  },
};
</script>

<style lang="sass" scoped>
@import '@globalSass/mixin/layout/list/g_list_flex1.sass'

::v-deep.modal-gather-coupon >.modal
  width: 800px
  .icon
    width: 16px
    height: 16px
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
    flex: none !important
  .text-c
    justify-content: center

  table
    $m: 20px
    width: calc(100% - #{$m * 2})
    margin: $m auto
    text-align: center
    tr,
    th,
    td
      border: 0 !important
    thead,
    tbody tr
      display: flex

    tbody tr
      height: 50px !important

    thead th,
    tbody tr td
      &:first-child
        width: 140px

      &:not(:first-child)
        flex: 1

    tbody
      max-height: 300px
      color: #333

      .box-radius
        border-radius: 2px

      .coupon-id
        flex-direction: column

        .full-reduction
          padding: 2px

        .coupon-id-content
          margin-top: 6px

        .coupon-url-tip
          box-shadow: 0px 0px 16px 0px #D8DEE6

      .channels
        // @include g_list_flex1()

        &,li
          display: flex
          align-items: center
          justify-content: center

        li
          margin-right: 3px
          display: flex
          align-items: flex-end

          &:not(:last-child)
            margin-right: 4px
          &>:nth-child(1)
            margin-right: 3px
          &>:nth-child(2)
            line-height: 15px

          .late-5
            transform: translatey(5px)

          .icon
            // width: 18px
            // height: 18px

      .coupon-operate
        >*
          @extend .box-radius

          box-sizing: border-box
          height: 20px
          line-height: 20px
          padding: 0 6px

          &:not(:last-child)
            margin-right: 6px
</style>
