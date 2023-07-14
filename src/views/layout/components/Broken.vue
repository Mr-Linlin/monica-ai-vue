<template>
  <div
    id="myBroken"
    ref="myBroken"
    :style="{ width: '580px', height: '190px' }"
  ></div>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onUnmounted,
  onMounted,
  getCurrentInstance,
  ref,
} from "vue";

export default defineComponent({
  name: "userSetting",
  setup() {
    onMounted(() => {
      initChart();
    });
    const myBroken = ref(null);
    const { proxy } = getCurrentInstance() as any;
    // 基础配置一下Echarts
    function initChart() {
      const option = {
        backgroundColor: "transparent",
        color: ["#28f8b1", "#0084fc"],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        grid: {
          left: "2%",
          right: "5%",
          bottom: "5%",
          top: "30px",
          containLabel: true,
        },

        legend: {
          show: true,
          icon: "rect",
          orient: "horizontal",
          left: "right",
          itemWidth: 12,
          itemHeight: 12,
          formatter: ["{a|{name}}"].join("\n"),
          textStyle: {
            fontSize: 12,
            color: "#FFF",
            height: 8,
            rich: {
              a: {
                verticalAlign: "bottom",
              },
            },
          },
          data: ["用水", "用电"],
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#BDD8FB",
              fontSize: 12,
            },
          },
          axisLabel: {
            // interval:0,
            color: "#BDD8FB",
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          data: ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06"],
        },
        yAxis: {
          type: "value",
          min: 0,
          minInterval: 1,
          nameTextStyle: {
            fontSize: 12,
            color: "#BDD8FB",
            align: "center",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.15)",
              // type: 'dashed', // dotted 虚线
            },
          },
          splitArea: { show: false },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: "Bebas",
            color: "#BDD8FB",
          },
        },
        series: [
          {
            type: "line",
            // symbol: "none",
            // showSymbol: false,
            smooth: true, // 是否曲线
            name: "", // 图例对应类别
            data: [0, 100, 100, 300, 400], // 纵坐标数据
            areaStyle: {
              // 区域颜色
              // color: new graphic.LinearGradient(0, 0, 0, 1, [
              // 	{
              // 		offset: 0,
              // 		color: "#5090FF",
              // 	},
              // 	{
              // 		offset: 1,
              // 		color: "#1057E5",
              // 	},
              // ]),
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0.1,
                    color: "#28f8b1", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1057E500", // 100% 处的颜色
                  },
                ],
              },
            },
          },
          {
            type: "line",
            smooth: true,
            name: "",
            data: [100, 400, 200, 0, 300],
            areaStyle: {
              // color: new graphic.LinearGradient(0, 0, 0, 1, [
              // 	{
              // 		offset: 0,
              // 		color: "#01B3E4",
              // 	},
              // 	{
              // 		offset: 1,
              // 		color: "#86DCF3",
              // 	},
              // ]),
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0.1,
                    color: "#0084fc", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#86DCF300", // 100% 处的颜色
                  },
                ],
              },
            },
          },
        ],
      };
      let chart = proxy.$echarts.init(myBroken.value, "dark");
      //3.重新渲染 echarts图表
      chart.setOption(option);
      // 把配置和数据放这里
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    return { initChart, myBroken };
  },
});
</script>
