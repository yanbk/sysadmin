<template>
  <el-dialog title="外层 Dialog" :visible.sync="outerVisible" :before-close="closeDialog">
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(111)
    if (this.isShow) {
      this.outerVisible = true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>