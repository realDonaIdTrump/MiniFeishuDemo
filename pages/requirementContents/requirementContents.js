Page({
  data: {
    requirementName :'',
    customId:'',
    isHeading:'',
    responsible:'',
    description:'',
    lastModifiedTime:'',
    lastModifiedUser:'',
    requirementXmid:''
  },

  onLoad: function (options) {
    const requirementStr = decodeURIComponent(options.requirement);
    const requirement = JSON.parse(requirementStr);
    console.log(requirement)
    this.setData({
      requirementName: requirement.requirementName,
      customId:requirement.customId,
      isHeading:requirement.isHeading,
      responsible:requirement.responsible,
      requirementXmid:requirement.requirementXMIID,
      lastModifiedTime:requirement.lastModifiedTime,
      lastModifiedUser:requirement.lastModifiedUser
    });
  },

  viewDescription: function () {
    const url = this.data.description;
    if (url) {
      tt.navigateTo({
        url: '/pages/webview/webview?url=' + encodeURIComponent(url)
      });
    }
  },

  goToHome: function () {
    tt.navigateTo({
      url: '/pages/home/home'
    });
  },

  goToNewRequirement: function (e) {
    const requirementXmid = e.currentTarget.dataset.requirementxmid;
    const requirementName = e.currentTarget.dataset.requirementname;
    console.log(e.currentTarget.dataset);
    tt.navigateTo({
      url: '/pages/new/new?requirementXmid=' + requirementXmid 
      + '&requirementName=' + encodeURIComponent(requirementName)
    });
  },
});
