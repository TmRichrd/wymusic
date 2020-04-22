<template>
  <div style="width:100%;margin-bottom:50px">
    <transition name="fade"
                v-if="homoloading">
      <HomeLoading transiton="fade"></HomeLoading>
    </transition>
    <van-pull-refresh v-else
                      ref="vanPull"
                      v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
      <div class="page-herder">
        <div class="header">
          <!-- 点击弹出侧边栏 -->
          <div class="buger"
               @click="showPopup">
            <van-icon name="https://s1.ax1x.com/2020/03/26/GpWQlq.png"
                      size="20"
                      dot />
          </div>

          <div class="nav">
            <ul>
              <li @click="$refs.list.swiper.slideTo(index)"
                  :class="{active: active === index}"
                  v-for="(li, index) in list"
                  :key="index">{{li.name}}</li>
            </ul>
          </div>
          <div class="search">
            <van-icon name="https://s1.ax1x.com/2020/03/26/GpWilt.png"
                      size="20"
                      @click="$router.push('/search')" />
          </div>
        </div>

        <!-- swiper -->
        <swiper ref="list"
                @slide-change="() => active = $refs.list.swiper.realIndex"
                :options="{autoHeight: true}">
          <!-- 我的 -->
          <swiper-slide>
            <personal></personal>
          </swiper-slide>
          <!-- 发现 -->
          <swiper-slide>
            <find></find>
          </swiper-slide>
          <!-- 云村 -->
          <swiper-slide>
          </swiper-slide>
        </swiper>

      </div>
    </van-pull-refresh>
    <!-- 侧边栏 -->
    <van-popup v-model="show"
               position="left"
               :style="{ width: '80%',height:'100%' }">
      <slide></slide>
    </van-popup>
  </div>
</template>

<script>
import personal from '../views/personal'
// import load from '../components/load'
import find from '../views/find'
import slide from '../views/slide'
import HomeLoading from '../components/homeloading'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  components: {
    personal,
    find,
    slide,
    HomeLoading,
    // load
  },
  data () {
    return {
      isLoading: false,
      show: false, //弹出层
      active: 0,
      list: [
        {
          name: '我的'
        },
        {
          name: '发现'
        },
        {
          name: '云村'
        },
        {
          name: '视频'
        },
      ]
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    showPopup () {
      this.show = true;
    },
  },
  created () {
    this.$store.commit('changeHomeload')
  },
  computed: {
    homoloading () {
      return this.$store.state.homoloading
    },
    ...mapActions([
      'changeHomeload'
    ]),
    ...mapMutations([
      'changeHomeload'
    ])
  },
}
</script>

<style scoped>
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  font-size: 13px;
}
.page-herder {
  height: 100%;
}
.header {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height: 50px;
  line-height: 30px;
  padding: 10px;
}
.nav {
  display: flex;
}
.nav ul {
  display: flex;
  color: #797979;
  list-style: none;
}
.nav ul li {
  /* color: #333; */
  font-size: 1rem;
  margin-right: 20px;
}
.nav ul li.active {
  color: #333;
  font-size: 18px;
}
.buger {
  height: 100%;
  display: flex;
  align-items: center;
}
.search {
  display: flex;
  align-items: center;
}
/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>