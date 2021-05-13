<template>
  <div>
    <el-button @click="showDialog = true">open</el-button>
    <Dialog v-if="showDialog" :isShow="showDialog" @closeDialog="closeDialog" />
  </div>
</template>
<script>
import info from '@/mixins/infoList'
import Dialog from '@/components/dialog/dialog'
export default {
  name: 'Example',
  mixins: [info],
  components: {
    Dialog
  },
  data() {
   return {
     showDialog: false
   }
  },
  computed: {},
  mounted() {},
  methods: {
    closeDialog(e) {
      this.showDialog = e
    }
  }
}
</script>
<style>
</style>