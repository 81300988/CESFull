<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">
        <b class="font-header">East India Trading Co.</b>
      </h2>
      <label for="username" class="sr-only">Email address</label>
      <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only" >Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="alert alert-danger alert-font" v-if="error">{{ error }}</div>
      <button class="btn btn-lg btn-primary btn-block font-button" type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  updated () {
    if (localStorage.token !== undefined) {
      this.$router.replace(this.$route.query.redirect || '/search')
    }
  },
  methods: {
    login () {
      this.axios.post('/v1/login', { username: this.username, password: this.password })
           .then(request => this.loginSuccessful(request))
            .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data) {
        this.loginFailed()
        return
      }
      this.error = false
      localStorage.token = req.data.token
      this.$router.replace(this.$route.query.redirect || '/search')
    },
    loginFailed () {
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}
</script>

<style lang="css">
.body {
  background:white;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.font-header {
  font-family: Impact;
}

.form-signin {
  max-width: 400px;
  padding: 10% 15px;
  margin: 0 auto;

  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 30px;
  text-transform: uppercase;
  text-align: center;

  color: #22478E;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 20px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  margin-top: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.font-button{
  font-family: Montserrat;
  background-color: #22478E;
  border-color:#22478E;
  border: 0px solid transparent;
}

.password-field{
  margin-top: 10px;
}

.alert-font{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  font-family: Arial;
  text-transform: none;
}

.password-field{
  margin-top: -100px;
}
    
</style>