<template>
  <div class="card-popup__checkboxes">
    <div v-for="(check, inx) in checkboxes" :key="inx" class="checkbox">
      <input
        :id="'payment' + inx"
        :value="check"
        class="checkbox__input"
        type="checkbox"
        v-model="checkedNames"
        
      />
      <label class="checkbox__label" :for="'payment' + inx">
        {{ check }}
        
      <span class="span">{{inx === 1 ? ' во ' : ' в '}}{{inx + 1}}-{{endings(inx + 1)}} год</span> 
      </label>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { createCheckbox, getEndings } from "../assets/js/some_foo";
import { useStore } from "vuex";
export default {
  name: "TheCheckbox",
  props: {
    mounthlySalary: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();
    const checkedNames = ref([]);
    const checkboxes = ref([]);

    function endings(int){
        return getEndings(int)
    }

    const summ = props.mounthlySalary * 12 * 0.13;

    const mounth = computed(() => {
      if (summ > store.state.total) {
        return store.state.total;
      }
      return summ;
    });

    createCheckbox(store.state.total, mounth.value, checkboxes.value);

    return {
      checkedNames,
      checkboxes,
      endings
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/config.scss";
@import "../assets/style/case/checkbox.scss";
.card-popup__checkboxes {
  width: 100%;
}
.span{
  color: $text-grey;
 
}

</style>