<template>
  <div>
    <!-- 近期热门 -->
    <div class="nearfuture">
      <div class="nearfuture_header">
        <div class="naer_hot">
          <van-icon name="https://s1.ax1x.com/2020/03/26/GphbSs.png"
                    size="25"></van-icon>
          <span>近期热门</span>
        </div>
        <div class="naer_moresong">
          <button @click="changeSong()">更多热歌</button>
        </div>
      </div>
      <div class="nearfuture_items"
           v-if="singerHot">
        <div class="nearfuture_item"
             @click="handleSong(item,index,item.id)"
             v-for="(item, index) in singerHot"
             :key="index">
          <div class="naer_img">
            <img :src="item.al.picUrl"
                 alt="">
          </div>
          <!-- content -->
          <div class="naer_content">
            <div class="near_title">
              <div class="neartitle_top">
                <span>{{item.name}}</span><span v-if="item.alia.length>0">({{item.alia|filterArr}})</span>
              </div>
              <div class="near_sq"><span :class="item.fee==8?'sprite5':''"></span>
                <p>{{item.ar.map(v=>v.name).join('/')}}</p>
              </div>
            </div>
            <van-icon name="https://s1.ax1x.com/2020/04/10/GoO2FO.png"></van-icon>
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="singer_desc">
        <div class="singerinfo_desc_title">
          <span>歌手简介</span>
          <button>更多信息</button>
        </div>
        <!-- 详细信息 -->
        <div class="singerinfo_desc_desc">
          {{artist.briefDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['artist', 'singerHot'],
  data () {
    return {
      songurl: ''
    }
  },
  filters: {
    filterArr (val) {
      return (val.toString()).replace(/\[|]/g, '')
    }
  },
  computed: {

  },
  methods: {
    // 点击更多热歌切换到歌曲界面
    changeSong () {
      this.$emit('changeSong')
    },
    handleSong (item, index, songid,singer,songname) {
      this.$store.commit('changeFull')
      this.$store.commit("addSong", { item: item.al, index: index, songid: songid,singer: item.ar.map(v => v.name).join('/'),songname:item.name })
      this.$store.commit('pushSong', item.al)
      this.fetchSongurl(item.id)
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
.nearfuture_header {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nearfuture_header span {
  margin-left: 10px;
  font-weight: bold;
}
.nearfuture_items {
  padding: 10px;
}
.nearfuture_item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.naer_img img {
  border-radius: 5px;
  width: 50px;
}
.naer_hot {
  display: flex;
  align-items: center;
}
.naer_moresong button {
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 12px;
  padding: 3px 10px;
  background-color: #fff;
  letter-spacing: 0.15rem;
}
.naer_content {
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  align-items: center;
  text-overflow: ellipsis;
  justify-content: space-between;
  white-space: nowrap;
  flex: 1;
}
.near_title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
}
.near_title span:nth-child(1) {
  font-size: 14px;
  margin-right: 5px;
}
.near_title span:nth-child(2) {
  font-size: 14px;
  color: #797979;
}
.near_title p {
  font-size: 12px;
  color: #797979;
  margin: 0;
}
.neartitle_top {
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.near_sq {
  display: flex;
  align-items: center;
}
.sprite5 {
  background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=")
    no-repeat 0 0;
  background-size: 166px 97px;
  width: 12px;
  display: inline-block;
  height: 8px;
}
.singer_desc {
  padding: 10px;
}
.singer_desc span {
  font-weight: bold;
}
.singerinfo_desc_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.singerinfo_desc_title button {
  border: 1px solid #eee;
  border-radius: 20px;
  background-color: #fff;
  padding: 3px 10px;
  font-size: 10px;
  letter-spacing: 0.15rem;
}
.singerinfo_desc_desc {
  margin-top: 20px;
  color: #797979;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 50px;
}
</style>