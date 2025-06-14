Page({
  data: {
    name: '',
    gender: '',
    pathArray: ['修真', '修魔', '修妖', '修佛', '修冥'],
    pathIndex: 0
  },

  bindPathChange(e) {
    this.setData({
      pathIndex: e.detail.value
    });
  },

  onNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  selectGender(e) {
    this.setData({
      gender: e.currentTarget.dataset.gender
    });
  },

  startGame() {
    if (!this.data.name || !this.data.gender) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 保存到全局
    const app = getApp();
    app.globalData.userInfo = {
      name: this.data.name,
      gender: this.data.gender,
      path: this.data.pathArray[this.data.pathIndex],
      realm: app.globalData.realms[this.data.pathArray[this.data.pathIndex]][0],
      progress: 0,
      power: 100,
      lastUpdate: Date.now()
    };

    // 跳转到主页面
    wx.redirectTo({
      url: '/pages/index/index'
    });
  }
});
