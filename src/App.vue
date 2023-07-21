<script setup lang="ts"></script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
/* 隐藏垂直方向的滚动条 */
::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 5px;
  display: none;
}

/* 自定义水平方向的滚动条 */
::-webkit-scrollbar-thumb:horizontal {
  background-color: #ccc;
  border-radius: 5px;
}

/* 自定义水平方向的滚动条悬停状态 */
::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: #999;
}

/* 自定义滚动条的轨道 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 自定义滚动条的轨道悬停状态 */
::-webkit-scrollbar-track:hover {
  background-color: #ddd;
}
</style>
