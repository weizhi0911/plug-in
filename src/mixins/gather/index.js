// import { Vue, Component, Watch } from 'vue-property-decorator'
import {
  getGatherCoupons,
  getPromotionchannel,
  getGatherChannelHistory,
} from "@/api/common";
import { original } from "@config/channel";

const channelType = {
  [original.wechat]: 1,
  [original.qq]: 2,
  // [original.douyin]: 3,
  // [original.sina]: 4,
  [original.hdk]: 6,
  [original.dtk]: 5,
};

export default {
  name: "Gather",
  data() {
    return {
      urlType: "",
      showGatherChannelHistory: false,
      gatherChannelHistoryType: "",
      gatherChannelHistory: {},

      gatherCoupon: false,
      gatherCoupons: [],

      gatherProductId: null,
      gatherChannelOther: {},
      gatherCouponOther: {},

      positionIndex: "",
    };
  },
  watch: {
    showGatherChannelHistory: {
      handler() {
        this.gatherChannelHistory = {};
        this.positionIndex = "";
      },
    },
  },
  methods: {
    toggleGatherChannelHistory() {
      this.showGatherChannelHistory = !this.showGatherChannelHistory;
    },

    openGatherChannels(item, productId, other = {}) {
      this.toggleGatherChannelHistory();
      this.gatherChannelHistoryType = item["type"];

      this.gatherProductId = productId;
      this.gatherChannelOther = other;
      // this.gatherChannelOther['limit'] = item['quantity']
    },

    async getGatherChannelHistory() {
      const params = {
        ...this.gatherChannelOther,
        product_id: this.gatherProductId,
        position_index: this.positionIndex,
        source: channelType[this.gatherChannelHistoryType],
      };
      const api =
        this.urlType === "currency"
          ? getPromotionchannel
          : getGatherChannelHistory;
      const res = await api(params);
      const data = res.data;

      if (this.positionIndex) {
        this.gatherChannelHistory["list"] = [
          ...this.gatherChannelHistory["list"],
          ...data["list"],
        ];
        this.gatherChannelHistory["position_index"] = data["position_index"];
      } else {
        this.gatherChannelHistory = data;
      }
    },

    closeGatherChannelHistory() {
      this.toggleGatherChannelHistory();
    },

    openGatherCoupon(productId, other = {}) {
      this.gatherCoupon = true;

      this.gatherProductId = productId;
      this.gatherCouponOther = other;
    },

    transformGatherCouponsList(list) {
      return list.map((item) => {
        const couponTotalCount = item["coupon_total"] || 0;
        const couponSurplusCount = item["coupon_left"] || 0;
        const couponReceiveCount = couponTotalCount - couponSurplusCount;
        let fullReduction = "";

        if (item["amount"]) {
          fullReduction = `满${item["coupon_use"] / 100}减${item["amount"] /
            100}`;
        }

        return {
          fullReduction,
          activity_id: item["activity_id"],
          couponStartDate: item["coupon_from"] * 1000,
          couponEndDate: item["coupon_to"] * 1000,
          // 暂无优惠券类型数据
          couponType: "",
          couponReceiveCount,
          couponTotalCount,
          couponUrl: item["coupon_url"],
          channels: item["sourcelist"],
        };
      });
    },

    async getGatherCoupons() {
      this.gatherCoupons = [];

      const data = await getGatherCoupons({
        ...this.gatherCouponOther,
        product_id: this.gatherProductId,
        position_index: this.positionIndex,
      });
      this.gatherCoupons = this.transformGatherCouponsList(data["data"]);
    },

    closeCouponMask() {
      this.gatherCoupon = false;
    },

    async getModalRef() {
      if (this.showGatherChannelHistory) {
        await this.getGatherChannelHistory();
      } else if (this.gatherCoupon) {
        await this.getGatherCoupons();
      } else {
        this["afterGetModalRef"] && this["afterGetModalRef"]();
      }
    },
  },
};
