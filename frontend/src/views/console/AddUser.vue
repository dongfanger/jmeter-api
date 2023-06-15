<template>
  <div class="page-wrap">
    <el-dialog :title="dialogTitle" :visible="visible" width="600px" :close-on-click-modal="false" @close="onResetForm">
      <el-form :model="userForm" ref="userFormRef" label-width="100px" :rules="rules" class="form-common">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" class="input-380"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入昵称" class="input-380"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员" style="margin-bottom: 10px;">
          <el-radio-group v-model="userForm.isSuperuser">
            <el-radio :label=0>否</el-radio>
            <el-radio :label=1>是</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="!id">
          <el-form-item label="初始密码" style="margin-bottom: 10px;">
            <span>123456</span>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onResetForm">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nameValidator } from "@/utils/const";

export default {
  name: "AddUser",
  props: {
    dialogTitle: {
      type: String,
      default: "新增",
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    visible() {
      return this.dialogFormVisible;
    },
  },
  watch: {
    dialogFormVisible(val) {
      if (val && this.id) {
        this.getDetail();
      }
    },
  },
  data() {
    return {
      isLoading: false,
      userForm: {
        username: "",
        nickname: "",
        password: "123456",
        isSuperuser: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: nameValidator, trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { validator: nameValidator, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getDetail() {
      this.$http.get(`/users/${this.id}`).then(({ data }) => {
        this.userForm.username = data.data.username;
        this.userForm.nickname = data.data.nickname;
        this.userForm.isSuperuser = data.data.isSuperuser;
      });
    },
    onResetForm() {
      this.$refs.userFormRef.resetFields();
      this.isLoading = false;
      if (this.id) {
        this.userForm.username = "";
        this.userForm.nickname = "";
      }
      this.$emit("update:dialogFormVisible", false);
    },
    onSubmit() {
      this.$refs.userFormRef.validate(valid => {
        if (valid) {
          this.userForm.username = this.userForm.username.trim();
          this.userForm.nickname = this.userForm.nickname.trim();
          this.isLoading = true;
          this.onRequest();
        }
      });
    },
    onRequest() {
      const { username, nickname, isSuperuser, password } = this.userForm;
      let params = {
        username,
        nickname,
        isSuperuser,
        password
      };
      let $method = "post";
      let $url = "/users/";
      if (this.id) {
        $method = "put";
        $url = `/users/${this.id}`;
      }
      this.$http[$method]($url, params)
        .then(() => {
          this.$notifyMessage("保存成功", { type: "success" });
          this.onResetForm();
          this.$emit("success");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
