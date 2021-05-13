<template>
  <div>
    <el-upload
      ref="upload"
      action="#"
      :limit="limit"
      :auto-upload="false"
      list-type="picture"
      :file-list="fileList"
      :on-change="onUploadChange"
      :on-remove="onUploadremove"
      :on-success="onUploadsuccess"
    >
      <el-button size="small" :disabled="disabled" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'SingleImageUpload',
  props: {
    fileList: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      imageUrl: '',
      disabled: false
    }
  },
  computed: {},
  mounted() {
    console.log(this.fileList)
    if (this.fileList.length >= this.limit) {
      this.disabled = true
    } else {
      this.disabled = false
    }
  },
  methods: {
    onUploadChange(file, fileList) {
      this.$emit('getFileList', fileList)
      if (fileList.length >= this.limit) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    onUploadremove(file, fileList) {
      if (fileList.length >= this.limit) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    onUploadsuccess(res) {
      console.log(res)
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
