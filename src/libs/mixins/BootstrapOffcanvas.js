import Offcanvas from 'bootstrap/js/dist/offcanvas'

export default {
  methods: {
    openOffcanvas () {
      this.offcanvas.show()
    },
    closeOffcanvas () {
      this.offcanvas.hide()
    },
    toggleOffcanvas () {
      this.offcanvas.toggle()
    }
  },
  mounted () {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas, { toggle: false })
  }
}
