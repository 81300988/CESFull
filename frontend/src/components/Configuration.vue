<template>
    <layout-default :showNav="showNav" isConActive="true">
        <div class="place">  
            <table>
                <div class="maximunweight">
                    <h1>MAXIMUM WEIGHT</h1>
                    <tr>
                        <td><input type="text" v-model="maximunweight"></td> 
                        <td><button v-on:click="SavePackage" class="btn btn-success bleft">Save</button></td>
                    </tr><br>
                </div>
                
                <div class="timepersegment">
                    <h1>TIME PER SEGMENT</h1>
                    <tr>
                        <td><input type="text" v-model="timepersegment"></td> 
                        <td><button v-on:click="SavePackage" class="btn btn-success bleft">Save</button></td>
                    </tr>
                </div>
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
      timepersegment: 0,
      maximunweight: 0,
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
  width: 30%;
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
  width: 80px;
  height: 50px;
  right: 10px;
}
h1{
    width: 140%;   
}
.maximunweight{
    margin: 40px;
}
.timepersegment{
    margin: 40px;
}
</style>
