<template>
  <div class="recoday">
    <!-- 头部 -->

    <div class="recoday_header">
      <div @click="$router.push('/')">
        <van-icon name="arrow-left"
                  size="25"
                  color="#fff" />
      </div>
      <div>
        <van-icon name="question-o"
                  size="25"
                  color="#fff" />
      </div>
    </div>
    <!-- 背景 -->
    <div class="reco_bcg">
      <div class="recoday_days">
        <span>{{nowDateDay}}</span>/<span>{{nowDateMon}}</span>
      </div>
      <div class="reco_hist">
        <button>
          历史日推
        </button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="recoday_items"
         v-if="!hasLoad">
      <div class="recoday_play">
        <van-icon name="play-circle-o"
                  size="20" />
        <span>播放全部</span>
      </div>
      <!-- 循环体 -->
      <div class="recoday_item"
           @click="handleSong(item,index,item.id)"
           v-for="(item, index) in recoSong"
           :key="index">
        <div class="recoday_item_left">
          <img v-lazy="item.album.blurPicUrl"
               alt="">
        </div>
        <div class="recoday_item_right">
          <div class="recoday_title">
            <p>{{item.name}}</p>
            <p>{{item.artists.map(v=>v.name).join('/')}} - {{item.album.name}}</p>
          </div>
          <van-icon name="https://s1.ax1x.com/2020/04/10/GoO2FO.png" />
        </div>
      </div>
    </div>
    <load v-if="hasLoad"></load>
  </div>
</template>

<script>
import moment from 'moment'
import load from '../components/load.vue'
export default {
  components: {
    load
  },
  data () {
    return {
      hasLoad: true,
      recoSong: [],
      songurl: '',
      nowDateDay: new Date().getTime(),
      nowDateMon: new Date().getTime()
    }
  },
  methods: {
    async fetchRecoDay () {
      const res = await this.$http.get('/recommend/songs')
      this.recoSong = res.data.recommend
      this.hasLoad = false
      // console.log(res);
      console.log(this.recoSong[0]);
    },
    handleSong (item, index, songid, singer, songname) {
      // console.log(item.album);
      this.$store.commit('changeFull')
      this.$store.commit("addSong", { item: item.album, index: index, songid: item.id, singer: item.artists.map(v => v.name).join('/'), songname: item.name })
      this.$store.commit('pushSong', item.album, item.artists.map(v => v.name).join('/'))
      this.fetchSongurl(item.id)
    },
    async  fetchSongurl (id) {
      const res = await this.$http.get(`song/url?id=${id}`)
      this.songurl = res.data.data[0].url
      // console.log(this.songurl);

      this.$store.commit('addurl', this.songurl)
    }
  },
  mounted () {
    this.fetchRecoDay()
  },
  created () {
    this.nowDateDay = moment(this.nowDateDay).format('DD')
    this.nowDateMon = moment(this.nowDateMon).format('MM')
  },

}
</script>

<style>
/* 头部 */
.recoday_header {
  position: relative;
  z-index: 10;
  display: flex;
  height: 60px;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
/* 背景 */
.reco_bcg {
  position: relative;
  margin-top: -60px;
  height: 250px;
  z-index: -1;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(https://s1.ax1x.com/2020/04/10/GobWWj.jpg);
}
.reco_bcg::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.5;
}
/* 列表 */
.recoday_items {
  position: relative;
  z-index: 10;
  margin-top: -20px;
  border-radius: 20px;
  background-color: #fff;
  margin-bottom: 50px;
}
.recoday_items::before {
  content: "";
  position: absolute;
  width: 5px;
  background-color: #fff;
  height: 20px;
  top: -10px;
  left: 50px;
  border-radius: 3px;
  box-shadow: 0 3px 3px #797979;
}
.recoday_items::after {
  content: "";
  position: absolute;
  width: 5px;
  background-color: #fff;
  height: 20px;
  top: -10px;
  right: 50px;
  border-radius: 3px;
  box-shadow: 0 3px 3px #797979;
}
.recoday_play {
  padding: 15px 10px;
  display: flex;
  align-items: center;
}
.recoday_play span {
  margin-left: 10px;
}
.recoday_item {
  display: flex;
  align-items: center;
  padding: 10px;
}
.recoday_item_left img {
  border-radius: 5px;
  width: 40px;
  object-fit: cover;
}
.recoday_item_right {
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recoday_title {
  width: 90%;
}
.recoday_title p {
  margin: 0px;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recoday_title p:nth-child(2) {
  color: #7f8c8d;
  font-size: 10px;
}
/* 时间 */
.recoday_days {
  position: absolute;
  bottom: 70px;
  left: 20px;
  color: #fff;
  z-index: 11;
}
.recoday_days span:nth-child(1) {
  font-size: 40px;
}
.reco_hist {
  position: absolute;
  bottom: 40px;
  z-index: 11;
  left: 20px;
}
.reco_hist button {
  border-radius: 40px;
  border: none;
  padding: 3px 5px;
  width: 100px;
  font-size: 13px;
  letter-spacing: 0.2rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>