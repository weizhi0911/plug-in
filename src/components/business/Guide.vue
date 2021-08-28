<template>
  <div
    class="guide"
    :class="[custom ? 'custom' : 'g-tip-wrap g-df normal']"
    v-on="$listeners"
  >
    <section
      v-if="openCopyBtn"
      class="copy-guide g-usn copy-botton"
      @click="copyGuide('.copy-guide')"
      @mouseout="mouseout"
    >
      {{ copyContent }}
    </section>

    <div class="g-por">
      <!--
        @mouseenter.stop="handleMouseenter"
        @mouseleave.stop="handleMouseleave" -->
      <ul
        :id="contentId"
        class="content"
        :class="[custom ? 'custom' : 'g-tip left recommend radius g-bounce-in']"
      >
        <li class="guide-main-img-wrap" @click="clickProductImg">
          <!-- /:src="productImg | protocol" -->
          <!-- 后续添加https -->
          <!-- <img
            v-if="isList"
            v-lazy="productImg"
            alt=""
            :key="product['activity_id']"
            class="guide-main-img"
          /> -->
          <img
            :src="productImg"
            alt=""
            class="guide-main-img"
            @error="errHandle($event, productImg)"
          />
        </li>
        <!--
          @dblclick="dblclickCopyGuide('.copywrite' + $attrs.index, $event)" -->
        <li
          v-if="product.guideCopywriting"
          class="copywrite"
          :class="'copywrite' + $attrs.index"
        >
          <div
            class="copywrite-content"
            v-html="product.guideCopywriting"
          ></div>
        </li>
      </ul>
      <slot></slot>
    </div>

    <slot />
  </div>
</template>

<script>
import Copy from "@u/copy";
import MixinCopy from "@globalMixins/copy";

export default {
  name: "Guide",
  mixins: [MixinCopy],
  props: {
    product: {
      type: Object,
      required: true,
    },
    contentId: { type: String, default: "guide-content" },
    custom: { type: Boolean, default: false },
    isList: { type: Boolean, default: false },
    openCopyBtn: { type: Boolean, default: true },
    openDblclickCopy: { type: Boolean, default: false },
    productImg: {
      type: String,
      default() {
        return this.product["mainImg"];
      },
    },
  },
  data() {
    return {
      imgError: [],
      copyContent: "复制导购文案",
      clearTimeout: null,
    };
  },
  methods: {
    clickProductImg() {
      return this.$emit("click-product-img", this.product);
    },
    copyGuide(selector) {
      if (this.copyContent === "复制成功") return;
      new Copy(selector, {
        config: {
          target(trigger) {
            return trigger.nextElementSibling;
          },
        },
        callback: () => {
          this.copyContent = "复制成功";
          this.clearTimeout = setTimeout(() => {
            this.copyContent = "复制导购文案";
          }, 2000);
        },
      });
    },

    mouseout() {
      this.copyContent = "复制导购文案";
      clearTimeout(this.clearTimeout);
    },
    errHandle(imgDiv, img) {
      if (this.imgError.includes(img)) return;
      imgDiv.target.setAttribute("src", img);
      this.imgError.push(img);
      imgDiv.onerror = null; // 避免请求失败后不断请求
    },
  },
};
</script>
<style lang="sass">
.guide
  position: absolute
  z-index: 200

  box-sizing: border-box
  width: 100%
  color: #fff
  font-size: 12px
  border-radius: 0px 0px 8px 8px

  .copy-guide
    width: 100%
    height: 36px
    line-height: 36px
    border-radius: 4px 4px 0px 0px
    font-size: 16px
    text-align: center
    cursor: pointer
    background-color: rgba(0, 0, 0, 0.6)

  .content
    display: flow-root

    li
      word-break: break-all

      .guide-main-img
        width: 100%
        max-width: 100%
        max-height: 100%

      .guide-url
        color: #fff

      a
        color: #3585FC !important

      &:not(:first-child)
        margin-top: 10px

      &:last-child
        margin-bottom: 10px

      &.guide-title
        font-size: 14px

      &:not(.guide-title)
        line-height: 16px

  &.normal
    bottom: 0
    padding: 0
    background-color: unset

    .copy-guide
      border-radius: 6px 6px 0px 0px
      // background-color: rgba(127, 87, 255, 0.9)

    .content
      width: 330px

      top: 0
      margin-left: 6px

      li
        img
          width: 100px
</style>
