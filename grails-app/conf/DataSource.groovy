hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}


// environment specific settings
environments {
    development {
    }
    test {
    }
    production {

    }
}
