<template>
  <div>
    <div class=" clearfix">
        <pan-thumb></pan-thumb>
        <div class="info-container">
          <p class="display_name">{{ userInfo.c_name }}</p>
        </div>
      </div>
      <div>
        <img :src="emptyGif" class="emptyGif">
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import emptyGif from '@/assets/person.gif'
export default {
  name: "Dashboard",
  data() {
    return {
      emptyGif: emptyGif
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"]),
  },
  components: {
    PanThumb
  },
  mounted() {
    console.log(this.userInfo)
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
.admin-box{
  background: #e3e3e3;
}
.info-container {
  position: relative;

  .display_name {
    display: block;
    width: 150px;
    font-size: 24px;
    line-height: 30px;
    color: #212121;
    position: absolute;
    text-align: center;
  }
}
</style>
