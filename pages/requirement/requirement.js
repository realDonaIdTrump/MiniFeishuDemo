Page({
  data: {
    // 这里可以添加需求页面所需的数据
  },

  onLoad: function () {
    console.log('需求页面加载完成'); // 需求页面加载调试信息
  },

  goToRequirementContents: function () {
    tt.navigateTo({
      url: '/pages/requirementContents/requirementContents'
    });
  },

  goToNew: function () {
    tt.navigateTo({
      url: '/pages/new/new'
    });
  }
});
