pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'birfbkdstsbhbk/learnawareai-service' 
        DOCKER_CREDENTIALS_ID = 'docker-credentials-api' 
    }
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'develop', url: 'https://github.com/ShanukaLakshan/Api'
                }
            }
        }
        stage('Check Node and NPM Version') {
            steps {
                script {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
        stage('Clean Build') {
            steps {
                script {
                    sh 'rm -rf node_modules' 
                    sh 'npm install'         
                }
            }
        }
        stage('Test Case') {
            steps {
                script {
                    sh "npm test"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-credentials-api', variable: 'dockercredentials')]) {
                    script {  
                        sh "docker login -u birfbkdstsbhbk -p '${dockercredentials}'"
                    }
                }
            }
        }
        stage('Push Image') {
            when {
                branch 'main' // Only push when on the 'main' branch
            }
            steps {
                sh "docker push $DOCKER_IMAGE"
            }
        }
    }
    post {
        always {
            sh 'docker logout'
            echo 'Cleaning up workspace'
            cleanWs()
        }
    }
}
