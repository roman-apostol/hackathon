$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    window.PhotoLoc = Backbone.RelationalModel.extend ({
        defaults:{
            src:null,
            caption: null,
            like_info:null
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
        $("#locationModal").modal('hide');

        user.bind("change:id", this.loggedIn, this)
    },

    loggedIn: function() {
        $("#loader").show();
        $("#locationModal").modal('hide');
        var self = this;
        FB.api(
            {
                method: 'fql.multiquery',
                queries: {
                    query1: "SELECT id FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1331143200 and "+
                    parseInt(window.user.get('latitude'))+"-latitude < 5 and "+
                        parseInt(window.user.get('longitude'))+"-longitude < 5",

                    query2:  "SELECT src_big,caption,like_info,owner FROM photo WHERE object_id IN (SELECT id from #query1) order by like_info desc limit 20"
                }



            },
            function(response) {

                //alert('Your name is ' + response[0].name);
                //console.log(window.user.get('latitude'));
                //console.log(window.user.get('longitude'));

               /* for(var i=0; i <response.length; i++)
                {
                    var ph_temp = new PhotoLoc({src:response[i].src_big, caption:response[i].caption,like_info:response[i].like_info});
                    window.photos.add(ph_temp);
                }*/

                window.photos.reset(response[1].fql_result_set);
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
            console.log(photos.models[j].get('src_big'));
            $(self.el).append(self.template(photos.models[j].toJSON()));
        }

        return this;
    }


});
});