<template>
  <div class="page-search">
    <!-- header -->
    <!-- <van-sticky> -->
    <div class="search_header">
      <van-icon @click="clearSession"
                name="https://s1.ax1x.com/2020/03/27/GCPaMn.png" />
      <input type="text"
             class="search_input"
             :placeholder="searchDefault"
             v-model="searchValue"
             @keyup.enter="fetchSearch">
      <van-icon @click="$router.push('/singerlist')"
                name="https://s1.ax1x.com/2020/03/27/GCiQSJ.png" />
    </div>
    <!-- </van-sticky> -->
    <!-- 历史记录 -->
    <div class="search_content"
         v-if="flag">
      <div class="search_history"
           ref="search_history"
           v-if="SearchList.SearchHistory.length!==0">
        <div class="history_title">
          <span>历史记录</span>
          <van-icon name="https://s1.ax1x.com/2020/03/27/GCkAaV.png"
                    @click="clearLocal" />
        </div>
        <div class="history_value">
          <button @click="hotsearch(item.name)"
                  class="history_button"
                  v-for="(item, index) in SearchList.SearchHistory"
                  :key="index">{{item.name}}</button>
        </div>
      </div>
      <!-- 热搜 -->
      <div class="hotsearch">
        <span>热搜榜</span>
        <div class="hotsearchList">
          <div class="hotlist-item"
               v-for="(item, index) in hotSearch"
               :key="index"
               @click="hotsearch(item.searchWord)">
            <a>
              <div class="hot-itemleft"
                   :class="(index+1)<4?'active':''">{{index+1}}</div>
              <div class="hot-itemright">
                <div class="title_left">
                  <div class="hot-title">{{item.searchWord}}&nbsp;&nbsp;&nbsp;<img :src="item.iconUrl" /></div>
                  <div class="hot-content">{{item.content}}</div>
                </div>
                <div class="title_right">{{item.score}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <searchlist :searchResult='searchResult'
                v-else
                :errmes='errmes'></searchlist>
  </div>

</template>

<script>
import searchlist from '../components/searchlist'
export default {
  components: {
    searchlist
  },
  data () {
    return {
      // 搜索默认值
      searchDefault: '',
      // 搜索值
      realkeyword: '',
      // 热搜榜
      hotSearch: [],
      searchValue: '',
      searchResult: [],
      flag: true,
      // 错误信息
      errmes: '',
      // 历史记录
      SearchList: {
        SearchHistory: []
      }
      // JSON.parse(localStorage.SearchList) || ''
    }
  },
  methods: {
    // 热搜默认值
    async fetchSearchDefault () {
      const res = await this.$http.get('search/default')
      this.searchDefault = res.data.data.showKeyword
      this.realkeyword = res.data.data.realkeyword
    },
    // 热搜
    async fetchHotSearch () {
      const res = await this.$http.get('/search/hot/detail')
      this.hotSearch = res.data.data
    },
    // 历史记录
    addSearch (valueName) {
      let SearchArr = {
        name: valueName
      }
      let SearchList = JSON.parse(localStorage.getItem("SearchList") || '[]')
      SearchList.push(SearchArr)
      SearchList = this.$lodash.unionBy(SearchList, 'name')
      localStorage.setItem("SearchList" || '[]', JSON.stringify(SearchList))
    },
    // 清除历史记录
    clearLocal () {
      localStorage.setItem('SearchList', '[]')
      this.$set(this.SearchList, 'SearchHistory', JSON.parse(localStorage.SearchList) || '')
    },
    // 搜索请求
    async fetchSearch () {
      if (this.searchValue !== '')      {
        const res = await this.$http.get(`search?keywords=${this.searchValue}&type=1018`)
        this.searchResult = res.data.result
        console.log(this.searchResult);
        this.addSearch(this.searchValue)
        sessionStorage.setItem('searchValue', this.searchValue)
        // this.$router.push({ name: 'comp', params: { searchValue: this.searchValue } })
        if (res.data.result == undefined)        {
          this.flag = false
          this.errmes = `未找到与${this.searchValue}相关的内容`
          sessionStorage.setItem('searchValue', this.searchValue)
          this.$router.push({ name: 'comp', params: { searchValue: this.searchValue } })
        } else        {
          this.errmes = ''
          this.flag = false
          this.$router.push({ name: 'comp', params: { searchValue: this.searchValue } })
        }
      } else      {
        const res = await this.$http.get(`search?keywords=${this.realkeyword}&type=1018`)
        // console.log(res);
        this.searchResult = res.data.result
        this.searchValue = this.realkeyword
        this.addSearch(this.searchValue)
        sessionStorage.setItem('searchValue', this.searchValue)
        this.flag = false
        this.$router.push({ name: 'comp', params: { searchValue: this.searchValue } })
      }

    },
    // 清除搜索缓存
    clearSession () {
      this.$router.push('/')
      sessionStorage.clear()
    },
    // 点击热门搜索
    async hotsearch (value) {
      this.searchValue = value
      this.fetchSearch()
    },
  },
  beforeCreate () {
    if (!localStorage.SearchList)    {
      localStorage.setItem('SearchList', '[]')
    }
  },
  created () {
    this.$set(this.SearchList, 'SearchHistory', JSON.parse(localStorage.SearchList) || '')
    if (sessionStorage.searchValue)    {
      this.searchValue = sessionStorage.getItem('searchValue')
      this.flag = false
      this.fetchSearch()
    }
    this.fetchHotSearch()
    this.fetchSearchDefault()
  },
}
</script>

<style>
.van-sticky {
  background-color: #fff;
}
.searchStik {
  position: sticky;
  top: 0px;
  margin-top: 10px;
  background-color: #fff;
}
.search_header {
  display: flex;
  height: 40px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 10px;
  padding-bottom: 10px;
}
.search_input {
  border: none;
  width: 80%;
  border-bottom: 1px solid #797979;
  font-size: 16px;
  padding: 3px;
}
/*  */
.search_history {
  margin-top: 20px;
  padding: 0 20px;
}
.history_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.history_title span {
  font-weight: bold;
}
.history_value {
  margin-top: 10px;
}
.history_button {
  padding: 0 15px;
  width: auto;
  height: 25px;
  border-radius: 20px;
  font-size: 12px;
  outline: none;
  border: none;
  margin-bottom: 10px;
  margin-right: 10px;
}
/* 热搜 */
.hotsearchList {
  margin-bottom: 50px;
}
.hotsearch {
  padding: 0 10px;
  margin-top: 50px;
}
.hotsearch span {
  font-size: 13px;
}
.hotlist-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 55px;
}
.hotlist-item a {
  width: 100%;
  display: flex;
  align-items: center;
}
.hot-itemleft {
  display: flex;
  font-style: italic;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 55px;
}
.hot-itemright {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.hot-title {
  display: flex;
  align-items: center;
  font-weight: 500;
}
.hot-title img {
  height: 16px;
  object-fit: cover;
}
.hot-content {
  color: #797979;
}
.title_right {
  color: #797979;
  font-size: 12px;
}
.hot-itemleft.active {
  color: #dd001b;
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