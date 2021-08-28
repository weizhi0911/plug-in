<template>
  <div v-if="carousel" class="g-mask-duotu fixed move" ref="model">
    <div
      v-if="guides.length > 0"
      class="g-poa g-poa-center custom-carousel modal-content"
      :class="{ one: guides.length === 1 }"
    >
      <ModelHeader
        v-if="guides[active].time"
        v-on="$listeners"
        class="modal-header g-cursor-move"
      >
        <template v-slot:header>
          <span>{{ guides[active].time + "文案" }}</span>
        </template>
      </ModelHeader>
      <!-- <el-carousel indicator-position="outside" height="470px" arrow="always">
        <el-carousel-item
          v-for="(guide, index) in guides"
          :key="index"
          @change="changeCarousel(index)"
        >
          <Guide
            :product="guide"
            :productImg="guide['marketingImg']"
            :openCopyBtn="openCopyBtn"
            :contentId="contentId + index"
            :custom="custom"
          />
        </el-carousel-item>
      </el-carousel> -->

      <ul>
        <li v-for="(guide, index) in guides" :key="index">
          <Guide
            :product="guide"
            :productImg="guide['marketingImg']"
            :openCopyBtn="openCopyBtn"
            :contentId="contentId + index"
            :custom="custom"
          />
        </li>
      </ul>
      <section v-if="openCopyBtn" class="copy-guide-outer g-df-c">
        <button
          class="btn-copy-guide copy-botton"
          @click="copyGuide('.btn-copy-guide', contentId + active)"
        >
          {{ copyContent }}
        </button>
      </section>
    </div>
  </div>
  <Model v-else v-bind="$attrs" v-on="$listeners" class="modal-guide">
    <template v-slot:content>
      <Guide v-bind="$attrs"></Guide>
    </template>
  </Model>
</template>

<script>
import Guide from "@bizCmp/Guide.vue";
import Model from "@bizCmp/model/Index.vue";
import ModelHeader from "@bizCmp/model/Header.vue";

import Copy from "@u/copy";
export default {
  name: "ModelGuide",
  props: {
    carousel: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
    guides: {
      type: Array,
    },
  },
  data() {
    return {
      active: 0,
      openCopyBtn: false,
      contentId: "guide-content",
      copyContent: "复制导购文案" + (this.$attrs.contentId || ""),
      clearTimeout: null,
    };
  },
  components: {
    Guide,
    Model,
    ModelHeader,
  },
  methods: {
    // changeCarousel(index) {
    //   this.active = index;
    // },
    copyGuide(selector, id) {
      if (this.copyContent === "复制成功") return;
      new Copy(selector, {
        config: {
          target() {
            return document.getElementById(id);
          },
        },
        callback: () => {
          this.copyContent = "复制成功";
          this.clearTimeout = setTimeout(() => {
            this.copyContent = "复制导购文案" + (this.$attrs.contentId || "");
          }, 2000);
        },
      });
    },
  },
  destroyed() {
    clearTimeout(this.clearTimeout);
  },
  mounted() {
    this.$nextTick(() => {
      document.body.appendChild(this.$refs.model);
    });
  },
};
</script>

<style lang="sass" scoped>
::v-deep.g-mask-duotu
  .custom-carousel
    $border-radius: 8px

    .el-carousel
      overflow-y: hidden

    .el-carousel__container
      overflow: hidden

      .el-carousel__arrow
        background-color: rgba(0, 0, 0, .5)

        i
          font-size: 20px

      .el-carousel__item
        background-color: #fff

    .el-carousel__indicators
      margin-top: 100px

      .el-carousel__indicator
        .el-carousel__button
          box-sizing: border-box
          width: 10px
          height: 10px
          border-radius: 50%
          background-color: #fff
          opacity: 1

        &.is-active
          .el-carousel__button
            background-color: #7F57FF

    &.one
      .el-carousel__container .el-carousel__arrow,
      .el-carousel__indicators
        display: none

    .modal-header
      border-top-left-radius: $border-radius
      border-top-right-radius: $border-radius

    .copy-guide-outer
      border-bottom-left-radius: $border-radius
      border-bottom-right-radius: $border-radius

      position: absolute
      left: 50%
      bottom: 0
      transform: translateX(-50%)

      width: 100%
      height: 80px

      background-color: #fff

      button
        width: 160px
        height: 40px
        border-radius: 4px
        color: #fff
        background-color: #7F57FF

  .custom-carousel,
  .modal-guide .modal
    width: 320px
    height: 600px

    .guide
      padding: 0
      height: calc(100% - 130px)
      background-color: #fff

      &, .content
        display: block !important

      .content
        left: 0
        top: -470px

        box-sizing: border-box
        width: auto
        height: 450px
        margin: 12px 16px 0
        padding: 0

        overflow-y: auto

        color: #333
        background-color: unset

        &:before
          display: none

        .guide-main-img-wrap
          $height: 200px
          height: $height
          display: flex
          align-items: center

          .guide-main-img
            max-width: 130px !important
            max-height: $height !important
</style>
