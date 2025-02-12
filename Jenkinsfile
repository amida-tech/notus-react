pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: saraswati-dashboard 
spec:
  containers:
  - name: node
    image: node:16.14.2-alpine3.15
    command:
    - cat
    tty: true
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
      - name: jenkins-docker-cfg
        mountPath: /kaniko/.docker
  volumes:
  - name: jenkins-docker-cfg
    projected:
      sources:
      - secret:
          name: mh-docker-hub
          items:
            - key: config.json
              path: config.json
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
        stage('Jenkins Build') {
            steps {
                echo 'Building..'
                container('node') {
                    sh 'yarn build'
                }
            }
        }
        stage('Build Production with Kaniko') {
            when { 
                anyOf {
                    expression {env.GIT_BRANCH == 'origin/main'} 
                    tag "release-*"
                }
                
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                sh '''#!/busybox/sh
                    /kaniko/executor --context `pwd` --verbosity debug --destination=amidatech/saraswati-dashboard:latest
                '''
                }
            }
        }
        stage('Build Tagged Production with Kaniko') { 
            when {
                anyOf {
                    tag "*"
                }
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                sh '''#!/busybox/sh
                    /kaniko/executor --context `pwd` --verbosity debug --destination=amidatech/saraswati-dashboard:$TAG_NAME
                '''
                }
            }
        }
        stage('Build Develop with Kaniko') {
            when { 
                expression {env.GIT_BRANCH == 'origin/develop'} 
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                sh '''#!/busybox/sh
                    /kaniko/executor --context `pwd` --verbosity debug --destination=amidatech/saraswati-dashboard:develop
                '''
                }
            }
        }
    }
} 
