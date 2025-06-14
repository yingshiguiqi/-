Page({
  data: {
    name: '修仙者',
    level: 1,
    cultivation: 0,
    power: 100,
    gender: 'male'
  },
  cultivate() {
    this.setData({
      cultivation: this.data.cultivation + 10,
      power: this.data.power + 5
    })
    if(this.data.cultivation >= 100) {
      this.setData({
        level: this.data.level + 1,
        cultivation: 0,
        power: this.data.power * 2
      })
      wx.showToast({
        title: '境界突破!',
        icon: 'success'
      })
    }
  },
  switchGender() {
    this.setData({
      gender: this.data.gender === 'male' ? 'female' : 'male',
      name: this.data.gender === 'male' ? '女修士' : '男修士'
    })
  }
})
