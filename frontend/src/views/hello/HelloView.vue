<template>
  <NavLeft>
    <div slot="menuItem">
      <el-menu-item index="/hello/world">
        <i class="el-icon-eleme"></i>
        <span slot="title">HelloWorld</span>
      </el-menu-item>
    </div>
  </NavLeft>
</template>
<script>
import NavLeft from "@/components/NavLeft";

export default {
  components: {
    NavLeft,
  },
};
</script>
