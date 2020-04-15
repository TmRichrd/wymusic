<template>
  <div class="homeLoading"
       ref="homeLoading">
    <img src="https://s1.ax1x.com/2020/03/26/G9AzMd.png"
         alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style>
.homeLoading {
  width: 100%;
  height: 100vh;
  background-color: #dd001b;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.homeLoading img {
  width: 60%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>