<template>
  <div class="ranklist_pages">
    <!-- 头部 -->
    <van-sticky>
      <div class="ranklist_header">
        <van-icon name="https://s1.ax1x.com/2020/03/27/GCPaMn.png"
                  size="20"
                  @click="$router.go(-1)"></van-icon>
        <span>排行榜</span>
      </div>
    </van-sticky>
    <!-- 排行榜 -->
    <!-- 官方榜 -->
    <div class="ranklist_items"
         v-if="!hasLoad">
      <p>官方榜</p>
      <div class="ranklist_item"
           @click="toCollection(item)"
           v-for="(item, index) in ranklist.slice(0,4)"
           :key="index">
        <div class="ranklist_itemleft">
          <img :src="item.coverImgUrl"
               alt="">
          <div class="ranklist_update"><span>{{item.updateFrequency}}</span></div>
        </div>
        <div class="ranklist_itemright">
          <p v-for="(item1, index1) in item.tracks"
             :key="index1">{{index1+1}}.{{item1.first}} - {{item1.second}}</p>
        </div>
      </div>
    </div>
    <!-- 推荐榜 -->
    <div class="ranklist_reco"
         v-if="!hasLoad">
      <p>推荐榜单</p>
      <div class="ranklistreco_items">
        <div class="ranklistreco_item"
             @click="toCollection(item)"
             v-for="(item, index) in ranklist.slice(4,10)"
             :key="index">
          <div class="ranklistreco_itemleft">
            <img :src="item.coverImgUrl"
                 alt="">
            <div class="ranklistreco_update"><span>{{item.updateFrequency}}</span></div>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 全球榜 -->
    <div class="ranklist_reco"
         v-if="!hasLoad">
      <p>全球榜单</p>
      <div class="ranklistreco_items">
        <div class="ranklistreco_item"
             @click="toCollection(item)"
             v-for="(item, index) in ranklist.slice(10,16)"
             :key="index">
          <div class="ranklistreco_itemleft">
            <img :src="item.coverImgUrl"
                 alt="">
            <div class="ranklistreco_update"><span>{{item.updateFrequency}}</span></div>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 更多榜单 -->
    <div class="ranklist_reco"
         v-if="!hasLoad">
      <p>更多榜单</p>
      <div class="ranklistreco_items"
           style="margin-bottom:50px">
        <div class="ranklistreco_item"
             @click="toCollection(item)"
             v-for="(item, index) in ranklist.slice(16,26)"
             :key="index">
          <div class="ranklistreco_itemleft">
            <img :src="item.coverImgUrl"
                 alt="">
            <div class="ranklistreco_update"><span>{{item.updateFrequency}}</span></div>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
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
  data () {
    return {
      ranklist: [],
      hasLoad: true
    }
  },
  methods: {
    async fetchRankData () {
      const res = await this.$http.get('toplist/detail')
      this.ranklist = res.data.list
      this.hasLoad = false
    },
    // 跳转到榜单详情
    toCollection (item) {
      this.$router.push({ name: 'collection', params: { id: item.id } })
    }
  },
  created () {
    this.fetchRankData()
  },
}
</script>

<style>
.ranklist_header {
  height: 60px;
  padding: 10px;
  display: flex;
  background-color: #fff;
  align-items: center;
}
.ranklist_header span {
  margin-left: 20px;
  font-size: 18px;
}
.ranklist_items {
  padding: 10px;
}
.ranklist_item {
  display: flex;
}
.ranklist_itemleft {
  position: relative;
}
.ranklist_itemleft img {
  width: 100px;
  border-radius: 5px;
}
.ranklist_update {
  position: absolute;
  bottom: 10px;
  left: 5px;
}
.ranklist_update span {
  font-size: 10px;
  color: #eee;
}
.ranklist_itemright {
  padding: 5px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ranklist_itemright p {
  color: #797979;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*  */
.ranklist_reco {
  padding: 10px;
}
.ranklist_reco .ranklistreco_items {
  display: flex;
  flex-wrap: wrap;
}
.ranklistreco_item {
  width: 33.3%;
  height: 150px;
  margin-bottom: 10px;
}
.ranklistreco_itemleft img {
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.ranklistreco_itemleft {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 110px;
  /* align-items: center; */
  justify-content: center;
}
.ranklistreco_item p {
  height: 34px;
  overflow: hidden;
}
.ranklistreco_item p {
  width: 100px;
}
.ranklistreco_itemleft::before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  bottom: 0;
  position: absolute;
  background-color: rgba(42, 42, 42, 0.69);
  opacity: 0.5;
  z-index: 5;
}
.ranklistreco_update {
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: #fff;
  font-size: 10px;
  z-index: 10;
}
.ranklistreco_item p {
  font-size: 12px;
  margin: 5px 0;
}
</style>