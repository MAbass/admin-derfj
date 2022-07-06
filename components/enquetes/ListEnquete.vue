<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddenquete"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Ajouter une enquete
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-enquete :tab="item.value"></table-enquete> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableEnquete from '@/components/enquetes/TableEnquete'
  export default {
    components: {
      TableEnquete
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tous les enquetes',value:'tout'}, {title:'Investissement à valider',value:true}
      ],
      selected: []
    }),
    methods:{
      goToAddenquete() {      
        this.$router.push('/enquetes/addInvestissement');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>