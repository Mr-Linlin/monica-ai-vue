<template>
  <div class="markdown" ref="markdownRef">
    <div v-html="html" />
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { marked } from "marked";
import useCommon from "@/hooks/useCommon";
hljs.configure({
  ignoreUnescapedHTML: true,
});
const html = ref("");
const markdownRef = ref(null);
const { copyText } = useCommon();
const props = defineProps<{
  content?: string;
}>();

watch(
  () => props.content,
  (newV) => {
    if (newV && newV?.length > 0) {
      // html.value = newV;
      nextTick(() => {
        html.value = marked.parse(newV, {
          headerIds: false,
          mangle: false,
          gfm: true,
          breaks: true,
        });
        highlightCode();
        // console.log(html.value);
      });
    }
  }
);
if (props.content) {
  html.value = props.content;
  nextTick(() => {
    html.value = marked.parse(props.content, {
      headerIds: false,
      mangle: false,
      gfm: true,
      breaks: true,
    });
    highlightCode();
  });
}
type Procedure = (...args: any[]) => void;

const debounce = <T extends Procedure>(func: T, delay: number): T => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFunction = function (this: any, ...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  return debouncedFunction as T;
};

const highlightCode = debounce(() => {
  nextTick(() => {
    if (markdownRef.value !== null) {
      const pres = (markdownRef.value as HTMLElement).querySelectorAll(
        "pre code"
      );
      pres.forEach((pre) => {
        hljs.highlightElement(pre);
        const copys = pre.querySelectorAll(".copy-btn");
        if (copys.length == 0) {
          const div = document.createElement("div");
          div.classList.add("copy-header");
          const span = document.createElement("span");
          span.innerHTML = "复制";
          // span.setAttribute('v-copy-text', '');
          span.addEventListener("click", () => {
            if (pre !== null) {
              copyText((pre as HTMLElement).innerText);
            }
          });
          // console.log(pre.parentNode);
          const preElement = pre.parentNode;
          span.classList.add(
            "copy-btn",
            "icon-fuzhi1",
            "lin",
            "cursor-pointer"
          );
          div.appendChild(span);
          if (preElement !== null) {
            const referenceNode = preElement.firstChild; // 获取父节点的第一个子节点
            preElement.insertBefore(div, referenceNode); // 插入新的子节点到父节点的第一个子节点之前
          }
        }
      });
    }
  });
}, 10);
</script>
<style lang="scss">
.markdown {
  max-width: 900px;
}
.markdown p {
  margin: 8px 0 !important;
  white-space: pre-wrap;
}
.markdown pre {
  border-radius: 12px 12px 0 0;
  position: relative;
}
.markdown pre:last-of-type {
  margin-bottom: 20px;
}

.markdown pre .copy-row {
  display: flex;
  padding: 4px 15px;
  justify-content: space-between;
  background: #4d4d4f;
  border-radius: 12px 12px 0 0;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 400;
  color: #ffffff;
}
pre .copy-header {
  background: #4d4d4f;
  color: #333;
  height: 32px;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 400;
  color: #ffffff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.markdown pre .copy-row .copy-btn {
  cursor: pointer;
}
.markdown pre code {
  // border-radius: 12px 12px 0 0;
  margin: 0;
  padding: 8px;
}
</style>
