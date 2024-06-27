Page({
  data: {
    vehicleType: '',
    requirementPackages: []
  },

  onLoad: function (options) {
    const app = getApp();
    this.setData({
      vehicleType: options.vehicleType || ''
    });
    this.loadRequirements(app.globalData.apiUrl, app.globalData.user, options.PLId);
  },

  loadRequirements: function(apiUrl, user, PLId) {
    const app = getApp();
    tt.request({
      url: apiUrl + '/server/operation/getRequirement',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        if (res.data.code === '200') {
          const vehicleData = res.data.data.result.find(item => item.PLId === PLId);
          if (vehicleData) {
            const requirementPackages = vehicleData.list.map(pkg => ({
              ...pkg,
              expanded: false,
              requirementList: this.initializeRequirementList(pkg.requirementList)
            }));
            this.setData({
              requirementPackages: requirementPackages
            });
          }
        } else {
          console.error('Failed to fetch requirements', res);
        }
      },
      fail: (err) => {
        console.error('Request failed', err);
      }
    });
  },

  initializeRequirementList: function(requirementList) {
    return requirementList.map(req => ({
      ...req,
      expanded: false,
      children: this.initializeRequirementList(req.children || [])
    }));
  },

  togglePackageExpansion: function(e) {
    const { index } = e.currentTarget.dataset;
    const packages = this.data.requirementPackages;
    packages[index].expanded = !packages[index].expanded;
    this.setData({ requirementPackages: packages });
  },

  toggleRequirementExpansion: function(e) {
    const { packageIndex, requirementIndex } = e.currentTarget.dataset;
    const packages = this.data.requirementPackages;
    const requirement = packages[packageIndex].requirementList[requirementIndex];
    requirement.expanded = !requirement.expanded;
    this.setData({ requirementPackages: packages });
  },

  toggleChildExpansion: function(e) {
    const { packageIndex, requirementIndex, childIndex } = e.currentTarget.dataset;
    const packages = this.data.requirementPackages;
    const requirement = packages[packageIndex].requirementList[requirementIndex];
    const child = requirement.children[childIndex];
    child.expanded = !child.expanded;
    this.setData({ requirementPackages: packages });
  },

  goToNewRequirement: function () {
    tt.navigateTo({
      url: '/pages/new/new'
    });
  },

  
  goToRequirementContent: function (e) {
    // console.log(e.currentTarget.dataset);
    const requirement = e.currentTarget.dataset.item;
    console.log(requirement);
    const requirementStr = encodeURIComponent(JSON.stringify(requirement));
    tt.navigateTo({
      url: '/pages/requirementContents/requirementContents?requirement=' + requirementStr
    });
  }
});
