<template>
  <div class="miniplay">
    <div class="miniplay_bar">
      <div class="miniplay_left">
        <img src="https://p1.music.126.net/2qYDYfoztjYDeoMIxvkw_Q==/19022650672275340.jpg"
             alt="">
        <div class="miniplay_title">
          <p>Over the Moon</p>
          <p>Over the Moon</p>
        </div>
      </div>
      <div class="miniplay_right">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.miniplay_bar {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
  border-top: 0.5px solid #f1f2f6;
  padding: 0 10px;
}
.miniplay_bar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.miniplay_left {
  height: 100%;
  display: flex;
  align-items: center;
}
.miniplay_title {
  margin-left: 10px;
}
.miniplay_title p:nth-child(1) {
  margin: 0;
  font-size: 14px;
}
.miniplay_title p:nth-child(2) {
  margin: 0;
  font-size: 10px;
  color: #747d8c;
}
</style>