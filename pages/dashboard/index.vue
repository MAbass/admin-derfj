<template>
<div>
 
  <div class="custom-container mt-5">
 
       <v-row class="container">
            <v-col md="12" sm="12" lg="12" class="d-flex justify-content-between bg-marron">
              <div class="border-right-solid">
                <h4 class="color-white">NOMBRE TOTAL DE REPONSE</h4>
                <h1 class="color-white">174</h1>
              </div>
              <div class="border-right-solid">
                <h4 class="color-white">NOMBRE DE REGION COUVERTE</h4>
                <h1 class="color-white">14</h1>
              </div>
              <div class="border-right-solid">
                <h4 class="color-white">NOMBRE DE DEPARTEMENT</h4>
                <h1 class="color-white">46</h1>
              </div>
              <div class="border-right-solid">
                <h4 class="color-white">NOMBRE TOTAL DE REPONSE</h4>
                <h1 class="color-white">174</h1>
              </div>
              <div class="border-right-solid">
                <h4 class="color-white">NOMBRE TOTAL DE SECTEUR</h4>
                <h1 class="color-white">174</h1>
              </div>
            </v-col>
            <v-col md="3" sm="12" lg="3">
              <stat-box 
                :title="'Nombre total d\'utilisateurs actifs '"                
                :icon="'mdi-account-group-outline'"
                :nbr="'0'"
                :colorIcon="'#7E4F25'"
                :colorText="'#7E4F25'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="3" sm="12" lg="3">
              <stat-box 
                :title="'Nombre total de financement'"
                :icon="'mdi-credit-card'"
                :nbr="'0'"
                :colorIcon="'#00173F'"
                :colorText="'#00173F'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="3" sm="12" lg="3">
              <stat-box 
                :title="'Nombre total de financement'"
                :icon="'mdi-credit-card'"
                :nbr="'0'"
                :colorIcon="'success'"
                :colorText="'success'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="3" sm="12" lg="3">
              <stat-box 
                :title="'Nombre total de financement'"
                :icon="'mdi-credit-card'"
                :nbr="'0'"
                :colorIcon="'primary'"
                :colorText="'primary'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
        </v-row>

        <v-row class="container">
          <v-card class="container" flat>  
            <list-chart></list-chart>    
          </v-card>
        </v-row>

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
  background-color: #7e4f25;
  border-radius: 5px;
margin: 10px;
}
.color-white{
  color: #fff;
}
.border-right-solid{
  border-right: solid 1px #ffffff59;
  padding: 20px;
}
</style>
