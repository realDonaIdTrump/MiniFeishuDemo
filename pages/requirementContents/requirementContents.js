Page({
  data: {
    requirementName: '',
    customId: '',
    isHeading: '',
    responsible: '',
    description: '',
    lastModifiedTime: '',
    lastModifiedUser: '',
    requirementXmid: ''
  },

  onLoad: function (options) {
    const requirementStr = decodeURIComponent(options.requirement);
    const requirement = JSON.parse(requirementStr);
    console.log(requirement);
    this.setData({
      requirementName: requirement.requirementName,
      customId: requirement.customId,
      isHeading: requirement.isHeading,
      responsible: requirement.responsible,
      requirementXmid: requirement.requirementXMIID,
      lastModifiedTime: requirement.lastModifiedTime,
      lastModifiedUser: requirement.lastModifiedUser
    });
  },

  viewDescription: function () {
    const requirementXmid = this.data.requirementXmid;
    // const requirementXmid = '1388710';
    const app = getApp();
    const token = app.globalData.token;
    // const url = `http://10.86.8.176:9980/browser/10deb70/cool.html?WOPISrc=http://vistrppt4as404.vi.vector.int:8142/vCollabAPI/dev_webapp/artifacts/${requirementXmid}/wopi/files/description&access_token=${token}`;
    const url = `http://vistrppt4li201.vi.vector.int:9981/browser/84551c8/cool.html?WOPISrc=https://vistrppt4as404.vi.vector.int:8202/vCollabAPI/dev_webapp/artifacts/${requirementXmid}/wopi/files/description&access_token=${token}`;
    // const url = 'https://intranet.vg.vector.int/';
    tt.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
    });
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
      url: '/pages/new/new?requirementXmid=' + requirementXmid +
           '&requirementName=' + encodeURIComponent(requirementName)
    });
  },
});
