<template>
  <div class="tips g-tip-wrap" :class="{ align }">
    <slot name="content"> </slot>
    <span
      ref="msg"
      v-if="msg"
      class="g-tip bottom"
      :class="{ 'tip-close': close, show }"
      >{{ msg }}
      <i v-if="close" class="close" @click="closeClick">x</i>
    </span>
    <slot />
  </div>
</template>


<script>
export default {
  name: "Tips",
  props: {
    msg: {
      type: String,
    },
    align: {
      type: String,
      default: "left",
    },
    show: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeClick() {
      this.$refs.msg.remove();
    },
  },
};
</script>

<style lang="sass" scoped>
$distance: 4px

.tips
  display: block !important
  position: relative

  &.left
    // margin-left: $distance

  &.right
    margin-right: $distance

  & .show
    display: inline-block !important

  & .tip-close
    padding: 3px 26px !important
    display: inline-block
    .close
      position: absolute
      top: 0px
      right: 0px
      display: inline-block
      text-align: center
      width: 12px
      height: 12px
      line-height: 8px
      background: #DC2828
      border-radius: 0px 4px 0px 4px
</style>
