<template>
    <layout-default :showNav="showNav" isRoActive="true">
        <div class="place">
          <tr cellspacing="0" cellpadding="0" class="header_css">
              <td style="border: none;"><h1>ROUTES</h1></td>
              <td style="border: none;"><button class="btn btn-success bright" v-on:click="IsShowAdd = true">Add+</button></td>
          </tr><br>
        
            <table>
                <tr>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Segments</th>
                </tr>
                <tr v-if="IsShowAdd">
                    <td><input type="text" v-model="Newdeparture"></td>
                    <td><input type="text" v-model="Newarrival "></td>
                    <td><input type="text" v-model="Newsegments"></td>
                    <td><button v-on:click="SavePackage" class="btn btn-success bleft">Save</button></td>
                </tr>
                <tr v-for="(item,index) in output" v-bind:key="index" >
                    <td>{{ item.departureLocation.name }}</td>
                    <td>{{ item.destinationLocation.name }}</td>
                    <td>{{ item.cost }}</td>
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
      Newdeparture: '',
      Newarrival: '',
      Newsegments: '',
      IsShowAdd: false
    }
  },
  created () {
    let currentObj = this
    this.axios.get('http://13.67.44.85/v1/routes', {
      params: {
        weight: 2
      },
      headers: {
        'Authorization': localStorage.token
      }
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
      this.axios.post('http://localhost:53842/Home/Post', {
        NewPackage: this.NewPackage,
        NewFee: this.NewFee
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
</style>
