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

  // viewDescription: function () {
  //   const app = getApp();
  //   // 定义请求参数
  //   const params = {
  //     artId: '1108383'
  // };
  //   tt.request({
  //     url: app.globalData.apiUrl  + "/server/testHtml",
  //     method: 'GET',
  //     header: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + app.globalData.token,
  //       'Host' : 'vistrppt4li201.vi.vector.int:9981'
  //     },
  //     data: params,  // 传递请求参数
  //     success: function (res) {
  //       if (res.statusCode === 200) {
  //         console.log(res);
  //         // console.log(res.data);
  //         const htmlString = res.data;  // 假设HTML内容在res.data.content中
  
  //         // 将HTML字符串传递给WebView页面
  //         tt.navigateTo({
  //           url: '/pages/webview/webview?html=' + encodeURIComponent(htmlString)
  //         });
  //       } else {
  //         console.error('Failed to fetch description', res);
  //       }
  //     },
  //     fail: function (err) {
  //       console.error('Request failed', err);
  //     }
  //   });
  // },

  viewDescription: function () { 
    const app = getApp();
    // 定义请求参数
    const params = {
      WOPISrc: 'https://vistrppt4as404.vi.vector.int:8202/vCollabAPI/dev_webapp/artifacts/1108383/wopi/files/description'
  };
    tt.request({
      url: "https://vistrppt4li201.vi.vector.int:9981/browser/84551c8/cool.html",
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.token,
        'access_token' : 'Bearer ' + app.globalData.token,
        'Host' : 'vistrppt4li201.vi.vector.int:9981'
      },
      data: params,  // 传递请求参数
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res);
          // console.log(res.data);
          const htmlString = res.data;  // 假设HTML内容在res.data.content中
  
          // 将HTML字符串传递给WebView页面
          tt.navigateTo({
            url: '/pages/webview/webview?html=' + encodeURIComponent(htmlString)
          });
        } else {
          console.error('Failed to fetch description', res);
        }
      },
      fail: function (err) {
        console.error('Request failed', err);
      }
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
      url: '/pages/new/new?requirementXmid=' + requirementXmid 
      + '&requirementName=' + encodeURIComponent(requirementName)
    });
  },
});
