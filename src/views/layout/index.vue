<template>
  <div class="layout relative">
    <div class="main-bg"></div>
    <div class="absolute w-full h-full top-0 flex justify-center items-center">
      <div class="fiona-main flex flex-col">
        <header>头部内容</header>
        <div class="content flex-1 flex flex-col">
          <div class="chat-box flex-1">内容</div>
          <div class="chat-input"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  font-size: 0.85rem;
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
    header {
      display: flex;
      align-items: center;
      height: 50px;
      min-height: 50px;
      max-height: 50px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 8px 0 16px;
      user-select: none;
    }
    .content {
      // background-color: #f1f5f9;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      .chat-input {
        width: 100%;
        padding: 0 16px;
        z-index: 501;
        height: 146px;
        background: #f4f6f8;
        border-top: 1px solid rgba(145, 158, 171, 0.05);
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  }
}
</style>
