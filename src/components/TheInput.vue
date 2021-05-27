<template>
  <label class="input-label" for="input-text">Ваша зарплата в месяц</label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', dataInput($event.target.value))"
    @keydown="availableKey($event)"
    id="input-text"
    class="input input-text"
    :class="{
      disabled: $store.state.inputDisabled,
      danger: $store.state.inputDanger,
    }"
    type="text"
    placeholder="Введите данные"
    :disabled="$store.state.inputDisabled"
  />
  <p v-if="$store.state.inputDanger" class="input-warning-text">
    Поле обязательно для заполнения
  </p>
</template>

<script>

import { useStore } from "vuex";
import { makeSpace } from "../assets/js/regexp";

export default {
  name: "TheInput",

  props: {
    modelValue: [Number, String],
  },

  emits: ["update:modelValue"],

  setup() {
    const store = useStore();
    
    function availableKey(event) {
      
      if (!event.key?.match(/([0-9]|Backspace)/)) {
        event.preventDefault();
      }
      store.state.inputDanger = false;
    }

    function dataInput(value) {
      return makeSpace(value);
    }

    return { availableKey, dataInput };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/config.scss";
@import "../assets/style/case/input.scss";
.input-text {
  &.disabled {
    border: 1px solid #808080;
  }
  &.danger {
    border: 1px solid #ea0029;
  }
}
.input-warning-text {
  font-size: 10px;
  line-height: 12px;
  color: #ea0029;
  margin-top: 4px;
}
.input-label {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: $text-color;
}
</style>