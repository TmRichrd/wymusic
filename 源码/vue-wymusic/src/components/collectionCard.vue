<template>
  <div class="page-collection">
    <div class="collheader">
      <div class="collheader_left">
        <van-icon @click="$router.go(-1)"
                  name="https://s1.ax1x.com/2020/03/28/Gk5Bse.png" />
        <span>{{name}}</span>
      </div>
      <div class="collheader_right">
        <transition name="fade">
          <van-icon name="https://s1.ax1x.com/2020/03/28/GFyZG9.png"
                    size="20"
                    ref="searchIcon"
                    @click="searchByName()" />
        </transition>
        <input type="text"
               v-model="searchValue"
               v-show="searchLoad"
               @change="filterSong">
        <van-icon name="https://s1.ax1x.com/2020/03/28/GFsgHO.png"
                  size="30" />
      </div>
    </div>
    <div class="collbcg"
         :style="{'background-image': `url(${colldata.coverImgUrl})`}">
    </div>
    <div class="collab">
      <div class="collbcg_info">
        <div class="collbcg_infoleft">
          <img :src="colldata.coverImgUrl"
               alt="">
        </div>
        <div class="collbcg_inforight">
          <div class="collbcg_title">
            {{colldata.name}}
          </div>
          <div class="coll_user">
            <img :src="colldata.creator.avatarUrl"
                 alt=""><span>{{colldata.creator.nickname}}</span>
            <van-icon name="https://s1.ax1x.com/2020/03/28/GFykaF.png"
                      size="12" />
          </div>
          <div class="coll_content">
            {{colldata.description}}
          </div>
        </div>

      </div>
      <div class="grid">
        <van-grid :column-num="4"
                  :border="false">
          <van-grid-item icon="https://s1.ax1x.com/2020/03/28/GFsRED.png"
                         :text="colldata.commentCount" />
          <van-grid-item icon="https://s1.ax1x.com/2020/03/28/GFs58A.png"
                         :text="colldata.shareCount" />
          <van-grid-item icon="https://s1.ax1x.com/2020/03/28/GFsf4H.png"
                         text="下载" />
          <van-grid-item icon="https://s1.ax1x.com/2020/03/28/GFsovt.png"
                         text="多选" />
        </van-grid>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist">
      <div class="songlist_header">
        <div class="songlist_headerleft">
          <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png"
                    size="20" />
          <h5>播放全部</h5><span>(共{{colldata.tracks.length}}首)</span>
        </div>
        <div class="songlist_headerright">
          <van-button round
                      color="#dd101b">
            <span style="margin-right:5px">+</span>收藏({{(colldata.subscribedCount/10000)>=1?
                      parseInt((colldata.subscribedCount/10000)).toFixed(1)+'万':colldata.subscribedCount}})
          </van-button>
        </div>
      </div>
      <!-- list -->
      <div class="songlist_items">
        <div :key="index"
             @click="handleSong(item,index,item.id)"
             class="songlist_item"
             v-for="(item, index) in filterSong()">

          <div class="song_itemindex">
            {{index+1}}
          </div>
          <div class="songlist_itemright">
            <div class="songlist_right_left"
                 style="line-height:20px">
              <div class="songlist_left_name suojin">{{item.name}}</div>
              <div class="songlist_author suojin">
                <!-- <span class="songlist_sq"
                        :class="item.pop<90?'sprite':''"></span> -->
                <!-- <van-tag color="#f2826a"
                           plain>{{item.fee==8?'vip':''}}</van-tag> -->
                <span class="songlist_sq"
                      :class="item.fee==8?'sprite3':''"></span>
                <!-- <span>{{}}</span> -->
                {{item.ar.map(v=>v.name).join('/')}}
                -{{item.al.name}}
              </div>
            </div>
            <div class="div songlist_right_right">
              <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png"
                        size="20" />
              <van-icon name="https://s1.ax1x.com/2020/03/27/GibKPI.png"
                        size="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:
  {
    name: { type: String },
    colldata: {
      avatarUrl: {}
    },
  },
  data () {
    return {
      songurl: '',
      searchLoad: false,
      searchValue: ''
    }
  },
  methods: {
    handleSong (item, index, songid, singer, songname) {
      console.log(item);
      this.$store.commit('changeFull')
      this.$store.commit("addSong", { item: item.al, index: index, songid: songid, singer: item.ar.map(v => v.name).join('/'), songname: item.name })
      this.$store.commit('pushSong', item.al)
      this.fetchSongurl(item.id)

    },
    async  fetchSongurl (id) {
      const res = await this.$http.get(`song/url?id=${id}`)
      this.songurl = res.data.data[0].url
      this.$store.commit('addurl', this.songurl)
    },
    // 点击显示搜索框
    searchByName () {
      this.$refs.searchIcon.style.display = 'none'
      this.searchLoad = true
    },
    // 检索
    filterSong () {
      return this.colldata.tracks.filter(item => item.name.includes(this.searchValue))
    }
  },
}
</script>

