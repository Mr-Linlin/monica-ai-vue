<template>
  <div class="markdown">
    <div v-html="html" />
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { marked } from "marked";
const html = ref("");
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
        console.log(html.value);
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

const highlightCode = () => {
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach((code: any) => {
    hljs.highlightBlock(code);
    const classLanguage = code.classList[0];
    const language = classLanguage.split("-")[1] || " ";
    const row = document.createElement("div");
    row.className = "copy-row";
    const languageSpan = document.createElement("span");
    languageSpan.className = "row-language";
    languageSpan.textContent = language;
    const copySpan = document.createElement("span");
    copySpan.className = "copy-btn";
    copySpan.textContent = "Copy";
    copySpan.addEventListener("click", () => {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection() | null;
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      // this.$message.success("复制成功!");
    });
    row.appendChild(languageSpan);
    row.appendChild(copySpan);
    code.parentNode.insertBefore(row, code);
  });
};
</script>
<style>
.markdown p {
  margin: 8px 0 !important;
  white-space: pre-wrap;
}
.markdown pre {
  position: relative;
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
.markdown pre .copy-row .copy-btn {
  cursor: pointer;
}
</style>
