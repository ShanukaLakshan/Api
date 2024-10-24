pipeline{
    agent any
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Test'){
            steps{
                sh 'sudo npm install'
                sh 'sudo npm test'
            }
        }
        stage('Build'){
            steps{
                sh 'sudo npm run build'
            }
        }
    }
}