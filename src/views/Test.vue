<template>
  <input v-model="searchTerm" type="text" @keyup="test" />
  <p>{{ searchTerm }}</p>
  <p>{{count}}</p>
  <button @click="count++">press</button>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch, watchEffect } from '@vue/runtime-core';
export default {
    name: 'TestView',
    setup() {
      const searchTerm = ref("");
      const count = ref(1)

    const test = () => {
        console.log(searchTerm.value)
    }
      watchEffect(() => console.log(searchTerm.value))

      return {test, count, searchTerm}

    }
  }
</script>

<style>

</style>