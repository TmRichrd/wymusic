<template>
  <div class="homeLoading"
       ref="homeLoading">
    <div class="homeText">
      音樂的力量
    </div>
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

.homeText {
  letter-spacing: .5rem;
  height: 50%;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.homeLoading img {
  width: 30%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>