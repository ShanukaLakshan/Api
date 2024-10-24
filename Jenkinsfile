pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ShanukaLakshan/Api'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t adomicarts/nodeapp-cuban:${BUILD_NUMBER} .'
            }
        }
       
    }
    
}