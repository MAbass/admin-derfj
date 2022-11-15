<template>
  <div>
    <v-form v-model="valid">
      <v-jsf v-model="model" :schema="schema"/>
    </v-form>
    Model : {{model}}
  </div>
  
</template>

<script>

export default {
  data: () => ({
    valid: false,
    model: {
      "objectSection2": {},
      "objectSection1": {},
      "stringsArrayEnum": [],
      "stringArrayOneOf": [],
      "reponse2": "",
      "stringProp3":""
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
    }
  }),
}
</script>

<style scoped>

</style>