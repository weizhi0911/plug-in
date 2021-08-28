export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      count: 0
    }
  },
  methods: {
    scroll() {
      if (this.loading) return
      this.$nextTick(async () => {
        const el = this.$refs['list']
        // const scrollHeight = el['scrollHeight']
        // const windowHeight = el['clientHeight']
        const scrollTop = el['scrollTop']
        // console.log(scrollHeight)
        // console.log(windowHeight)
        // console.log(scrollTop)
        // const scrollBottom = scrollHeight - windowHeight - scrollTop
        if (scrollTop >= 1500 * this.pageNo && this.pageNo < 3) {
          this.pageNo++
          await this.getBatchDetail()
        }
      })
    },
    handleScroll() {
      window.addEventListener('scroll', this.scroll, true)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll, true)
  }
}
