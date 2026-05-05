pipeline {
  agent any

  options {
    timestamps()
    skipDefaultCheckout(true)
  }

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}\\.cypress-cache"
  }

  stages {
    stage('Checkout Code') {
      steps {
        deleteDir()
        checkout scm
        bat 'git rev-parse --short HEAD'
      }
    }

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
        bat 'if exist results rmdir /s /q results'
        bat 'mkdir results'
        bat 'npx cypress run --browser electron --headless --reporter junit --reporter-options "mochaFile=results/test-results-[hash].xml,toConsole=true"'
      }
    }
  }

  post {
    always {
      junit testResults: 'results/*.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'results/*.xml,cypress/screenshots/**/*,cypress/videos/**/*', allowEmptyArchive: true
    }
  }
}
