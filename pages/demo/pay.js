const app = getApp()
Page({
  data: {
    imgUrls: [
      '../../resources/images/4.jpg',
    ],
    flagKey: '',
    ruleKey: '',
    variationKey: '',
    string_variable: '未定义',
    boolean_variable: '未定义',
    integer_variable: '未定义',
    json_variable: '未定义',
    double_variable: '未定义',
  },
  onConfigButtonTap: function () {
    wx.redirectTo({
      url: '/pages/demo/config'
    })
  },
  clickImage: function (e) {
    var config = app.eyeofcloudClient.projectConfigManager.getEyeofcloudConfig()
    var content = '点击"确定"将触发购买(pay)事件。确定要支付吗？'
    if (config == null || config.events == null || config.events.length == 0 ||
      !config.events.find(({ key }) => key === "pay")) {
      content = '提示：pay事件未设置，请登录云眼平台检查设置。'
    }
    var that = this;
    wx.showModal({
      title: '支付订单',
      content: content,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          var tags = {
            category: 'mobile',
            value: that.data.double_variable,
            revenue: that.data.integer_variable,
          };
          app.user.trackEvent('pay', tags);
        }
      }
    })
  },
  onReady: function () {
  },
  onLoad: function () {
    var decision = app.user.decide('pay');
    //以下代码是本Demo特殊需要而写，正常小程序不需要
    this.setData({
      flagKey: decision.flagKey
    });
    this.setData({
      ruleKey: decision.ruleKey != null ? decision.ruleKey : "未定义"
    });
    this.setData({
      variationKey: decision.variationKey ? decision.variationKey : "未定义"
    });
    //以上是Demo特殊代码
    this.setData({
      boolean_variable: decision.variables.boolean_variable
    })
    this.setData({
      integer_variable: decision.variables.integer_variable
    })
    this.setData({
      double_variable: decision.variables.double_variable
    })
    this.setData({
      string_variable: decision.variables.string_variable
    })
    this.setData({
      json_variable: JSON.stringify(decision.variables.json_variable)
    })
  },
  onShow: function () {
  },
})
