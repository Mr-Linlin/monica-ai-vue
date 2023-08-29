<template>
  <div class="chat">
    <div class="content flex-1 flex flex-col">
      <div class="chat-box flex-1 reactive" ref="chatBox">
        <div
          class="chat-item mt-10"
          v-for="(item, index) in chatList"
          :key="index"
        >
          <div class="system flex" v-if="item.role == 'system'">
            <div class="system-item">
              <!-- <highlight-vue
                v-if="chatList.length - 1 == index"
                v-type-writer
                :content="item.content || 'waiting...'"
              /> -->
              <highlight-vue :content="item.content || 'waiting...'" />
            </div>
          </div>
          <div class="user flex justify-end" v-else>
            <div class="question-item">
              <highlight-vue :content="item.content" />
            </div>
          </div>
          <div class="text-xs flex flex-col justify-center">
            <div
              class="flex items-center"
              :class="item.role == 'system' ? '' : 'justify-end'"
            >
              <div class="date">
                {{ formatTime(item.time, "", "hh:mm:ss") }}
              </div>
              <el-divider direction="vertical" class="ml-10 mt-1 mr-10" />
              <div class="cursor-pointer mt-1" @click="copyText(item.content)">
                <el-icon><DocumentCopy /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-input felx flex-col reactive">
        <div class="stop-chat absolute">
          <el-button size="small" type="primary" plain v-if="isReply"
            >停止响应</el-button
          >
        </div>
        <div class="box-btn my-1.5">
          <el-button size="small" type="primary" @click="newSession"
            >新会话</el-button
          >
          <el-button size="small">历史记录</el-button>
          <el-button size="small">提示词</el-button>
        </div>
        <div class="editable-area flex-1">
          <textarea
            ref="editableDiv"
            class="editable"
            v-model.trim="editableContent"
            placeholder="请问我任何问题"
            @keydown="pushKeyword"
          />
          <span class="content-count">{{ editableContent.length }} / 4000</span>
          <span v-if="!editableContent" class="cursor-pointer none-send" />
          <span
            v-if="editableContent"
            class="send cursor-pointer"
            @click="sendQuestion"
          />
        </div>
      </div>
    </div>
    <div class="link">采集到ushop</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import eventController from "@/api/eventController";
import HighlightVue from "@/components/highlight/index.vue";
import { DocumentCopy } from "@element-plus/icons-vue";
import useCommon from "@/hooks/useCommon";
import { ElNotification } from "element-plus";

const editableContent = ref("");
const replyMsg = ref<string>("");
const isReply = ref(false);
const chatBox = ref(null);
const { copyText, formatTime } = useCommon();

const chatList = reactive([
  {
    role: "system",
    content: "欢迎回来！您想聊些什么？",
    time: new Date().getTime(),
  },
]);

