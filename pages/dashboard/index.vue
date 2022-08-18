<template>
  <div> 
    <div class="custom-container mt-5">
      <v-row class="d-flex justify-content-between">
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5">
            <h4 class="">NOMBRE DE REGION COUVERTE</h4>
            <h1 class="">14</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5">
            <h4 class="">NOMBRE DE DEPARTEMENT</h4>
            <h1 class="">46</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5">
            <h4 class="">NOMBRE TOTAL DE REPONSE</h4>
            <h1 class="">174</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron pl-4 pr-5 pt-5 pb-5">
            <h4 class="">NOMBRE TOTAL DE SECTEUR</h4>
            <h1 class="">174</h1>
          </div>
        </v-col>
      </v-row>
      <list-chart></list-chart>    
    </div> 
  </div>
</template>

<script>
import ListChart from '@/components/statistiques/charts/ListChart';
import LeftMenu from '@/components/LeftMenu';
import StatBox from '@/components/dashboard/admin/StatBox';

  export default {
    layout: "dashboard",
    components: {
      StatBox,
      LeftMenu,
      ListChart
    },
    mounted: function() {
      //!this.$hasRole('admin') && this.getDashboardData()
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',name:'voir_dashboard' },
          { text: 'Mon activite', icon: 'mdi-clock-outline',link:'/dashboard/monactivite',name:'voir_mon_activite' }
        ]
      }
    },
    methods:{
      getDashboardData(){
        this.$essApi.$get('/dashboard-employee')
        .then(async (response) => { 
          console.log('Données reçu+++++++++++',response)
              await this.$store.commit('dashboard/initdashboardData', response)
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
          console.log('Requette envoyé ')
        });
      }
    }
  }
</script>

<style scoped>
.bg-marron {
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
  color: grey;
}
.bg-marron:hover {
  background-color: #7e4f25;
  color: #fff !important;
}
.color-white{
  color: #fff;
}
.border-right-solid{
  border-right: solid 1px #ffffff59;
  padding: 20px;
}
</style>
