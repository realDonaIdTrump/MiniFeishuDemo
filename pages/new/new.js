Page({
  data: {
    title: '',
    Category: '',
    Responsible: '',
    Description: '',
    responsibleArray: ['选项1', '选项2', '选项3'], // 这里填写你的选项
    responsibleIndex: 0,
  },

  onLoad: function (options) {
    const requirementXmid = options.requirementXmid;
    const app = getApp();
    this.createRequirement(app.globalData.apiUrl, app.globalData.token ,requirementXmid);
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

  createRequirement: function (apiUrl,token,requirementXmid) {
    tt.request({
      url: apiUrl + '/server/createRequirement',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        title: this.data.title,
        mofType: 'requirementslayer.Requirement',
        Category: this.data.Category,
        Responsible: this.data.responsibleArray[this.data.responsibleIndex],
        Description: this.data.Description,
        requirementXmid :requirementXmid
      },
      success (res) {
        console.log(res.data)
      }
    })
  }
});
