$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    window.PhotoLoc = Backbone.RelationalModel.extend ({
        defaults:{
            src:null
            //lastName: null
        }

    });

    window.PhotoList = Backbone.Collection.extend({
        model: PhotoLoc
    });
    window.photos = new PhotoList;
window.DimaView = Backbone.View.extend({
    el: $("#photos"),

    template: _.template($('#photos-tmpl').html()),

    initialize: function() {
        user.bind("change:firstName", this.loggedIn, this)
    },

    loggedIn: function() {
        $("#loader").show();
        var self = this;
        FB.api(
            {
                method: 'fql.query',
                query: "SELECT src_big FROM photo WHERE object_id IN(SELECT id FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1331143200 ) limit 10",

            },
            function(response) {
                //alert('Your name is ' + response[0].name);
                //console.log(response.length);

                for(var i=0; i <response.length; i++)
                {
                    var ph_temp = new PhotoLoc({src:response[i].src_big});
                    window.photos.add(ph_temp);
                }
                self.render();
                $("#loader").hide();
            }
        );
        console.log('dima view');
    }     ,
    render: function() {
        var self= this;
        $(self.el).html("");
        for(var j =0; j< photos.length;j++){


            console.log(photos.models[j].get('src'));
            $(self.el).append(self.template(photos.models[j].toJSON()));
        }

        return this;
    }


});
});