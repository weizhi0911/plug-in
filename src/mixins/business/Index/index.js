export default {
  data() {
    return {
      // isDevelopment: false,
      isDevelopment: process.env.NODE_ENV === 'development',
      active: false
    }
  },
  methods: {
    mouseenter(index) {
      this.active = index
    },
    mouseleave() {
      if (this.isDevelopment) return
      const mask = document.getElementsByClassName('g-mask-duotu')[0]
      const xcaptcha = document.getElementsByClassName('xcaptcha')[0]
      if (mask || xcaptcha) {
        return
      }
      this.active = null
    },
    close() {
      const plugInUnit = document.getElementById('duotu-plug-in')
      const plugBig = document.getElementById('duotu-big')
      const plugMore = document.getElementById('duotu-more')

      plugInUnit && plugInUnit.remove()
      plugBig && plugBig.remove()
      plugMore && plugMore.remove()
    }
  }
}
