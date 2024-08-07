// webview.js
Page({
  data: {
    filePath: ""
  },
  
  onLoad: function(options) {
    if (options.filePath) {
      this.setData({
        filePath: decodeURIComponent(options.filePath)
      });
    }
  }
});
