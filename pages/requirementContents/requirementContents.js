Page({
  data: {
    requirementName :'',
    customId:'',
    isHeading:'',
    responsible:'',
    lastModifiedTime:'',
    lastModifiedUser:''
  },

  onLoad: function (options) {
  const requirementStr = decodeURIComponent(options.requirement);
  const requirement = JSON.parse(requirementStr);
  console.log(requirement);
  this.setData({
    requirementName: requirement.requirementName,
    customId:requirement.customId,
    isHeading:requirement.isHeading,
    responsible:requirement.responsible,
    lastModifiedTime:requirement.lastModifiedTime,
    lastModifiedUser:requirement.lastModifiedUser
  });
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
