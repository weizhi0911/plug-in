<template>
  <div class="g-mask-duotu fixed move g-df-c">
    <div class="g-poa modal modal-content g-bounce-in" ref="modal">
      <Header v-bind="$attrs" v-on="$listeners">
        <template v-slot:header>
          <slot name="header"></slot>
        </template>
      </Header>

      <slot name="content"></slot>
    </div>
  </div>
</template>


<script>
import Header from "./Header.vue";

export default {
  mounted() {
    this.$emit("ref");
  },
  components: {
    Header,
  },
};
</script>

<style lang="sass" scoped>
::v-deep.g-mask-duotu
  .modal
    box-sizing: border-box
    overflow: hidden
    background-color: #fff
    border-radius: 8px

  .modal-content
    // position: relative
    // top: 50%
    // left: 50%
    // transform: translate(-50%,-50%)
</style>
