<template>
<v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
  <v-stepper
    v-model="step"
    vertical
  >
    <!-- Step:1 Identification de la zone -->
    <v-stepper-step
      :complete="step > 1"
      step="1"
      editable
    >
      Initialisation
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col lg="6" sm="12" md="6">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="model.debut_intervention"
                  :rules="rules.dateRules"
                  label="Date enquete"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.debut_intervention"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Référence projet"
          outlined dense
          v-model="modelProjet.reference_projet"
          :rules="rules.textfieldRules"
          :readonly="hasProject==true"
        ></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Titre du projet"
            outlined dense
            v-model="modelProjet.titre_projet"
            :rules="rules.textfieldRules"
            :readonly="hasProject==true"
          ></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Prénom bénéficiaire"
          outlined dense
          v-model="modelBeneficiaire.prenom_beneficiaire"
          :rules="rules.textfieldRules"
          :readonly="hasProject==true"
        ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-text-field
              label="Nom bénéficiaire"
              outlined dense
              v-model="modelBeneficiaire.nom_beneficiaire"
              :rules="rules.textfieldRules"
              :readonly="hasProject==true"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-text-field
              label="Téléphone du bénéficiaire"
              outlined dense
              v-model="modelBeneficiaire.telephone_beneficiaire"
              :rules="rules.textfieldRules"
              :readonly="hasProject==true"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
            <v-text-field
              label="Numéro CNI du bénéficiaire"
              outlined dense
              v-model="modelBeneficiaire.numero_cin"
              :rules="rules.textfieldRules"
              :readonly="hasProject==true"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Adresse du bénéficiaire"
            outlined dense
            v-model="modelBeneficiaire.adresse_beneficiaire"
            :rules="rules.adresse_beneficiaireRules"
            :readonly="hasProject==true"
          ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="region"
              :rules="rules.selectRules"
              :items="listregions"
              outlined
              dense
              label="Région"
              item-text="nom_region"
              item-value="id"
              return-object
              @change="changeRegion"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="departement"
              :rules="rules.selectRules"
              :items="listdepartements"
              outlined
              dense
              label="Departement"
              item-text="nom_departement"
              item-value="id"
              return-object
              @change="changeDepartement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="commune"
              :rules="rules.selectRules"
              :items="listcommunes"
              outlined
              dense
              label="Commune"
              item-text="nom_commune"
              item-value="id"
              return-object
              @change="changeCommune"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 2"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <!-- Step:2 Section -->
    <v-stepper-step
      :complete="step > 2"
      step="2"
      editable
    >
      Questionnaire
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-form v-model="valid">
              <v-jsf v-model="model" :schema="schema"/>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        color="primary"
         @click="step = 3"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>
    
  </v-stepper>
