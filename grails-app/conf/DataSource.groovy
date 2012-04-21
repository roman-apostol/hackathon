dataSource {
    pooled = true
    driverClassName = "org.postgresql.Driver"
    dialect = org.hibernate.dialect.PostgreSQLDialect
    username = "fb"
    password = "fb"
}

hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}


// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "none"
            url="jdbc:postgresql://localhost:5432/fb"
            pooled = true
        }
    }
    test {
        dataSource {
            dbCreate = "none"
            url="jdbc:postgresql://localhost:5432/fb"
            pooled = true
        }
    }
    production {
        dataSource {
            dbCreate = "none"
            url = "jdbc:postgresql://localhost:5432/odin"
            password = 'fb'
            pooled = true
            properties {
                maxActive = 50
                maxIdle = 25
                minIdle = 10
                initialSize = 5
                minEvictableIdleTimeMillis = 60000
                timeBetweenEvictionRunsMillis = 60000
                numTestsPerEvictionRun = 3
                maxWait = 10000

                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false

                validationQuery = "SELECT 1"
            }
        }
    }
}
