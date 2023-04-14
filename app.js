var eyeofcloudSdk = require('eyeofcloud.browser.umd.min.js');
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserId: function (cb) {
    var that = this;
    if (!this.globalData.userId){
      wx.login({
        success: function (res) {
          function generateUniqueId() {
            const systemInfo = wx.getSystemInfoSync();
            const deviceId = [
              systemInfo.brand,
              systemInfo.platform,
              new Date().getTime(),
              Math.random().toString(36).substr(2, 6)
            ].join('_');
            return deviceId;
          }
          function getDeviceUniqueId() {
            const storageKey = 'deviceUniqueId';
            let deviceId = wx.getStorageSync(storageKey);
          
            if (!deviceId) {
              deviceId = generateUniqueId();
              wx.setStorageSync(storageKey, deviceId);
            }
            return deviceId;
          }
          // 使用设备唯一 ID
          const deviceId = getDeviceUniqueId();
          console.log('设备唯一 ID:', deviceId);
          that.globalData.userId = deviceId;
          typeof cb == "function" && cb(that.globalData.userId)
        }
      });
    }
    else{
      typeof cb == "function" && cb(that.globalData.userId)
    }
  },
  globalData:{
  }
})
