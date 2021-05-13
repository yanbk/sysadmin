<template>
  <div>
    <Uploader :limit="limit" :fileList="fileList" @getFileList="getFileList" />
    <vueCropper @getFile="getFile" />
  </div>
</template>

<script>
import Uploader from '@/components/upload/image'
import vueCropper from '@/components/upload/cropper'
export default {
  name: 'SingleImageUpload',
  components: {
    Uploader,
    vueCropper
  },
  props: {},
  data() {
    return {
      fileList: [{url: 'https://www.baidu.com/img/flexible/logo/pc/result.png'}],
      limit: 1,
      imageUrl: '',
      disabled: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    setImgBase64(fileList) {
      var _this = this;
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result
        reader.readAsDataURL(fileList[0])
      }
    },
    getFileList(fileList) {
      console.log(fileList)
    },
    getFile(file) {
      console.log(file)
      let reader = new FileReader()
      reader.onload = (e) => {
        console.log(e.target.result)
      }
      //转化为base64
      reader.readAsDataURL(file)
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
