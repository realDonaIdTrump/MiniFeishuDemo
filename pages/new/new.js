Page({
  data: {
    title: '',
    Category: '',
    Responsible: '',
    Description: '',
    responsibleArray: ['选项1', '选项2', '选项3'], // 这里填写你的选项
    responsibleIndex: 0,
  },

  onLoad: function () {
    console.log('新需求页面加载完成'); // 新需求页面加载调试信息
  },

  bindTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  bindCategoryInput: function(e) {
    this.setData({
      Category: e.detail.value
    });
  },

  bindResponsibleChange: function(e) {
    this.setData({
      responsibleIndex: e.detail.value
    });
  },

  bindDescriptionInput: function(e) {
    this.setData({
      Description: e.detail.value
    });
  },

  createRequirement: function () {
    tt.navigateTo({
      url: '/pages/createRequirement/createRequirement'
    });
  }
});
