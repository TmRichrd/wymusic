<template>
  
    <div class="personal">
      <transition name="fade">
      <div class="personal_warp">
        <div class="personal_header"
             :style="userInfo?{'background-image':`url(${userInfo.backgroundUrl})`}:''">
          <div class="personal_user"
               v-if="!userInfo">
            <div class="personal_user_left">
              <img src="https://s1.ax1x.com/2020/04/08/GRjwYn.png"
                   alt="">
              <span>登录立享手机电脑多端同步</span>
            </div>
            <button @click="goLogin">立即登录</button>
          </div>
          <!-- 登录之后 -->
          <div class="user_login"
               v-else-if="userInfo">
            <div class="userinfo_left">
              <img :src="userInfo.avatarUrl"
                   alt="">
              <span>{{userInfo.nickname}}</span>
            </div>
            <div class="userinfo_right">
              开通黑胶VIP&gt;
            </div>
          </div>
          <!-- 图标 -->
          <div class="personal_icon">
            <van-grid :column-num="5"
                      :border="false">
              <van-grid-item icon="https://s1.ax1x.com/2020/04/08/GRxCgx.png"
                             text="本地音乐" />
              <van-grid-item icon="https://s1.ax1x.com/2020/03/28/GFsf4H.png"
                             text="下载管理" />
              <van-grid-item icon="https://s1.ax1x.com/2020/04/08/GRxsZF.png"
                             text="我的电台" />
              <van-grid-item icon="https://s1.ax1x.com/2020/04/08/GRx1r8.png"
                             text="我的收藏" />
              <van-grid-item icon="https://s1.ax1x.com/2020/04/08/GRxBrT.png"
                             text="关注新歌" />
            </van-grid>
          </div>
        </div>
        <!-- 我的音乐 -->
        <div class="personal_mymusic">
          <!-- 我的音乐 -->
          <div class="personal_music">
            <div class="personal_music_title">
              <span>我的音乐</span>
              <van-icon name="https://s1.ax1x.com/2020/04/08/GWS5Ue.png" />
            </div>
            <div class="personal_music_content">
              <swiper :options="swiperOption">
                <swiper-slide>
                  <div class="likemusic">
                    <div class="likemusic_content">
                      <van-icon size="30"
                                name="https://s1.ax1x.com/2020/04/08/GWiASJ.png" />
                      <p>我最喜欢的音乐</p>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="personalFm">
                    <div class="personalFm_content">
                      <van-icon size="30"
                                name="https://s1.ax1x.com/2020/04/08/GRxsZF.png" />
                      <p>私人FM</p>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="likemusic"
                       style="background: #ecf0f1">
                    <div class="likemusic_content">
                      <van-icon size="30"
                                name="https://s1.ax1x.com/2020/04/08/GWmqYt.png" />
                      <p style="color:#000">热歌放映厅</p>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="likemusic"
                       style="background: #ecf0f1;">
                    <div class="likemusic_content">
                      <van-icon size="30"
                                name="https://s1.ax1x.com/2020/04/08/GWnhhq.png" />
                      <br />
                      <p style="color:#000">私藏推荐</p>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="likemusic"
                       style="background: #ecf0f1">
                    <div class="likemusic_content">
                      <van-icon size="30"
                                name="https://s1.ax1x.com/2020/04/08/GWnbB4.png" />
                      <p style="color:#000">因乐交友</p>
                    </div>
                  </div>
                </swiper-slide>

              </swiper>
            </div>
          </div>
          <!-- 最近播放 -->
          <div class="timeplay"></div>

        </div>
      </div>
      </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',

    }
  },
  computed: {
  },
  created () {
    // this.$set(this, 'userInfo', JSON.parse(localStorage.getItem('userInfo')) || '')
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''

  },
  mounted () {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    }
  },

}
</script>

<style>
.personal {
  height: 100vh;
  box-sizing: border-box;
}
.personal_header {
  width: 100vw;
  height: 300px;
  top: -50px;
  position: absolute;
  left: 0;
  /* background-color: #2d3436; */
  background-image: url(https://s1.ax1x.com/2020/04/08/GWg5j0.jpg);
  background-position: center;
  background-size: cover;
}
.personal_header::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.5;
  z-index: 20;
  background-color: rgba(42, 42, 42, 0.69);
}
.personal_user {
  position: relative;
  z-index: 99;
  box-sizing: border-box;
  width: 100%;
  color: #eee;
  font-size: 12px;
  align-items: center;
  margin-top: 100px;
  display: flex;
  padding: 10px 20px;
  height: 60px;
  justify-content: space-between;
}
.personal_user_left {
  display: flex;
  align-items: center;
}
.personal_user_left span {
  margin-left: 15px;
}
.personal_user img {
  background-size: cover;
  width: 40px;
  height: 40px;
}
.personal_user button {
  border: 1px solid #eee;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
}
.personal_icon {
  width: 100%;
  position: absolute;
  bottom: 20px;
  z-index: 50;
}
.personal_icon .van-grid-item__content {
  background-color: transparent;
}
.personal_icon .van-grid-item__text {
  color: #eee;
}
/*  */
.personal_mymusic {
  position: absolute;
  margin-top: 230px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  width: 100%;
  z-index: 50;
}
.personal_music_title {
  display: flex;
  align-items: center;
  font-weight: 600;
  border-radius: 15px;
  padding: 15px;
  justify-content: space-between;
}
.personal_music_content {
  padding: 0 10px;
}
.likemusic {
  background-image: url(https://s1.ax1x.com/2020/04/10/GTKwV0.jpg);
  background-position: center;
  background-size: cover;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.likemusic::before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  bottom: 0;
  position: absolute;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.5;
  z-index: 3;
}
.likemusic_content {
  text-align: center;
  position: relative;
  z-index: 5;
}
.likemusic_content p {
  margin-top: 5px;
  font-size: 12px;
  color: #fff;
}
.personalFm {
  background-image: url(https://s1.ax1x.com/2020/04/10/GTuA6s.jpg);
  background-position: center;
  background-size: cover;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
}
.personalFm::before {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 10px;
  top: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.5;
  z-index: 3;
}
.personalFm_content {
  position: relative;
  z-index: 5;
}
.personalFm p {
  margin-top: 5px;
  font-size: 12px;
  color: #eee;
}
/* 登录之后 */
.user_login {
  width: 100%;
  display: flex;
  margin-top: 100px;
  box-sizing: border-box;
  align-items: center;
  padding: 0 10px;
  position: relative;
  z-index: 50;
}
.userinfo_left {
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.userinfo_left span {
  margin-left: 20px;
}
.userinfo_left img {
  width: 60px;
  border-radius: 50%;
}
.userinfo_right {
  color: #ecf0f1;
  font-size: 12px;
}
/* 离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>