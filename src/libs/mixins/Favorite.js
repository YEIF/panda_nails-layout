import emitter from '../emitter'

export default {
  methods: {
    toggleFavorite (id, title) {
      const favoriteId = this.favoriteList.findIndex((item) => item === id)
      if (favoriteId === -1) {
        this.favoriteList.push(id)
        emitter.emit('push-message', {
          style: 'success',
          title: `${title}已 加入我的最愛`
        })
      } else {
        this.favoriteList.splice(favoriteId, 1)
        emitter.emit('push-message', {
          style: 'danger',
          title: `${title}已 取消我的最愛`
        })
      }
    },
    getFavorite () {
      const favoriteList = localStorage.getItem('Favorite') || '[]'
      this.favoriteList = JSON.parse(favoriteList)
    }
  }
}
