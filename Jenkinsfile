pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/yeshsharma/inventory-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t inventory-demo .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker stop inventory-demo-container || true'
                sh 'docker rm inventory-demo-container || true'
                sh 'docker run -d -p 3000:3000 --name inventory-demo-container inventory-demo'
            }
        }
    }
}