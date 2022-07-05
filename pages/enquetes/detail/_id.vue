<template>
  
 <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12" class="my-5">
              <actions-projet></actions-projet>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-projet></info-projet>
            </v-col>
            
          </v-row>
    </v-card>
  </div> 
</div> 
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoProjet from '@/components/projets/detail/InfoProjet';
import ActionsProjet from '@/components/projets/detail/ActionsProjet';
import HistoriqueProjet from '@/components/projets/detail/HistoriqueProjet';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoProjet,
      ActionsProjet,
      HistoriqueProjet,
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-projets')){
        return redirect('/')
      }
    },
    data () {
      return {
        id : this.$nuxt._route.params.id,
        headerItems: [
        {
          text: 'projets',
          disabled: false,
          to: '/projets',
          exact: true
        },
        {
          text: 'Detail projet',
          disabled: true,
          to: '/projets/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