// 监听ai回复内容
watch(replyMsg, () => {
  showReplyContent();
});
const pushKeyword = (event: any) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMsg();
  }
};
const sendQuestion = () => {
  sendMsg();
};
// 发送消息
const sendMsg = async () => {
  if (editableContent.value) {
    replyMsg.value = "";
    isReply.value = true;
    const url = "/chat/completion";
    const contentStr = JSON.stringify(editableContent.value);
    const content = contentStr.replace(/\\n/g, "<br>");
    const sendContent = content.slice(1, -1);
    editableContent.value = "";
    const user = {
      role: "user",
      content: sendContent,
      time: new Date().getTime(),
    };
    const system = {
      role: "system",
      content: "",
      time: new Date().getTime(),
    };
    if (chatList.length > 14) {
      console.log(chatList.length);
      chatList.splice(2, 2);
    }
    chatList.push(user);

    const data = JSON.stringify({
      messages: chatList,
      temperature: 1.2,
      max_tokens: 200,
    });
    chatList.push(system);
    eventController.stopFetchEvent();
    eventController.startFetchEvent(
      url,
      data,
      (res: string) => {
        const regex = /\\"content\\":\\"(.*?)\\"/g;
        let match;
        while ((match = regex.exec(res)) !== null) {
          replyMsg.value += match[1]
            .replace(/\\n/g, "\n")
            .replace(/(\\u[0-9a-fA-F]{4})/g, function (match, p1) {
              return String.fromCharCode(parseInt(p1.substring(2), 16));
            })
            .replace(/\\/g, "");
        }
      },
      (data: any) => {
        if (data) {
          ElNotification({
            title: "失败",
            message: data.message,
            type: "error",
            duration: 1500,
          });
          const localStorageName = ["user", "token"];
          localStorageName.forEach((item) => {
            localStorage.removeItem(item);
          });
          location.reload();
        }
        console.log("结束了");
        isReply.value = false;
      }
    );
  }
};
// 添加ai回复
const showReplyContent = () => {
  if (chatList.length > 0) {
    const length = chatList.length - 1;
    const originalValue = replyMsg.value;
    const resLength = originalValue.length;
    let index = chatList[length].content.length;
    let currentLength = resLength;

    const printChar = () => {
      if (index <= resLength) {
        if (currentLength === replyMsg.value.length) {
          const newContent = originalValue.substr(0, index);
          chatList[length].content = newContent;
          index++;
          scrollEnd();
          requestAnimationFrame(printChar);
        } else {
          const newContent = replyMsg.value.substr(currentLength);
          chatList[length].content += newContent;
          currentLength = replyMsg.value.length;
          index = chatList[length].content.length;
          scrollEnd();
          requestAnimationFrame(printChar);
        }
      }
    };

    printChar();
  }
};
// 滚动到底部
const scrollEnd = () => {
  setTimeout(() => {
    const inputElement = chatBox.value;
    if (inputElement) {
      if (
        (inputElement as HTMLDivElement).scrollHeight >
        (inputElement as HTMLDivElement).clientHeight
      ) {
        (inputElement as HTMLDivElement).scrollTop = (
          inputElement as HTMLDivElement
        ).scrollHeight;
        inputElement.style.opacity = 1;
      }
    }
  }, 100);
};
// 新会话
const newSession = () => {
  chatList.splice(1, chatList.length - 1);
};
</script>
<style scoped lang="scss">
.chat {
  position: relative;
  height: 100%;
  .link {
    position: absolute;
  }
  .content {
    height: 100%;

    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    .chat-box {
      position: relative;
      max-height: 531px;
      overflow-y: auto;
      padding: 20px;
      .chat-item {
        width: 100%;

        .system {
          .system-item {
            border-radius: 8px 8px 8px 2px;
            opacity: 1;
            background: linear-gradient(90deg, #dce4ff 0%, #e2e2e2 100%);
            padding: 0px 16px;
            word-break: break-all;
            font-size: 14px;
            line-height: 1.5;
          }
        }
        .user {
          .question-item {
            border-radius: 8px 8px 8px 2px;
            opacity: 1;
            background: linear-gradient(90deg, #d1e3ff 0%, #51c3f1 98%);
            padding: 0px 16px;
            word-break: break-all;
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
    }
    .chat-input {
      position: relative;
      width: 100%;
      padding: 0 16px;
      z-index: 501;
      height: 166px;
      background: #f4f6f8;
      border-top: 1px solid rgba(145, 158, 171, 0.05);
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      .stop-chat {
        top: -2.5rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .editable-area {
        position: relative;
        height: 115px;
        font-size: 14px;
        border-radius: 6px;
        width: 100%;
        background-color: #ffffff;
        .editable {
          width: 100%;
          user-select: none;
          padding: 12px;
        }
        textarea:focus {
          outline-color: transparent;
          resize: none;
          outline: none;
        }
        .content-count {
          position: absolute;
          color: #808080;
          left: 16px;
          bottom: 10px;
        }
        .send {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 16px;
          bottom: 10px;
          background-image: url("../../assets/imgs/home/send-active.png");
          background-size: 100% 100%;
          &:hover {
            background-image: url("../../assets/imgs/home/send-hover.png");
          }
        }
        .none-send {
          cursor: not-allowed;
          position: absolute;
          width: 20px;
          height: 20px;
          right: 16px;
          bottom: 10px;
          background-image: url("../../assets/imgs/home/send.png");
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
