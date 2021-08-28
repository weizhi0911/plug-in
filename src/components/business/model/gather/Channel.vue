<template>
  <Model v-on="$listeners" class="modal-gather-channel" ref="model">
    <template v-slot:header>
      <template v-if="modalConfig[type]">
        <svg class="icon img-type" aria-hidden="true">
          <use :xlink:href="'#' + modalConfig[type].icon"></use>
        </svg>
        <!-- <img :src="modalConfig[type].src" alt="" class="img-type" /> -->
        <span>{{ modalConfig[type].title }}</span>
      </template>
      <template v-else>
        <span>{{ "传播渠道" }}</span>
      </template>
    </template>

    <template v-slot:content>
      <template v-if="gather">
        <section v-if="gather.other" class="summary">
          <p>{{ gather.other.start_time }} 至 {{ gather.other.end_time }}</p>
          <!-- <p>该时间段共有{{ gather.other.count }}个传播渠道</p> -->
          <p>该时间段共有{{ count }}个传播渠道</p>
        </section>
        <table v-if="gather.list" class="g-table normal modal chanel-table">
          <thead class="g-df-vc">
            <th>序号</th>
            <th>采集时间</th>
            <th class="g-flex-enable-ellipsis">渠道名称</th>
          </thead>
          <tbody ref="tbody" @scroll="handleScroll">
            <tr v-for="(item, index) in tableList" :key="index" class="g-df-vc">
              <td>{{ count - index }}</td>
              <td>{{ item.time }}</td>
              <td :title="item.source_name" class="g-flex-enable-ellipsis">
                <svg
                  v-if="!modalConfig[type] && item['source']"
                  class="icon channel-img"
                  aria-hidden="true"
                >
                  <use
                    :xlink:href="'#' + gatherImgConfig[item['source']]"
                  ></use>
                </svg>
                <a
                  v-if="item['source'] !== 'dtk' && item.url"
                  :href="item.url"
                  target="_blank"
                  class="g-text-ellipsis g-cursor-pointer g-hover-color-primary"
                >
                  {{ item.source_name }}
                </a>
                <span v-else class="g-text-ellipsis">{{
                  item.source_name
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </template>
  </Model>
</template>

<script>
import Model from "@bizCmp/model/Index.vue";
// import Scroll from "@u/scroll";

import {
  modal as modalConfig,
  gatherImg as gatherImgConfig,
} from "@config/channel";

export default {
  name: "ModelGatherChannel",
  props: {
    type: {
      type: String,
    },
    gather: { type: Object, required: true },
  },
  data() {
    return {
      modalConfig,
      gatherImgConfig,
      count: 0,
      positionIndex: "",
      loading: false,
    };
  },
  computed: {
    tableList() {
      return this.gather["list"].slice(0, this.count);
    },
  },
  watch: {
    gather: {
      handler() {
        if (!this.count) {
          this.count = this.gather["other"] ? this.gather["other"].count : 0;
        }
        this.positionIndex = this.gather["position_index"];
      },
      deep: true,
    },
  },
  methods: {
    scroll() {
      if (this.loading) return;
      this.$nextTick(async () => {
        const el = this.$refs["tbody"];
        const scrollHeight = el["scrollHeight"];
        const windowHeight = el["clientHeight"];
        const scrollTop = el["scrollTop"];

        const scrollBottom = scrollHeight - windowHeight - scrollTop;
        if (
          scrollBottom <= 200 &&
          this.gather["list"].length <= this.count &&
          this.positionIndex
        ) {
          this.loading = true;
          this.$parent["positionIndex"] = this.positionIndex;
          const scrollRequest =
            this.$parent["getModalRefByProduct"] || this.$parent["getModalRef"];
          await scrollRequest();

          if (this.count <= 100) return;
          this.loading = false;
        }
      });
    },
    handleScroll() {
      window.addEventListener("scroll", this.scroll, true);
    },

    destroyed() {
      window.removeEventListener("scroll", this.scroll, true);
    },
  },
  components: {
    Model,
  },
  mounted() {
    document.body.appendChild(this.$refs.model.$el);
  },
};
</script>


<style lang="sass" scoped>
::v-deep.modal-gather-channel >.modal
  width: 440px
  min-height: 200px
  max-height: 650px
  font-family: "Microsoft Yahei"

  .icon
    width: 16px
    height: 16px
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
    flex: none !important
  .img-type
    margin-right: 8px

  .summary
    margin-top: 16px
    margin-bottom: 16px
    text-align: center

    >p:not(:last-child)
      margin-bottom: 10px

  table
    width: 360px
    margin-bottom: 20px

    thead,
    tbody tr
      box-sizing: border-box
      padding-left: 30px
      text-align: left

    thead th,
    tbody tr td

      &:nth-child(1)
        flex-basis: 40px

      &:nth-child(2)
        flex-basis: 130px

      &:last-child
        flex: 1

    thead th
      font-weight: normal

    tbody
      max-height: 450px

      td
        .channel-img
          margin-right: 5px

        >*:not(.channel-img)
          min-height: 14px
</style>
