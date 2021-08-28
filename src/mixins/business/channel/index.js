export default {
  methods: {
    channel(item, other) {
      if (item["quantity"] > 0 && item["type"] !== "coupon") {
        this.$emit("channel", item, other || this["param"]);
      } else if (item["type"] === "coupon" && item["quantity"] > 0) {
        this.$emit(item["type"]);
      }
    },
  },
};
