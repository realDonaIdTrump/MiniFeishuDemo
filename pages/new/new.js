Page({
  data: {
    title: '',
    Category: '需求',
    Responsible: '',
    Description: '',
    responsibleArray: ['选项1', '选项2', '选项3'], // 这里填写你的选项
    responsibleIndex: 0,
    customId: '',
    isHeading: false
  },

  onLoad: function (options) {
    const requirementXmid = options.requirementXmid;
    const app = getApp();
    this.setData({
      apiUrl: app.globalData.apiUrl,
      token: app.globalData.token,
      requirementXmid: requirementXmid,
    });
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
  bindCustomIdInput: function(e) {
    this.setData({
      customId: e.detail.value
    })
  },

  bindIsHeadingChange: function(e) {
    this.setData({
      isHeading: e.detail.value
    })
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
    // Call openTransiton method
    this.openTransiton();
  },

  openTransiton: function () {
    tt.request({
      url: this.data.apiUrl + '/server/openTransaction',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      success: (res) => {
        console.log('openTransiton success:', res.data);
        // Call createRequirement method after openTransiton
        this.createRequirementAfterOpenTransiton();
      }
    });
  },

  createRequirementAfterOpenTransiton: function () {
    tt.request({
      url: this.data.apiUrl + '/server/createRequirement',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      data: {
        title: this.data.title,
        mofType: 'requirementslayer.Requirement',
        Category: this.data.Category,
        relations: {
          responsible: ["1214822"]
        },
        Description: this.data.Description,
        requirementXmid: this.data.requirementXmid,
        customId: this.data.customId,
        isHeading : this.data.isHeading
      },
      success: (res) => {
        console.log('createRequirement success:', res.data);
        // Call commitTransiton method after createRequirement
        this.commitTransitonAfterCreateRequirement();
      }
    });
  },

  commitTransitonAfterCreateRequirement: function () {
    tt.request({
      url: this.data.apiUrl + '/server/commitTransaction',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      success: (res) => {
        console.log('commitTransiton success:', res.data);
      }
    });
  }
  // createRequirement: function () {
  //   tt.request({
  //     url: this.data.apiUrl + '/server/createRequirement',
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.data.token
  //     },
  //     data: {
  //       title: this.data.title,
  //       mofType: 'requirementslayer.Requirement',
  //       Category: this.data.Category,
  //       relations: {
  //         responsible: ["1214822"]
  //       },
  //       Description: this.data.Description,
  //       requirementXmid :this.data.requirementXmid
  //     },
  //     success (res) {
  //       console.log(res.data)
  //     }
  //   })
  // }
});
