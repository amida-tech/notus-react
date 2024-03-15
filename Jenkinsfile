pipeline {
  agent {
    docker { image 'node:18.19.1-alpine3.19' }
  }
  environment {
    REACT_APP_HEDIS_MEASURE_API_URL='http://localhost:4000/api/v1/'
    CI=false
  }
  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing..'
        sh 'yarn install'
      }
    }
    stage('Jenkins Build') {
      steps {
        echo 'Building..'
        sh 'yarn build'
      }
    }
  }
}
