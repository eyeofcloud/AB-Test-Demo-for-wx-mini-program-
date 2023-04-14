const plugin = requirePlugin('abtest');
const app = getApp()
const config = wx.getStorageSync('config');
app.globalData.sdk_key = config.sdk_key;
app.defaultKey = '1000122_2e2d7fbdea1afc51';
function createInstance() {
  var eyeofcloudClient = plugin.createInstance(app.globalData.sdk_key); 

  eyeofcloudClient.onReady().then(() => {
    app.eyeofcloudClient = eyeofcloudClient
    wx.redirectTo({
      url: '/pages/demo/attributes'
    })
  })
}
Page({
  data: {
    defaultKey: app.defaultKey,
    sdkKey: ''
  },
  onInput: function (event) {
    this.setData({
      sdkKey: event.detail.value
    });
  },

  onLoad: function (options) {
    // Get the global value and set it as the initial value of inputValue
    const sdkKey = getApp().globalData.sdk_key;
    if ((typeof sdkKey !== "undefined") && (sdkKey !== "")) {
      this.setData({ sdkKey: sdkKey });
    }
  },
  onSaveConfig: function () {
    if (this.data.sdkKey == "") {
      var that = this;
      wx.showModal({
        title: 'SDK键不能为空',
        content: '点击“确认”将使用缺省SDK键继续访问。缺省SDK键是：' + that.data.defaultKey,
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync('config', that.data.defaultKey);
            app.globalData.sdk_key = that.data.defaultKey;
            createInstance();
          }
        }
      })
    }
    else {
      wx.setStorageSync('config', { sdk_key: this.data.sdkKey });
      app.globalData.sdk_key = this.data.sdkKey;
      createInstance();
    }
  },

  onLongPress: function () {
    var that = this;
    wx.setClipboardData({
      data: 'app.eyeofcloud.com',
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