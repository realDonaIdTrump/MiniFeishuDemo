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
      requirements: this.flattenRequirements(pkg.requirementList, 0),
      packageTitle: packageTitle,
      vehicleType: vehicleType
    });
  },

  flattenRequirements: function (requirements, level) {
    let flattened = [];
    requirements.forEach(req => {
      req.level = level;
      req.expanded = false; // Default to collapsed
      flattened.push(req);
    });
    return flattened;
  },

  toggleRequirement: function (e) {
    const index = e.currentTarget.dataset.index;
    const requirements = this.data.requirements;
    const clickedRequirement = requirements[index];

    // Check if the requirement has children before toggling
    if (!clickedRequirement.children || clickedRequirement.children.length === 0) {
      return; // Do nothing if no children
    }
    
    clickedRequirement.expanded = !clickedRequirement.expanded;

    // Toggle visibility of children based on the expanded state
    if (clickedRequirement.expanded) {
      const children = this.flattenRequirements(clickedRequirement.children, clickedRequirement.level + 1);
      requirements.splice(index + 1, 0, ...children);
    } else {
      const level = clickedRequirement.level;
      let i = index + 1;
      while (i < requirements.length && requirements[i].level > level) {
        i++;
      }
      requirements.splice(index + 1, i - index - 1);
    }

    this.setData({
      requirements: requirements
    });
  }
});
