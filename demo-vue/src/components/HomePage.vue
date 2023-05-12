<template>
      <div>
        <h1>This is 1st View</h1>
        <ul>
            <li v-for="(item, index) in data" :key="index">{{ item }}</li>
        </ul>
    </div>

</template>

<script>
export default {
    name: "HomePage",
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>