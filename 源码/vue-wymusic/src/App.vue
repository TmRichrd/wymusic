<template>
  <div id="app">
    <router-view v-show="!fullScreen" />
    <!-- <miniplay></miniplay> -->
    <play></play>
  </div>
</template>

<script>
import play from './components/play'
import { mapGetters } from 'vuex'
export default {
  components: {
    play
  },
  computed: {
    ...mapGetters([
      'fullScreen'
    ])
  },
  created () {

  },
  name: 'App'
}
</script>
<style lang="">
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osz-font-smoothing: grayscale;
}
</style>

