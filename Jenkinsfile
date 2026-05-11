pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Check Docker') {
            steps {
                sh 'which docker'
                sh 'docker --version'
            }
        }

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
                sh 'docker run -d -p 3000:80 --name inventory-demo-container inventory-demo'
            }
        }
    }
}