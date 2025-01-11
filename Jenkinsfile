pipeline {
  agent any
  
  environment {
    DOCKERHUB_CREDENTIALS = credentials('mejbria9-dockerhub')
  }
  stages {
    stage('Build api') {
      steps {
        sh 'docker build -t mejbria9/api:latest ./api/'
      }
    }
    stage('Build client') {
      steps {
        sh 'docker build -t mejbria9/client:latest ./client/' 
      }
    }
    stage('Build pythonnlp') {
      steps {
        sh 'docker build -t mejbria9/pythonnlp:latest ./python/' 
      }
    }
    stage('Scan Vulnerabilities') {
      steps {
        sh '''
          # Install Trivy if not already installed
          if ! command -v trivy &> /dev/null; then
            echo "Installing Trivy..."
            wget -qO- https://github.com/aquasecurity/trivy/releases/latest/download/trivy_$(uname -s)_$(uname -m).tar.gz | tar zxv
            sudo mv trivy /usr/local/bin/
          fi

          # Scan images for vulnerabilities
          echo "Scanning API image..."
          trivy image mejbria9/api:latest || true
          echo "Scanning Client image..."
          trivy image mejbria9/client:latest || true
          echo "Scanning Python NLP image..."
          trivy image mejbria9/pythonnlp:latest || true
        '''
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push') {
      steps {
        sh 'docker push mejbria9/api:latest'
        sh 'docker push mejbria9/client:latest'
        sh 'docker push mejbria9/pythonnlp:latest'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}