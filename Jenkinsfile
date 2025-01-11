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
        stage('Scan Vulnerabilities with trivy') {
            steps {
                sh '''
                # Ensure Trivy is installed
                if ! command -v trivy &> /dev/null; then
                    echo "Trivy not found. Installing..."
                    wget -qO- https://github.com/aquasecurity/trivy/releases/latest/download/trivy_$(uname -s)_$(uname -m).tar.gz | tar zxv
                    echo root | sudo -S mv trivy /usr/local/bin/
                fi
                
                # Scan each image
                echo "Scanning API image for vulnerabilities..."
                echo root | sudo -S trivy image mejbria9/api:latest || true
                
                echo "Scanning Client image for vulnerabilities..."
                echo root | sudo -S trivy image mejbria9/client:latest || true
                
                echo "Scanning Python NLP image for vulnerabilities..."
                echo root | sudo -S trivy image mejbria9/pythonnlp:latest || true
                '''
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
        stage('Tag  Images to Docker Hub') {
            steps {
                    sh 'echo root | sudo -S docker tag mejbria9/api:latest mejbria9/api:latest'
                    sh 'echo root | sudo -S docker tag mejbria9/client:latest mejbria9/client:latest'
                    sh 'echo root | sudo -S docker tag mejbria9/pythonnlp:latest mejbria9/pythonnlp:latest'
                }
        }
        stage('push  Images to Docker Hub') {
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