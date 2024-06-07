Page({
  data: {
    // 这里可以添加需求内容页面所需的数据
  },

  onLoad: function () {
    console.log('需求内容页面加载完成'); // 需求内容页面加载调试信息
  },

  goToHome: function () {
    tt.navigateTo({
      url: '/pages/home/home'
    });
  },

  goToRequirement: function () {
    tt.navigateTo({
      url: '/pages/requirement/requirement'
    });
  }
});
