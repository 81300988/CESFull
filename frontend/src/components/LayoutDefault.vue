<template>
  <div>
    <header class="header">
      <div class="av-logo">
        <a href="/">
          <img class="logo" style="border:1px solid red; height:40px;" src="..\img\Logo.png" />
        </a>
        <b class="font-header">East India Trading Co.</b>
        <div class="logout">
          <button class="logout" v-on:click="logout">Logout</button>
        </div>
      </div>
    </header>
    <body class="content">
      <div class="tab">
        <ul>
          <li>
            <router-link class="tablinks" to="/search">Search</router-link>
          </li>
          <li>
            <router-link class="tablinks" to="/pricelist">Administration</router-link>
          </li>
        </ul>
      </div>
      <div class="Layoutadmin">
        <nav class="Layoutadmin__nav" v-if="showNav">
          <router-link class="tab_admin" to="/pricelist" v-bind:class="{ active: isPriceActive }">Price List</router-link>
          <router-link class="tab_admin" to="/extrachange" v-bind:class="{ active: isExActive }">Extra Change</router-link>
          <router-link class="tab_admin" to="/places" v-bind:class="{ active: isPlaActive }">Places</router-link>
          <router-link class="tab_admin" to="/routes" v-bind:class="{ active: isRoActive }">Routes</router-link>
          <router-link class="tab_admin" to="/configuration" v-bind:class="{ active: isConActive }">Configuration</router-link>
        </nav>
        <main class="LayoutDefault__main">
        <slot />
      </main>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  props: {
    showNav: false,
    isPriceActive: false,
    isExActive: false,
    isPlaActive: false,
    isRoActive: false,
    isConActive: false
  },
  data () {
    return {}
  },
  methods: {
    logout () {
      delete localStorage.token
      this.$router.replace(this.$route.query.redirect || '/')
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  /* width: 200px; */
  background-color: #f1f1f1;
  font-family: Montserrat;
  font-size: 20px;
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
.Layoutadmin__nav {
  float: left;
  position: relative;
  text-align: center;
  width: 100%;
  background: #22478e;
  color: black;
}

.tab_admin {
  float: left;
  text-align: center;
  width: 20%;
  background: #22478e;
  color: red;
  font-family: Arial;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
}

.LayoutDefault__main{
  margin-top: 0%;
}

.active,
.btn:hover {
  background-color: #666;
  color: white;
}

.header {
  background-color:#E5E5E5;
  padding: 20px;
  padding-left: 0%;
}

.font-header {
  font-family: Impact;
  max-width: 400px;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 30px;
  text-transform: uppercase;
  text-align: left;
  color: #22478e;
}
.logo {
  margin-top: -13px;
}

.logout {
  float: right;
  font-family: Montserrat;
  font-size: 20px;
  background-color: #E5E5E5; 
  color: #22478e;
}

.content {
  position: relative;
  margin-top: 0;
}

.tab {
  float: left;
  margin-top: 0%;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 15%;
  height: 100%;
  /* margin-top: -57px; */
  padding-left: 0%;
  padding-top: 0%;
  top:0;
}

.Layoutadmin{
  position: relative;
  float: left;
  width: 85%;
}
</style>
