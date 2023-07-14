<template>
  <div class="ScreenAdapter" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "",
  data() {
    return {
      style: {
        width: "2560px",
        height: "960px",
        transform: "scale(1) translate(-50%, -50%)",
      },
    };
  },
  mounted() {
    this.setScale();
    window.onresize = this.Debounce(this.setScale, 1000);
    // window.addEventListener("resize", this.Debounce(this.setScale, 1000));
  },
  methods: {
    Debounce: (
      fn: { apply: (arg0: any, arg1: IArguments) => void },
      t: number
    ) => {
      const delay = t || 500;
      let timer: number | null | undefined;
      return function () {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, delay);
      };
    },
    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / 2600;
      const h = window.innerHeight / 900;
      return w < h ? w : h;
    },
    // getScale() {
    //   const ratio = 26 / 9;
    //   const w = window.innerWidth;
    //   const h = window.innerHeight;
    //   const screenRatio = w / h;
    //   if (screenRatio >= ratio) {
    //     return h / 900;
    //   } else {
    //     return w / 2600;
    //   }
    // },

    // 设置比例
    setScale() {
      this.style.transform =
        "scale(" + this.getScale() + ") translate(-50%, -50%)";
    },
  },
};
</script>

<style lang="scss" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s;
  background: rgba(#778899, 0.8);
}
</style>
