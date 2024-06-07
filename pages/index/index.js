Page({
  //页面变量
  data: {
    isLogin: false,//当前用户是否登录
    userInfo: {},//用户个人信息
    personalSign: '',//用户在多行文本框中输入的个人签名文本
    userSign: '',//展示在个人信息中的个人签名文本
  },

  onLoad: function () {
    //页面加载时处理
    this.initUser()
  },

  // 获取用户个人信息
  initUser: function() {

    tt.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: JSON.parse(res.rawData),
          isLogin: true
        })
      },
      fail:(res)=>{
        console.log(res)
        this.toLogin()
      }
    })
  },

  // 确定button的点击绑定事件
  changeSign: function() {
    this.setData({
      userSign: this.data.personalSign
    })
  },

 // 个人签名输入框textarea的bindblur事件
  textareaBlur: function(e) {
    console.log(e)
    this.setData({
      personalSign: e.detail.value
    })
  },
  // 用户登录
  toLogin() {
    tt.login({
        success:(res) =>{
          this.initUser()
            tt.showToast({
              title: 'login',
              icon: 'success',
              success:() => {
                console.log("login success")
              }
            })
        },
        fail (res) {
            console.log(`login fail`);
        }
    });
  }
})