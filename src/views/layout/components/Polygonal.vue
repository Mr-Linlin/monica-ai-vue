<template>
  <div
    id="myEcharts"
    ref="myEcharts"
    :style="{ width: '600px', height: '280px' }"
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
    const myEcharts = ref(null);
    const { proxy } = getCurrentInstance() as any;
    // 基础配置一下Echarts
    function initChart() {
      const payload = {
        id: "right-top",
        title: "职称",
        color: ["0, 191, 255", "24, 242, 115", "255, 207, 64"],
        data: {
          正级: { data1: "11", data2: "4", data3: 7, data4: "36.36" },
          副级: { data1: "128", data2: "104", data3: 24, data4: "81.25" },
          中级: { data1: "246", data2: "219", data3: 27, data4: "89.02" },
        },
      };

      const list = [];
      const title = [];
      Object.keys(payload.data).forEach((item) => {
        title.push(item);
        list.push({
          data1: payload.data[item].data1,
          data2: payload.data[item].data2,
          data3: payload.data[item].data3,
          data4: payload.data[item].data4,
        });
      });

      let titleBottom = ["42%", "42%", "42%"];
      let center = [
        ["17%", "28%"],
        ["50%", "28%"],
        ["83%", "28%"],
      ];
      let radius = [
        ["38%", "40%"],
        ["38%", "40%"],
        ["38%", "40%"],
      ];
      let radius2 = [
        ["33%", "38%"],
        ["33%", "38%"],
        ["33%", "38%"],
      ];

      const option = {
        title: [
          {
            text: title[0],
            left: "16%",
            bottom: titleBottom[0],
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "14",
              color: "#AAAFC8",
              textAlign: "center",
            },
          },
          {
            text: title[1],
            left: "49%",
            bottom: titleBottom[1],
            textAlign: "center",
            textStyle: {
              color: "#AAAFC8",
              fontWeight: "normal",
              fontSize: "14",
              textAlign: "center",
            },
          },
          {
            text: title[2],
            left: "82%",
            bottom: titleBottom[2],
            textAlign: "center",
            textStyle: {
              color: "#AAAFC8",
              fontWeight: "normal",
              fontSize: "14",
              textAlign: "center",
            },
          },
        ],
        series: [],
      };

      const getPie1 = (index, data1, data2, color) => {
        return {
          type: "pie",
          center: center[index],
          radius: radius[index],
          markLine: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
          },
          emphasis: {
            scale: 1,
          },
          data: [
            {
              value: data1,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(" + color + ", 1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(" + color + ", 1)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              labelLine: {
                show: false,
              },
              emphasis: {
                labelLine: {
                  show: false,
                },
              },
            },
            {
              value: data2,
              itemStyle: {
                color: "#2B3F43",
              },
              labelLine: {
                show: false,
              },
              emphasis: {
                labelLine: {
                  show: false,
                },
              },
            },
          ],
        };
      };

      // eslint-disable-next-line
      const getPie2 = (index, data1, data2, data3, color) => {
        return {
          type: "pie",
          center: center[index],
          radius: radius2[index],
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          emphasis: {
            scale: 1,
          },
          data: [
            {
              value: data1,
              label: {
                formatter: "{number|" + data3 + "}{percent|%}\n{text|通过率}",
                color: "#31F3FF",
                fontWeight: "bold",
                position: "center",
                show: true,
                rich: {
                  number: {
                    color: "rgba(" + color + ", 1)",
                    fontSize: 20,
                    verticalAlign: "bottom",
                  },
                  percent: {
                    color: "rgba(187, 230, 251, 1)",
                    fontSize: 14,
                    verticalAlign: "bottom",
                  },
                  text: {
                    color: "rgba(183, 213, 242, 1)",
                    fontSize: 14,
                    lineHeight: 20,
                    verticalAlign: "bottom",
                  },
                },
              },
              itemStyle: {
                color: {
                  type: "radial",
                  x: 1,
                  y: 1,
                  r: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(" + color + ", 0.16)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(" + color + ", 0.16)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              labelLine: {
                show: false,
              },
            },
            {
              value: data2,
              itemStyle: {
                color: "#141D2C",
              },
              labelLine: {
                show: false,
              },
            },
          ],
        };
      };

      list.forEach((item, index) => {
        option.series.push(
          getPie1(index, item.data2, item.data3, payload.color[index])
        );
        option.series.push(
          getPie2(
            index,
            item.data2,
            item.data3,
            item.data4,
            payload.color[index]
          )
        );
      });
      let chart = proxy.$echarts.init(myEcharts.value, "dark");
      //3.重新渲染 echarts图表
      chart.setOption(option);
      // 把配置和数据放这里
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    return { initChart, myEcharts };
  },
});
</script>
