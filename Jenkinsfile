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
        bat 'npx cypress run --browser electron --reporter junit --reporter-options "mochaFile=results/test-results-[hash].xml,toConsole=true"'
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
