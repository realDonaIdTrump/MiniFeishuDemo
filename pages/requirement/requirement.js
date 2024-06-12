Page({
  data: {
    requirementPackages: [
      {
        packageName: 'Requirement Package 1',
        requirements: [
          {
            requirementName: 'Requirement 1'
          },
          {
            requirementName: 'Requirement 2'
          }
          // 更多的需求...
        ]
      },
      // 更多的需求包...
    ],
    productLine: 'SUV' // 新添加的属性
  },

  onLoad: function() {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.apiUrl, // 你的接口地址
      method: 'POST',
      success: function(res) {
        that.setData({
          requirementPackages: res.data ,// 假设返回的数据是你需要的格式
          productLine: res.data.productLine // 更新 productLine 的值
        });
      },
      fail: function() {
        console.log('接口调用失败');
      }
    });
  },

  toggleList: function(e) {
    var index = e.currentTarget.dataset.index;
    var key = 'requirementPackages[' + index + '].show';
    this.setData({
      [key]: !this.data.requirementPackages[index].show
    });
  }
});
