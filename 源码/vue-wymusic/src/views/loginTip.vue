<template>
  <div class="loginTip_pages">
    <div class="logintip_header">
      <div class="logintip_icon">
        <img src="https://s1.ax1x.com/2020/04/19/JunHAK.png"
             alt="">
      </div>
    </div>
    <div class="logintip_content">
      <div class="logintip_button">
        <div class="phone_login">
          <van-button round
                      color="#fff"
                      size="large"
                      @click="goLogin('/login')">手机号登录</van-button>
        </div>
        <div class="now_login">
          <van-button round
                      plain
                      color="#fff"
                      size="large"
                      @click="goLogin('/')">立即体验</van-button>
        </div>
      </div>
      <!-- 社交登录按钮 -->
      <div class="log_shejiao">
        <van-button round
                    icon="https://s1.ax1x.com/2020/04/19/JuKeRe.png"
                    color="#dd101b" />
        <van-button round
                    icon="https://s1.ax1x.com/2020/04/19/JuKuMd.png"
                    color="#dd101b" />
        <van-button round
                    icon="https://s1.ax1x.com/2020/04/19/JuKKsA.png"
                    color="#dd101b" />
        <van-button round
                    icon="https://s1.ax1x.com/2020/04/19/JuK3If.png"
                    color="#dd101b" />
      </div>
      <!-- 协议 -->
      <div class="xieyi"
           id="xieyi"
           ref="xieyi"
           :class="nologin?'shake animated':''">
        <input type="checkbox"
               name=""
               v-model="checked"
               class="login_checkbox">
        <span>{{xieyi}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css'
export default {
  data () {
    return {
      xieyi: '同意《用户协议》《隐私政策》《儿童隐私政策》',
      checked: false,
      nologin: false
    }
  },
  methods: {
    // 判断有没有勾选协议
    goLogin (str) {
      if (this.checked == false)      {
        this.nologin = true
        setTimeout(() => {
          this.nologin = false
        }, 1000);
        return this.$toast(`请先勾选${this.xieyi}`)
      } else      {
        this.$router.push(str)
      }
    }
  },
}
</script>

<style>
.loginTip_pages {
  height: 100vh;
  background-color: #dd101b;
  position: relative;
}
.logintip_header {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logintip_icon {
  width: 80px;
  padding: 15px;
  border-radius: 40px;
  background-color: #ea2027;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logintip_icon img {
  width: 100%;
}
.logintip_content {
  margin-top: 150px;
  padding: 0 40px;
}
.logintip_button {
  margin-top: 50px;
}
.logintip_button .van-button {
  margin-bottom: 20px;
}
.phone_login .van-button__text {
  color: #dd101b;
}
.now_login .van-button--plain {
  background-color: #dd101b !important;
}
.log_shejiao {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}
.xieyi span {
  font-size: 10px;
  color: #eee;
}
.xieyi {
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.xieyi input[type="checkbox"] {
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  line-height: 20px;
  color: #d8d8d8;
  display: inline-block;
  background-color: transparent;
  border: none;
}
.xieyi input[type="checkbox"]:after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  text-align: center;
  border-radius: 3px;
  line-height: 14px;
  font-size: 16px;
  /* color: #fff; */
  border: 1px solid #ddd;
  background-color: transparent;
  box-sizing: border-box;
}
.xieyi input[type="checkbox"]:checked:after {
  border-radius: 3px;
  border: 4px solid #ddd;
  background-color: transparent;
}
</style>