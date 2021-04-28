<template>
  <div class="dashboard">
    <template v-for="item in cardList" :key="item.id">
      <div class="card">
        <div>
          <h3>
            {{ item.name }}
          </h3>

          <div>
            content
          </div>
        </div>
      </div>
    </template>
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
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    const cardList = reactive([
      {
        id: 1,
        name: '个人中心',
      },
      {
        id: 1,
        name: '商业中心',
      },
      {
        id: 1,
        name: '管理中心',
      },
    ]);

    onBeforeMount(() => {});
    onMounted(() => {});
    return {
      cardList,
    };
  },
});
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & > .card {
    width: 24%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > div {
      width: 80%;
      height: 80%;
      background-color: rgba(1, 1, 1, 0.4);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Verdana, Geneva, Tahoma;

      & > h3 {
        width: 100%;
        line-height: 40px;
        text-align: center;
        border-bottom: 2px solid rgba(245, 245, 245, 0.5);
      }
    }
    & > div:hover {
      animation: changeColor 3s infinite;
    }
  }
}
@keyframes changeColor {
  from {
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0);
  }
  to {
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.8);
  }
}
</style>
