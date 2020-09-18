<template>

<input v-model="message"/>
<button @click="add">add </button>
<ul id="example-1">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</ul>

<ul id="example-2">
  <li
    v-for="item in newItems" :key="item"
    v-bind:style="{ backgroundColor: item.bg }"
  >
    {{ item.value }}
    <button @click="deleteItem(item.value)">xxx</button>
  </li>
</ul>

</template>

<script>

function getRandomColor () {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 内联处理器中的方法 https://cn.vuejs.org/v2/guide/events.html
export default {
  data: (a) => {
    return {
      title: 'test',
      newItems: []
    }
  },
  name: 'Todo',
  methods: {
    add () {
      console.log(this.message)
      if (this.message) {
        this.newItems.push({ value: this.message, bg: getRandomColor() })
        this.message = ''
      } else {
        alert('please input something')
      }
    },
    deleteItem (item) {
      console.log(item)
      this.newItems = this.newItems.filter(({ value: currentItem }) => currentItem !== item)
    }
  },
  props: {
    items: Array
  }
}

/*

random background

*/
</script>

<style scoped>

</style>
