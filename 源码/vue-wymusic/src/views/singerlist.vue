<template>
  <div>
    <div class="singerlist_pages">
      <!-- 头部导航 -->
      <van-sticky>
        <div class="singerlist_header">
          <van-icon @click="$router.push('/search')"
                    name="https://s1.ax1x.com/2020/03/27/GCPaMn.png" />
          <span>歌手分类</span>
        </div>
        <!-- 歌手类型 -->
        <div class="singer_type">
          <ul class="singer_address">
            <li v-for="(item, index) in params.type"
                @click="addClass(index)"
                :key="index"
                :class="{singer_type_active:index==allcurrent.current}">{{item.address}}</li>
          </ul>
          <ul class="singer_gender">
            <li v-for="(item, index) in params.gender"
                @click="addGender(index)"
                :class="{singer_gender_active:index==allcurrent.typeCurrent}"
                :key="index">{{item.gen}}</li>
          </ul>
        </div>
      </van-sticky>
      <!-- 热门歌手列表 -->
      <div class="hot_singer"
           v-if="!hosLoad">
        <p>热门歌手</p>
        <div class="hot_singer_item"
             v-for="(item, index) in hotsinger"
             :key="index"
             @click="toSingerInfo(item)">
          <div class="hot_itemimg">
            <img v-lazy="item.picUrl"
                 alt="">
          </div>
          <div class="hot_singer_content">
            <div class="hot_singer_name">
              {{item.name}}
              <van-icon name="https://s1.ax1x.com/2020/04/11/GbXi9K.png"
                        v-if="item.alias==''"
                        class="sprite"
                        style="margin-left:10px"
                        size="10" />
            </div>
            <div>
              <button class="nfollowed"
                      v-show="!item.followed"
                      @click.stop="Followeds(item.id)">+ 关注</button>
              <button class="followed"
                      v-show="item.followed"
                      @click.stop="cancelFollowed(item.id)">已关注</button>
            </div>
          </div>
        </div>
        <!-- 加载更多 -->
        <div class="loadMore">
          <span>{{loadMes}}</span>
        </div>
      </div>
    </div>
    <load v-if="hosLoad"></load>
  </div>
</template>

