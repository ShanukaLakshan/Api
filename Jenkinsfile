pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-docker-repo/your-image-name' // Specify your Docker repository and image name
        DOCKER_CREDENTIALS_ID = 'docker-credentials' // Jenkins credentials ID for Docker login
        NODE_ENV = 'production' // Set the Node.js environment
    }
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/ShanukaLakshan/Api'
                }
            }
        }
        stage('Test Case') {
            steps {
                script {
                    // Run your tests here
                    // For example, if you're using Mocha:
                    sh 'npm install' // Install dev dependencies if needed
                    sh 'npm test'    // Run tests
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                script {
                    // Add your deployment steps here
                    // This could involve SSH-ing into a server and pulling the new image, etc.
                    sh 'ssh user@your-server "docker pull $DOCKER_IMAGE && docker run -d -p 3000:3000 $DOCKER_IMAGE"'
                }
            }
        }
    }
}