<style>
.suojin {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.page-collection {
  position: relative;
}
.collheader {
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
.collheader_left span {
  color: #fff;
}
.collheader_right {
  justify-content: space-between;
  width: auto;
  display: flex;
  align-items: center;
}
.collheader_right input[type="text"] {
  border-radius: 20px;
  border: none;
  outline: none;
  padding: 5px 15px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  color: #fff;
}
.collbcg {
  top: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
}
.collbcg::before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 800;
  background-size: 120%;
  background-color: rgba(0, 0, 0, 0.5);
}
.collbcg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  filter: blur(15px);
  background: inherit;
  background-size: 120%;
  z-index: 100;
  opacity: 1;
  top: 0;
}
.collab {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  position: absolute;
  z-index: 999;
}
.collbcg_info {
  height: 160px;
  display: flex;
  margin-top: 20px;
  /* align-items: center; */
}
.collbcg_infoleft img {
  width: 150px;
  border-radius: 5px;
}
.collheader_left {
  height: 100%;
  display: flex;
  align-items: center;
}
.collheader_left span {
  margin-left: 20px;
}

.collab .van-grid-item__content {
  background-color: transparent;
}
.collab .van-grid-item__text {
  color: #fff;
}
.collbcg_inforight {
  margin-left: 10px;
}
.collbcg_title {
  color: #fff;
  height: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
  font-size: 18px;
}
.coll_user {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.coll_user img {
  width: 20px;
  border-radius: 50%;
}
.coll_user span {
  margin-left: 10px;
  font-size: 13px;
  color: #fff;
}
.coll_content {
  height: 33px;
  overflow: hidden;
  margin-top: 20px;
  color: #fff;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-size: 12px;
}
/*  */
.songlist {
  position: relative;
  box-sizing: border-box;
  top: 260px;
  z-index: 999;
  margin-bottom: 50px;
}
.songlist_header {
  height: auto;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 5px 10px 10px 10px;
  justify-content: space-between;
  height: 70px;
  background-color: #fff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
  /* z-index: 999; */
}
.songlist_headerleft {
  display: flex;
  align-items: center;
}
.songlist_headerleft h5 {
  margin-left: 10px;
  font-size: 15px;
  font-weight: 500;
}
.songlist_headerleft span {
  color: #797979;
  font-size: 12px;
}
/*  */

.sprite3 {
  background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=")
    no-repeat 0 0;
  background-size: 166px 97px;
  width: 12px;
  height: 8px;
}
.songlist_items {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 10px;
}
.songlist_item {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
.song_itemindex {
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #797979;
  width: 55px;
  height: 55px;
}
.songlist_itemright {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  width: 50%;
  box-sizing: border-box;
}
.songlist_right_left {
  width: 70%;
}
.songlist_left_name {
  font-size: 14px;
  box-sizing: border-box;
}
.songlist_author {
  font-size: 10px;
  color: #797979;
}
.songlist_sq {
  display: inline-block;
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