<script>
import load from '../components/load.vue'
export default {
  watch: {
    allcurrent: {
      handler (val) {
        this.hotsinger = []
        this.limit = 30
        this.offset = 0
        this.fetchTypeData(val)
      },
      deep: true
    }
  },
  components: {
    load
  },
  data () {
    return {
      // 加载信息
      loadMord: true,
      loadMes: '加载中',
      hosLoad: true,
      params:
      {
        type: [
          {
            address: '华语',
            area: 7
          },
          {
            address: '欧美',
            area: 96
          },
          {
            address: '日本',
            area: 8
          },
          {
            address: '韩国',
            area: 16

          },
          {
            address: '其他',
            area: 0

          },
        ],
        gender: [
          {
            gen: '男',
            num: 1
          },
          {
            gen: '女',
            num: 2
          },
          {
            gen: '乐队/组合',
            num: 3
          }
        ]
      },
      hotsinger: [],
      // 请求全部的参数
      hotAll: -1,
      allcurrent: {
        // 地区分类索引
        current: -1,
        // 类型分类索引
        typeCurrent: -1,
      },
      // 是否还有数据
      hasMore: true,
      limit: 30,
      offset: 0
      // 分页参数
      // par: {
      //   // 跳过多少条
      //   offset: 30,
      //   //再次请求多少条
      //   limit: 30
      // }
    }
  },
  methods: {
    // 默认热门歌手
    async fetchHotsinger () {
      const res = await this.$http.get('/artist/list')
      this.hotsinger = res.data.artists
      this.hosLoad = false
    },
    // 点击分类添加样式
    addClass: function (index) {
      // 判断 如果用户没有选择类型就选择地区，默认类型为男
      if (this.allcurrent.typeCurrent == -1)      {
        this.allcurrent.typeCurrent = 0
      }
      this.allcurrent.current = index;
    },
    addGender (index) {
      // 判断 如果用户没有选择地区就选择类型，默认地区为华语
      if (this.allcurrent.current == -1)      {
        this.allcurrent.current = 0
      }
      this.allcurrent.typeCurrent = index;
    },
    // 筛选重新发起请求
    async fetchTypeData (arr) {
      var that = this
      const res = await this.$http.
        get(`/artist/list?type=${this.params.gender[arr.typeCurrent].num}&area=${this.params.type[arr.current].area}&limit=${this.limit}&offset=${this.offset}`)
      this.hotsinger = [...this.hotsinger, ...res.data.artists]
      this.hosLoad = false
    },
    // 跳转到歌手页面
    toSingerInfo (item) {
      this.$router.push({ path: '/singerinfo', query: { id: item.id } })
    },
    // 点击取消关注
    async cancelFollowed (id) {
      const res = await this.$http.get(`/artist/sub?id=${id}&t=0`)
    },
    // 点击关注
    async Followeds (id) {
      const res = await this.$http.get(`/artist/sub?id=${id}&t=1`)
    },
  },
  created () {
    this.fetchHotsinger()
  },
  mounted () {
    // 监听滚动到底部事件
    var that = this
    window.addEventListener('scroll', () => {
      var scr = document.documentElement.scrollTop || document.body.scrollTop // 向上滚动的那一部分高度
      var clientHeight = document.documentElement.clientHeight // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 获取整个网页的高度
      // 滚动到了底部
      if (scr + clientHeight + 10 >= scrHeight)      {
        // 如果还有更多数据执行请求
        if (that.hasMore)        {
          that.offset += that.limit
          this.loadMes = '加载中'
          this.fetchTypeData(that.allcurrent)
        }
      } else      {
        this.loadMes = '没有更多了'
        return
      }
    })
  },
}
</script>

<style>
.singerlist_header {
  height: 60px;
  padding: 10px;
  display: flex;
  background-color: #fff;
  align-items: center;
}
.singerlist_header span {
  margin-left: 20px;
}
.singer_type {
  background-color: #fff;
  padding: 10px 0;
}
.singer_type .singer_address {
  display: flex;
}
.singer_address li {
  width: 40px;
  text-align: center;
  margin: 0 10px;
  font-size: 14px;
  color: #797979;
}
.singer_gender {
  margin-top: 10px;
  margin-left: 8px;
  display: flex;
}
.singer_gender li {
  text-align: center;
  margin: 0 15px;
  font-size: 14px;
  color: #797979;
}
.hot_singer p {
  margin: 10px 0;
  background-color: #eee;
  padding: 5px 10px 5px 10px;
  color: #797979;
  font-size: 14px;
}
/* list */
.hot_singer_item {
  padding: 10px;
  display: flex;
  align-items: center;
}
.hot_itemimg img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
.hot_singer_content {
  padding: 0 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hot_singer_content .nfollowed {
  border: 1px solid #dd101b;
  outline: none;
  color: #dd101b;
  background-color: #fff;
  border-radius: 20px;
  font-size: 14px;
  padding: 3px 10px;
}
.hot_singer_name {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.sprite {
  background: url(https://s1.ax1x.com/2020/04/11/GbXi9K.png) no-repeat 0 67.89%;
  background-size: 43px 554px;
  width: 8px;
  height: 9px;
}
.singer_type_active {
  color: #dd101b !important;
}
.singer_gender_active {
  color: #dd101b !important;
}
.loadMore {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loadMore span {
  font-size: 14px;
  color: #797979;
}
.followed {
  border: 1px solid #797979;
  outline: none;
  color: #797979;
  background-color: #fff;
  border-radius: 20px;
  font-size: 14px;
  padding: 3px 10px;
}
</style>