 <template>
    <layout-default :showNav="showNav" isPriceActive="true">
        <div>
            <div class="table">
                    <h1>NOVEMBER-APRIL</h1>
                    <form @submit="formSubmit($event,'NOV')" >
                        <table>
                            <tr>
                                <th>Weight(kg)</th>
                                <th>Price per segment($)</th>
                            </tr>
                            <tr>
                                <td><label>Below 10</label></td>
                                <td><input type="text" v-model="NBelowten"></td>
                            </tr>
                            <tr>
                                <td><label>From 10 to 50</label></td>
                                <td><input type="text" v-model="NFrom10to50"></td>
                            </tr>
                            <tr>
                                <td><label>Above 50</label></td>
                                <td><input type="text" v-model="NAbove50"></td>
                                <td><button class="btn btn-success bleft">Save</button></td>
                            </tr>
                        </table>
                    </form>
                </div>

                <div class="table">
                    <h1>MAY-OCTOBER</h1>
                    <form @submit="formSubmit($event,'MAY')" >
                        <table>
                            <tr>
                                <th>Weight(kg)</th>
                                <th>Price per segment($)</th>
                            </tr>
                            <tr>
                                <td><label>Below 10</label></td>
                                <td><input type="text" v-model="MBelowten"></td>
                            </tr>
                            <tr>
                                <td><label>From 10 to 50</label></td>
                                <td><input type="text" v-model="MFrom10to50"></td>
                            </tr>
                            <tr>
                                <td><label>Above 50</label></td>
                                <td><input type="text" v-model="MAbove50"></td>
                                <td><button class="btn btn-success bleft">Save</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
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
       NBelowten: 8,
       NFrom10to50: 9,
       NAbove50: 10,
       MBelowten: 4,
       MFrom10to50: 5,
       MAbove50: 6,
       showNav: true,
       output: ''
     }
   },
   methods: {
     formSubmit (e, de) {
       e.preventDefault()
       let currentObj = this
       if (de === 'NOV') {
         this.axios.post('http://localhost:53842/Home/Post', {
           NBelowten: this.NBelowten,
           NFrom10to50: this.NFrom10to50,
           NAbove50: this.NAbove50
         })
                .then(function (response) {
                  currentObj.output = response.data
                })
                .catch(function (error) {
                  currentObj.output = error
                })
       } else {
         this.axios.post('http://localhost:53842/Home/Post', {
           MBelowten: this.MBelowten,
           MFrom10to50: this.MFrom10to50,
           MAbove50: this.MAbove50
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
 }
 </script>

 <style>
 table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
}

td, th {
  text-align: center;
  padding: 0px;
}

.table{
    margin: 82px;
}
 </style>
 
 
 