<template>
  <div class="login-body" :style="`background-image: url(${require('@/assets/image/login-bg.png')})`">
    <div class="login-box">
      <div class="login-title">
        <img class="login-logo" :src="require('@/assets/image/platform.png')" alt="logo" />
        <p>测试平台</p>
      </div>
      <div class="login-info">
        <el-form ref="form" class="form-box" :model="form" :rules="formRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" @keyup.enter.native="login"
              ref="username-input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password
              @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" class="login-btn" :loading="isLoging">
              {{ "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      formRules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isLoging: false,
    };
  },
  created() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    let oldLoginTime = localStorage.getItem("loginTime") - 0;
    let sevenDay = new Date().setDate(new Date().getDate() - 7);
    if (sevenDay > oldLoginTime) {
      localStorage.removeItem("loginInfo");
      localStorage.removeItem("loginTime");
      return false;
    }
    let loginInfoLocal = localStorage.getItem("loginInfo");
    if (loginInfoLocal) {
      let loginInfo = JSON.parse(loginInfoLocal);
      this.form = {
        username: loginInfo.username,
        password: loginInfo.password,
      };
    }
  },
  mounted() {
    let autofocusElement = this.$refs["username-input"];
    if (autofocusElement) {
      autofocusElement.focus();
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoging = true;
          let params = {
            username: this.form.username.replace(/\s*/g, ""),
            password: this.form.password,
          };
          this.$http
            .post("/login", params, {
              headers: {
                Authorization: "none",
              },
            })
            .then(res => {
              let { data } = res;
              if (data.data.token) {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("userInfo", JSON.stringify(data.data.user));
                localStorage.setItem("loginTime", new Date().getTime().toLocaleString());
                this.$router.push("/");
              }
            })
            .finally(() => {
              this.isLoging = false;
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-body {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  min-height: 600px;
  min-width: 480px;
}

.login-box {
  width: 480px;
  background: #fff;
  overflow: hidden;
  height: 600px;
  position: relative;
  z-index: 13;
  left: 0;
  top: 50%;
  margin: -300px auto 0;
}

.login-title {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 33px;
  text-align: center;
  margin-top: 64px;
  margin-bottom: 32px;
}

.logo-text {
  line-height: 1;
  margin-top: 16px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
}


.login-logo {
  max-width: 159px;
  max-height: 56px;
}

.form-box {
  margin: 0 70px;
}

.form-title {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  padding-top: 55px;
  padding-bottom: 20px;
  color: #3aaaf5;
}

.login-btn {
  width: 100%;
  margin-top: 16px;
}
</style>
