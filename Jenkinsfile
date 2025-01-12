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
                sh 'echo root | sudo -S docker build -t mejbri1998/api:latest ./api/'
                sh 'echo root | sudo -S docker build -t mejbri1998/client:latest ./client/'
                sh 'echo root | sudo -S docker build -t mejbri1998/pythonnlp:latest ./python/'
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
        stage('Tag Images to Docker Hub') {
            steps {
                sh 'echo root | sudo -S docker tag mejbri1998/api:latest mejbri1998/api:latest'
                sh 'echo root | sudo -S docker tag mejbri1998/client:latest mejbri1998/client:latest'
                sh 'echo root | sudo -S docker tag mejbri1998/pythonnlp:latest mejbri1998/pythonnlp:latest'
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                sh 'echo root | sudo -S docker push mejbri1998/api:latest'
                sh 'echo root | sudo -S docker push mejbri1998/client:latest'
                sh 'echo root | sudo -S docker push mejbri1998/pythonnlp:latest'
            }
        }
    }
    post {
        always {
            sh 'echo root | sudo -S docker system prune -af'
        }
    }
}
