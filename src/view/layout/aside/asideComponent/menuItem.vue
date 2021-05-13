<template>
  <el-menu-item :index="routerInfo.name" :route="{parameters:routerInfo.parameters}">
    <!-- <i :class="'el-icon-'+routerInfo.meta.icon"></i>
    <span slot="title">{{routerInfo.meta.title}}</span> -->
    <item v-if="routerInfo.meta" :icon="routerInfo.meta && routerInfo.meta.icon" :title="routerInfo.meta.title" />
  </el-menu-item>
</template>

<script>
import Item from './item'
export default {
  name: 'MenuItem',
  components: { Item },
  props: {
    routerInfo: {
      default: function() {
        return null
      },
      type: Object
    }
  }
}
</script>
<style lang="scss">
</style>