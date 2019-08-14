<template>
    <layout-default :showNav="showNav" isPlaActive="true">
        <div class="place">
          <tr cellspacing="0" cellpadding="0" class="header_css">
              <td style="border: none;"><h1>PLACE</h1></td>
              <td style="border: none;"><button class="btn btn-success bright" v-on:click="IsShowAdd = true">Add+</button></td>
          </tr><br>
        
            <table we>
                <tr>
                    <th>Place</th>
                </tr>
                  <tr v-if="IsShowAdd" >
                    <div class="placebtn">
                      <td><input class="add_new" type="text" v-model="Place"></td>
                      <td><button v-on:click="SavePackage" class="btn btn-success bleft">Save</button></td>
                    </div>
                </tr>
                
                <tr v-for="(item,index) in output" v-bind:key="index" >
                    <td>{{ item }}</td>
                </tr>
            </table>     
        </div>
    </layout-default>
</template>

<script>
import LayoutDefault from '../components/LayoutDefault.vue'

export default {
  components: {
    LayoutDefault
  },
  data () {
    return {
      output: [],
      showNav: true,
      Place: '',
      IsShowAdd: false
    }
  },
  created () {
    let currentObj = this
    this.axios.get('/v1/locations', {
    })
                .then(function (response) {
                  currentObj.output = response.data
                })
                .catch(function (error) {
                  currentObj.output = error
                })
  },
  methods: {
    SavePackage (e) {
      this.IsShowAdd = false
      let currentObj = this
      this.axios.post('/v1/locations', {
        Place: this.Place
      })
                .then(function (response) {
                  currentObj.output = response.data
                })
                .catch(function (error) {
                  currentObj.output = error
                })
    }
  }
}
</script>

<style scoped>
.place{
  margin-top: 130px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 500px;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.table{
    margin: 82px;
}
.bright{
  width: 120px;
  height: 40px;
  right: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.header_css{
  border-collapse: collapse;
  border: none;
}
.data_place1{
  width: 350px;
}

.data_place2{
  width: 150px;
}

.bleft {
position: relative;
margin-left: 100%;
width: 100px;
}
.placebtn{
  width: 30%;
}
.add_new{
  width: 250px;
}
</style>
