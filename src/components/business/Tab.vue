<template>
  <div class="tab" :class="'tab-' + type">
    <ul class="g-f">
      <li
        class="g-cursor-pointer g-df-c"
        v-for="(item, index) in list"
        :key="index"
        @click="activeClick(index)"
        :class="{ active: active === index }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    list: {
      default: [{}]
    },
    active: {
      default: 0
    },
    type: {
      default: 'default'
    }
  },
  data() {
    return {}
  },
  methods: {
    activeClick(index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="sass" scoped>
.tab-default
  width: max-content
  ul
    border: 1px solid #EEEEEE
    li
      width: 70px
      line-height: 27px
      background: #FFFFFF
      color: #999
      text-align: center
      &:hover
        color: #7F57FF
      &:not(:last-child)
        border-right: 1px solid #EEEEEE

      &.active
        background: #7F57FF
        color: #fff
.tab-bg
  ul
    background: #F6F5FA
    border: 1px solid #E8E0FF
    border-radius: 12px
    width: max-content
    li
      width: 100px
      height: 24px
      border-radius: 12px
      color: #666666
      &:hover
        color: #7F57FF
      &.active
        color: #FFFFFF
        background: linear-gradient(270deg, #A98EFF, #7F57FF)
</style>
