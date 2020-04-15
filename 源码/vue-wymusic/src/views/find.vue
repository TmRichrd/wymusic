<template>
  <div>
    <div class="find"
         v-if="showload">
      <div class="banner">
        <van-swipe :autoplay="3000"
                   :loop="true">
          <van-swipe-item v-for="(image, index) in model.banners"
                          :key="index">
            <van-tag class="tag_title"
                     :color="image.titleColor">{{image.typeTitle}}</van-tag>
            <a :href="image.url"
               @click="getBannerSong(index)"><img v-lazy="image.pic" /></a>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 宫格导航 -->
      <div class="grid">
        <van-grid :column-num="5"
                  :border="false">
          <van-grid-item @click="$router.push('/recoday')"
                         icon="https://s1.ax1x.com/2020/03/26/GpRMqO.png"
                         text="每日推荐" />
          <van-grid-item @click="$router.push('/square')"
                         icon="https://s1.ax1x.com/2020/03/26/GpRuM6.png"
                         text="歌单" />
          <van-grid-item @click="$router.push('/ranklist')"
                         icon="https://s1.ax1x.com/2020/03/26/GpRWLT.png"
                         text="排行榜" />
          <van-grid-item icon="https://s1.ax1x.com/2020/03/26/GpRUQP.png"
                         text="电台" />
          <van-grid-item icon="https://s1.ax1x.com/2020/03/26/GpRczq.png"
                         text="直播" />
        </van-grid>
      </div>
      <!-- 宫格结束 -->
      <!-- 推荐 -->
      <mycard name="推荐歌单"
              title="为你精挑细选"
              more="查看更多"
              router="/square">
        <div class="reco_swiper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in recoSong"
                          :key="index">
              <!-- 卡片 -->
              <router-link tag="div"
                           class="reco_card"
                           :to="{name:'collection',params:{id:item.id}}">
                <div class="droper">
                  <img v-lazy="item.picUrl"
                       alt="">
                  <!-- 遮罩层 -->
                </div>
                <!-- 播放数量 -->
                <div class="palynum">
                  <van-icon name="service-o" />
                  {{(item.playCount/10000>1)?parseInt(item.playCount/10000)+'万':item.playCount}}</div>
                <div class="reco_songtitle">{{item.name}}</div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </mycard>
      <!-- 风格推荐 -->
      <mycard name="风格推荐"
              title="歌声里藏着故事"
              more="播放全部"
              icon="https://s1.ax1x.com/2020/03/26/GphbSs.png">
        <div class="newsong">
          <swiper>
            <swiper-slide>
              <!-- 新歌列表 -->
              <div class="newsonglist">
                <div class="newsongitem"
                     v-for="(item, index) in newSong.slice(0,3)"
                     :key="index"
                     @click="handleSong(item,index,item.id)">
                  <div class="item_img">
                    <img v-lazy="item.picUrl"
                         alt="">
                  </div>
                  <div class="item_title">
                    <div class="item_title_left">
                      <div>{{item.name}}-{{item.song.artists[0].name}}</div>
                      <div style="margin-top:5px">{{item.song.alias==''?'':item.song.alias.join('/')}}</div>
                    </div>
                    <!-- icons -->
                    <div class="newsong_icon">
                      <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png" />
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <!-- 新歌列表 -->
              <div class="newsonglist">
                <div @click="handleSong(item,index,item.id)"
                     class="newsongitem"
                     v-for="(item, index) in newSong.slice(3,6)"
                     :key="index">
                  <div class="item_img">
                    <img v-lazy="item.picUrl"
                         alt="">
                  </div>
                  <div class="item_title">
                    <div class="item_title_left">
                      <div>{{item.name}}-{{item.song.artists[0].name}}</div>
                      <div style="margin-top:5px">{{item.song.alias==''?'':item.song.alias.join('/')}}</div>
                    </div>
                    <!-- icons -->
                    <div class="newsong_icon">
                      <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png" />
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <!-- 新歌列表 -->
              <div class="newsonglist">
                <div @click="handleSong(item,index,item.id)"
                     class="newsongitem"
                     v-for="(item, index) in newSong.slice(6,9)"
                     :key="index">
                  <div class="item_img">
                    <img v-lazy="item.picUrl"
                         alt="">
                  </div>
                  <div class="item_title">
                    <div class="item_title_left">
                      <div>{{item.name}}-{{item.song.artists[0].name}}</div>
                      <div style="margin-top:5px">{{item.song.alias==''?'':item.song.alias.join('/')}}</div>
                    </div>
                    <!-- icons -->
                    <div class="newsong_icon">
                      <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png" />
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </mycard>
      <!-- </div> -->
      <!-- 电台推荐 -->
      <mycard name="电台推荐"
              title="能循环一天的好音乐"
              more="查看更多">
        <div class="reco_swiper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in radio"
                          :key="index">
              <!-- 卡片 -->
              <div class="reco_card">
                <div class="droper">
                  <img v-lazy="item.picUrl"
                       alt="">
                  <!-- 遮罩层 -->
                </div>
                <div class="play_icon_radio">
                  <van-icon name="https://s1.ax1x.com/2020/03/26/G9PZY4.png"
                            color="#dd001b" />
                </div>
                <!-- 播放数量 -->
                <div class="reco_songtitle">{{item.name}}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </mycard>
    </div>
    <load v-else></load>
  </div>
