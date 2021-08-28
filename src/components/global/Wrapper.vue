<template>
  <div class="dt-swiper">
    <!-- <div class="moveL" @click="switchImg(-1)"></div> -->
    <div
      class="dt-container"
      :style="{ width: width + 'px' }"
      @mouseenter="stopAuto"
      @mouseleave="startAuto"
    >
      <ul ref="showImg" class="g-f" id="showImg">
        <li
          class="dt-swiper-item"
          :style="{ width: width + 'px' }"
          v-for="(item, index) in list"
          :key="index"
          :class="{ currentImg: index === selected }"
        >
          <slot :value="item"></slot>
        </li>
      </ul>
    </div>
    <!-- <div class="moveR" @click="switchImg(-2)">></div> -->

    <div class="arrow" v-if="list.length > 1">
      <button
        class="arrow_left carousel-button"
        @click="switchImg(-1)"
      ></button>
      <button
        class="arrow_right carousel-button"
        @click="switchImg(-2)"
      ></button>
    </div>

    <div class="paging">{{ selected + 1 }} / {{ list.length }}</div>

    <!-- <div class="footer">
      <ol>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{ currentCircle: index === selected }"
          @click="switchImg(index)"
        ></li>
      </ol>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Wrapper',

  data() {
    return {
      selected: 0, // 当前展示的图片
      flag: true // 节流阀，防止连续点击切换
    }
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    defaultValue: {
      // 显示第几页
      type: Number
    },
    width: {
      type: Number,
      default: 200
    },
    autoplay: {
      // 是否自动轮播
      type: Boolean,
      default: false
    },
    time: {
      // 自动轮播间隔时间
      type: Number,
      default: 2000
    },
    rateTime: {
      // 切换的速度
      type: Number,
      default: 10
    }
  },
  watch: {
    defaultValue(v) {
      this.selected = v
      this.change(this.selected)
      document.getElementById('showImg').style.left = -this.width * v + 'px'
      this.$refs.showImg.offsetLeft = this.width * v + 'px'
    }
  },
  methods: {
    // 封装动画函数
    animate(moveX, callback) {
      if (this.flag) {
        this.flag = false // 关闭节流阀，每次调用动画函数回调函数中打开
        let ulX = this.$refs.showImg.offsetLeft
        let target = ulX + moveX // 求出移动的目标位置

        this.swiper = setInterval(() => {
          // 创建定时器移动元素
          let step = (target - this.$refs.showImg.offsetLeft) / 10 // 实现由快到慢的过渡效果
          step = step > 0 ? Math.ceil(step) : Math.floor(step) // 对每次移动的距离取整
          let startX = this.$refs.showImg.offsetLeft // 求出元素的当前位置
          if (this.$refs.showImg.offsetLeft === target) {
            // 移动完成
            clearInterval(this.swiper) // 清除先前已经创建的定时器
            callback && callback()
            this.change(this.selected)
            return
          }

          this.$refs.showImg.style.left = startX + step + 'px' // 移动
        }, this.rateTime)
      }
    },
    // 切换图片，index传入-1代表上一张，-2代表下一张，其余代表小圆点切换
    switchImg(index) {
      if (index === -1) {
        // 上一张
        if (this.selected === 0) {
          // 如果是第一张
          if (!this.flag) return // 防止连点bug
          index = this.list.length
          this.$refs.showImg.style.left = -index * this.width + 'px' // 显示至最后一张
          this.animate(this.width, () => {
            this.selected = this.list.length - 1 // 显示上一张
            this.flag = true
          })
        } else {
          this.animate(this.width, () => {
            // 显示上一张
            this.selected--
            this.flag = true
          })
        }
      } else if (index === -2) {
        // 下一张
        if (this.selected === this.list.length - 1) {
          // 如果是倒数第二张
          index = this.list.length
          this.animate(-this.width, () => {
            // 显示下一张
            this.selected = 0
            this.$refs.showImg.style.left = 0
            this.flag = true
          })
        } else {
          this.animate(-this.width, () => {
            this.selected++ // 显示至第一张
            this.flag = true
          })
        }
      } else {
        // 点击下方小圆点切换图片
        let oldIndex = this.selected
        this.selected = index
        let moveX = -(index - oldIndex) * this.width
        this.animate(moveX, () => {
          this.flag = true
        })
      }
    },
    go() {
      if (!this.autoplay) return
      // 鼠标离开，再次自动轮播
      this.autoSwitch = setInterval(() => {
        // 自动切换
        this.switchImg(-2)
      }, this.time)
    },
    startAuto() {
      this.go()
    },
    stopAuto() {
      if (!this.autoplay) return
      // 鼠标移动，暂停自动轮播
      clearInterval(this.autoSwitch)
    },
    change(v) {
      this.$emit('change', v)
    }
  },
  mounted() {
    // 把第一张图片复制一份到最后，实现循环滚动无回滚
    setTimeout(() => {
      const copyNode = this.$refs.showImg
        .getElementsByClassName('dt-swiper-item')[0]
        .cloneNode(true)
      this.$refs.showImg.appendChild(copyNode)
    }, 400)

    this.list.length > 1 && this.autoplay && this.go()
  }
}
</script>

<style lang="sass" scoped>
.dt-swiper
  position: relative

  .dt-container
    position: relative
    height: 92%
    overflow: hidden
    margin: auto

    #showImg
      position: absolute
  .arrow .arrow_left
    left: 0

  .arrow .arrow_right
    right: 0

  .pagnator
    position: absolute
    bottom: 10px
    left: 0
    right: 0

    & span
      display: inline-block
      width: 10px
      height: 10px
      margin: 2px
      border-radius: 50%
      background: rgba(255, 255, 255, 0.5)
      cursor: pointer

  .paging
    text-align: center
    margin-top: 5px

  .arrow

    .carousel-button
      position: absolute
      top: 46%
      display: inline-block
      height: 36px
      width: 36px
      transform: translateY(-50%)
      cursor: pointer

    .arrow_left
      left: 0
      background: url("~@img/more/prev.png") no-repeat

      &:hover
        background: url("~@img/more/prev-hover.png") no-repeat

    .arrow_right
      right: 0
      background: url("~@img/more/next.png") no-repeat

      &:hover
        background: url("~@img/more/next-hover.png") no-repeat
</style>
