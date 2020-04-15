<template>
  <div class="page-searchlist">
    <van-tabs v-model="active"
              swipeable
              sticky>
      <van-tab :title="item.title"
               v-for="(item, index) in tabs"
               :key="index"
               :to="{name:item.name,params:{searchValue:searchValue1}}">
      </van-tab>
      <router-view :searchResult="searchResult"
                   v-if="errmes==''"></router-view>
      <div class="errmes"
           v-if="errmes!==''">{{errmes}}</div>
    </van-tabs>
  </div>

</template>

<script>
import comp from '../views/searchTab/comp'
export default {
  props: [
    'searchResult',
    // 错误信息
    'errmes'
  ],
  watch: {
    active (e) {
      this.$router.push({ name: this.tabs[e].name, params: { searchValue: this.searchValue1 } })
    },
    // 监听路由变化
    $route: {
      immediate: true,
      /**
       * to去到哪个路由
       * form从哪个路由来的
       */
      handler (to, from) {
        /**
         * 循环tabs中的name,如果当前name=去的name
         * 就让index等于van-tab中的active
         */
        this.tabs.forEach((item, index) => {
          if (item.name === to.name)          {
            this.active = index
          }
        })
      }
    }
  },
  data () {
    return {
      active: 0,
      // searchValue: sessionStorage.searchValue,
      tabs: [
        {
          title: '综合',
          name: 'comp',
        },
        {
          title: '单曲',
          name: 'singles',
        },
        {
          title: '云村',

        },
        {
          title: '视频',
          name: 'video'
        },
        {
          title: '歌手',
          name: 'singer'
        },
      ]
    }
  },
  computed: {
    searchValue1 () {
      return sessionStorage.searchValue
    }
  },
  created () {
  },
}
</script>

<style>
.errmes {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #797979;
  font-size: 14px;
}
</style>