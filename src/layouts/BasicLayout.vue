<template>
  <div class="basic-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  ref,
  toRefs,
  onBeforeMount,
  onMounted,
  watch,
} from 'vue';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    return {};
  },
});
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;
  background-image: url('../assets/bc-img.jpeg');
}
</style>
