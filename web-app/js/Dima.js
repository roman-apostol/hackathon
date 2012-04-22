$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    window.PhotoLoc = Backbone.RelationalModel.extend ({
        defaults:{
            first:true,
            src:null,
            caption: null,
            like_info:null,
            ownerName:null
            //lastName: null
        }

    });

    window.PhotoList = Backbone.Collection.extend({
        model: PhotoLoc
    });
    window.photos = new PhotoList;
window.DimaView = Backbone.View.extend({
    el: $("#photos"),

    //template: _.template($('#photos-tmpl').html()),

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
                    query1: "SELECT id,tagged_uids FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1331143200 and "+
                    parseInt(window.user.get('latitude'))+"-latitude < 5 and "+
                        parseInt(window.user.get('longitude'))+"-longitude < 5",

                    query2:  "SELECT place_id,album_object_id,object_id	,link,src_big,caption,like_info,owner FROM photo WHERE object_id IN (SELECT id from #query1) order by like_info desc limit 20"
                }



            },
            function(response) {
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
            //console.log(photos.models[j].get('src_big'));
            var referencer = photos.models[j];
            $(self.el).append((new window.DimaSinglePhotoView({model:referencer})).render().el);//self.template(photos.models[j].toJSON()));
            //var  newView = window.DimaSinglePhotoView;
            if(referencer.get('first'))
            {

                    FB.api(
                    {
                        method: 'fql.multiquery',
                        queries: {
                            query1: "SELECT name FROM user WHERE uid=" + referencer.get('owner')
                        }
                    },
                    function(response) {
                        //console.log(response[0].fql_result_set);

                        referencer.set('first',false);

                        referencer.set('ownerName',response[0].fql_result_set[0].name);
                        //console.log(response[0].fql_result_set[0].name);
                        referencer.trigger('change');
                    }
                );
            }

        }



        var d = document;
        var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/"+
           "en"+"_"+
            "EN"
            +"/all.js";
        d.getElementsByTagName('head')[0].appendChild(js);

        return this;
    }


});





    window.DimaSinglePhotoView = Backbone.View.extend({

        template: _.template($('#photos-tmpl').html()),
        className: 'photoItem',


        initialize: function() {
            this.model.bind('change', this.render, this);
        },

        render: function() {
            //console.log("ololo" + this.model.get('ownerName'));
            $(this.el).html(this.template(this.model.toJSON()));

             return this;
        }


    });
});
