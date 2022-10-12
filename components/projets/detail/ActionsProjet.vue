<template>
  <v-row
    align="center"
    justify="space-around"
  >
  <v-dialog
    v-model="dialog1"
    max-width="1200px"
    scrollable
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      v-bind="attrs"
          v-on="on"
        depressed
        rounded
        color="primary"
        outlined
        >
        <v-icon left>
          mdi-plus
        </v-icon>
        Enquette point focal
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <form-add-enquette></form-add-enquette>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog1 = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialog2"
    max-width="1200px"
    scrollable
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      v-bind="attrs"
          v-on="on"
        depressed
        rounded
        color="primary"
        outlined
        >
        <v-icon left>
          mdi-plus
        </v-icon>
        Analyse risques environnementaux et sociaux
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <form-add-enquette></form-add-enquette>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog2 = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog> 
  <v-dialog
    v-model="dialog3"
    max-width="1200px"
    scrollable
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      v-bind="attrs"
          v-on="on"
        depressed
        rounded
        color="primary"
        outlined
        >
        <v-icon left>
          mdi-plus
        </v-icon>
        Analyse genre
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <form-add-enquette></form-add-enquette>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="dialog3 = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog> 
    <v-btn
      flat
      rounded
      outlined
      v-on:click="modifier()"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier
    </v-btn>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import FormAddEnquette from '@/components/projets/detail/FormAddEnquette'
  export default {
    components: {
      FormAddEnquette
    },
    mounted: function() {
      //this.model.email = this.detailProjet.email
    },
    computed: mapGetters({
      detailProjet: 'projets/detailprojet'
    }),
    data: () => ({
      dialog1: false,
      dialog2: false,
      dialog3: false,
      listProjets:[]
    }),
    methods: {
     submitForm () {
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire++++++: ',{...this.model,token:this.tokenTemporaire})

        this.loading = true;
        
        validation && this.$msasApi.post('/update_password', {...this.model})
          .then((res) => {    
            this.message = res.data.message
            this.color = 'success'
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error.response.data.message)
              this.message = error.response?.data?.message || 'Echec de la connection'
              this.color='red'
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
            this.dialog = false
        }); 
      },
      retour(){       
        this.$router.push('/projets');
      },
      modifier(){ 
        this.$router.push('/projets/modifier/'+this.detailProjet.id);      
      },
      reinitialiser(){  
        this.dialog = true    
      },
    },
  }
</script>