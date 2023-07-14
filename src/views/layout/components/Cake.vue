<template>
  <div
    id="myCake"
    ref="myCake"
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
    const myCake = ref(null);
    onMounted(() => {
      initChart();
    });
    const { proxy } = getCurrentInstance() as any;
    // 基础配置一下Echarts
    function initChart() {
      let index = 0;
      let data = [
        [
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        ],
        [
          [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
          [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
        ],
        [
          [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
          [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
        ],
        [
          [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
          [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
        ],
      ];
      const option = {
        backgroundColor: "#222",
        title: {
          text: "单位:万",
          left: 30,
          // 文字颜色
          textStyle: {
            color: "#4c9bfd",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["预期销售额", "实际销售额"],
          left: "right",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // 文字颜色
          axisLabel: {
            color: "#4c9bfd",
          },
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          /* 刻度为数据最大刻度 */
          max: "dataMax",
          type: "value",
          // 文字颜色
          axisLabel: {
            color: "#4c9bfd",
          },
          //修改刻度颜色
          splitLine: {
            lineStyle: {
              color: "#012f4a",
            },
          },
        },
        series: [
          {
            name: "预期销售额",
            type: "line",
            stack: "总量",
            //曲线
            smooth: true,
            //圆圈大小
            symbolSize: 8,
            itemStyle: {
              color: "#00f2f1", // 线颜色
            },
            data: data[0][0],
          },
          {
            name: "实际销售额",
            type: "line",
            stack: "总量",
            //曲线
            smooth: true,
            //圆圈大小
            symbolSize: 8,
            data: data[0][1],
            itemStyle: {
              color: "#ed3f35", // 线颜色
            },
          },
        ],
      };
      let chart = proxy.$echarts.init(myCake.value, "dark");
      setInterval(function () {
        //1.数组下标++ 切换数据
        index++;
        if (index > 3) {
          //数组最大下标为3,
          index = 0;
        }
        //2.替换数据
        option.series[0].data = data[index][0];
        option.series[1].data = data[index][1];
        //3.重新渲染 echarts图表
        chart.setOption(option);
      }, 1000);
      // 把配置和数据放这里
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }

    return { initChart, myCake };
  },
});
</script>
