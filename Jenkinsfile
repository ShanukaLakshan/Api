pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock' 
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'  
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' 
            }
        }
    }
}
