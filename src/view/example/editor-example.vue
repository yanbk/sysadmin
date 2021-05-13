<template>
  <div>
    <Editor @getEditor="getEditor" />
  </div>
</template>

<script>
import Editor from '@/components/editor'
export default {
  name: "EditorExample",
  components: {
    Editor
  },
  methods: {
    getEditor(e) {
      console.log(e)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
