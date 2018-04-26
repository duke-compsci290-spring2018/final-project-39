<template>
  <div id="app">
  	<router-link to="/signedin">login</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
