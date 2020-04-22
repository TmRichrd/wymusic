<template>
  <div class="page-comp">
    <!-- 单曲 -->
    <div class="comp_song"
         v-if="searchResult.song!==undefined">
      <div class="comp_title">
        <span>单曲</span>
        <van-button round
                    size="small">
          <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png" />
          播放全部</van-button>
      </div>
      <div class="comp_item"
           @click="handleSong(item,index,item.id)"
           v-for="(item, index) in searchResult.song.songs"
           :key="index">
        <div class="comp_itemleft">
          <div class="comp_itemtitle">
            {{item.name}}
            <van-tag type="warning"
                     v-if="item.officialTags.length!==0">
              {{item.officialTags.join('/')}}</van-tag>
          </div>
          <div class="cmp_itemcontent"><span :class="item.copyright==0 ||item.fee==8?'sprite':''"></span>{{item.ar.map(v=>v.name).join('/')}} &nbsp;- &nbsp;{{item.al.name}}</div>
        </div>
        <div class="comp_itemright"></div>
      </div>
      <router-link tag="div"
                   to="/singles"
                   class="comp_songmore"
                   v-if="searchResult.song.moreText.length">
        {{searchResult.song.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <!-- 歌单 -->
    <div class="playList"
         v-if="searchResult.playList!==undefined">
      <span>歌单</span>
      <router-link tag="div"
                   class="playlist_item"
                   v-for="(item, index) in searchResult.playList.playLists"
                   :key="index"
                   :to="{name:'collection',params:{id:item.id}}">

        <div class="playlistitem_left">
          <img :src="item.coverImgUrl"
               alt="">
        </div>
        <div class="playlistitem_right">
          <div class="playlist_title">{{item.name}}</div>
          <div class="playlist_content">
            {{item.trackCount}}首
            <span>by {{item.creator.nickname}},
              播放{{(item.playCount/10000)>=1?(item.playCount/10000).toFixed(1)+'万次':item.playCount}}</span></div>
        </div>

      </router-link>
      <router-link tag="div"
                   to="/video"
                   class="comp_songmore">
        {{searchResult.playList.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <!-- 视频 -->
    <div class="video"
         v-if="searchResult.video!==undefined">
      <span>视频</span>
      <div class="video_item"
           v-for="(item, index) in searchResult.video.videos"
           :key="index">
        <div class="video_left">
          <img :src="item.coverUrl"
               alt="">
        </div>
        <div class="video_right">
          <div class="video_title">{{item.title}}</div>
          <div class="video_content">
            {{(parseInt(item.durationms/(1000*60)))+':' +(item.durationms%(1000*60)/1000).toFixed(0)}} by&nbsp;{{item.creator[0].userName}}</div>
        </div>
      </div>
      <router-link tag="div"
                   to="/video"
                   class="comp_songmore">
        {{searchResult.video.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <!-- mlog -->
    <div class="mlog"
         v-if="searchResult.mlog!==undefined">
      <span>Mlog</span>
      <div class="mlog_container">
        <div class="mlog_item"
             v-for="(item, index) in searchResult.mlog.mlogs"
             :key="index">
          <div class="mlog_img">
            <img :src="item.resource.mlogBaseData.coverUrl"
                 alt="">
            <div class="matchFieldContent"
                 v-if="item.matchFieldContent">{{item.matchFieldContent}}</div>
            <div class="matchFieldContent"
                 v-if="item.resource.mlogBaseData.talk!==null && item.matchFieldContent==null"># {{item.resource.mlogBaseData.talk.talkName}}</div>
          </div>
          <div class="mlog_content">
            <div class="mlog_text">
              {{item.resource.mlogBaseData.text}}
            </div>
            <div class="mlog_user">
              <div class="mlog_user_left">
                <img :src="item.resource.userProfile.avatarUrl"
                     alt=""><span>{{item.resource.userProfile.nickname}}</span>
              </div>
              <div class="mlog_like">{{item.resource.mlogExtVO.likedCount}}赞</div>
            </div>
          </div>
        </div>
      </div>
      <router-link tag="div"
                   to="/video"
                   class="comp_songmore">
        {{searchResult.mlog.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <!-- 主题 -->
    <div v-if="searchResult.talk!==undefined">
      <div class="talk">
        <span>主题</span>
        <div class="talk_container">
          <div class="talk_item"
               v-for="(item, index) in searchResult.talk.talks"
               :key="index">
            <div class="talk_left">
              <img :src="item.shareCover.url"
                   alt="">
            </div>
            <div class="talk_right">
              <div class="talk_title"># {{item.talkName}}</div>
              <div class="talk_info">
                <span>{{item.follows}}关注&nbsp;|&nbsp;{{item.participations}}参与</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link tag="div"
                   to="/video"
                   class="comp_songmore"
                   v-if="searchResult.talk.length!==0">
        {{searchResult.talk.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <!-- 歌手 -->
    <div class="artist"
         v-if="searchResult.artist!==undefined">
      <span>歌手</span>
      <div class="artist_container">
        <div class="artist_item"
             v-for="(item, index) in searchResult.artist.artists"
             :key="index">
          <div class="artist_left">
            <img :src="item.picUrl"
                 alt="">
          </div>
          <div class="artist_right">
            {{item.name}}
          </div>
        </div>
      </div>
      <router-link tag="div"
                   to="/singer"
                   class="comp_songmore">
        {{searchResult.artist.moreText}}
        <van-icon name="arrow" />
      </router-link>
    </div>
    <div class="errmes"
         v-if="errmes">
      {{errmes}}
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
  props: [
    'searchResult',
    'errmes'
  ],
  created () {
  },
  data () {
    return {
      songurl: ''
    }
  },
  methods: {
    handleSong (item, index, songid, singer, songname) {
      console.log(item);
      if (item.fee == 1)      {
        return this.$toast('vip歌曲暂时无法播放')
      } else      {
        this.fetchSongurl(item.id)
        this.$store.commit("addSong", { item: item.al, index: index, songid: songid, singer: item.ar.map(v => v.name).join('/'), songname: item.name })
        this.$store.commit('pushSong', item.al)
        this.$store.commit('changeFull')
      }

    },
    async  fetchSongurl (id) {
      const res = await this.$http.get(`song/url?id=${id}`)
      this.songurl = res.data.data[0].url
      this.$store.commit('addurl', this.songurl)
    }
  },
}
</script>

<style>
.comp_song {
  margin: 30px 0;
  padding: 0 15px;
}
.comp_title {
  display: flex;
  justify-content: space-between;
}
.comp_item {
  margin: 20px 0;
}
.comp_itemtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 24px;
  line-height: 24px;
}
.cmp_itemcontent {
  font-size: 12px;
  color: #797979;
}
.cmp_itemcontent span {
  display: inline-block;
  margin-right: 2px;
}
.comp_itemtitle {
  color: #507daf;
}
.comp_songmore {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #797979;
  margin-top: 10px;
  /* background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); */
  width: 100%;
}
/*  */
.playList {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.playlist_item {
  box-sizing: border-box;
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.playlist_item img {
  width: 100px;
  border-radius: 5px;
}
.playlistitem_right {
  line-height: 24px;
  height: 42px;
  max-width: 250px;
  box-sizing: border-box;
  margin-left: 10px;
}
.playlist_title {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playlist_content {
  margin-top: 2px;
  font-size: 12px;
  color: #797979;
}
/*  */
.video {
  margin-top: 40px;
  padding: 0 10px;
}
.video_item {
  display: flex;
  height: 80px;
  padding: 10px 0 0 10px;
  align-items: center;
}
.video_right {
  margin-left: 10px;
  line-height: 24px;
}

.video_left img {
  border: 1px solid #ecf0f1;
  border-radius: 5px;
  width: 100px;
  object-fit: cover;
}
.video_content {
  font-size: 10px;
  color: #797979;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mlog {
  padding: 0 10px;
}
.mlog_container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 160px);
  column-gap: 20px;
}
.mlog_item {
  border: 1px solid #ecf0f1;
  box-shadow: 1px 1px 1px #ecf0f1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.mlog_img {
  position: relative;
}
.matchFieldContent {
  width: auto;
  border-radius: 10px;
  left: 10px;
  padding: 2px 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  position: absolute;
  top: 135px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  white-space: nowrap;
}
.mlog_item img {
  width: 160px;
  height: 160px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
}
.mlog_content {
  padding: 0 10px;
}
.mlog_text {
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 10px;
  text-overflow: ellipsis;
}
.mlog_user {
  padding: 5px 0;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;
}
.mlog_user_left {
  display: flex;
  align-items: center;
}
.mlog_user_left img {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.mlog_user_left span {
  margin-left: 8px;
  font-size: 8px;
  color: #797979;
}
.mlog_like {
  color: #797979;
  font-size: 8px;
}
/*  */
.talk {
  padding: 0 10px;
  margin-top: 30px;
}
.talk_item {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.talk_left img {
  border-radius: 5px;
  width: 100px;
  object-fit: cover;
}
.talk_right {
  margin-left: 10px;
}
.talk_info span {
  color: #797979;
  font-size: 12px;
}
/*  */
.artist {
  padding: 0 10px;
  margin-top: 30px;
}
.artist_container {
  margin-top: 20px;
}
.artist_item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.artist_left {
  background-color: #fff;
}
.artist_left img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.artist_right {
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sprite {
  background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=")
    no-repeat 0 0;
  background-size: 166px 97px;
  width: 12px;
  height: 8px;
}
</style>