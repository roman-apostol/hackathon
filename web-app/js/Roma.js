$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    window.Page = Backbone.RelationalModel.extend({
        defaults: {
            description: null,
            name: null,
            page_id: null,
            username: null
        }
    });

    window.PageList = Backbone.Collection.extend({
        model: Page
    });

    window.Coords = Backbone.RelationalModel.extend({
        defaults: {
            latitude: null,
            longitude: null
        }
    });

    window.CoordsList = Backbone.Collection.extend({
        model: Coords
    });

    window.Checkin = Backbone.RelationalModel.extend({
        defaults: {
            checkin_id: null,
            message: null,
            timestamp: null
        },
        relations: [{
            type: Backbone.HasOne,
            key: 'coords',
            includeInJSON: true,
            relatedModel: 'Coords'
        }, {
            type: Backbone.HasMany,
            key: 'tagged_uids',
            includeInJSON: true,
            relatedModel: 'User',
            collectionType: 'UserList'
        }]
    });

    window.CheckinList = Backbone.Collection.extend({
        model: Checkin
    });

    window.CheckinView = Backbone.View.extend({
        template: _.template($("#checkin-templ").html()),

        render: function() {
            $(this.el).html(this.template(this.model.toJSONFull()));
            return this;
        }
    });

    window.RomaView = Backbone.View.extend({
        el: $('#checkins'),
        checkins: null,
        pages: null,

        initialize: function() {
            user.bind("change:id", this.retrieveInfo, this);
            this.checkins = new CheckinList;
            this.pages = new PageList;

            this.checkins.bind('reset', this.checkinsReset, this);
        },

        retrieveInfo: function() {
            var self = this;
            FB.api ({
                method: 'fql.multiquery',
                queries: {
                    query1: 'SELECT checkin_id, coords, tagged_uids, page_id, message, timestamp, page_id FROM checkin WHERE author_uid in (SELECT uid2 FROM friend WHERE uid1 = me())',
                    query2: 'SELECT page_id, name, username, description FROM page WHERE page_id in (SELECT page_id FROM #query1)'
                }
            },  function(response) {
                self.pages.reset(response[1].fql_result_set);
                self.checkins.reset(response[0].fql_result_set);
            });
        },

        checkinsReset: function() {
            var self = this;
            this.checkins.each(function(val) {
                var view = new CheckinView({model: val});
                $(self.el).append(view.render().el);
            });
        }
    });
});