</template>

<script>
import load from '../components/load'
import { mapActions } from 'vuex'
export default {
  components: {
    load
  },
  watch: {
    // 监听点击的banner索引，判断当前的bannerId，然后利用当前id去请求数据

  },
  data () {
    return {
      showload: false,
      model: [],
      bannerId: [],// 轮播请求歌曲id
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      preamsId: '',
      // 推荐歌单
      recoSong: [],
      // 新歌
      newSong: [],
      // 电台
      radio: [],
      songurl: ''
    }
  },
  beforeCreate () {

  },
  methods: {
    ...mapActions([
      'selectPlay'
    ]),
    async  fetchBanner () {
      this.showload = true
      const res = await this.$http.get('banner?type=2')
      this.model = res.data
      // console.log(this.model);
      // 判断如果banner中有song，那么就直接去播放，
      // 如果没有song就使用targetId去获取歌单
      this.model.banners.forEach((item, index) => {
        if (item.song == null)        {
          this.bannerId.push(item.targetId)
        } else        {
          this.bannerId.push(item.song.id)
        }
      })
      // console.log(this.bannerId);
    },
    // 获取推荐歌单
    async fetchRecoSong () {
      const res = await this.$http.get('personalized?limit=6')
      this.recoSong = res.data.result
    },
    // 获取新歌
    async fetchNewSong () {
      const res = await this.$http.get('personalized/newsong')
      this.newSong = res.data.result
      // console.log(this.newSong);

      // console.log(this.newSong);

    },
    async fetchRadio () {
      const res = await this.$http.get('personalized/djprogram')
      this.radio = res.data.result
      // console.log(this.radio);

    },
    // 点击轮播获取歌曲
    getBannerSong (index) {
      // 点击第几个之后用bannerId中的第几个去跳转到播放页面或者获取歌单
      // 如果为0就不发起请求
      // console.log(this.bannerId[index]);
      // if (this.bannerId[index]!==0) {

      // }
      // console.log(this.model.banners[index]);
      let bannerArr = this.model.banners[index]
      console.log(bannerArr);

      if (bannerArr.song == null)      {
        var bannerId = bannerArr.targetId
        if (bannerId !== 0)        {
          this.$router.push({ name: 'collection', params: { id: bannerId } })
        }
      } else      {
        this.$router.push({ name: 'play', params: { id: bannerArr.song.id } })
        // console.log(bannerArr.song.id);

      }
    },
    handleSong (item, index, songid, singer, songname) {
      console.log(item);
      this.$store.commit('changeFull')
      this.$store.commit("addSong", { item: item.song.album, index: index, songid: songid, singer: item.song.artists.map(v => v.name).join('/'), songname: item.name })
      this.$store.commit('pushSong', item.song.album)
      this.fetchSongurl(item.id)
    },
    async  fetchSongurl (id) {
      const res = await this.$http.get(`song/url?id=${id}`)
      this.songurl = res.data.data[0].url
      this.$store.commit('addurl', this.songurl)
    }
  },
  created () {
    this.fetchNewSong()
    this.fetchRecoSong()
    this.fetchBanner()
    this.fetchRadio()
  },
}
</script>

<style>
.van-swipe {
  border-radius: 10px;
}
.van-swipe__track {
  border-radius: 10px;
}
.van-swipe-item {
  border-radius: 10px;
}
.van-swipe img {
  width: 100%;
  height: 146px;
  border-radius: 10px;
}

.banner {
  border-radius: 10px;
  margin: 10px auto;
  width: 90%;
}
.tag_title {
  position: absolute;
  bottom: 4px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 10px;
  right: 0;
}
.reco {
  padding: 0 10px;
}
.recosong {
  font-size: 12px;
  color: #797979;
}
.reco {
  margin-top: 10px;
}
.recoTitle {
  display: flex;
  justify-content: space-between;
}
.recoTitle .jx {
  font-weight: bold;
  font-size: 18px;
  font-family: Arial, sans-serif, STHeiTi;
}
.reco_card {
  margin-top: 8px;
  width: 100%;
  height: 150px;
  position: relative;
  background-color: #fff;
}
.reco_card .droper img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.reco_card .droper {
  background-color: #fff;
  position: relative;
}
.droper::before {
  content: "";
  position: absolute;
  height: 95.8%;
  width: 100%;
  background-color: rgba(42, 42, 42, 0.69);
  border-radius: 10px;
  opacity: 0.5;
}
.reco_card .palynum {
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #fff;
  position: absolute;
  z-index: 99;
  right: 5px;
  top: 5px;
}
.reco_songtitle {
  font-size: 10px;
}
.reco_songtitle {
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
/* 新歌 */
.newsongitem {
  display: flex;
  width: 95%;
}
.item_img {
  width: 50px;
  height: 100%;
}
.item_img img {
  border-radius: 5px;
  width: 100%;
  background-size: cover;
}
.item_title {
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 10px 0;
  margin-left: 10px;
  flex: 1;
}
.item_title_left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  flex: 1;
}
/* radio */
.play_icon_radio {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0.8;
  border-radius: 50%;
  bottom: 62px;
  right: 5px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  z-index: 99;
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