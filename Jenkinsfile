pipeline {
    agent any
    stages {
        stage('Verify Checkout') {
            steps {
                echo '--- Verifying package.json ---'
                sh 'ls -la'
                echo '----------------------------'
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ihsa01/portfolio',
                    credentialsId: 'github-token1'
            }
        }
        stage('Build') {
            steps {
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm install --legacy-peer-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying portfolio...'
            }
        }
    }
}
