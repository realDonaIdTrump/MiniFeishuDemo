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
  this.setData({
    requirementName: requirement.requirementName,
    customId:requirement.customId,
    isHeading:requirement.isHeading,
    responsible:requirement.responsible,
    // description:requirement.description,
    requirementXmid:requirement.requirementXMIID,
    lastModifiedTime:requirement.lastModifiedTime,
    lastModifiedUser:requirement.lastModifiedUser
  });
  },

  goToHome: function () {
    tt.navigateTo({
      url: '/pages/home/home'
    });
  },
  goToNewRequirement: function (e) {
    const requirementXmid = e.currentTarget.dataset.requirementxmid;
    tt.navigateTo({
      url: '/pages/new/new?requirementXmid=' + requirementXmid
    });
  },
  goToRequirement: function () {
    tt.navigateTo({
      url: '/pages/requirement/requirement'
    });
  },
  goToDescriptionPage: function () {
    tt.navigateTo({
      // url: '/pages/description/description'
      url: '/pages/requirement/requirement'
    });
  }
});
