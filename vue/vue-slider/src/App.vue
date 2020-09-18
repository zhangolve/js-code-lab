<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Todo
    v-bind:items="[1,2,3]"
  />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
