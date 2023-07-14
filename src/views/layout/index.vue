<template>
  <div class="layout">
    <ScreenAdapter>
      <div class="content">
        <header
          class="flex w-full justify-between text-white text-sm px-7 fixed z-20 top-0 bg-gradient-to-b from-dark to-dark/0"
        >
          <h1
            class="flex-1 text-2xl text-center mt-3 bg-center bg-[length:auto_100%] bg-no-repeat h-16"
            :style="`background-image: url(${headerBg})`"
          >
            始兴县石湖农贸市场可视化平台
          </h1>
        </header>
        <div class="w-full h-full relative flex justify-between">
          <div class="left pl-7 pb-7 pt-16">
            <div class="box-item relative">
              <!-- <Polygonal /> -->
              <div class="title absolute text-white top-box">能耗汇总</div>
              <img src="./imgs/box.png" alt="" srcset="" />
              <div class="top-20 absolute left-4 table">
                <div
                  v-for="(item, index) in energys"
                  :key="index"
                  class="energys flex text-white"
                >
                  <div class="label mr-4">
                    <img :src="item.icon" alt="" srcset="" />
                  </div>
                  <div class="flex-1 relative info flex items-center">
                    <div class="title flex-1 text-center">
                      {{ item.label }}
                    </div>
                    <div
                      class="flex-1"
                      v-for="(v, i) in item.infoList"
                      :key="i"
                    >
                      <div class="text-11">{{ v.speed }}</div>
                      <div class="text-12">{{ v.label }}</div>
                      <div class="text-13 flex items-center">
                        {{ v.percentage }}
                        <img class="ml-1" :src="v.icon" alt="" />
                      </div>
                    </div>
                    <img
                      class="absolute bottom-0"
                      src="./imgs/target.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="box-item relative mt-5 mb-5">
              <!-- <Polygonal /> -->
              <div class="title absolute text-white top-box">设备分析</div>

              <img src="./imgs/box.png" alt="" srcset="" />
              <div class="table top-16 absolute left-4">
                <div class="device flex justify-center">
                  <div
                    class="flex-1"
                    v-for="(item, index) in deviceList"
                    :key="index"
                  >
                    <div class="img-box relative">
                      <img class="img-1" src="./imgs/annulus.png" alt="" />
                      <img class="img-2 absolute" :src="item.icon" alt="" />
                      <div class="absolute text-14 text-center">
                        <div style="font-size: 1rem" v-if="index == 0">380</div>
                        {{ item.label }}
                      </div>
                    </div>
                    <div
                      class="info-wrap pl-8 items-center flex text-white"
                      v-for="(v, i) in item.list"
                      :key="i"
                    >
                      <img
                        style="width: 1.2rem; height: 1.2rem"
                        :src="v.icon"
                        alt=""
                        class="mr-1"
                      />
                      {{ v.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-item relative">
              <div class="title absolute text-white top-box">缴费分析</div>
              <div class="time absolute text-white flex right-5">
                <div
                  class="item-box"
                  v-for="(item, index) in times"
                  :key="index"
                  :class="{ 'time-active': timeIndex == index }"
                  @click="timeTab(index)"
                >
                  {{ item }}
                </div>
              </div>
              <img src="./imgs/box.png" alt="" srcset="" />
              <div
                class="absolute flex left-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_green.png" alt="" srcset="" />
                <div>用水</div>
              </div>
              <div
                class="absolute flex right-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_blue.png" alt="" srcset="" />
                <div>用电</div>
              </div>
              <div class="info absolute top-24 left-3">
                <Broken />
              </div>
            </div>
          </div>
          <div class="main flex-1 pb-7 pt-44 flex relative">
            <div
              class="energy w-1/4 h-32 ml-2 mr-2 flex text-white relative"
              v-for="(item, index) in energyList"
              :key="index"
            >
              <img src="./imgs/energy.png" alt="" srcset="" />
              <div class="title top-5 absolute" :class="item.left">
                {{ item.title }}
              </div>
              <div class="absolute left-label top-3.5">{{ item.label }}</div>
              <div class="absolute right-6 top-3.5">{{ item.rate }}</div>
            </div>
            <div class="absolute text-white cable-box left-8">
              <div
                class="item-white flex items-center"
                :class="{ 'white-active': index == 0 }"
                v-for="(item, index) in tabList"
                :key="index"
              >
                <img :src="item.icon" alt="" srcset="" />
                {{ item.label }}
              </div>
            </div>
            <div class="absolute text-white water-box left-8">
              <div
                class="item-white"
                :class="{ 'item-active': index == 1 }"
                v-for="(item, index) in tabList1"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="right pr-7 pb-7 pt-16">
            <div class="box-item relative">
              <div class="title absolute text-white top-box">用电趋势</div>
              <div class="time absolute text-white flex right-5">
                <div
                  class="item-box"
                  v-for="(item, index) in times"
                  :key="index"
                  :class="{ 'time-active': timeIndex == index }"
                  @click="timeTab(index)"
                >
                  {{ item }}
                </div>
              </div>
              <img src="./imgs/box.png" alt="" srcset="" />
              <div
                class="absolute flex left-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_green.png" alt="" srcset="" />
                <div>今日</div>
              </div>
              <div
                class="absolute flex right-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_blue.png" alt="" srcset="" />
                <div>昨日</div>
              </div>
              <div class="info absolute top-24 left-3">
                <Broken />
              </div>
            </div>
            <div class="box-item relative mt-5 mb-5">
              <!-- <Polygonal /> -->
              <div class="title absolute text-white top-box">用水趋势</div>
              <div class="time absolute text-white flex right-5">
                <div
                  class="item-box"
                  v-for="(item, index) in times"
                  :key="index"
                  :class="{ 'time-active': timeIndex == index }"
                  @click="timeTab(index)"
                >
                  {{ item }}
                </div>
              </div>
              <img src="./imgs/box.png" alt="" srcset="" />
              <div
                class="absolute flex left-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_green.png" alt="" srcset="" />
                <div>今日</div>
              </div>
              <div
                class="absolute flex right-48 items-center top-20 text-white round"
              >
                <img src="./imgs/round_blue.png" alt="" srcset="" />
                <div>昨日</div>
              </div>
              <div class="info absolute top-24 left-3">
                <Broken />
              </div>
            </div>
            <div class="box-item relative">
              <!-- <Polygonal /> -->
              <div class="title absolute text-white top-box">告警事件</div>
              <div class="time absolute text-white flex right-5">
                <div
                  class="item-box"
                  v-for="(item, index) in times"
                  :key="index"
                  :class="{ 'time-active': timeIndex == index }"
                  @click="timeTab(index)"
                >
                  {{ item }}
                </div>
              </div>
              <img src="./imgs/box.png" alt="" srcset="" />
              <div class="table absolute left-4 top-20">
                <div
                  class="hearder rounded-lg flex h-9 items-center w-full text-white"
                >
                  <div
                    class="item flex-1 text-center"
                    v-for="(item, index) in hearder"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
                <div class="body">
                  <div
                    class="flex text-white items-center h-9 cursor-pointer"
                    v-for="(item, index) in body"
                    :key="index"
                  >
                    <div
                      class="flex-1 text-center"
                      v-for="(v, i) in item"
                      :key="i"
                    >
                      {{ v }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="fixed bottom-0 left-1/2 -translate-x-1/2"
          style="z-index: 9999"
        >
          <img src="./imgs/bottom_bg.png" />
          <div
            class="absolute w-full h-full top-0 flex justify-center items-center gap-3"
          >
            <div
              class="pl-4 pb-2.5 text-white absolute cursor-pointer"
              :class="item.left"
              v-for="(item, index) in tabs"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </ScreenAdapter>
  </div>
</template>
<script setup>
import ScreenAdapter from "@/components/ScreenAdapter.vue";
import headerBg from "./imgs/header_bg1.png";
import Broken from "./components/Broken.vue";
import water from "./imgs/water.png";
import cable from "./imgs/cable.png";
import below from "./imgs/below.png";
import annulus1 from "./imgs/annulus1.png";
import annulus2 from "./imgs/annulus2.png";
import annulus3 from "./imgs/annulus3.png";
import cable1 from "./imgs/cable1.png";
import cable2 from "./imgs/cable2.png";
import water1 from "./imgs/water1.png";
import upper from "./imgs/upper.png";
import round_blue from "./imgs/round_blue.png";
import round_green from "./imgs/round_green.png";
import round_yellow from "./imgs/round_yellow.png";
import { ref } from "vue";

const timeIndex = ref(0);
const tabs = [
  {
    left: "left-96",
    label: "综合概览",
  },
  {
    left: "left-135",
    label: "智慧停车",
  },
  {
    left: "left-145",
    label: "设备管理",
  },
  {
    left: "left-155",
    label: "能耗管理",
  },
];
const times = ["日", "月", "年"];
const energyList = [
  {
    title: "3F",
    left: "left-4",
    label: "耗电",
    rate: "497 kw/h",
  },
  {
    title: "2F",
    left: "left-4",
    label: "耗水",
    rate: "6113吨",
  },
  {
    title: "1F",
    label: "耗水",
    left: "left-4",
    rate: "6113吨",
  },
  {
    title: "BF1",
    label: "耗水",
    left: "left-3",
    rate: "6113吨",
  },
];
const energys = [
  {
    icon: cable,
    label: "耗电",
    infoList: [
      {
        label: "本日总能耗",
        speed: "497kw/h",
        percentage: "2.39%",
        icon: upper,
      },
      {
        label: "本月总能耗",
        speed: "497kw/h",
        percentage: "4.39%",
        icon: below,
      },
      {
        label: "本年总能耗",
        speed: "497kw/h",
        percentage: "3.39%",
        icon: below,
      },
    ],
  },
  {
    icon: water,
    label: "耗水",
    infoList: [
      { label: "本日总能耗", speed: "456吨", percentage: "2.39%", icon: upper },
      { label: "本月总能耗", speed: "556吨", percentage: "4.39%", icon: below },
      { label: "本年总能耗", speed: "656吨", percentage: "3.39%", icon: below },
    ],
  },
];
const tabList = [
  { label: "耗水", icon: water1 },
  { label: "耗电", icon: cable2 },
];
const tabList1 = ["总览", "F3", "F2", "F1", "BF1"];
const deviceList = [
  {
    icon: annulus1,
    label: "设备总数",
    list: [
      {
        label: "水表",
        icon: round_green,
      },
      {
        label: "电表",
        icon: round_blue,
      },
    ],
  },
  {
    icon: annulus2,
    label: "电表",
    list: [
      {
        label: "在线",
        icon: round_green,
      },
      {
        label: "离线",
        icon: round_blue,
      },
      {
        label: "故障",
        icon: round_yellow,
      },
    ],
  },
  {
    icon: annulus3,
    label: "水表",
    list: [
      {
        label: "在线",
        icon: round_green,
      },
      {
        label: "离线",
        icon: round_blue,
      },
      {
        label: "故障",
        icon: round_yellow,
      },
    ],
  },
];
const hearder = ["设备编号", "设备名称", "位置", "告警时间", "级别"];
const body = [
  {
    deviceNumber: "CB2525-1",
    name: "电表-1",
    position: "一楼xxx",
    time: "2023-5-23 23:00",
    level: "一级",
  },
  {
    deviceNumber: "CB2525-1",
    name: "电表-1",
    position: "一楼xxx",
    time: "2023-5-23 23:00",
    level: "一级",
  },
  {
    deviceNumber: "CB2525-1",
    name: "电表-1",
    position: "一楼xxx",
    time: "2023-5-23 23:00",
    level: "一级",
  },
  {
    deviceNumber: "CB2525-1",
    name: "电表-1",
    position: "一楼xxx",
    time: "2023-5-23 23:00",
    level: "一级",
  },
];
const timeTab = (index) => {
  timeIndex.value = index;
};
</script>
<style lang="scss">
.layout {
  .content {
    width: 100%;
    .left-135 {
      left: 35rem;
    }
    .left-145 {
      left: 45.45rem;
    }
    .left-155 {
      left: 56.45rem;
    }
    .energy {
      // font-size: 1.25rem;
      // background: url("./imgs//energy.png");
      img {
        height: 100%;
        height: 100%;
      }
      .title {
        top: 3.25rem;
      }
      .left-label {
        left: 5.75rem;
      }
    }
    .box-item {
      width: 600px;
      height: 280px;
      .top-box {
        top: 1.4rem;
      }
      .title {
        left: 2.25rem;
        font-size: 1.5rem;
      }
      .time {
        border-radius: 1rem;
        top: 1.55rem;
        .item-box {
          background: red;
          padding: 0.25rem 1rem;
          background-color: #263040;
          cursor: pointer;
        }
        .time-active {
          background-color: #0175ea;
        }
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    .table {
      width: 570px;
      .hearder {
        background-color: #0175ea;
      }
      .body {
        margin-top: 1rem;
      }
    }
    .energys {
      // background-color: red;
      .label {
        img {
          height: 6rem;
          width: 6rem;
        }
      }
      .info {
        .title {
          color: #1f92b6;
          font-size: 1.25rem;
        }
        .text-11 {
          font-size: 1.25rem;
        }
        .text-12 {
          color: #0e263a;
        }
        .text-13 {
          color: #ccc;
          img {
            height: 0.75rem;
            width: 0.75rem;
          }
        }
        img {
          height: 2rem;
        }
      }
    }
    .device {
      .img-box {
        .img-1 {
          width: 9rem;
          height: 9rem;
        }
        .img-2 {
          width: 6rem;
          height: 6rem;
          top: 1.4rem;
          left: 1.8rem;
        }
        .text-14 {
          font-size: 0.1rem;
          top: 3.5rem;
          width: 6rem;
          left: 1.8rem;
          color: #27c7f0;
        }
      }
    }
    .cable-box {
      top: 20rem;
      border-radius: 0.25rem;

      .item-white {
        background: rgba(#12354c, 0.5);
        padding: 0.5rem 1.5rem;
        color: #0a8db2;
        cursor: pointer;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.25rem;
        }
      }
      .white-active {
        background-color: #0a93b8;
        color: #fff;
      }
    }
    .water-box {
      top: 28rem;
      border-radius: 0.25rem;
      .item-white {
        background: rgba(#0e64a3, 1);
        color: #99a7ac;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
      }
      .item-active {
        color: #fff;
        background-color: #0085ff;
      }
    }
    .round {
      img {
        width: 1.75rem;
        height: 1.75rem;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
