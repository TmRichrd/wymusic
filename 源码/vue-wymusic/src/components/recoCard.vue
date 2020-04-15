<template>
  <div class="reco">
    <span class="recosong">{{name}}</span>
    <div class="recoTitle">
      <span class="jx">
        {{title}}</span>
      <van-button round
                  size="small"
                  :to="router">
        <van-icon :name="icon" />
        {{more}}</van-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {},
    title: { required: true },
    more: {},
    icon: {},
    router: {}
  },
  methods: {

  },
  created () {
  },
  mounted () {
  },
}
</script>

<style>
.van-button__text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-button__text i {
  margin-right: 5px;
}
</style>