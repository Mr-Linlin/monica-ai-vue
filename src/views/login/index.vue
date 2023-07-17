<template>
  <div class="login flex items-center justify-center">
    <div class="login-form bg-white rounded-md shadow-2xl w-2/4 h-2/4 flex">
      <div class="left">
        <img src="~@/assets/imgs/shuffling.png" alt="" />
      </div>
      <div class="right flex-1 flex items-center justify-center">
        <div class="info">
          <div class="text-center font-mono text-3xl font-semibold">
            {{ !isRegister ? "欢迎登陆AI助手" : "快速注册" }}
          </div>
          <div class="form-box mt-4">
            <el-form
              ref="formRef"
              :model="dynamicForm"
              class="demo-dynamic"
              :rules="rules"
            >
              <div v-if="!isRegister">
                <el-form-item prop="phone">
                  <el-input
                    v-model="dynamicForm.phone"
                    placeholder="请输入手机号码"
                    :prefix-icon="User"
                    size="large"
                    class="input-with"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="dynamicForm.password"
                    placeholder="请输入密码"
                    :prefix-icon="View"
                    size="large"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>
              <div v-else>
                <el-form
                  :model="registerForm"
                  ref="regFormRef"
                  :rules="resRules"
                >
                  <el-form-item prop="username">
                    <el-input
                      v-model="registerForm.username"
                      placeholder="请输入用户名"
                      size="large"
                      class="input-with"
                    />
                  </el-form-item>
                  <el-form-item prop="phone">
                    <el-input
                      v-model="registerForm.phone"
                      placeholder="请输入手机号码"
                      size="large"
                      class="input-with"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="registerForm.password"
                      placeholder="请输入密码"
                      size="large"
                      type="password"
                      class="input-with"
                      show-password
                    />
                  </el-form-item>
                </el-form>
              </div>
              <el-form-item class="mt-8">
                <el-button
                  style="width: 100%"
                  size="large"
                  @click="submitForm(isRegister ? regFormRef : formRef)"
                  :disabled="getRegister"
                >
                  {{ !isRegister ? "登 录" : "注 册" }}
                </el-button>
              </el-form-item>
              <el-form-item>
                <span
                  class="text-center w-full text-blue-500 cursor-pointer"
                  @click="isRegister = !isRegister"
                  >{{
                    isRegister ? "已有账号,前往登录" : "免费注册,领取新人福利"
                  }}</span
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElNotification } from "element-plus";
import { User, View } from "@element-plus/icons-vue";
import api from "api/apis";
import { useCommon } from "@/store/common";
const formRef = ref<FormInstance>();
const regFormRef = ref<FormInstance>();
const isRegister = ref(false);
const { setConfig } = useCommon();
const dynamicForm = reactive({
  phone: "",
  password: "",
});
const registerForm = reactive({
  phone: "",
  password: "",
  username: "",
});
const rules = reactive({
  phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const resRules = reactive({
  phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
});
const getRegister = computed(() => {
  if (!isRegister.value) {
    if (!dynamicForm.phone || !dynamicForm.password) {
      return true;
    }
  } else if (
    !registerForm.phone ||
    !registerForm.password ||
    !registerForm.username
  ) {
    return true;
  }

  return false;
});
// 登陆/注册
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = null;
      if (!isRegister.value) {
        res = await api.login(dynamicForm);
      } else {
        res = await api.register(registerForm);
      }
      if (res.code == 200) {
        ElNotification({
          title: "成功",
          message: res.message,
          type: "success",
          duration: 1500,
        });
        if (!isRegister.value) {
          setConfig(res);
        } else {
          isRegister.value = false;
          formEl.resetFields();
        }
      } else {
        ElNotification({
          title: "失败",
          message: res.message,
          type: "error",
          duration: 1500,
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #e8f1fe;
  width: 100%;
  height: 100vh;
  .login-form {
    height: 580px;
    border-radius: 10px;
  }
  .left {
    width: 35%;
    img {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
<style>
.input-with {
  width: 28rem;
}
</style>
