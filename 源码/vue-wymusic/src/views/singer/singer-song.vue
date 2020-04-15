<template>
  <div>
    <div class="singersong-page">
      <!-- 头部标题 -->
      <div class="singersong_header">
        <div class="singersong_header_left">
          <van-icon name="https://s1.ax1x.com/2020/04/12/GOZ3WT.png"
                    size="25"></van-icon>
          <span>收藏热门50</span>
        </div>
        <div class="singersong_header_right">
          <van-icon name="https://s1.ax1x.com/2020/03/26/GpRczq.png"
                    size="25"></van-icon>
          <span>管理</span>
        </div>
      </div>
      <!-- 歌曲数据列表 -->

      <div class="singersong_items"
           v-if="allsingerHot">
        <div class="singersong_item"
             @click="handleSong(item,index,item.id)"
             v-for="(item, index) in allsingerHot"
             :key="index">
          <div class="singersong_itemindex">
            <em>{{index+1}}</em>
          </div>
          <div class="singersong_itemcontent">
            <div class="singersong_content_left">
              <div class="singersong_content_title">
                <span>{{item.name}}</span><span v-if="item.alia.length>0">({{item.alia|filterArr}})</span>
              </div>
              <div class="singersong_author">
                <span :class="item.fee==8?'sprite_sq':''"></span>
                <p>{{item.ar.map(v=>v.name).join('/')}}</p>
              </div>
            </div>
            <div class="singersong_content_r">
              <van-icon name="https://s1.ax1x.com/2020/04/12/GOQvqS.png"
                        size="25"></van-icon>
              <van-icon name="https://s1.ax1x.com/2020/04/12/GOlaid.png"
                        size="25"></van-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allsingerHot'],
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
  methods: {
    handleSong (item, index, songid, singer, songname) {
      // console.log(item);
      this.$store.commit('changeFull')
      this.$store.commit("addSong", { item: item.al, index: index, songid: songid, singer: item.ar.map(v => v.name).join('/'), songname: item.name })
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
.singersong_header {
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
}
.singersong_header_left {
  display: flex;
  align-items: center;
}
.singersong_header_left span {
  margin-left: 10px;
  font-weight: bold;
}
.singersong_header_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.singersong_header_right span {
  margin-left: 10px;
}
.singersong_items {
  padding: 10px;
  margin-bottom: 50px;
}
.singersong_item {
  display: flex;
  height: 60px;
  align-items: center;
}
.singersong_itemindex {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #797979;
}
.singersong_itemcontent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.singersong_content_title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  font-size: 14px;
  font-weight: 500;
}
.singersong_author {
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 12px;
  color: #797979;
}
.singersong_author span {
  margin-right: 5px;
}
.sprite_sq {
  background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=")
    no-repeat 0 0;
  background-size: 166px 97px;
  width: 12px;
  display: inline-block;
  height: 8px;
}
.singersong_content_left {
  float: 1;
  width: 80%;
}
.singersong_content_r {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
</style>