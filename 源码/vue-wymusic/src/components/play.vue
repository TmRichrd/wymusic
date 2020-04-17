<template>
  <div v-if="playlist.length!==0">
    <transition name="fade">
      <div class="page_play"
           v-show="fullScreen"
           :style="{'background-image':`url(${playlist.picUrl})`}">
        <div class="play_headernav">
          <div class="play_headerleft">
            <van-icon name="https://s1.ax1x.com/2020/04/07/GcWkf1.png"
                      size="25"
                      @click="changgeFull" />
            <div style="margin-left:20px;width:100%">
              <p>{{playlist.songname}}</p>
              <!-- <p>{{playlist.ar.map(v=>v.name).join('/')}}</p> -->
              <p>{{playlist.singer}}</p>

              <!-- <p>{{playlist.artists.map(v=>v.name).join('/')}}&gt;</p> -->
            </div>
          </div>
          <div>
            <van-icon name="https://s1.ax1x.com/2020/03/28/GFs58A.png"
                      size="30" />
          </div>
        </div>
        <!-- 碟 -->
        <div class="plate"
             ref="plate"
             @click.stop="changeToggle">
          <!-- 控制杆 -->
          <div class="plate_bar"
               ref="plate_bar"></div>
          <div class="m-song-disc">
            <div class="m-song-img">
              <div class="m-song_bcg"
                   ref="xz"
                   id="xz">
                <div class="m_songpicurl">
                  <img :src="playlist.picUrl"
                       alt="">
                </div>
              </div>
            </div>
          </div>
          <!-- 按钮组 -->
          <div class="plate_btn">
            <van-icon name="like-o"
                      size="30"
                      color="#ffffff"
                      @click.stop="loveSong(playlist.id)" />
            <van-icon name="https://s1.ax1x.com/2020/03/28/GFsf4H.png"
                      size="30" />
            <van-icon name="https://s1.ax1x.com/2020/03/29/GV3W38.png"
                      size="30" />
            <van-icon name="https://s1.ax1x.com/2020/03/28/GFsRED.png"
                      :badge="total|changeTotal"
                      size="30" />
            <van-icon name="https://s1.ax1x.com/2020/03/29/GV3jvF.png"
                      size="30" />
          </div>
        </div>
        <!-- 歌词界面 -->
        <div class="middle_r"
             ref="lyricList"
             v-show="!showtoggle"
             @click.capture="showFalse">
          <div class="lyric_wrap">
            <div class="bscroll"
                 ref="bscroll">
              <div v-if="true"
                   ref="lyricLines"
                   class="bscroll-container">
                <p class="text"
                   :class="{lyric_active:index==lyricIndex}"
                   ref="lyricLine"
                   v-for="(item, index) in lyric.lines"
                   :key="index">
                  {{item.txt}}</p>
              </div>
            </div>
          </div>

        </div>
        <!-- 滑块 -->
        <div class="plate_bottom">
          <div class="slide_flex">
            <span>{{currentTime|audioTime}}</span>
            <div class="plate_slider">
              <van-slider v-model="currentTime"
                          @change="changeAudioTime()"
                          active-color="#797979"
                          :max="dtime">
                <template #button>
                  <div class="custom-button">
                  </div>
                </template>
              </van-slider>
            </div>
            <!-- <span>{{addNum(parseInt(songs.dt/1000/60))+':'+addNum((songs.dt/1000%60).toFixed(0))}}</span> -->
            <span>{{dtime|audioTime}}</span>

          </div>
          <!-- 功能按钮 -->
          <div class="plate_gn">
            <van-icon name="https://s1.ax1x.com/2020/03/29/GVNM1x.png"
                      size="30"
                      color="#ffffff" />
            <van-icon name="https://s1.ax1x.com/2020/03/29/GVYOo9.png"
                      size="30"
                      @click="pervSong(playlist.id)" />
            <!-- <div class="sprite1"
               ref="sprite1"
               @click.stop="changePlay">
          </div> -->
            <van-icon :name="playicon"
                      size="45"
                      @click="changePlay" />
            <van-icon name="https://s1.ax1x.com/2020/03/29/GVtFdH.png"
                      size="30"
                      @click="nextSong(playlist.id)" />
            <van-icon name="https://s1.ax1x.com/2020/03/29/GVtmSP.png"
                      size="30"
                      @click="showList=true" />
          </div>
        </div>
        <audio :src="playlist.url"
               autoplay="autoplay"
               loop
               ref="audio"
               id="audio"
               @loadedmetadata="getAudioLength(1)"
               @timeupdate="audioTimeUpdate()">该浏览器不支持audio</audio>
      </div>
    </transition>
    <!-- 迷你播放器 -->
    <div class="miniplay"
         @click="fuscreen"
         v-show="!fullScreen">
      <div class="miniplay_bar">
        <div class="miniplay_left">
          <img :src="playlist.picUrl"
               alt="">
          <div class="miniplay_title">
            <p>{{playlist.songname}}</p>
            <!-- <p>{{playlist.ar.map(v=>v.name).join('/')}}</p> -->
            <p>{{playlist.singer}}</p>

          </div>
        </div>
        <div class="miniplay_right">
          <van-icon :name="miniplayicon"
                    @click.stop="changePlay" />
          <div class="miniplay_hist">
            <van-icon name="https://s1.ax1x.com/2020/04/15/J91knJ.png"
                      @click.stop="showList=true" />
          </div>
        </div>
      </div>
    </div>
    <!-- 播放歌曲列表 -->
    <van-popup v-model="showList"
               round
               position="bottom"
               :style="{ height: '50%' }">
      <div class="playhispop">
        <div class="playhispop_header">
          当前播放<span>({{singer.length}})</span>
        </div>
        <!-- list -->
        <div class="playhispop_items">
          <div class="playhispop_item"
               v-for="(item, index) in singer"
               :key="index"
               @click.stop="changeSong(index)">
            <div class="playhispop_itemleft"
                 :class="{playmini_active:index===currentIndex}">
              {{item.songname}} - <span>{{item.singer}}</span><!-- <span>{{item.artists.map(v=>v.name).join('/')}}</span> -->
            </div>
            <div class="playhispop_itemright">
              <van-icon name="cross"
                        size="15"
                        color="#797979"
                        @click.stop="deleteSong(index)" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import BScroll from "better-scroll";
