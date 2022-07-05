<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.annee && detailprojet.annee[0]">
                  <p class="info-profil"><span>Année : </span>{{detailprojet.annee[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.structure && detailprojet.structure[0]">
                  <p class="info-profil"><span>Structure : </span>{{detailprojet.structure[0].nom_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.region && detailprojet.region[0]">
                  <p class="info-profil"><span>Région : </span>{{detailprojet.region[0].nom_region}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.monnaie && detailprojet.monnaie[0]">
                  <p class="info-profil"><span>Monnaie : </span>{{detailprojet.monnaie[0].libelle}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.dimension && detailprojet.dimension[0]">
                  <p class="info-profil"><span>Dimension : </span>{{detailprojet.dimension[0].libelle_dimension}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.numero_agrement">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailprojet.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.telephone_projet">
                  <p class="info-profil"><span>Téléphone : </span>{{detailprojet.telephone_projet}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.email_projet">
                  <p class="info-profil"><span>Email : </span>{{detailprojet.email_projet}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.type_zone_interventions && detailprojet.type_zone_interventions[0]">
                  <p class="info-profil"><span>Zone d'intervention : </span>{{detailprojet.type_zone_interventions[0].libelle_zone}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.sourc && detailprojet.source[0]">
                  <p class="info-profil"><span>Source de financement : </span>{{detailprojet.source[0].libelle_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailprojet.status">
                  <p class="info-profil"><span>Status: </span>
                    <v-chip
                      :color="(detailprojet.status=='a_valider' && 'primary') || (detailprojet.status=='rejete' && 'error') || (detailprojet.status=='brouillon' && 'orange') || (detailprojet.status=='publie' && 'green')"
                      small
                      outlined
                      class="my-1 mr-1"
                    >
                      {{ (detailprojet.status=='a_valider' && 'A valider') || (detailprojet.status=='rejete' && 'Rejeté') || (detailprojet.status=='brouillon' && 'Brouillon') || (detailprojet.status=='publie' && 'Publié')}}
                    </v-chip>
                  </p>
                  <p class="info-profil" v-if="detailprojet.status=='rejete'"><span>Motif du rejet : </span>{{detailprojet.motif_rejet}}</p>
              </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.getDetail(this.id)
    },
    computed: mapGetters({
      detailprojet: 'projets/detailprojet'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/projets/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('projets/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationprojet)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/projets');
      },
    },
  }
</script>
