import Collapse from 'bootstrap/js/dist/collapse'

export default {
  methods: {
    closeNavCollapse () {
      this.collapse.hide()
    },
    toggleNavCollapse () {
      this.collapse.toggle()
    }
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse, { toggle: false })
  }
}
