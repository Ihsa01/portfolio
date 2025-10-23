pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                deleteDir() // clean old workspace first
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
