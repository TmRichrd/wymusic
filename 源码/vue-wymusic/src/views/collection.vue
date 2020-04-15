<template>
  <div class="page-C ollection">
    <collcard :colldata="colldata"
              name="歌单"
              v-if="!hasLoad">
    </collcard>
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
      id: '',
      hasLoad: true,
      colldata: {
        avatarUrl: {}
      }
    }
  },
  watch: {
  },
  methods: {
    async fetchCollection () {
      const res = await this.$http.get(`playlist/detail?id=${this.id}`)
      // this.$set(this, 'colldata', res.data.playlist)
      this.colldata = res.data.playlist
      // console.log(this.colldata);

      this.hasLoad = false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.fetchCollection()
  },
  destroyed () {
    // const unWatch = app.$watch($route)
    // unWatch()
  },
}
</script>

<style>
</style>