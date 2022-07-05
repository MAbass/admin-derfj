<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container mt-5">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
      <form-add-projet></form-add-projet>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormAddProjet from '@/components/projets/FormAddProjet';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddProjet
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-projets')){
        return redirect('/')
      }
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('projets/getList')
      this.$store.dispatch('fournisseurs/getList') */
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      this.$store.dispatch('dimensions/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('structures/getList')
      this.$store.dispatch('modefinancements/getList')
      this.$store.dispatch('piliers/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Enquetes',
          disabled: false,
          to: '/enquetes',
          exact: true
        },
        {
          text: 'Nouvelle enquete',
          disabled: false,
          to: '/enquetes/addprojet',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
