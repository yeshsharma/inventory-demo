pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out code...'
                git branch: 'main', url: 'https://github.com/yeshsharma/inventory-demo.git
            }
        }

        stage('Cleanup Old Images') {
            steps {
                echo '🧹 Cleaning up old Docker images...'
                sh 'docker system prune -af || true'
                // "|| true" means: even if this fails, continue (don't break the build)
            }
        }

        stage('Build') {
            steps {
                echo '🛠️ Building Docker image...'
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying...'
                sh 'docker compose down || true'   // Stop old containers
                sh 'docker compose up -d'          // Start new ones
            }
        }
    }

    post {
        success {
            echo '✅ Deployed successfully! Visit http://localhost:3000'
        }
        failure {
            echo '❌ Build failed. Check logs above.'
        }
    }
}