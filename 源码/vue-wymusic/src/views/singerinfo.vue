<template>
  <div class="singerinfo-pages">
    <!-- 头部 -->
    <div class="singerinfo_header">
      <div class="singer_left">
        <van-icon name="https://s1.ax1x.com/2020/03/27/GF9QKA.png"
                  size="25"
                  @click="$router.go(-1)"></van-icon>
      </div>
      <div class="singer_right">
        <van-icon name="https://s1.ax1x.com/2020/03/28/GFs58A.png"
                  size="25"></van-icon>
        <van-icon name="https://s1.ax1x.com/2020/03/28/GFsgHO.png"
                  size="25"></van-icon>
      </div>
    </div>
    <!-- 背景 -->
    <div v-if="!hasLoad">
      <div class="singerinfo_bgc"
           :style="{'background-image':`url(${artist.img1v1Url})`}">
        <div class="singerinfo_content">
          <div class="singercontent_left">
            <h4>{{artist.name}}<span v-if="artist.trans">({{artist.trans}})</span></h4>
            <p></p>
          </div>
          <div class="singercontent_right">
            <button class="singerinfo_fower">+ 关注</button>
            <button class="singer_letter"
                    v-if="!artist.followed">发私信</button>
          </div>
        </div>
      </div>
      <!-- 导航 -->
      <div class="singerinfo_nav">
        <div class="singerinfo_tab">
          <ul>
            <li @click="addTab(index)"
                :class="{singer_actice:index==tabActive}"
                v-for="(item, index) in tab"
                :key="index">{{item.name}}</li>
          </ul>
          <swiper ref="list"
                  :options="{autoHeight: true}"
                  @slide-change="() => tabActive = $refs.list.swiper.realIndex">
            <!-- 主页 -->
            <swiper-slide>
              <singerHome :artist="artist"
                          :singerHot="singerHot"
                          @changeSong="changeSong"></singerHome>
            </swiper-slide>
            <!-- 歌曲 -->
            <swiper-slide>
              <singer-song :allsingerHot='allsingerHot'></singer-song>
            </swiper-slide>
            <!-- 专辑 -->
            <swiper-slide>
              <singer-album :album="album"></singer-album>
            </swiper-slide>
            <!-- 视频 -->
            <swiper-slide>
              视频
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <load v-if="hasLoad"></load>
  </div>
</template>

<script>
import load from '../components/load.vue'
import singerHome from '../views/singer/singer-home.vue'
import singerSong from '../views/singer/singer-song.vue'
import singerAlbum from '../views/singer/singer-album.vue'
export default {
  components: {
    load,
    singerHome,
    singerSong,
    singerAlbum
  },
  data () {
    return {
      hasLoad: true,
      id: '',
      // 简介
      artist: [],
      tabActive: 0,
      // 热门歌曲3个
      singerHot: [],
      allsingerHot: [],
      // 专辑
      album: [],
      tab: [
        {
          name: '主页'
        },
        {
          name: '歌曲'
        },
        {
          name: `专辑`
        },
        {
          name: '视频'
        },
      ]
    }
  },
  methods: {
    // 子组件传过来的点击事件，点击更多热歌切换到歌曲界面
    changeSong () {
      this.tabActive = 1
      this.addTab(this.tabActive)
    },
    // 请求歌曲
    async fetchSongInfo () {
      const res = await this.$http.get(`artists?id=${this.id}`)
      this.artist = res.data.artist
      this.singerHot = res.data.hotSongs.splice(0, 3)
      this.allsingerHot = res.data.hotSongs
      this.allsingerHot.unshift(...this.singerHot)
      // console.log(this.allsingerHot);
      this.hasLoad = false
    },
    // 请求专辑
    async fetchAlbum () {
      const res = await this.$http.get(`artist/album?id=${this.id}`)
      this.album = res.data.hotAlbums
    },
    // 切换样式
    addTab (index) {
      this.$refs.list.swiper.slideTo(index)
      this.tabActive = index
    }
  },
  created () {
    this.id = this.$route.query.id
    this.fetchSongInfo()
    this.fetchAlbum()
  },
}
</script>

<style>
.singerinfo_header {
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
}
.singerinfo_bgc {
  position: relative;
  background-position: top;
  background-size: cover;
  margin-top: -80px;
  z-index: -1;
  height: 40vh;
}
.singerinfo_bgc::before {
  content: "";
  position: absolute;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.3;
  width: 100%;
  z-index: 0;
  height: 100%;
}
.singer_right {
  width: 80px;
  display: flex;
  justify-content: space-between;
}
.singerinfo_content {
  padding: 10px;
  position: absolute;
  bottom: 10px;
}
.singercontent_left h4 {
  color: #fff;
}
.singerinfo_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.singerinfo_content .singerinfo_fower {
  outline: none;
  border: none;
  width: 70px;
  height: 30px;
  border-radius: 20px;
  font-size: 13px;
  color: #fff;
  background-color: #ff3a3a;
  padding: 0 10px;
}
.singer_letter {
  outline: none;
  border: none;
  width: 70px;
  height: 30px;
  border-radius: 20px;
  font-size: 13px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.69);
  padding: 0 10px;
}
.singerinfo_nav {
  position: relative;
  height: 100%;
  margin-top: -20px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.singerinfo_tab ul {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 0;
  border-bottom: 1px solid #eee;
}
.singerinfo_tab ul > li {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 100%;
  text-align: center;
}
.singer_actice {
  position: relative;
  z-index: 10;
  color: #ff3a3a;
  border-bottom-width: 93.75px;
  border-bottom: 1px solid #ff3a3a;
  transition: all 0.1s linear;
}
</style>