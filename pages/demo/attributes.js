const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    inputInterest: '健身',
    inputCity: '南京',
  },
  onLoad: function (options) {
    // Get the global value and set it as the initial value of inputValue
    var that = this;
    app.getUserId(function (userId) {
      app.globalData.userId = userId;
      that.setData({ username: userId });
    })
    app.globalData.attributes = wx.getStorageSync('attributes');
    const attributes = app.globalData.attributes;
    if ((typeof attributes !== "undefined") && (attributes)) {
      this.setData({ inputInterest: attributes.interest });
      this.setData({ inputCity: attributes.city });
    }
  },

  onInputInterest: function (event) {
    this.setData({
      inputInterest: event.detail.value
    });
  },
  onInputCity: function (event) {
    this.setData({
      inputCity: event.detail.value
    });
  },
  onShopping: function () {
    app.globalData.attributes = { interest: this.data.inputInterest, city: this.data.inputCity };
    wx.setStorageSync('attributes', { interest: this.data.inputInterest, city: this.data.inputCity });
    app.user = app.eyeofcloudClient.createUserContext(app.globalData.userId, app.globalData.attributes);
    wx.redirectTo({
      url: '/pages/demo/buy'
    })
  },
  onLongPress: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.username,
      success: function () {
        wx.showToast({
          title: '复制成功',
        });
      },
      fail: function () {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  }
})