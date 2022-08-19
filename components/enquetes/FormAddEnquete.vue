<template>
<v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
  <v-stepper
    v-model="step"
    vertical
  >
    <v-stepper-step
      :complete="step > 1"
      step="1"
      editable
    >
      Identification de la zone
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col lg="4" sm="12" md="4">
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
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="beneficiaire"
              :rules="rules.selectRules"
              :items="listbeneficiaires"
              hide-no-data
              :filter="() => true"
              outlined
              dense
              label="Bénéficiaire (Téléhone ou Email)"
              item-text="nom_beneficiaire"
              item-value="id"
              return-object
              @keyup="(event) => UpdateBeneficiaire(event, index)"
              @change="changeBeneficiaire"
            >
              <template v-slot:selection="data">
                <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
              </template>
              <template v-slot:item="data">
                <div class="mt-4">
                  <h5>{{ data.item.prenom_beneficiaire+' '+data.item.nom_beneficiaire }}</h5>
                  <p>Tel: {{ data.item.telephone_beneficiaire}}</p>
                </div>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="projet"
              :rules="rules.selectRules"
              :items="listprojets"
              outlined
              dense
              label="Projets"
              item-text="titre_projet"
              item-value="id"
              return-object
              @change="changeProjet"
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

    <v-stepper-step
      :complete="step > 2"
      step="2"
      editable
    >
      Choisir une section
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat>
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
              :v-model="selectedSecteur"
              :rules="rules.radioRules"
              @change="changeDimension"
              row
            >
              <v-radio
                class="col-12"
                v-for="item in listsecteurs"
                :key="item.id"
                :label="item.libelle_secteur"
                :value="item.id"
              ></v-radio>
            </v-radio-group>
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

    <v-stepper-step
      :complete="step > 3"
      step="3"
      editable
    >
      Activité de la semaine
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <div class="custom-ligne-bloc">
          <v-row>
            <v-col lg="12" md="12" sm="12">
              <v-row>
                <v-col md="12" lg="12" sm="12">
                  <v-row>                   
                    <v-col md="12" lg="12" sm="12">
                      <v-text-field
                        label="Intitulé de l'activité"
                        outlined
                        dense
                        v-model="intitule_activite0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Description de l'activité"
                        outlined
                        dense
                        v-model="description_activite0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Homme"
                        outlined
                        dense
                        v-model="nombre_benef_homme0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Femme"
                        outlined
                        dense
                        v-model="nombre_benef_femme0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Type de matériel utilisé"
                        outlined
                        dense
                        v-model="type_materiel_utilise0"
                        :rules="rules.textfieldRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-btn
                color="#00173F"
                class="white--text"
                @click="submitLigne"
                depressed
              >
                Ajouter une activité
                <v-icon right dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-simple-table class="custom-ligne-bloc-2">

          <thead>
            <tr>
              <th class="text-left">
                Intitulé de l'activité
              </th>
              <th class="text-left">
                Description de l'activité
              </th>
              <th class="text-left">
                Nombre de bénéficiaire Homme
              </th>
              <th class="text-left">
                Nombre de bénéficiaire Femme
              </th>
              <th class="text-left">
                Type de matériel utilisé
              </th>
              <th class="text-left">
                -
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,i) in LigneActivites"
              :key="item.id"
            >
              <td>{{item.intitule_activites}}</td>
              <td>{{item.description_activites}}</td>
              <td>{{item.nombre_benef_hommes}}</td>
              <td>{{item.nombre_benef_femmes}}</td>
              <td>{{item.type_materiel_utilises}}</td>
              <td><v-icon @click="deleteFind(i)">mdi-close</v-icon></td>
              
            </tr>
          </tbody>
        </v-simple-table>
        
      </v-card>
      <v-btn
        color="primary"
        @click="step = 4"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="step > 4"
      step="4"
      editable
    >
      Contraintes
    </v-stepper-step>

    <v-stepper-content step="4">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <div class="custom-ligne-bloc">
          <v-row>
            <v-col lg="12" md="12" sm="12">
              <v-row>
                <v-col md="12" lg="12" sm="12">
                  <v-row>                   
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Difficulté rencontrée"
                        outlined
                        dense
                        v-model="difficulte_rencontre0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Solution trouvée"
                        outlined
                        dense
                        v-model="solution_trouve0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Suivi nécessaire"
                        outlined
                        dense
                        v-model="suivie_necessaire0"
                        :rules="rules.textareaRules"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-btn
                color="#00173F"
                class="white--text"
                @click="submitLigneContrainte"
                depressed
              >
                Ajouter une contrainte
                <v-icon right dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

          <v-simple-table class="custom-ligne-bloc-2">
            <thead>
              <tr>
                <th class="text-left">
                  Difficulté rencontrée
                </th>
                <th class="text-left">
                  Solution trouvée
                </th>
                <th class="text-left">
                  Suivi nécessaire
                </th>
                <th class="text-left">
                  -
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,i) in LigneContraintes"
                :key="item.id"
              >
                <td>{{item.difficulte_rencontres}}</td>
                <td>{{item.solution_trouves}}</td>
                <td>{{item.suivie_necessaires}}</td>
                <td><v-icon @click="deleteFindContrainte(i)">mdi-close</v-icon></td>
                
              </tr>
            </tbody>
          </v-simple-table>
        
      </v-card>
      <v-btn
        color="primary"
        @click="step = 5"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step 
      :complete="step > 5"
      step="5"
      editable
      >
      Attacher des fichiers
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5" flat>
        <v-row v-for="(item,i) in fichiers"
              :key="item.id">
          <v-col md="6" lg="6" sm="12">
              <v-text-field
                v-model="item.libelle_fichier"
                :rules="rules.textfieldRules"
                outlined
                label="Nom du fichier" 
                dense             
              >              
              </v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" class="d-flex">
              <v-file-input
              v-model="item.input_fichier"
              outlined
              label="Joindre le fichier"
              dense
              :clearable="false"
              >
              </v-file-input>
              <v-icon @click="deleteFindFichier(i)">mdi-close</v-icon>
          </v-col>

        </v-row>
        <v-btn
          color="#00173F"
          class="white--text mb-5"
          @click="submitLigneFichier"
          depressed
        >
          Ajouter un fichier
          <v-icon right dark> mdi-plus </v-icon>
        </v-btn>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 6"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step 
      :complete="step > 6"
      step="6"
      editable
      >
      Géolocalisation
    </v-stepper-step>
    <v-stepper-content step="6">
      <v-card
         class="container pl-10 pt-10 pb-10 pr-10 mb-5 border-grey" flat
      >
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Latitude"
            outlined dense
            v-model="model.latitude"
            :rules="rules.textfieldRules"
          ></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Longitude"
            outlined dense
            v-model="model.longitude"
            :rules="rules.textfieldRules"
          ></v-text-field>
        </v-col>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 7"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>
    <v-stepper-step 
      :complete="step > 7"
      step="7"
      editable
      >
      Résumé
    </v-stepper-step>
    <v-stepper-content step="7">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="controleValidation"
      >
        Soumettre
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
      this.getRegions()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions'    
    })},
    data: () => ({
      commune:null,
      departement:null,
      region:null,
      beneficiaire:null,
      projet:null,
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
        {id:1,libelle_secteur:'Suivi des dossiers financés par la DER/FJ'},
        {id:2,libelle_secteur:'Suivi des décaissements au niveau des IFP'},
        {id:3,libelle_secteur:'Formation et accompagnement des bénéficiaires de la DER/FJ'},
        {id:4,libelle_secteur:'Situation des recouvrements au niveau départemental'},
        {id:5,libelle_secteur:'Organisation des sessions d\'animation économique'},
        {id:6,libelle_secteur:'Activité de représentation dans les comités'},
        {id:7,libelle_secteur:'Autres activités'},
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
      nombre_benef_femmes0:'',
      type_materiel_utilises0:'',

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
      menu2: false
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
        
      },
       async changeDepartement(value) {  
        this.departement = value.id    
        this.listbeneficiaires = [] 
        this.listprojets = [] 

        this.listcommunes = value?.communes 

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
      },
      async changeProjet(value) {      
        this.projet = value.id
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
      }
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
  margin: 12px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
</style>
