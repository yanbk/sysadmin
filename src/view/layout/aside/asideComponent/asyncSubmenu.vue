<template>
  <el-submenu :popper-append-to-body="false" ref="subMenu" :index="routerInfo.name">
    <template slot="title">
      <!-- <i :class="'el-icon-'+routerInfo.meta.icon"></i>
      <span slot="title">{{routerInfo.meta.title}}</span> -->
      <item v-if="routerInfo.meta" :icon="routerInfo.meta && routerInfo.meta.icon" :title="routerInfo.meta.title" />
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
import Item from './item'
export default {
  name: 'AsyncSubmenu',
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