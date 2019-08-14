
<template>
    <layout-default :showNav="showNav">
        <div>
            <div class="margin">
            <form @submit="formSubmit"  >
                <div class="row" >
                    <div class="col-sm-4 ">
                        <label class="font">Depature</label>
                        <v-select  v-model="Depature" :options="options" @search="onSearch">
                        </v-select>
                    </div>
                    <div class="col-sm-4 ">
                        <label class="font">Arrival</label>
                        <v-select  v-model="Arrival" :filterable="false" :options="options" @search="onSearch">
                        </v-select>
                    </div>
                    <div class="col-sm-4 ">
                        <label class="font">Package Content</label>
                        <v-select  v-model="PackageContent" :filterable="false" :options="PackageContentSearch" >
                        </v-select>
                    </div>
                </div>

                <div class="row" >
                    <div class="col-sm-4 ">
                        <label class="lweight font">Weight (kg)</label><br>
                        <input class = "fweight" type="text" v-model="Weight">
                    </div>
                    <div class="col-sm-4 ">
                        <label class="font">Shipping Date</label><br>
                        <input class = "fweight" type="date" name="bday" v-model="ShippingDate">
                    </div>
                    <div class="col-sm-4 ">
                        <p class="pmargin">
                            <button class="btn btn-success bleft">Search</button>
                        </p>
                    </div>
                </div>
                </form>
            </div>

            <div class="cheapest">
                <h1>Cheapest</h1>
                <table>
                    <tr>
                        <th class="column_1">Departure</th>
                        <th class="column_1">Arrival</th>
                        <th class="column_2">Shipping Service</th>
                        <th class="column_3">Price ($)</th>
                        <th class="column_4">Number of hours</th>
                    </tr>
                    <tr v-for="(item,index) in output.cheapest" v-bind:key="index">
                        <td>{{item.departure}}</td>
                        <td>{{item.arrival}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.duration}}</td>
                    </tr>
                </table>
            </div>

            <div class="fastest">
                <h1>Fastest</h1>
                <table>
                    <tr>
                        <th class="column_1">Departure</th>
                        <th class="column_1">Arrival</th>
                        <th class="column_2">Shipping Service</th>
                        <th class="column_3">Price ($)</th>
                        <th class="column_4">Number of hours</th>
                    </tr>
                    <tr v-for="(item,index) in output.fastest" v-bind:key="index">
                        <td>{{item.departure}}</td>
                        <td>{{item.arrival}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.duration}}</td>
                    </tr>
                </table>
            </div>

        </div>
	</layout-default>
  
</template>

<script>
import _ from 'lodash'
import 'vue-select/dist/vue-select.css'
import LayoutDefault from '../components/LayoutDefault.vue'
export default {
  components: {
    LayoutDefault
  },
  data () {
    return {
      options: [],
      results: [],
      output: {},
      Depature: '',
      Arrival: '',
      PackageContent: '',
      Weight: '',
      ShippingDate: '',
      showNav: false,
      PackageContentSearch: [
        'Live Animals',
        'Weapon',
        'Refrigirated goods'
      ]
    }
  },
  methods: {
    onSearch (search, loading) {
      loading(true)
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      fetch(
        `http://localhost:4000/v1/locations`
      ).then(res => {
        res.json().then(json => (vm.results = [...json]))
        vm.options = vm.results.filter(function (item) {
          return item.includes(search)
        })
        console.log(vm.options)
        loading(false)
      })
    }, 350),

    formSubmit (e) {
      e.preventDefault()
      let currentObj = this
      let content
      if (this.PackageContent === 'Live Animals') {
        content = 'LA'
      }
      if (this.PackageContent === 'Weapon') {
        content = 'WE'
      }
      if (this.PackageContent === 'Refrigirated goods') {
        content = 'RE'
      }
      this.axios.get('http://localhost:4000/v1/search', {
        params: {
          departure: this.Depature,
          arrival: this.Arrival,
          contents: content,
          weight: this.Weight,
          shipDate: this.ShippingDate
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
    }
  }

}
</script>

<style scoped>

.fweight{
  width: 100%;
}

.column_1{
  width: 25%;
}

.column_2{
  width: 25%;
}

.column_3{
  width: 8%;
}

.margin {
    width: 100%;
    margin-top: 20px;
}
.row1 {
  width: 500px;
}
.pmargin {
  margin-top: 29px;
}
label {
    display: inline-block;
    margin-top: 1.5rem;
}
.bleft{
    margin-top: 1.5rem;
    width: 60%;
}
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.cheapest{
  margin-top: 30px;
  margin-left: 0%;
}

.fastest{
  margin-top: 50px;
  margin-left: 0%;
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
    margin: 52px;
}

.row {
  width: 85%;
  margin-left: 5%;
}

.col-sm-4 {
  font-family: Arial;
}

.font {
  font-family: Arial;
  font-size: 16px;
  font-weight: 900;
}
</style>