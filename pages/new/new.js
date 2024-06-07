Page({
  data: {
    // 这里可以添加新需求页面所需的数据
  },

  onLoad: function () {
    console.log('新需求页面加载完成'); // 新需求页面加载调试信息
  },

  createRequirement: function () {
    tt.navigateTo({
      url: '/pages/createRequirement/createRequirement'
    });
  }
});
