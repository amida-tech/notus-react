pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: saraswati-cql-execution 
spec:
  containers:
  - name: node
    image: node:13.10.1-alpine3.11
    command:
    - cat
    tty: true
"""
        }
    }
    environment {
        REACT_APP_HEDIS_MEASURE_API_URL='http://localhost:4000/api/v1/'
        CI=false
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing..'
                container('node') {
                    sh 'yarn install'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                container('node') {
                    sh 'yarn build'
                }
            }
        }
    }
}