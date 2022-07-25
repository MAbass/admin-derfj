<template>
  <v-container>
    <p>{{model}}</p>
    <v-form ref="form" v-model="valid">
      <v-jsf v-if="schema && Object.keys(schema).length > 0" v-model="model" :schema="schema" :options="options"
      @input="logEvent('input', $event)" @change="logEvent('change', $event)" @input-child="logEvent('input-child', $event)" @change-child="logEvent('change-child', $event)"/>
    </v-form>
    <v-layout row class="mt-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$refs.form.validate()">Validate</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import VJsf from '@koumoul/vjsf/lib/VJsf.js'
import '@koumoul/vjsf/lib/VJsf.css'
import '@koumoul/vjsf/lib/deps/third-party.js'

export default {
  name: 'App',
  components: { VJsf },
  data: () => ({
    valid: false,
    model: {},
    options: {
      "accordionMode": "normal"
    },
    schema: {
      "type": "object",
      "properties": {
        "questionnaire": {
          "type": "object",
          "x-display": "vertical-stepper",
          "title": "",
          "allOf": [
            {
              "title": "Identification de la zone",
              "description": "",
              "type": "object",
              "required": [
                "date_enquete"
              ],
              "properties": {
                "date_enquete": {
                  "type": "string",
                  "title": "Date",
                  "format": "date"
                },
                "commune": {
                  "title": "Commune",
                  "type": "object",
                  "description": "Choisir la commune",
                  "enum": [
                    {
                      "id": "dakar",
                      "nom_commune": "Dakar"
                    },
                    {
                      "id": "pikine",
                      "nom_commune": "Pikine"
                    }
                  ],
                  "x-itemTitle": "nom_commune",
                  "x-itemKey": "id"
                },
                "departement": {
                  "title": "Departement",
                  "type": "object",
                  "description": "Choisir le département",
                  "enum": [],
                  "x-itemTitle": "nom_departement",
                  "x-itemKey": "id"
                },
                "region": {
                  "title": "Region",
                  "type": "object",
                  "description": "Choisir la région",
                  "enum": [],
                  "x-itemTitle": "nom_region",
                  "x-itemKey": "id"
                },
                "beneficiaire": {
                  "title": "Bénéficiaire",
                  "type": "object",
                  "description": "Bénéficiaire du projet",
                  "enum": [],
                  "x-itemTitle": "firstname",
                  "x-itemKey": "id"
                },
                "projet": {
                  "type": "string",
                  "title": "Projet"
                }
              }
            },
            {
              "title": "Choisir une section",
              "type": "object",
              "required": [
                "stringProp1"
              ],
              "properties": {
                "stringProp2": {
                  "type": "string",
                  "title": "Prop 1"
                }
              }
            }
          ]
        }
      }
    },
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
      projetByCommune:[
        {
          id:1,
          nom_commune:'Dakar Plateau',
          departement:{
            id:1,
            nom_departement:'Dakar', 
            region:{
              id:1,
              nom_region:'Dakar'
            }
          },        
          beneficiaires:[
            {
              id:1,nom:'Cheikh',
              email:'cheikh@derfj.sn',
              projets:[
                {
                  ref:'00B-15',
                  titre:'Projet 1'
                }
              ]
            }
          ],
        },
        {
          id:2,
          nom_commune:'Pikine Ouest',
          departement:{
            id:1,
            nom_departement:'Pikine',
            region:{
              id:1,
              nom_region:'Dakar'
            }
          },          
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
      ],
  }),
  methods :{
    logEvent(key, $event) {
      console.log('vjsf event', key, $event)
    }
  }
};
</script>