<template>
  <div id="div1"></div>
</template>
<script>
import E from 'wangeditor'
import TextIndent from './textIndent'
export default {
  name: '',
  components: {},
  props: {
    richData: {
      type: String
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {},
  watch: {
    richData(newData) {
      console.log(newData)
      this.editor.txt.html(newData)
    }
  },
  mounted() {
    console.log(this.richData)
    var _this = this
    this.$nextTick(() => {

      this.editor = new E('#div1')
      this.editor.config.onchange = function (newHtml) {
        _this.$emit('getEditor', newHtml)
      }
      this.editor.menus.extend('textIndent', TextIndent)  // 配置扩展的菜单
      this.editor.config.menus = this.editor.config.menus.concat('textIndent')
      this.editor.config.excludeMenus = [
        'indent'
      ]
      // this.editor.config.uploadFileName = 'file'
      // this.editor.config.uploadImgServer = 'http://cq3dev.gzlxq.com/index/other.tools/uploadImageFileTest'
      console.log(111)
      this.editor.create()
      this.editor.txt.html(this.richData)
    })
  },
  methods: {
    
  }
}
</script>
<style>
</style>