</v-form>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      this.geolocate()
      this.getRegions() 
      if($nuxt._route.params.id ) {
        this.modelBeneficiaire = this.detailProjet?.beneficiaire[0]
        this.modelProjet = this.detailProjet
        this.hasProject = true
      }else{
        this.hasProject = false
      }
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions' ,
      detailProjet: 'projets/detailprojet'   
    })},
    data: () => ({

      hasProject : false,
      modelBeneficiaire: {
        numero_cin:'',
        nom_beneficiaire:'',
        prenom_beneficiaire:'',
        adresse_beneficiaire:'',
        telephone_beneficiaire:''
      },
      modelProjet: {
        titre_projet:'',
        reference_projet:'',
      },
      resume:{
        nom_region:'',
        nom_departement:'',
        nom_commune:'',
        nom_beneficiaire:'',
        reference_projet:'',
        nom_secteur:''
      },
      commune:null,
      departement:null,
      region:null,
      beneficiaire:null,
      projet:null,
      selectedSecteur:null,
      projetByRegion:[
        {
          id:1,
          nom_region:'Dakar',
          departements:[
            {
              id:1,
              nom_departement:'Dakar',
              communes:[
                {
                  id:2,
                  nom_commune:'Point E',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Lamine',
                      email:'lamine@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B-15',
                          titre:'Projet 3'
                        },
                        {
                          id:2,
                          ref:'00B-16',
                          titre:'Projet 4'
                        }
                      ]
                    }
                  ],
                }
              ]
            },
            {
              id:2,
              nom_departement:'Pikine',
              communes:[
                {
                  id:2,
                  nom_commune:'Pikine Ouest',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Lamine',
                      email:'lamine@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B-15',
                          titre:'Projet 3'
                        },
                        {
                          id:2,
                          ref:'00B-16',
                          titre:'Projet 4'
                        }
                      ]
                    }
                  ],
                }
              ]
            }
          ]
        },
        {
          id:2,
          nom_region:'Thiès',
          departements:[
            {
              id:1,
              nom_departement:'Thiès',
              communes:[
                {
                  id:2,
                  nom_commune:'Thiès Nord',
                  beneficiaires:[
                    {
                      id:1,
                      nom:'Serigne',
                      email:'serigne@derfj.sn',
                      projets:[
                        {
                          id:1,
                          ref:'00B2-15',
                          titre:'Projet 00'
                        },
                        {
                          id:2,
                          ref:'00B3-16',
                          titre:'Projet 11'
                        }
                      ]
                    }
                  ],
                }
              ]
            }
          ]
        }
      ],

      listsecteurs : [
        {id:1,nom_secteur:'Suivi des dossiers financés par la DER/FJ'},
        {id:2,nom_secteur:'Suivi des décaissements au niveau des IFP'},
        {id:3,nom_secteur:'Formation et accompagnement des bénéficiaires de la DER/FJ'},
        {id:4,nom_secteur:'Situation des recouvrements au niveau départemental'},
        {id:5,nom_secteur:'Organisation des sessions d\'animation économique'},
        {id:6,nom_secteur:'Activité de représentation dans les comités'},
        {id:7,nom_secteur:'Autres activités'},
      ],
      environnements : [
        {id:1,nom_environnement:'Adhésion OP'},
        {id:2,nom_environnement:'Conseil technique'}
      ],
      enjeux_locaux : [
        {id:1,nom_enjeu_locaux:'Périurbaine'},
        {id:2,nom_enjeu_locaux:'Inondable'},
        {id:3,nom_enjeu_locaux:'Electrification'},
        {id:4,nom_enjeu_locaux:'Route'},
        {id:5,nom_enjeu_locaux:'Autres'}
      ],
      valorisations : [
        {id:1,nom_valorisation:'Frais'},
        {id:2,nom_valorisation:'Industrie'},
        {id:3,nom_valorisation:'Transformations'}
      ],
      commercialisations : [
        {id:1,nom_commercialisation:'Circuit court'},
        {id:2,nom_commercialisation:'Circuit long'}
      ],

      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listbeneficiaires:[],
      listprojets:[],   

      step: 1,

      inputfichiers:[],
      libelle_fichiers:[],
      fichiers:[],
      countrow_activite:1,
      countrow_contrainte:1,
      countrow_fichier:1,

      filename : '',
      loading: false,

      valid: true,
 
      LigneActivites:[],
      LigneContraintes:[],
      
      intitule_activite0:'',
      description_activite0:'',
      nombre_benef_homme0:'',
      nombre_benef_femme0:'',
      type_materiel_utilise0:'',

      difficulte_rencontre0:'',
      solution_trouve0:'',
      suivie_necessaire0:'',

      intitule_activites:[],
      description_activites:[],
      nombre_benef_hommes:[],
      nombre_benef_femmes:[],
      type_materiel_utilises:[],

      difficulte_rencontres:[],
      solution_trouves:[],
      suivie_necessaires:[],

      model: {
      },
      schema: {
      "type": "object",
      "properties": {
        "objectSection1": {
          "title": "QUESTIONS ENVIRONNEMENTALES",
          "description": "",
          "type": "object",
          "properties": {
            "reponse1_1": {
              "type": "string",
              "title": "1) Quelle est la distance du site d'exploitation par rapport aux installations humaines ?",
              "description": "",
              "enum": [
                "0 - 50",
                "51 - 100",
                "101 - 250",
                "250 - 500",
              ],
              "x-display": "radio",
              "x-class":"mt-10"
            },
            "reponse2_1": {
              "type": "string",
              "title": "2) Le projet nécessite t-il une perte d'espèces végétales (défrichement des terres ou abattage d'arbres)",
              "description": "",
              "enum": [
                "OUI",
                "NON"
              ],
              "x-display": "radio"
            },
            "reponse2_2": {
              "type": "string",
              "title": "Risque (pertes d'espèces)",
              "description": "",
              "enum": [
                "H",
                "L",
                "M",
                "NA",
              ],
              "x-display": "radio",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr"
              }
            },
            "reponse2_3": {
              "type": "string",
              "title": "Justification des risque (pertes d'espèces)",
              "x-display": "textarea",
              "x-if": "parent.value.reponse2_1  == 'OUI'",
              "x-options": {
                "evalMethod": "evalExpr",
              },
              "x-props": {
                "outlined": "outlined",
              },
            }
          },
          "x-style": "border:solid 1px; border-radius:3px; margin:10px",
          "x-class":"pl-10 pt-10 pb-10"
        }
      }
    },
      rules:{
        textfieldRules: [],
        radioRules: [],
        selectRules: [],
        textareaRules: [],
        numberRules: [],
        emailRules: [],
        dateRules: [],
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },
      mapOptions: {
        height:300,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
      },
    }),
    methods: {
      handleFileUpload(e){
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
      async controleValidation(){
        this.textfieldRules = [v => !!v || 'Champ obligatoire']
        this.submitForm()
      },
      submitForm () {
        let validation = this.$refs.form.validate()
        this.loading = true;
    
        console.log('Données formulaire +++++',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region],beneficiaire:[this.beneficiaire],projet:[this.projet]})

        validation && this.$msasApi.post('/enquettes',{...this.model,commune:[this.commune],departement:[this.departement],region:[this.region],beneficiaire:[this.beneficiaire],projet:[this.projet]})
          .then((res) => {           
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/enquetes');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        }); 
      },
      submitLigne () {
        this.countrow_activite += 1;
        this.intitule_activites.push(this.intitule_activite0)
        this.description_activites.push(this.description_activite0)
        this.nombre_benef_hommes.push(this.nombre_benef_homme0)
        this.nombre_benef_femmes.push(this.nombre_benef_femmes0)
        this.type_materiel_utilises.push(this.type_materiel_utilises0)

        this.LigneActivites.push({
          id:this.countrow_activite,
          intitule_activites:this.intitule_activite0,
          description_activites:this.description_activite0,
          nombre_benef_hommes:this.nombre_benef_homme0,
          nombre_benef_femmes:this.nombre_benef_femme0,
          type_materiel_utilises:this.type_materiel_utilise0,
        })
        this.resetActivite()
        console.log('Donées LigneActivites ++++++: ',this.LigneActivites)
      },
      deleteFind: function(index) {
        console.log('Index---- ',index);
        console.log('LigneActivites---- ',this.LigneActivites);
        this.LigneActivites.splice(index,1);
        this.intitule_activites.splice(index,1);
        this.nombre_benef_hommes.splice(index,1);
        this.nombre_benef_femmes.splice(index,1);
        this.type_materiel_utilises.splice(index,1);
      },
      submitLigneContrainte () {
        this.countrow_contrainte += 1;
        this.difficulte_rencontres.push(this.difficulte_rencontre0)
        this.solution_trouves.push(this.solution_trouve0)
        this.suivie_necessaires.push(this.suivie_necessaire0)

        this.LigneContraintes.push({
          id:this.countrow_contrainte,
          difficulte_rencontres:this.difficulte_rencontre0,
          solution_trouves:this.solution_trouve0,
          suivie_necessaires:this.suivie_necessaire0,
          
        })
        this.resetContrainte()
        console.log('Donées LigneContraintes ++++++: ',this.LigneContraintes)
      },
      deleteFindContrainte: function(index) {
        console.log('Index---- ',index);
        console.log('LigneContraintes---- ',this.LigneContraintes);
        this.LigneContraintes.splice(index,1);
        this.difficulte_rencontres.splice(index,1);
        this.solution_trouves.splice(index,1);
        this.suivie_necessaires.splice(index,1);
      },
      deleteFindFichier: function(index) {
        console.log('Index---- ',index);
        console.log('LigneActivites---- ',this.fichiers);
        this.fichiers.splice(index,1);
        this.libelle_fichiers.splice(index,1);
        this.inputfichiers.splice(index,1);

      },
      submitLigneFichier () {
        this.countrow_fichier += 1;
        this.fichiers.push({id:this.countrow_fichier,libelle_fichier:this.libelle_fichiers[this.countrow_fichier],input_fichier:this.inputfichiers[this.countrow_fichier]})
        console.log('Donées fichier row ++++++: ',this.fichiers)
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      resetActivite () {
        this.intitule_activite0 = ''
        this.description_activite0 = ''
        this.nombre_benef_homme0 = ''
        this.nombre_benef_femme0 = ''
        this.type_materiel_utilise0 = ''
      },
      resetContrainte () {
        this.difficulte_rencontre0 = ''
        this.solution_trouve0 = ''
        this.suivie_necessaire0 = ''
      },
      async changeRegion(value) {
        this.region=value.id
        this.departement= null
        this.commune = null
        this.beneficiaire = null
        this.projet = null

        this.listcommunes = []
        this.listbeneficiaires = [] 
        this.listprojets = []

        this.listdepartements = value?.departements 

        //resumé
        this.resume.nom_region = value.nom_region
        
      },
       async changeDepartement(value) {  
        this.departement = value.id    
        this.listbeneficiaires = [] 
        this.listprojets = [] 

        this.listcommunes = value?.communes 

        //resumé
        this.resume.nom_departement = value.nom_departement

      },
      async changeCommune(value) {   
        this.commune=value.id
        this.listprojets = []  
        this.progress=true
          this.$msasApi.$get('/communes/'+value.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.listbeneficiaires = response.data.beneficiaires
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)
        //resumé
        this.resume.nom_commune = value.nom_commune
      },

      UpdateBeneficiaire(event,index){
        if((/.+@.+\..+/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
        if(event.target.value.length==9 & (/^[0-9]+$/.test(event.target.value))){
          console.log('Données change ++++++++++++',event.target.value)
          this.getBenefByTerm(event.target.value)
        }
      },
      getBenefByTerm(param){
         this.$msasApi.get('/beneficiaire-by-term/'+param)
          .then(async (response) => {
            console.log('Données reçus++++++++++++',response.data.data)
            this.listbeneficiaires = response?.data?.data         
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
             this.loadingUsager = false;
        });
      },  
      async changeBeneficiaire(value) {      
        this.beneficiaire = value.id
        value && value.id &&  this.$msasApi.$get('/beneficiaires/'+value.id)
        .then(async (response) => {
            console.log('Detail commune++++++++++',response.data)
            this.listprojets = response.data.projets
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationenquete)

        //resumé
        this.resume.nom_beneficiaire = value.prenom_beneficiaire+' '+value.nom_beneficiaire
      },
      async changeProjet(value) {      
        this.projet = value.id

        //resumé
        this.resume.reference_projet = value.reference_projet
      },
      async changeSecteur(e) {
        this.selectedSecteur = e
        /*this.selectedDimension = e */ 
        //resumé
        this.resume.nom_secteur = this.listsecteurs.filter(item => (item.id === e)).map((item)=>(item.nom_secteur))[0]     
      },

      async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async getBeneficiaireByCommune(id_commune){
        this.listbeneficiaires = value?.beneficiaires
      },

      async getProjetByBeneficiaire(id_beneficiaire){
        this.listprojets = value?.projets 
      },
      geolocate() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.model.latitude = position.coords.latitude
          this.model.longitude = position.coords.longitude
          this.marker.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.panToMarker();
        });
      },

      //sets the position of marker when dragged
      handleMarkerDrag(e) {
        this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      },

      //Moves the map view port to marker
      panToMarker() {
        this.$refs.mapRef.panTo(this.marker.position);
        this.$refs.mapRef.setZoom(18);
      },

      //Moves the marker to click position on the map
      handleMapClick(e) {
        this.model.latitude = e.latLng.lat()
          this.model.longitude = e.latLng.lng()
        this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        console.log(e);
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
<style>
#custom-input .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;
  border-left: solid 1px #e3ebf3;
  padding-left: 25px;
  margin-left: 7px;
}
#custom-input-2 .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;

  padding-left: 25px;
  margin-left: 7px;
}
.custom-ligne-bloc {
  border: solid 2px #e3ebf3;
  margin: 0px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 0px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
</style>
