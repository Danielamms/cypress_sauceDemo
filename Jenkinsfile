pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}\\.cypress-cache"
  }

  stages {
    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install and Verify Cypress Binary') {
      steps {
        bat 'npx cypress install'
        bat 'npx cypress verify'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        bat 'npx cypress run'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'cypress/screenshots/**/*,cypress/videos/**/*', allowEmptyArchive: true
    }
  }
}
