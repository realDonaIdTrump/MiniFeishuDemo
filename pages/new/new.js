Page({
  data: {
    title: '',
    Category: '需求',
    Responsible: '',
    Description: '',
    responsibleArray: [], // 这里填写你的选项
    responsibleIndex: 0,
    customId: '',
    isHeading: false,
    selectedResponsible:'',
    vehicleTypes: [],
    PLId: null  
  },

  onLoad: function (options) {
    const requirementXmid = options.requirementXmid;
    const requirementName = decodeURIComponent(options.requirementName);
    console.log("------");
    console.log(requirementName);
    console.log(options.requirementName);
    const app = getApp();
    this.setData({
      apiUrl: app.globalData.apiUrl,
      token: app.globalData.token,
      requirementXmid: requirementXmid,
      requirementName: requirementName
    });
    this.getResponse();
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

  getResponse: function () {
    tt.request({
      url: this.data.apiUrl + '/server/getResponse',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      success: (res) => {
        let names = res.data.data.responsible.map(item => item.name);
        this.setData({
          responsibleArray: res.data.data.responsible,
          responsibleNames: names,
          selectedResponsible: res.data.data.responsible[0].XMIID
        });
      }
    });
  },
  // 修改 bindResponsibleChange 方法
bindResponsibleChange: function(e) {
  this.setData({
    responsibleIndex: e.detail.value,
    selectedResponsible: this.data.responsibleArray[e.detail.value].XMIID
  });
  console.log(this.data.selectedResponsible);
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
          responsible: [this.data.selectedResponsible]
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
        const app = getApp();
        tt.navigateTo({
          url:  `/pages/requirement/requirement?vehicleType=${app.globalData.selectedVehicleType}&PLId=${app.globalData.PLId}`
        });
      }
    });
  }

});
