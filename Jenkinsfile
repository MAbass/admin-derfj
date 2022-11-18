// Pipeline block
pipeline {
   // Agent block
   agent { node { label 'Manage_Contact_Demo'}}   options {
      buildDiscarder(logRotator(numToKeepStr: '30'))
      timestamps()
   }   
  // Stage Block
   stages {// stage blocks
      stage("Build docker images") {
         steps {
            script {
              echo "Bulding docker images"
              docker.build("${Image_Name}:${Image_Tag}")
            }
         }
      }
   }
}
