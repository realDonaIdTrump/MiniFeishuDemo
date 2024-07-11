Page({
  data: {
    requirements: [],
    packageTitle: '',
    vehicleType: '',
  },

  onLoad: function (options) {
    const pkg = JSON.parse(decodeURIComponent(options.package));
    const packageTitle = pkg.requirementPackageName;
    const vehicleType = getApp().globalData.selectedVehicleType; // Assuming vehicleType is stored globally
    this.setData({
      requirements: this.initializeRequirements(pkg.requirementList, 0),
      packageTitle: packageTitle,
      vehicleType: vehicleType
    });
  },

  initializeRequirements: function (requirements, level) {
    return requirements.map(req => ({
      ...req,
      level: level,
      expanded: false
    }));
  },

  toggleRequirement: function (e) {
    const index = e.currentTarget.dataset.index;
    let requirements = this.data.requirements;
    let clickedRequirement = requirements[index];

    if (!clickedRequirement.children || clickedRequirement.children.length === 0) {
      return; // Do nothing if no children
    }

    clickedRequirement.expanded = !clickedRequirement.expanded;

    if (clickedRequirement.expanded) {
      const children = this.initializeRequirements(clickedRequirement.children, clickedRequirement.level + 1);
      requirements = [
        ...requirements.slice(0, index + 1),
        ...children,
        ...requirements.slice(index + 1)
      ];
    } else {
      const level = clickedRequirement.level;
      let i = index + 1;
      while (i < requirements.length && requirements[i].level > level) {
        i++;
      }
      requirements = [
        ...requirements.slice(0, index + 1),
        ...requirements.slice(i)
      ];
    }

    this.setData({
      requirements: requirements
    });
  },

  goToRequirementContents: function (e) {
    const index = e.currentTarget.dataset.index;
    const req = this.data.requirements[index];
    tt.navigateTo({
      url: '/pages/requirementContents/requirementContents?requirement=' + encodeURIComponent(JSON.stringify(req))
    });
  }
});
