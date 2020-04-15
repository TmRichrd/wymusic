<template>
  <div class="login_pages">
    <div class="login_header">
      <van-icon name="arrow-left"
                size="25"
                @click="$router.push('/')" />
      <span>手机号登录</span>
    </div>
    <div class="login_icon">
      <img src="https://s1.ax1x.com/2020/03/29/GEoT2t.png"
           alt="">
    </div>
    <div class="login_from">
      <van-form @submit="onSubmit">
        <van-field v-model="username"
                   name="phone"
                   label="手机号"
                   placeholder="手机号"
                   :rules="[{ pattern, message: '手机号码有误，请重新填写' }]" />
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="密码"
                   placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]" />
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      color="#dd101b"
                      native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      pattern: /^1[3456789]\d{9}$/
    }
  },
  methods: {
    // 登录请求
    async onSubmit (values) {
      const res = await this.$http.get(`/login/cellphone?phone=${values.phone}&password=${values.password}`)
      console.log(res);
      if (res.data.code == 502)      {
        this.$toast(res.data.message);
      } else if (res.data.code == 200)      {
        localStorage.setItem('userInfo', JSON.stringify(res.data.profile))
        this.$toast('登录成功');
        setTimeout(() => {
          this.$router.push('/')
        }, 1000);
      } else      {
       return this.$toast('账号不存在');
      }
    },
  },
}
</script>

<style>
.login_pages {
  height: 100vh;
  width: 100%;
}
.login_header {
  display: flex;
  padding: 10px;
  align-items: center;
  height: 40px;
}
.login_header span {
  margin-left: 20px;
}
.login_from {
  margin-top: 10%;
  width: 100%;
}
.login_icon {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  height: 40px;
  width: 100%;
}
.login_icon img {
  width: 40px;
}
</style>