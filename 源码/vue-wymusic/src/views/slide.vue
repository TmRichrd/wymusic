<template>
  <div class="slide_pages">
    <div class="slideheader_card">
      <div class="slidecard">
        <div class="slidecard_title">
          <div class="slide_vip"
               v-if="!userInfo">
            <p>开通黑胶VIP</p>
          </div>
          <div class="slide_vip"
               v-if="userInfo">
            <img src="../assets/blackglum.png"
                 alt="">
          </div>
          <div class="slide_vipbtn">
            <button>
              会员中心
            </button>
          </div>
        </div>
        <!--  -->
        <div class="slidecard_content">
          <div class="slidecontent_info">
            <p>新用户首月仅5元</p>
            <p>还有限量5折年卡等你秒杀!</p>
          </div>
          <div>
            <van-icon name="arrow"
                      color="#797979" />
          </div>
        </div>

      </div>
      <!-- 用户列表 -->
      <div class="slide_user">
        <!-- 未登录情况 -->
        <div class="needlogin"
             v-if="!userInfo">
          <div class="needlogin_button">
            <p>手机电脑多端同步,尽享海量高品质音乐</p>
            <button @click="$router.push('/loginTip')">
              立即登录
            </button>
          </div>
        </div>
        <div class="needlogin"
             v-if="userInfo">
          <div class="slide_loginuser">
            <div class="slide_userleft">
              <img :src="userInfo.avatarUrl"
                   alt="">
              <span>{{userInfo.nickname}}</span>
            </div>
            <div class="slide_userright"
                 v-show="!$store.state.sing_in"
                 @click="singin()">
              <button>签到</button>
            </div>
            <div class="slide_userright sign_in"
                 v-show="$store.state.sing_in">
              <button ref="sing_in">已签到</button>
            </div>
          </div>
        </div>
        <!-- 登录之后 -->
        <!-- 按钮组 -->
        <div class="user_btnicon">
          <van-grid :border="false">
            <van-grid-item :badge='$store.state.newCountMsg'
                           icon="https://s1.ax1x.com/2020/04/22/JY7hnO.png"
                           text="我的消息" />
            <van-grid-item icon="https://s1.ax1x.com/2020/04/22/JY7oAH.png"
                           text="我的好友" />
            <van-grid-item icon="https://s1.ax1x.com/2020/04/22/JYHEuT.png"
                           text="个人主页" />
            <van-grid-item icon="https://s1.ax1x.com/2020/04/22/JYHmE4.png"
                           text="个性装扮" />
          </van-grid>
        </div>
        <van-divider />
        <!-- 列表组 -->
        <div class="slidelist_items">
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JYO5Y4.png" /><span>听歌识曲</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JYXvD0.png" /><span>演出</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JYjEK1.png" /><span>商城</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JtpsEt.png" /><span>附近的人</span>
          </div>
          <van-divider />
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JtpgC8.png" /><span>定时停止播放</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JtpRgg.th.png" /><span>扫一扫</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JtpL2F.th.png" /><span>音乐闹钟</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/Jt98MQ.th.png" /><span>在线听歌免流量</span>
          </div>
          <div class="slidelist_item">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/Jt9UI0.th.png" /><span>青少年模式</span>
          </div>
        </div>
        <!-- <van-divider /> -->
        <!-- 底部退出导航 -->
        <div class="slide_setting">
          <div class="slide_set slide_night">
            <van-icon size="20"
                      :name="nightIcon" /><span>{{night}}</span>
          </div>
          <div class="slide_set slide_sett">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JYLpUe.png" /><span>设置</span>
          </div>
          <div class="slide_set slide_loyout"
               @click="layout">
            <van-icon size="20"
                      name="https://s1.ax1x.com/2020/04/22/JYbYQ0.png" /><span>切换账号</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
      night: '夜间模式',
      nightIcon: 'https://s1.ax1x.com/2020/04/22/JYOeQ1.png'
    }
  },
  methods: {
    layout () {
      // console.log(111);
      // this.$nextTick(() => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('level')
      this.$router.push('/loginTip')
      this.$store.commit('loyout')
      // window.clearInterval(this.timeInterval)
      // })
    },
    // 签到
    async singin () {
      // const res = await this.$http.get('/daily_signin?type=0')
      this.$store.commit('singin')
    }
  },
}
</script>

<style>
.slide_pages {
  height: 100vh;
  position: relative;
  box-sizing: border-box;

  background-image: linear-gradient(to right, #778ca3, #778ca3);
}
.slideheader_card {
  box-sizing: border-box;

  position: relative;
  height: 20vh;
  background-image: linear-gradient(to right, #778ca3, #778ca3);
}
.slidecard {
  padding: 10px 0;
  box-sizing: border-box;

  position: absolute;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  /* border: 1px solid red; */
  border-radius: 10px 10px 0 0;
  box-shadow: -3px -5px 10px #576574;
}
.slidecard_title {
  box-sizing: border-box;

  width: 100%;
  display: flex;
  height: 30%;
  padding: 0 10px;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}
.slide_vip p {
  font-size: 18px;
  color: #ffda79;
  margin: 0;
}

.slide_vip img {
  width: 40px;
}
.slide_vipbtn button {
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 12px;
  color: #666;
  background-image: linear-gradient(to right, #ffda79, #cc8e35);
  padding: 3px 10px;
}
.slidecard_content {
  box-sizing: border-box;
  width: 100%;
  position: absolute;

  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.2);
}
.slidecontent_info p {
  margin: 0;
  font-size: 12px;
}
.slidecontent_info p:nth-child(1) {
  color: #ffda79;
}
.slidecontent_info p:nth-child(2) {
  color: #eee;
}
/*  */
.slide_user {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  width: 100%;
  position: absolute;
  /* padding: 0 10px; */
  top: 20vh;
  height: 80vh;
}
.needlogin {
  margin-top: 10px;
}
.needlogin_button {
  box-sizing: border-box;
  text-align: center;
  padding: 0 10px 10px 10px;
}
.needlogin_button p {
  font-size: 12px;
}
.needlogin_button button {
  background-color: #e84118;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  padding: 8px 30px;
  border-radius: 20px;
  letter-spacing: 0.1rem;
}
.user_btnicon {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
/* 列表组 */
.slidelist_item {
  display: flex;
  align-items: center;
  padding: 10px;
}
.slidelist_item:active {
  background-color: #eee;
}
.slidelist_item span {
  margin-left: 15px;
  font-size: 14px;
}
/* 底部导航 */
.slide_setting {
  box-sizing: border-box;
  height: 50px;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ebedf0;
}
.slide_set {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
}
.slide_set span {
  margin-left: 10px;
  font-size: 14px;
}
.slide_night {
  width: 35%;
}
.slide_sett {
  width: 30%;
}
.slide_loyout {
  width: 30%;
}
/*  */
.slide_loginuser {
  display: flex;
  padding: 0 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
.slide_userleft {
  display: flex;
  align-items: center;
}
.slide_userleft span {
  margin-left: 10px;
}
.slide_loginuser img {
  width: 40px;
  border-radius: 50%;
}
.slide_userright button {
  outline: none;
  border: none;
  width: 80px;
  padding: 5px 10px;
  font-size: 12px;
  background-color: #e84118;
  color: #fff;
  border-radius: 20px;
}
.sign_in button {
  background-color: #797979;
}
</style>