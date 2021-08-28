export default {
  data() {
    return {
      mouseList: []
    }
  },
  methods: {
    getMouseXY(e) {
      this.mouseList.push({ x: e.x, y: e.y })
    },
    clearMouse() {
      this.mouseList = []
      this.$forceUpdate()
    }
  }
}
