<template>
  <div class="song-square">
    <van-sticky>
      <div class="square_header">
        <van-icon name="https://s1.ax1x.com/2020/03/27/GCPaMn.png"
                  size="20"
                  @click="$router.push('/')" />
        <span>歌单广场</span>
      </div>
      <!--  -->
      <div class="square_tab">
        <van-tabs v-model="active"
                  animated
                  color="#dd101b"
                  @change="getOtherData"
                  title-active-color="#dd101b">
          <van-tab :title="item.name"
                   v-for="(item, index) in category"
                   :key="index">
          </van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <!--  -->
    <div class="square_banner"
         v-if="!hasLoad">
      <router-link class="square_item"
                   :to="{name:'collection',params:{id:item.id}}"
                   tag="div"
                   v-for="(item, index) in playList"
                   :key="index">
        <div class="square_itemimg">
          <img v-lazy="item.coverImgUrl"
               alt="">
        </div>
        <div class="square_playcount">
          <van-icon name="service-o" />
          {{item.playCount | filterPlayCount}}
        </div>
        <div class="square_content">{{item.name}}</div>
      </router-link>
    </div>
    <load v-if="hasLoad"></load>
  </div>
</template>

<script>
import load from '../components/load.vue'
export default {
  components: {
    load
  },
  filters: {
    filterPlayCount (val) {
      if (val > 100000000)      {
        // console.log(val);
        return (val / 100000000).toFixed(1) + '亿'
      } else if (val > 10000)      {
        return parseInt(val / 10000) + '万'
      } else      {
        return val
      }
    }
  },
  data () {
    return {
      playList: [],
      active: 0,
      category: [],
      hasLoad: true,
      limit: 200,
      skip: 0,
      // params: {
      //   limit: 30,
      //   order: 'hot',
      // }
    }
  },
  watch: {
    // category: {
    //   handler (val) {
    //     // console.log(val);
    //   },
    //   deep: true
    // }
  },
  methods: {
    async getOtherData (name, title) {
      if (title == '推荐')      {
        this.getPlaylist()
      } else      {
        this.hasLoad = true
        const res = await this.$http.get(`top/playlist?limit=${this.limit}&order=hot&skip=${30}&cat=${title}`)
        this.playList = res.data.playlists
        // console.log(this.playList);
        this.hasLoad = false
      }
    },
    // 请求歌单数据
    async getPlaylist () {
      this.hasLoad = true
      const res = await this.$http.get(`top/playlist`)
      this.hasLoad = false
      this.playList = res.data.playlists
      // console.log(this.playList);

    },
    // 获取歌单分类
    async getCategory () {
      const res = await this.$http.get('playlist/hot')
      this.category = res.data.tags
      // 新增推荐属性
      const firstArr = {
        name: '推荐'
      }
      this.category.unshift(firstArr)
    },
  },
  // 滑动到底部分页
  mounted () {
    // var that = this
    // window.addEventListener('scroll', () => {
    //   var scr = document.documentElement.scrollTop || document.body.scrollTop
    //   var clientHeight = document.documentElement.clientHeight // 屏幕高度也就是当前设备静态下你所看到的视觉高度
    //   var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 获取整个网页的高度
    //   if (scr + clientHeight + 10 >= scrHeight)      {
    //     that.skip += that.limit
    //     console.log('我滑到底部了');
    //     if (true)        {
    //       console.log(111);
    //       // that.getPlaylist()
    //     } else        {

    //     }

    //   }
    // })

  },
  created () {
    this.getPlaylist()
    this.getCategory()
  },
}
</script>

<style>
.square_header {
  background-color: #fff;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.square_header span {
  margin-left: 20px;
}
.square_banner {
  display: flex;
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
.square_item {
  position: relative;
  width: calc(calc(100% / 3) - 10px);
  margin: 10px 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  /* border: 1px solid #000; */
}
.square_itemimg {
  width: 100%;
  position: relative;
}
.square_itemimg::before {
  content: "";
  position: absolute;
  width: 100%;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.5;
  border-radius: 5px;
  height: 95.8%;
}
.square_item img {
  width: 100%;
  height: 115px;
  object-fit: cover;
  border-radius: 5px;
  height: 100%;
  background-position: center;
}
.square_content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 13px;
  margin-top: 5px;
}
.square_playcount {
  position: absolute;
  color: #fff;
  display: flex;
  align-items: center;
  right: 5px;
  top: 5px;
  font-size: 12px;
}
</style>