pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'birfbkdstsbhbk/learnawareai-service' 
        DOCKER_CREDENTIALS_ID = 'docker-credentials' 
    }
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ShanukaLakshan/Api'
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
                withCredentials([string(credentialsId: 'docker-credentials', variable: 'dockercredentials')]) {
                    script {  
                        sh "docker login -u birfbkdstsbhbk -p '${dockercredentials}'"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                sh "docker push $DOCKER_IMAGE"
            }
        }
        // stage('Deploy to Production') {
        //     steps {
        //         script {
        //             sh 'ssh user@your-server "docker pull $DOCKER_IMAGE && docker run -d -p 3000:3000 $DOCKER_IMAGE"'
        //         }
        //     }
        // }
    }
    post {
        always {
            sh 'docker logout'
            echo 'Cleaning up workspace'
            cleanWs()
        }
    }
}
