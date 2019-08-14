<template>
  <div>
    <ul>
      <h2>East India</h2>
      <li><router-link to="/search">Search</router-link></li>
      <li><router-link to="/search">Administration</router-link></li>
    </ul>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to East india'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background:white;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

/* Change the link color on hover */
li a:hover {
  background-color: #555;
  color: white;
}
h1{
  text-align: center;
}
</style>
