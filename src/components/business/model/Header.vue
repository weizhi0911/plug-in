<template>
  <header class="g-df-vc-hsb" v-on="$listeners" ref="head">
    <div class="modal-title g-fwb g-df-c">
        <slot name="header">{{ title }}</slot>
    </div>

    <svg
      class="icon iconclose g-cursor-pointer"
      aria-hidden="true"
      @click.stop="close"
    >
      <use xlink:href="#icon-x2"></use>
    </svg>
  </header>
</template>

<script>
export default {
  name: "ModelHeader",
  props: { title: { type: String } },
  data() {
    return {};
  },
  computed: {
    contentElement() {
      return this.$refs.head["parentElement"];
    },
    maskElement() {
      return this.contentElement["parentElement"];
    },
  },
  mounted() {
    this.$nextTick(()=>{
      this.$forceUpdate()
    })
    // this.maskElement.addEventListener(
    //   "click",
    //   this.handleEvent.bind(this),
    //   false
    // );
  },
  // beforeDestroy() {
  //   this.maskElement.removeEventListener(
  //     "click",
  //     this.handleEvent.bind(this),
  //     false
  //   );
  // },
  methods: {
    close() {
      this.$emit("close");
    },
    // handleEvent(e) {
    //   e.target === this.maskElement && this.close();
    // },
  },
};
</script>

<style lang="sass" scoped>
header
  position: relative
  display: flex
  align-items: center
  justify-content: space-between

  height: 50px
  background-color: #F1F5F9
  .modal-title
    flex: 1

    text-align: center
    font-size: 16px
    color: #333
  .icon
    width: 16px
    height: 16px
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
    flex: none !important
  .iconclose
    position: absolute
    right: 16px

    // font-size: 16px
    color: #999
</style>
