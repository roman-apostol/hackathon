$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };
    var geocoder;
    var map;
    window.PhotoLoc = Backbone.RelationalModel.extend ({
        defaults:{
            first:true,
            src:null,
            caption: null,
            like_info:null,
            ownerName:null,
            pic_small:null,
            link:null
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
        //$("#locationModal").modal('hide');

        user.bind("change:id", this.loggedIn, this)
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    },


    loggedIn: function() {
        //$("#loader").show();
        $("#pzd").show();
        //$("#locationModal").modal('hide');
        var self = this;
        FB.api(
            {
                method: 'fql.multiquery',
                queries: {
                    query1: "SELECT id,tagged_uids FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1322719200 and ("+
                    parseInt(window.user.get('latitude'))+"-latitude) < 1 and ("+
                        parseInt(window.user.get('longitude'))+"-longitude) < 1 limit 300",

                    query2:  "SELECT place_id,album_object_id,object_id	,link,src_big,caption,like_info,owner FROM photo WHERE object_id IN (SELECT id from #query1 ) order by like_info desc limit 10"
                }



            },
            function(response) {
                console.log(response[1]);
                //console.log(response[0]);
                if(typeof response[1] != 'undefined'){
                    window.photos.reset(response[1].fql_result_set);
                }
                else{

                }
                self.render();
                $("#loader").hide();
            }
        );
       // console.log('dima view');
    }     ,
    render: function() {
        var self= this;
        $(self.el).html("");

        for(var j =0; j< photos.length && j < 120;j++){
            //console.log(photos.models[j].get('src_big'));

            $(self.el).append((new window.DimaSinglePhotoView({model:photos.models[j]})).render().el);//self.template(photos.models[j].toJSON()));
            //var  newView = window.DimaSinglePhotoView;
            if(photos.models[j].get('first'))
            {
                var referencer = photos.models[j];
                    FB.api(
                    {
                        method: 'fql.multiquery',
                        queries: {
                            query1: "SELECT pic_small,uid, name FROM user WHERE uid=" + referencer.get('owner')
                        }
                    },

                    function(response) {
                        //console.log(response[0].fql_result_set);
                        for(var rrr =0; rrr< photos.length && rrr < 120;rrr++){
                            if(photos.models[rrr].get('owner') == response[0].fql_result_set[0].uid)
                            {
                                photos.models[rrr].set('first',false);

                                photos.models[rrr].set('ownerName',response[0].fql_result_set[0].name);
                                photos.models[rrr].set('pic_small',response[0].fql_result_set[0].pic_small);
                                photos.models[rrr].set('ownerName',response[0].fql_result_set[0].name);
                            //console.log(response[0].fql_result_set[0].name);
                                photos.models[rrr].trigger('change');
                            }
                        }

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
            //$(this.el).html();

            $(this.el).html(this.template(this.model.toJSON()));

             return this;
        }


    });
});