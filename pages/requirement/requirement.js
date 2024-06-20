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
        'Authorization' : 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        if (res.data.code === '200') {
          console.log(res);
          const vehicleData = res.data.data.result.find(item => item.PLId === PLId);
          if (vehicleData) {
            const requirementPackages = vehicleData.list.map(pkg => ({
              ...pkg,
              requirementList: pkg.requirementList.map(req => ({
                ...req,
                expanded: true,
                childrenExpanded: false
              })),
              expanded: true
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

  toggleExpansion: function(e, key) {
    const packageIndex = e.currentTarget.dataset.packageIndex;
    const requirementIndex = e.currentTarget.dataset.requirementIndex;
    const updatedPackages = this.data.requirementPackages.map((pkg, i) => {
      if (i === packageIndex) {
        const updatedRequirementList = pkg.requirementList.map((req, j) => ({
          ...req,
          [key]: j === requirementIndex ? !req[key] : req[key]
        }));
        return {
          ...pkg,
          requirementList: updatedRequirementList
        };
      }
      return pkg;
    });
    this.setData({
      requirementPackages: updatedPackages
    });
  },

  togglePackageExpansion: function(e) {
    const index = e.currentTarget.dataset.packageIndex;
    const packages = this.data.requirementPackages;
    packages[index].expanded = !packages[index].expanded;
    this.setData({ requirementPackages: packages });
  },
  toggleChildrenExpansion: function(e) {
    const packageIndex = e.currentTarget.dataset.packageIndex;
    const requirementIndex = e.currentTarget.dataset.requirementIndex;
    const packages = this.data.requirementPackages;
    packages[packageIndex].requirementList[requirementIndex].childrenExpanded = !packages[packageIndex].requirementList[requirementIndex].childrenExpanded;
    this.setData({ requirementPackages: packages });
  },


  goToNewRequirement: function () {
    tt.navigateTo({
      url: '/pages/new/new'
    });
  }
});
