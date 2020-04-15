<template>
  <div class="singerinfo_album">
    <div class="singeralbum_header">
      <span>{{paixu}}</span>
      <div class="singeralbum_setting">
        <van-icon name="https://s1.ax1x.com/2020/04/13/GXlSk4.png"
                  size="20"></van-icon>
        <span>排序</span>
      </div>
    </div>
    <!-- 专辑列表 -->
    <div class="singeralbum_items">
      <div class="singeralbum_item"
           v-for="(item, index) in album"
           :key="index">
        <div class="singeralbum_itemleft">
          <img :src="item.picUrl"
               alt=""><span class="sprite_album album_die"></span>
        </div>
        <div class="singeralbum_itemright">
          <p><span>{{item.name}}</span><span v-if="item.alias.length>0">（{{item.alias|fiterArr}}）</span></p>
          <p><span>{{item.publishTime|fiteDate}}</span>歌曲{{item.size}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['album'],
  data () {
    return {
      paixu: '按发行时间排序'
    }
  },
  filters: {
    fiterArr (val) {
      return (val.toString()).replace(/\[|]/g, '')
    },
    fiteDate (val) {
      return moment(val).format('YYYY.M.D')
    }
  },
  created () {
    console.log();
  },
}
</script>

<style>
.singeralbum_header {
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.singeralbum_header span {
  font-size: 15px;
}
.singeralbum_setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.singeralbum_setting span {
  margin-left: 3px;
}
.singeralbum_items {
  margin-bottom: 50px;
}
.singeralbum_item {
  padding: 10px;
  display: flex;
}
.singeralbum_itemleft {
  height: 92px;
  width: 110px;
}
.singeralbum_itemleft img {
  border-radius: 5px;
  height: 100%;
  width: 80%;
  object-fit: cover;
}
.sprite_album {
  background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=")
    no-repeat 0 -60px;
  width: 19px;
  height: 92px;
}
.album_die {
  display: inline-block;
  width: 20%;
}
.singeralbum_itemright {
  text-overflow: ellipsis;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}
.singeralbum_itemright p:nth-child(1) {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.singeralbum_itemright p:nth-child(2) {
  color: #797979;
  font-size: 12px;
}
.singeralbum_itemright p:nth-child(2) span {
  color: #797979;
  font-size: 12px;
  margin-right: 5px;
}
.singeralbum_itemright span:nth-child(2) {
  font-size: 14px;
  color: #797979;
}
.singeralbum_itemright span:nth-child(1) {
  font-size: 14px;
}
</style>