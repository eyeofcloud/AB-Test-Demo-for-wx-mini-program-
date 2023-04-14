const app = getApp()
//自定义的属性列表举例，试验中如果设置受众则需满足对应属性的值
var attributes = { 'device': 'iphone', 'ad_source': 'my_campaign' }
Page({
  data: {
    imgUrls: [
      '../../resources/images/1.jpg',
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
    //以下代码是为本小程序特殊需要而写，正常小程序不需要这些检查
    var config = app.eyeofcloudClient.projectConfigManager.getEyeofcloudConfig()
    var content = '点击"确定"将触发购买(buy)事件。确定要购买吗？'
    if (config == null || config.events == null || config.events.length == 0 ||
      !config.events.find(({ key }) => key === "buy")) {
      content = '提示：buy事件未设置，请登录云眼平台检查设置。点击“确认”将继续跳至下一页。'
    }
    //以上为特殊代码，到此为止
    var that = this;
    wx.showModal({
      title: '购买商品',
      content: content,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          setTimeout(() => {
            var tags = {
              value: that.data.double_variable,
              category: 'mobile',
              count: 2,
            };
            app.user.trackEvent('buy', tags);
            wx.redirectTo({
              url: '/pages/demo/pay',
            });
          }, 0);
        }
      }
    })
  },
  onReady: function () {
  },
  onLoad: function () {
    var attributes = app.globalData.attributes;
    var tags = {
      category: 'mobile',
      count: 2,
    };
    var decision = app.user.decide('buy');
    //以下代码是为本Demo特殊需求而写，正常小程序不需要这些代码
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
    //获取变量值，并根据需要使用变量值
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