import Lyric from 'lyric-parser'
export default {
  data () {
    return {
      // value: '0',
      id: '',
      total: '',// 评论数量
      ar: '',
      // 总时长
      dtime: '',
      // 播放歌曲列表
      showList: false,
      // 当前播放歌曲的索引
      nowPlaySongid: 0,
      // 当前播放时长
      currentTime: 0,
      lyricIndex: 0,
      lastTime: null,//标记时间戳
      // 播放状态
      playState: true,
      playicon: 'https://s1.ax1x.com/2020/03/29/GZQtiV.png',
      miniplayicon: 'https://s1.ax1x.com/2020/04/10/GT1z0s.png',
      // 切换碟和歌词
      showtoggle: true,
      // 切换播放状态
      showplay: true,
      currentRate: 0,
      songs: {
        al: {
          picUrl: ''
        },
        dt: ''
      },
      songUrl: {},
      // 歌词
      lyric: [],
      // 当前状态歌词
      lyricActive: 0
    }
  },
  filters: {
    // 将时间戳转为分钟 秒数
    audioTime (value) {
      let m = parseInt(value / 60)
      let s = Math.ceil(value % 60)
      if (m < 10)      {
        if (s < 10)        {
          return '0' + m + ':' + "0" + s
        }
        return '0' + m + ':' + s
      } else if (m > 10)      {
        if (s < 10)        {
          return m + ':' + '0' + s
        }
        return m + ':' + s
      }
    },
    // 转换单位
    changeTotal (value) {
      if (value >= 10000)      {
        return '1w+'
      } else if (value >= 999)      {
        return '999+'
      } else      {
        return value
      }
    }
  },
  computed: {
    // currentIndex () {
    //   return this.$store.state.currentIndex
    // }

    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentIndex',
      'singer'
    ]),

  },
  methods: {
    // async fetchSong () {
    //   const res = await this.$http.get(`song/detail?ids=${this.id}`)
    //   this.songs = res.data.songs[0]
    //   this.$set(this.songs, 'dt', res.data.songs[0].dt)
    //   this.ar = this.songs.ar.map(v => v.name).join('/')
    // },
    // async fetchSongUrl () {
    //   const res = await this.$http.get(`song/url?id=${this.id}`)
    //   this.songUrl = res.data.data[0].url
    // },
    // 获取评论数量
    // async fetchComments () {
    //   const res = await this.$http.get(`comment/music?id=${this.id}`)
    //   this.total = res.data.total
    //   console.log(this.total);
    // },
    // 点击切换碟隐藏显示
    async changeToggle () {
      if (this.showtoggle)      {
        const audio1 = document.getElementById('audio')
        let nowCurrentTime = audio1.currentTime
        this.$refs.plate.style.display = 'none'
        this.$refs.lyricList.style.display = 'block'
        this.showtoggle = !this.showtoggle
        // console.log(this.$store.state.singer);
        const res = await this.$http.get(`/lyric?id=${this.playlist.songid}`)
        this.lyric = new Lyric(res.data.lrc.lyric)
        // 歌词
        const lyrictime = this.lyric.lines
        const timeArr = lyrictime.map((item, index) => {
          return item.time / 10
        })
        window.clearInterval(this.timeInterval)
        this.timeInterval = window.setInterval(() => {
          const audio1 = document.getElementById('audio')
          let nowCurrentTime1 = Math.floor(audio1.currentTime * 100)
          timeArr.find((item, index) => {
            if (item == nowCurrentTime1)            {
              this.lyricIndex = index
              this.lyricActive = index
              return true
            }
            return false
          })
          if (Math.floor(this.dtime * 10) == nowCurrentTime1 / 10)          {
            this.nextSong(this.playlist.id)
          }
        }, 0);
      } else      {
        window.clearInterval(this.timeInterval)
        this.$refs.plate.style.display = 'block'
        this.$refs.lyricList.style.display = 'none'
        this.showtoggle = !this.showtoggle
      }
    },
    showFalse () {
      this.showtoggle = true
      this.$refs.plate.style.display = 'block'
    },
    // 暂停，开始播放
    changePlay () {
      if (this.playState)      {
        const audio1 = document.getElementById('audio')
        audio1.pause();
        this.playState = false
        this.playicon = 'https://s1.ax1x.com/2020/03/28/GAbOgI.png'
        this.miniplayicon = 'https://s1.ax1x.com/2020/03/26/GphbSs.png'
        this.$refs.plate_bar.style.transform = 'rotate(-35deg)'
        this.$refs.xz.style.animationPlayState = 'paused'
        this.$refs.plate_bar.style.transformOrigin = '12px 12px'
      } else      {
        const audio1 = document.getElementById('audio')
        // 开始播放
        audio1.play();
        // 歌词滚动
        // console.log(Math.abs(this.currentTime - this.$refs.audio.cucurrentTime) > 2 ? this.$refs.audio.currentTime = this.currentTime : '');
        // 暂停旋转
        this.$refs.xz.style.animationPlayState = 'running'
        // 改变图标
        this.playicon = 'https://s1.ax1x.com/2020/03/29/GZQtiV.png'
        this.miniplayicon = 'https://s1.ax1x.com/2020/04/10/GT1z0s.png'
        // 控制杆拉回
        this.$refs.plate_bar.style.transform = 'rotate(0deg)'
        this.$refs.plate_bar.style.transformOrigin = '12px 12px'
        // 播放状态为true
        this.playState = true
      }
    },
    // 点击下一首
    nextSong (id) {
      var that = this
      let songlist = this.$store.state.singer
      songlist.find((item, index) => {
        if (item.id == id)        {
          // 如果是最后一首了,就让他回到第一首
          if (index == songlist.length - 1)          {
            // 改变索引
            this.$store.commit('changeCurrentIndex')
            // that.$toast('没有更多了')
            // return false
          } else          {
            index++
            this.nowPlaySongid = index
            this.$store.commit('prevSong', index)
          }
        }
      })
      // this.$store.state.playlist = this.$store.state.singer[this.nowPlaySongid]
    },
    // 点击上一首
    pervSong (id) {
      let songlist = this.$store.state.singer
      songlist.find((item, index) => {
        if (item.id == id)        {
          if (index == 0)          {
            this.$store.commit('prevSong', songlist.length - 1)
          } else          {
            index--
            this.nowPlaySongid = index
            this.$store.commit('prevSong', index)
          }

        }
      })
      // this.$store.state.playlist = this.$store.state.singer[this.nowPlaySongid]
    },
    // 播放列表切换歌曲
    changeSong (index) {
      this.$store.commit('prevSong', index)
    },
    // 删除单个歌曲
    deleteSong (index) {
      console.log(index);
      window.clearInterval(this.timeInterval)
      this.$store.commit('deleteSong', index)
    },
    // 删除全部播放歌曲
    deleteAllsong () {
      window.clearInterval(this.timeInterval)

      this.$store.commit('deleteAllSong')
    },
    // 喜欢歌曲
    loveSong (id) {
      console.log(id);

    },
    // 判断时长
    addNum (value) {
      if (value < 10)      {
        return '0' + value
      } else      {
        return value
      }
    },
    // 获取audio时长
    getAudioLength (type) {
      if (type == 1)      {
        this.dtime = this.$refs.audio.duration
      }
    },
    // 每一秒更新播放时间
    audioTimeUpdate () {
      let nowTime = Date.now()
      let gapTime = 1000;
      if (!this.lastTime || nowTime - this.lastTime > gapTime)      {
        if (this.$refs.audio)        {
          let time = this.$refs.audio.currentTime
          this.lastTime = time
          this.currentTime = this.lastTime
        }
        this.lastTime = nowTime
      }
      // 给歌词添加当前样式
      // console.log(Math.floor(this.currentTime));

    },
    // 滑动后点击重新设置时间
    changeAudioTime (value) {
      if (this.$refs.audio)      {
        this.$refs.audio.currentTime = this.currentTime
      }
    },
    // 变mini播放器
    changgeFull () {
      this.showtoggle = true
      this.$refs.plate.style.display = 'block'
      this.$store.commit('changeFull')
    },
    // mini变全屏
    fuscreen () {
      this.$store.commit('changeFull')
    },

  },
  created () {
    this.playlist = this.$store.state.playlist
    this.id = this.$route.params.id
    // const audio1 = document.getElementById('audio')
    // // 开始播放
    // audio1.play();
  },
  mounted () {
    // console.log(this.$store.state.playlist);
    let bscrollDom = this.$refs.bscroll;
    this.bscrollDom = new BScroll(bscrollDom, {
      click: true,
      tap: true,
    })
  },
}
</script>

