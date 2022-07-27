<template>
<v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
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
              v-model="model.region"
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
              v-model="model.departement"
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
              v-model="model.commune"
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
              v-model="model.beneficiaire"
              :items="listbeneficiaires"
              outlined
              dense
              label="Bénéficiaire"
              item-text="nom"
              item-value="id"
              return-object
              @change="changeBeneficiaire"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="model.projet"
              :items="listprojets"
              outlined
              dense
              label="Projets"
              item-text="titre"
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
        @click="e6 = 2"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
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
              :v-model="selectedDimension"
              :rules="rules.sexeRules"
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
        @click="goToSecteur"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
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
                        :rules="rules.firstnameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Description de l'activité"
                        outlined
                        dense
                        v-model="description_activite0"
                        :rules="rules.firstnameRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Homme"
                        outlined
                        dense
                        v-model="nombre_benef_homme0"
                        :rules="rules.firstnameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Nombre de bénéficiaire Femme"
                        outlined
                        dense
                        v-model="nombre_benef_femme0"
                        :rules="rules.firstnameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" lg="4" sm="12">
                      <v-text-field
                        label="Type de matériel utilisé"
                        outlined
                        dense
                        v-model="type_materiel_utilise0"
                        :rules="rules.firstnameRules"
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
        <template>
          <v-simple-table class="custom-ligne-bloc-2">
            <template v-slot:default>
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
                  v-for="(item,i) in ActiviteInputs"
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
            </template>
          </v-simple-table>
        </template>
        
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 4"
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
                        :rules="rules.firstnameRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Solution trouvée"
                        outlined
                        dense
                        v-model="solution_trouve0"
                        :rules="rules.firstnameRules"
                      ></v-textarea>
                    </v-col>
                    <v-col md="12" lg="12" sm="12">
                      <v-textarea
                        label="Suivi nécessaire"
                        outlined
                        dense
                        v-model="suivie_necessaire0"
                        :rules="rules.firstnameRules"
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
        <template>
          <v-simple-table class="custom-ligne-bloc-2">
            <template v-slot:default>
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
                  v-for="(item,i) in ContrainteInputs"
                  :key="item.id"
                >
                  <td>{{item.difficulte_rencontres}}</td>
                  <td>{{item.solution_trouves}}</td>
                  <td>{{item.suivie_necessaires}}</td>
                  <td><v-icon @click="deleteFindContrainte(i)">mdi-close</v-icon></td>
                  
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
        
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 5"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step 
      :complete="e6 > 5"
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
        @click="e6 = 6"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>

    <v-stepper-step 
      :complete="e6 > 6"
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
            v-model="model.firstname"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="6" lg="6" sm="12">
          <v-text-field
            label="Longitude"
            outlined dense
            v-model="model.lastname"
            :rules="rules.lastnameRules"
          ></v-text-field>
        </v-col>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 7"
      >
        Suivant
      </v-btn>
      <v-btn text>
        Annuler
      </v-btn>
    </v-stepper-content>
    <v-stepper-step 
      :complete="e6 > 7"
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
        @click="submitForm"
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
      this.listPiliers=this.listiliers
      this.listDimensions=this.listdimensions
      this.listregions=this.projetByRegion
    },
    computed: {
      ...mapGetters({
      listannees: 'annees/listannees',
      listmonnaies: 'monnaies/listmonnaies',
      listdimensions: 'dimensions/listdimensions',
      listregions: 'regions/listregions',
      listmodefinancements: 'modefinancements/listmodefinancements',
      listpiliers: 'piliers/listpiliers',
      listaxes: 'axes/axes',
      
    })},
    data: () => ({
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
      /* projetByCommune:[
        {
          id:1,nom_commune:'Dakar Plateau',
          departement:{id:1,nom_departement:'Dakar', region:{id:1,nom_region:'Dakar'}},        
          beneficiaires:[
            {id:1,nom:'Cheikh',email:'cheikh@derfj.sn',projets:[{ref:'00B-15',titre:'Projet 1'}]}
          ],
        },
        {
          id:2,nom_commune:'Pikine Ouest',
          departement:{id:1,nom_departement:'Pikine',region:{id:1,nom_region:'Dakar'}},          
          beneficiaires:[
            {id:1,nom:'Lamine',email:'lamine@derfj.sn',projets:[{id:1,ref:'00B-15',titre:'Projet 3'},{id:2,ref:'00B-16',titre:'Projet 4'}]}
          ],
        }
      ], */
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
          ],        
          beneficiaires:[
            {id:1,nom:'Cheikh',email:'cheikh@derfj.sn',projets:[{ref:'00B-15',titre:'Projet 1'}]}
          ],
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
          ],        
          beneficiaires:[
            {id:1,nom:'Cheikh',email:'cheikh@derfj.sn',projets:[{ref:'00B-15',titre:'Projet 1'}]}
          ],
        }
      ],
      questionnaires: {
        id_secteur : 1,
        activites :[
          {
            key : 'intitule_activite',
            text: "Intitulé de l\'activité",
            type: "tf",
            reponse: "t"
          },
          {
            key : 'description_activite',
            text: "Description de l\'activité",
            type: "ta",
            reponse: "f"
          },
          {
            key : 'nombre_beneficiaire_homme',
            text: "Nombre de bénéficiaire Homme",
            type: "tf",
            reponse: "t"
          },
          {
            key : 'nombre_beneficiaire_femme',
            text: "Nombre de bénéficiaire Femme",
            type: "tf",
            reponse: "t"
          },
          {
            key : 'type_materiel_utilise',
            text: "Type de matériel utilisé",
            type: "tf",
            reponse: "t"
          }
        ],
        contraintes :[
          {
            text: "Is true true?",
            type: "tf",
            reponse: "t"
          },
          {
            text: "Is false true?",
            type: "tf",
            reponse: "f"
          },
          {
            text: "What is the best beer?",
            type: "mc",
            reponses: [
              "Coors",
              "Miller",
              "Bud",
              "Anchor Steam"
            ],
            reponse: "Anchor Steam"
          },
          {
            text: "What is the best cookie?",
            type: "mc",
            reponses: [
              "Chocolate Chip",
              "Sugar",
              "Beer"
            ],
            reponse: "Sugar"
          }
        ]
      },
      e6: 1,
      secteur_title : '',
      inputfichiers:[],
      libelle_fichiers:[],
      fichiers:[],
      modes:[],
      counterrow:1,
      counterrowContrainte:1,
      counterrow_fichier:1,
      counterrow_mode:1,
      filename : '',
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      showAutreMode: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseStructure: false,
      showRegion: false,
      showAxes:false,
      message:null,
      autreMode:false,
      devise:'',
      listPiliers:[],
      listAxes:[],
      listDimensions:[],
      modeFinanceInputs:[],
      autreModeFinanceInputs:[],
      LigneModeFinancement:[],
      ActiviteInputs:[],
      ContrainteInputs:[],
      selectedPiliers0:[],
      selectedAxes0:[],
      nombre_benef_homme0:'',
      intitule_activite0:'',
      description_activite0:'',
      nombre_benef_femmes0:'',
      type_materiel_utilises0:'',
      montantInvestissementExecutes0:'',

      difficulte_rencontre0:'',
      solution_trouve0:'',
      suivie_necessaire0:'',

      selectedPiliers:[],
      selectedAxes:[],
      intitule_activites:[],
      description_activites:[],
      nombre_benef_hommes:[],
      nombre_benef_femmes:[],
      type_materiel_utilises:[],
      difficulte_rencontres:[],
      solution_trouves:[],
      suivie_necessaires:[],
      montantInvestissementExecutes:[],

      selectedAnnee: [],
      selectedMonnaie: [],
      selectedDimension: [],
      selectedRegions: [],
      selectedModeFinancements: [],
      selectedStructure: [],
      model: {
        commune:null,
        departement:null,
        region:null,
        beneficiaire:null,
        projet:null,
        libAutreModeFinance:[],
        montantAutreModeFinance:[]
      },
      rules:{
        nom_structureRules: [
          v => !!v || 'Dénomination est obligatoire'
        ],
        nameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        firstnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        lastnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        emailRules: [
          v => !!v || 'l\'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Role est obligatoire',
        ],
        telephoneRules: [
          v => !!v || 'Téléphone est obligatoire',
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        fournisseur_services_idRules: [
          v => (!!v) || 'Fournisseur est obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
        ],
        /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
        type_identificationRules: [
          v => !!v || 'Type d\'identification est obligatoire',
        ],
        numero_identificationRules: [
          v => !!v || 'Numéro d\'identification est obligatoire'
        ],
        fonctionRules: [
          v => !!v || 'Fonction est obligatoire'
        ]
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
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
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let annee = this.selectedAnnee?.id
        let monnaie = this.selectedMonnaie?.id
        let region = this.selectedRegion?.id
        let dimension = this.selectedDimension

        let montantModeFinancements = this.selectedModeFinancements
        let libelleModeFinancements = this.modeFinanceInputs?.map((item)=>{return item.libelle})
        let libAutreModeFinance = this.model.libAutreModeFinance
        let montantAutreModeFinance = this.model.montantAutreModeFinance
        let autreMode = this.modes

        let piliers = this.selectedPiliers?.map((item)=>{return item.id})
        let axes = this.selectedAxes?.map((item)=>{return item.id})
        console.log('++++++++piliers ',piliers)
        console.log('++++++++axes ',axes)
        let intitule_activites = this.intitule_activites
        let description_activites = this.description_activites
        let nombre_benef_hommes = this.nombre_benef_hommes
        let nombre_benef_femmes = this.nombre_benef_femmes
        let type_materiel_utilises = this.type_materiel_utilises
        let montantInvestissementExecutes = this.montantInvestissementExecutes

        for(let i=0;i<=libelleModeFinancements.length;i++){
          this.LigneModeFinancement.push({libelle:libelleModeFinancements[i],montant:montantModeFinancements[i]})
        }
        if(autreMode.length){
          for(let i=0;i<=autreMode.length;i++){
            if(libAutreModeFinance[i] && montantAutreModeFinance[i]){
              libelleModeFinancements.push(libAutreModeFinance[i])
              montantModeFinancements.push(montantAutreModeFinance[i])
            }
          }
        }
        let ligneModeFinancements = JSON.stringify(this.LigneModeFinancement)
        let ligneFinancements = this.ActiviteInputs
        let fichiers = this.fichiers
        console.log('libelle mode+++++++++++++',libelleModeFinancements)
        let formData = new FormData();
        
        formData.append("libelleModeFinancements",libelleModeFinancements);
        formData.append("montantModeFinancements",montantModeFinancements);
        
        /* if(autreMode){
          formData.append("libAutreModeFinance",libAutreModeFinance);
          formData.append("montantAutreModeFinance",montantAutreModeFinance);
        } */

        formData.append("piliers",piliers);
        formData.append("axes",axes);
        formData.append("intitule_activites",intitule_activites);
        formData.append("description_activites",description_activites);
        formData.append("nombre_benef_hommes",nombre_benef_hommes);
        formData.append("nombre_benef_femmes",nombre_benef_femmes);
        formData.append("type_materiel_utilises",type_materiel_utilises);
        formData.append("montantInvestissementExecutes",montantInvestissementExecutes);

        formData.append("annee",annee);
        formData.append("monnaie",monnaie);
        formData.append("dimension",dimension);
        formData.append("region",region);
        formData.append("ligneModeFinancements",ligneModeFinancements);
        formData.append("ligneFinancements",ligneFinancements);
        formData.append("fichiers",ligneFinancements);
       
        let data = {
          annee : annee,
          monnaie : monnaie,
          dimension : dimension,
          region : region,
          ligneFinancements: ligneFinancements,
          ligneModeFinancements:ligneModeFinancements,
          fichiers:fichiers,
          
        }

        console.log('Donées formulaire source financements ++++++: ',data)

        console.log('FormData ++++++ : ',formData)



       /* validation && this.$msasFileApi.post('/enquetes',formData)
          .then((res) => {
            console.log('Donées reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
           this.$router.push('/enquetes');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        }); */
      },
      submitLigne () {
        this.counterrow += 1;
        this.intitule_activites.push(this.intitule_activite0)
        this.description_activites.push(this.description_activite0)
        this.nombre_benef_hommes.push(this.nombre_benef_homme0)
        this.nombre_benef_femmes.push(this.nombre_benef_femmes0)
        this.type_materiel_utilises.push(this.type_materiel_utilises0)

        this.ActiviteInputs.push({
          id:this.counterrow,
          intitule_activites:this.intitule_activite0,
          description_activites:this.description_activite0,
          nombre_benef_hommes:this.nombre_benef_homme0,
          nombre_benef_femmes:this.nombre_benef_femme0,
          type_materiel_utilises:this.type_materiel_utilise0,
        })

        console.log('Donées ActiviteInputs ++++++: ',this.ActiviteInputs)
      },
      deleteFind: function(index) {
        console.log('Index---- ',index);
        console.log('ActiviteInputs---- ',this.ActiviteInputs);
        this.ActiviteInputs.splice(index,1);
        this.intitule_activites.splice(index,1);
        this.nombre_benef_hommes.splice(index,1);
        this.nombre_benef_femmes.splice(index,1);
        this.type_materiel_utilises.splice(index,1);
      },
      submitLigneContrainte () {
        this.counterrowContrainte += 1;
        this.difficulte_rencontres.push(this.difficulte_rencontre0)
        this.solution_trouves.push(this.solution_trouve0)
        this.suivie_necessaires.push(this.suivie_necessaire0)

        this.ContrainteInputs.push({
          id:this.counterrowContrainte,
          difficulte_rencontres:this.difficulte_rencontre0,
          solution_trouves:this.solution_trouve0,
          suivie_necessaires:this.suivie_necessaire0,
          
        })

        console.log('Donées ContrainteInputs ++++++: ',this.ContrainteInputs)
      },
      deleteFindContrainte: function(index) {
        console.log('Index---- ',index);
        console.log('ContrainteInputs---- ',this.ContrainteInputs);
        this.ContrainteInputs.splice(index,1);
        this.difficulte_rencontres.splice(index,1);
        this.solution_trouves.splice(index,1);
        this.suivie_necessaires.splice(index,1);
      },
      deleteFindFichier: function(index) {
        console.log('Index---- ',index);
        console.log('ActiviteInputs---- ',this.fichiers);
        this.fichiers.splice(index,1);
        this.libelle_fichiers.splice(index,1);
        this.inputfichiers.splice(index,1);

      },
      deleteFindMode: function(index) {
        console.log('Index---- ',index);
        console.log('ActiviteInputs---- ',this.modes);
        this.modes.splice(index,1);
        this.model.libAutreModeFinance.splice(index,1);
        this.model.montantAutreModeFinance.splice(index,1);

      },
      submitLigneFichier () {
        this.counterrow_fichier += 1;
        this.fichiers.push({id:this.counterrow_fichier,libelle_fichier:this.libelle_fichiers[this.counterrow_fichier],input_fichier:this.inputfichiers[this.counterrow_fichier]})
        console.log('Donées fichier row ++++++: ',this.fichiers)
      },
      submitLigneMode () {
        this.counterrow_mode += 1;
        this.modes.push({id:this.counterrow_mode,libelle_mode:this.model.libAutreModeFinance[this.counterrow_mode],input_mode:this.model.montantAutreModeFinance[this.counterrow_mode]})
        console.log('Donées fichier row ++++++: ',this.model.libAutreModeFinance)
        console.log('Donées fichier row ++++++: ',this.model.montantAutreModeFinance)
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      async changeRole(role) {

        let checkRole = this.model.roles.filter(item => item.name === 'agent_structure').length;
        if(checkRole==1)
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
      async changeAutreMode(value) {
        this.showAutreMode=value?true:false
      },
      async goToSecteur() {
        //this.showAutreMode=true
        this.e6 = 3
        console.log('************',this.e6)
      },
      async changeRegion(value) {
        this.model.departement= null
        this.model.commune = null
        this.model.beneficiaire = null
        this.model.projet = null

        this.listdepartements = value?.departements 
        this.listcommunes = []
        this.listbeneficiaires = [] 
        this.listprojets = []
        console.log('************',value)
      },
       async changeDepartement(value) {      
        this.listcommunes = value?.communes 
        this.listbeneficiaires = [] 
        this.listprojets = [] 
        //console.log('************',i)
      },
      async changeCommune(value) {   
        //reinitialisation
        
        //chargement  
        this.listbeneficiaires = value?.beneficiaires
        this.listprojets = [] 
        //console.log('************',i)
      },

     

      async changeBeneficiaire(value) {      
        console.log('************',value?.nom)

        this.listprojets = value?.projets 
        //console.log('************',i)
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
