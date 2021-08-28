export default {
  name: "Copy",

  data() {
    return {
      copyContent: "复制文案",
      clearTimeout: null,
    };
  },
  methods: {
    coptyMouseout() {
      this.copyContent = "复制文案";
      clearTimeout(this.clearTimeout);
    },
    copyCallback() {
      this.copyContent = "复制成功";
      this.clearTimeout = setTimeout(() => {
        this.copyContent = "复制文案";
      }, 2000);
    },
  },
};