<style>
.page_play {
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  background-size: cover;
  background-position: center;
  z-index: 1;
  opacity: 1;
}
.page_play::before {
  content: " ";
  position: absolute;
  box-sizing: border-box;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
}
.page_play::after {
  content: "";
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  position: absolute;
  background-size: 120%;
  left: 0;
  right: 0px;
  filter: blur(15px);
  background: inherit;
  z-index: 2;
  opacity: 1;
  top: 0;
}
/* 头部 */
.play_headernav {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 999;
  padding: 10px 10px;
  height: 60px;
  justify-content: space-between;
}

.play_headerleft {
  width: 80%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play_headerleft p:nth-child(1) {
  display: inline-block;
  width: 60%;
  box-sizing: border-box;
  margin: 0;
  color: #fff;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play_headerleft p:nth-child(2) {
  margin: 0;
  color: #fff;
  font-size: 10px;
}
/* 碟 */
.plate {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 450px;
  z-index: 800;
  transition: all 0.2s ease-in-out;
}
.plate .plate_bar {
  z-index: 999;
  left: 50%;
  background-image: url(https://s1.ax1x.com/2020/03/29/GZ3zeH.png);
  background-repeat: no-repeat;
  position: absolute;
  width: 96px;
  top: -50px;
  box-sizing: border-box;
  height: 137px;
  transition: transform 1s linear;
}

.m-song-disc {
  width: 296px;
  margin: 0 auto;
  height: 296px;
  box-sizing: border-box;
}
.m-song-img {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.m-song_bcg {
  width: 100%;
  height: 100%;
  background-image: url(http://s3.music.126.net/mobile-new/img/disc.png?d3bdd10%E2%80%A6=);
  background-size: cover;
  box-sizing: border-box;
  animation: xz 15s infinite linear;
}

.m_songpicurl img {
  height: 184px;
  box-sizing: border-box;
  width: 184px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.sprite1 {
  background: url(https://s1.ax1x.com/2020/03/28/GAbOgI.png);
  background-size: 100%;
  width: 45px;
  box-sizing: border-box;
  height: 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: all 0.1s ease-in-out;
}
/* 旋转动画 */
@keyframes xz {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 按钮组 */
.plate_btn {
  box-sizing: border-box;
  height: 45px;
  padding: 10px;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 10px;
  justify-content: space-around;
  align-items: center;
}
.plate_bottom {
  position: relative;
  z-index: 999;
  padding: 0 10px;
}
.slide_flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.plate_bottom span {
  color: #fff;
  font-size: 8px;
}
/* 滑块 */
.plate_slider {
  width: 70%;
  height: 2px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  z-index: 999;
}

.custom-button {
  width: 10px;
  color: #fff;
  height: 10px;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 100px;
}
/* 功能按钮 */
.plate_gn {
  margin-top: 30px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 999;
  align-items: center;
}
/* 迷你播放器 */
.miniplay_bar {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
  border-top: 0.5px solid #f1f2f6;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.miniplay_bar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.miniplay_left {
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex: 1;
}
.miniplay_left img {
  animation: xz 15s infinite linear;
}
.miniplay_title {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
}
.miniplay_title p:nth-child(1) {
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.miniplay_title p:nth-child(2) {
  margin: 0;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #747d8c;
}
/* 歌词界面 */
.middle_r {
  height: 450px;
  position: relative;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  margin-bottom: 50px;
}
.lyric_wrap {
  height: 100%;
}
.lyric_wrap p {
  padding: 0 10px;
  text-align: center;
  overflow: hidden;
  height: 20px;
  font-size: 16px;
  /* font-weight: 600; */
  font-family: Arial, Helvetica, sans-serif;
  color: #b2bec3;
}
.lyric_wrap p.active {
  color: #fff;
}
.miniplay_right {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.miniplay_right .van-icon {
  width: 25px;
  height: 25px;
}
.miniplay_right .van-icon img {
  width: 100%;
  height: 100%;
}
.miniplay_hist .van-icon img {
  border-radius: 0;
}
/* vue动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.lyric_active {
  color: #fff !important;
}
.lyric_wap {
  height: 400px;
}
.bscroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* 播放历史 */
.playhispop_items {
  padding: 10px;
}
.playhispop_header {
  padding: 20px 10px;
  font-weight: bold;
}
.playhispop_header span {
  color: #747d8c;
}
.playhispop_item {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
}
.playhispop_itemleft {
  flex: 1;
}
.playhispop_itemleft span {
  color: #797979;
  font-size: 12px;
}
/*  */
.playmini_active {
  color: #dd101b;
}
</style>