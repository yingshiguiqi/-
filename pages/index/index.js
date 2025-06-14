Page({
  onLoad() {
    const app = getApp();
    this.updateProgress();
    this.timer = setInterval(() => this.updateProgress(), 1000);
  },

  onUnload() {
    clearInterval(this.timer);
  },

  updateProgress() {
    const app = getApp();
    const user = app.globalData.userInfo;
    const now = Date.now();
    const elapsed = (now - user.lastUpdate) / 1000; // 秒
    
    // 每秒增加1%进度
    user.progress = Math.min(user.progress + elapsed, 100);
    user.lastUpdate = now;

    // 境界突破
    if(user.progress >= 100) {
      user.progress = 0;
      const realms = app.globalData.realms[user.path];
      const currentIndex = realms.indexOf(user.realm);
      if(currentIndex < realms.length - 1) {
        user.realm = realms[currentIndex + 1];
        user.power *= 2;
        wx.showToast({
          title: `境界突破至${user.realm}期!`,
          icon: 'success'
        });
      }
    }

    this.setData({
      name: user.name,
      gender: user.gender,
      path: user.path,
      realm: user.realm,
      progress: user.progress,
      power: user.power
    });
  },

  data: {
    name: '',
    gender: '',
    path: '修真',
    realm: '练气',
    progress: 0,
    power: 100
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
})
