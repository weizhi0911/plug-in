<template>
  <div class="next-page-wrap" :class="{ loading: loading }">
    <button v-if="open && !loading" @click="next">下一页</button>
  </div>
</template>

<script>
export default {
  name: "NextPage",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    next() {
      this.$emit("next");
    },
  },
  computed: {
    // nextPage: {
    //   cache: false,
    //   get() {
    //     return this.$refs.loading;
    //   },
    // },
  },
};
</script>

<style lang="sass" scoped>
.next-page-wrap
  margin: 0 auto
  text-align: center

  button
    width: 60px
    height: 24px
    border-radius: 5px
    font-size: 12px
    color: #fff
    background-color: #7f57ff

  &.loading
    position: relative
    height: 100px
</style>
