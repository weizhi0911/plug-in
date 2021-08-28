export default {
  data() {
    return {
      loading: false,
      isOk: false,
      time: 0,
      polling: 0, // 是否轮询 1是 0否
      list: [],
      stat: {},
      num: 0
    }
  },
  methods: {
    judge(res) {
      const data = res['data']
      this.num++
      this.polling = data.polling
      this.list = data.history
      this.stat = data.stat
      if (data.polling && this.num < 11) {
        return
      }
      // else if (data.polling && this.num >= 16) {
      //   this.list = []
      // }
      this.loading = false
    }
  },
  async created() {
    await this.getHistory()
    if (!this.polling) return

    this.time = window.setInterval(() => {
      if (!this.polling || this.num >= 11) {
        clearInterval(this.time)
        return
      }
      this.getHistory()
    }, 3000)
  }
}
