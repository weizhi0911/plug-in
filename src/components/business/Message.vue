<template>
  <transition name="fade">
    <div
      class="message g-bounce-in"
      id="my-message"
      :class="type"
      v-if="visible"
    >
      <i class="icon-type iconfont" :class="'icon-' + type"></i>
      <div class="content">
        {{ content }}
        <i
          v-if="hasClose"
          class="btn-close iconfont icon-close"
          @click="visible = false"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      content: "",
      time: 1000,
      visible: true,
      type: "info", //'success','warning','error'
      hasClose: false,
    };
  },
  mounted() {
    this.close();
  },
  methods: {
    close() {
      setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
  },
};
</script>

<style lang="sass" scoped>
.duotu-plug-message
  position: absolute !important
#my-message
  position: fixed
  top: 40%
  left: 50%
  // transform: translate(-50%,-50%)
  z-index: 99999999999999999999
  line-height: 40px
  // max-height: 50px
  margin-left: -47px
  padding: 0px 15px
  color: #fff
  font-size: 16px
  border-radius: 5px

.info
  background: rgba(0, 0, 0, .6)
</style>