<template>
  <div class="loading-screen">
    <div class="loading-animation">
      <!-- <img src="https://s1.ax1x.com/2020/03/29/GEoT2t.png"
           alt=""
           class="logo"> -->
      <div class="loading-bar"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-screen {
  height: 500px;
}
.loading-animation {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 48px;
  height: 48px;
}
.loading-bar {
  width: 130px;
  height: 2px;
  background-color: #cfcfcf;
  position: relative;
  margin-top: 22px;
  overflow: hidden;
}
.loading-bar::before {
  content: "";
  position: absolute;
  background: #dd001b;
  left: -34px;
  width: 68px;
  height: 2px;
  animation: redblur 1.5s infinite;
}
@keyframes redblur {
  50% {
    left: 96px;
  }
}
</style>