<template>
  <div class="layout relative">
    <div class="main-bg"></div>
    <div class="absolute w-full h-full top-0 flex justify-center items-center">
      <div class="fiona-main flex flex-col">
        <header class="flex justify-between">
          <div class="header-left flex items-center">
            <img src="~@/assets/imgs/home/logo.png" class="w-8 h-8 mr-2" />
            <div class="font-semibold text-lg">AI助手</div>
          </div>
          <div class="header-right mr-10 flex items-center">
            <div
              class="vip-info flex items-center justify-center"
              :class="
                userInfo.level === 2
                  ? 'level3'
                  : userInfo.level === 1
                  ? 'level2'
                  : 'level1'
              "
            >
              <img class="mr-0.5" src="~@/assets/imgs/home/level1.png" alt="" />
              <span>{{ userInfo.level_name }}</span>
            </div>
            <el-divider direction="vertical" />
            <el-popover
              placement="bottom-end"
              width="230"
              trigger="hover"
              transition="el-zoom-in-top"
            >
              <template #reference>
                <div class="cursor-pointer flex items-center avatar-wrapper">
                  <img src="~@/assets/imgs/home/building.png" class="mr-1" />
                  <div class="user-name cursor-pointer mr-3">
                    {{ userInfo.username }}
                  </div>
                  <span class="arrow-down" />
                </div>
              </template>
              <template #default>
                <div class="popover-container">
                  <div class="vip-date flex justify-between items-center">
                    <div class="vip-left">
                      <div class="vip-desc">{{ userInfo.level_name }}</div>
                      <div class="vip-expired">有效期至长期</div>
                    </div>
                    <div class="vip-right cursor-pointer">
                      <span>立即续费</span>
                    </div>
                  </div>
                  <div
                    class="query top item flex justify-between cursor-pointer"
                  >
                    <div class="left flex justify-center items-center">
                      <img
                        class="w-4 h-4"
                        src="~@/assets/imgs/home/search.png"
                        alt=""
                      />
                      <span>查询：</span>
                      <span
                        >{{ userInfo.chat_times }}/{{
                          userInfo.buy_chat_times
                        }}</span
                      >
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in popoverList"
                    :key="index"
                    @click.stop="toPage(item.type)"
                    class="item-bottom flex justify-between items-center cursor-pointer"
                  >
                    <div class="left flex items-center justify-center">
                      <img :src="item.img" alt="" />
                      <span>{{ item.name }}</span>
                    </div>
                    <span class="right cursor-pointer" />
                  </div>
                </div>
              </template>
            </el-popover>
          </div>
        </header>
        <div class="content flex-1 flex flex-col">
          <div class="chat-box flex-1 flex"></div>
          <div class="chat-input felx flex-col">
            <div class="box-btn my-1.5">
              <el-button size="small" type="primary">新会话</el-button>
              <el-button size="small">历史记录</el-button>
              <el-button size="small">提示词</el-button>
            </div>
            <div class="editable-area flex-1">
              <textarea
                ref="editableDiv"
                class="editable"
                v-model.trim="editableContent"
                placeholder="请问我任何问题"
              />
              <span class="content-count"
                >{{ editableContent.length }} / 4000</span
              >
              <span v-if="!editableContent" class="cursor-pointer none-send" />
              <span v-if="editableContent" class="send cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useCommon } from "@/store/common";
import settingAvatarPng from "@/assets/imgs/home/setting-avatar.png";

const { loginOut, getUser } = useCommon();
const userInfo = getUser;
const popoverList = [
  {
    name: "退出登录",
    type: "login_out",
    img: settingAvatarPng,
  },
];
const toPage = (type: string) => {
  switch (type) {
    case "login_out":
      loginOut();

      break;
  }
};

const editableContent = ref("");
</script>
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
      .header-right {
        .vip-info {
          width: 100px;
          height: 30px;
          border-radius: 30px;
        }
        .avatar-wrapper {
          height: 30px;
          border-radius: 30px;
          opacity: 1;
          padding: 5px 10px;
          background: #f1f2f8;
          .arrow-down {
            width: 16px;
            height: 16px;
            background-image: url("../../assets/imgs/home/arrow-down.png");
            background-size: 100% 100%;
          }
          &:hover {
            .arrow-down {
              background-image: url("../../assets/imgs/home/arrow-up.png");
            }
          }
        }
        .level1 {
          background: #e6edf9;
          color: #266dff;
        }
        .level2 {
          background: #fff6e4;
          color: #92660f;
        }
        .level3 {
          background: #e5dfff;
          color: #5a37f4;
        }
      }
    }
    .content {
      // background-color: #f1f5f9;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
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
}
</style>
<style lang="scss">
.popover-container {
  .vip-date {
    height: 60px;
    border-radius: 6px;
    padding: 0 12px;
    background-image: url("../../assets/imgs/home/vip-date.png");
    background-size: 100% 100%;
    margin-bottom: 10px;
    .vip-left {
      .vip-desc {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0em;
        color: #262626;
      }
      .vip-expired {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
    .vip-right {
      font-size: 14px;
      color: #3370ff;
    }
  }
  .query {
    color: #3370ff;
  }
  .item {
    margin-bottom: 8px;
    padding: 7px 18px;
  }
  .item-bottom {
    margin-bottom: 8px;
    padding: 7px 5px;
    .right {
      width: 24px;
      height: 24px;
      background-image: url("../../assets/imgs/home/arrow-right.png");
      background-size: 100% 100%;
    }
    &:hover {
      color: #3370ff;
      .right {
        background-image: url("../../assets/imgs/home/arrow-right-active.png");
        background-size: 100% 100%;
      }
    }
  }
  .left {
    img {
      width: 16px;
      margin-right: 5px;
    }
  }
  .top {
    border-radius: 28px;
    background: #f0f8ff;
    color: #266dff;
  }
}
</style>
