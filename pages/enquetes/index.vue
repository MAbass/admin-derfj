<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container" flat>  
      <table-projet></table-projet>
    </v-card>
  </div> 
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import TableProjet from '@/components/projets/TableProjet'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-projets')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      TableProjet
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('projets/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des projets',
            disabled: true,
            to: '/projets',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
.bg-title {
  background-color: rgb(227, 235, 243) !important;
  color: #6F96AA;
}
</style>
