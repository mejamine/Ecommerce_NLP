pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                    sh 'echo root | sudo -S docker compose -f compose.yml build'
                }
        }

        stage('Run Containers') {
            steps {
                
                    sh 'echo root | sudo -S docker compose -f compose.yml up -d'
                }
            
        }

        stage('Stop Containers') {
            steps {
                
                    sh 'echo root | sudo -S docker compose -f compose.yml down'
                }
            
        }

        stage('Tag and Push Images to Docker Hub') {
            steps {
                
                    sh "echo root | sudo -S docker tag mejbri1998/api:latest mejbri1998/api:latest"
                    sh "echo root | sudo -S docker tag mejbri1998/client:latest mejbri1998/client:latest"
                    
                    sh "echo root | sudo -S docker push mejbri1998/api:latest"
                    sh "echo root | sudo -S docker push mejbri1998/client:latest"
                }
            
        }
    }
    post {
        always {
            sh 'echo root | sudo -S docker system prune -af'
        }
    }
}