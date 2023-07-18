<template>
  <div class="layout relative">
    <div class="main-bg"></div>
    <div class="absolute w-full h-full top-0 flex justify-center items-center">
      <div class="fiona-main">内容</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  .main-bg {
    width: 100%;
    height: 100%;
    background: url("../../assets/imgs/monicaBg.jpg");
    background-size: 100% 100%;
    filter: blur(50px);
    -webkit-filter: blur(50px);
  }
  .fiona-main {
    width: 70%;
    min-width: 500px;
    max-width: 1152px;
    border: 1px solid rgb(229, 232, 235);
    box-shadow: rgba(145, 158, 171, 0.16) 0px 8px 16px;
    border-radius: 12px;
    background-color: #fff;
    height: 80%;
  }
}
</style>
