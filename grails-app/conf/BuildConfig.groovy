grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
//grails.project.war.file = "target/${appName}-${appVersion}.war"

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // uncomment to disable ehcache
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

    repositories {
        inherits true // Whether to inherit repository definitions from plugins
        grailsPlugins()
        grailsHome()
        grailsCentral()
        mavenCentral()

        // uncomment these to enable remote dependency resolution from public Maven repositories
        //mavenCentral()
        //mavenLocal()
        //mavenRepo "http://snapshots.repository.codehaus.org"
        //mavenRepo "http://repository.codehaus.org"
        //mavenRepo "http://download.java.net/maven/2/"
        //mavenRepo "http://repository.jboss.com/maven2/"
    }
    dependencies {
        runtime 'postgresql:postgresql:9.1-901.jdbc4'
        compile 'org.springframework.social:spring-social-core:1.0.0.RELEASE'
        compile 'org.springframework.social:spring-social-facebook:1.0.0.RELEASE'
        compile 'org.springframework.social:spring-social-facebook-web:1.0.1.RELEASE'
        compile 'org.codehaus.jackson:jackson-jaxrs:1.9.5'
    }

    plugins {
        runtime ":hibernate:$grailsVersion"
        runtime ":resources:1.1.6"
        runtime ":cache-headers:1.1.5"
        runtime ":cached-resources:1.0"
        runtime ":zipped-resources:1.0"

        compile ":database-migration:1.0"
        compile ":lesscss-resources:1.0.1"

        build ":tomcat:$grailsVersion"
    }
}
