<template>
    <nav>
        <router-link to="/view1">HomePage</router-link>
        <router-link to="/view1">Scenario1</router-link>
        <router-link to="/view2">Scenario2</router-link>
<!--        <router-link to="/view3">Scenario3</router-link>-->
    </nav>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
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