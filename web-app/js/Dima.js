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
            ownerName:null,
            pic_small:null,
            link:null,
            loc_name:null,
            address:null

        }

    });

    window.PhotoList = Backbone.Collection.extend({
        model: PhotoLoc
    });
    window.photos = new PhotoList;
window.DimaView = Backbone.View.extend({
    el: $("#photos"),

    initialize: function() {
        //EASTER EGG
        $("body").keypress(function(event) {
            if ( event.which == 49 || event.which == 50 || event.which == 51) {

                event.preventDefault();
                $('.panoramio-wapi-img').wrap('<div class="masked-image" />');
                $('.panoramio-wapi-img').css('background-color','white');
                $('.panoramio-wapi-images').css('background-color','white');
                $('.panoramio-wapi-img').each(function(index) {


                    $(this).after('<div class="cookie-cutter" style=" position: absolute;left:0; top:0;width:'+$(this).width()+'px;height:'+$(this).height()+'px;background: url(/images/mask'+event.which+'.png) no-repeat;background-size:'+ $(this).width()+'px '+$(this).height()+'px;"></div>');
                });

            }


        });
        user.bind("change:id", this.loggedIn, this)

    },


    loggedIn: function() {

        var self = this;
        FB.api(
            {
                method: 'fql.multiquery',
                queries: {
                    //get all posts with location
                    query1: "SELECT id,tagged_uids FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1322719200 and ("+
                    parseInt(window.user.get('latitude'))+"-latitude) < 1 and (latitude-"+parseInt(window.user.get('latitude'))+")<1 and ("+
                        parseInt(window.user.get('longitude'))+"-longitude) < 1 and (longitude-"+parseInt(window.user.get('longitude'))+")<1 limit 300",
                    //get all photos
                    query2:  "SELECT src_height,src_width,place_id,album_object_id,object_id	,link,src_big,caption,like_info,owner FROM photo WHERE object_id IN (SELECT id from #query1 ) order by like_info desc limit 10"
                }



            },
            function(response) {

                if(typeof response[1] != 'undefined'){
                    window.photos.reset(response[1].fql_result_set);
                }
                else{
                //todo
                }

                self.render();

            }
        );

    }     ,
    render: function() {
        var  searchRequests = [], self = this;

        jQuery(this.el).empty();
        jQuery(document).bind('searchRequestsDequeue', function () {

            setTimeout(searchRequests.pop(), 100);
        });

        $(self.el).html("");

        for(var j =0; j< photos.length && j < 120;j++){

            if(photos.models[j].get('first'))
            {
                var referencer = photos.models[j];
                    FB.api(
                    {
                        method: 'fql.multiquery',
                        queries: {
                            query1: "SELECT pic_small,uid, name FROM user WHERE uid=" + referencer.get('owner'),
                            query2: "SELECT name,longitude, latitude,page_id FROM place WHERE page_id=" + referencer.get('place_id')
                        }
                    },

                    function(response) {

                        for(var rrr =0; rrr< photos.length; rrr++){
                            if(photos.models[rrr].get('owner') == response[0].fql_result_set[0].uid)
                            {
                                photos.models[rrr].set('first',false);

                                photos.models[rrr].set('uid',response[0].fql_result_set[0].uid);
                                photos.models[rrr].set('ownerName',response[0].fql_result_set[0].name);
                                photos.models[rrr].set('pic_small',response[0].fql_result_set[0].pic_small);
                                photos.models[rrr].set('loc_name',response[1].fql_result_set[0].name);

                                searchRequests.push((function (model) {

                                    placesServices.search(
                                        {
                                            location: new google.maps.LatLng(
                                                response[1].fql_result_set[0].latitude,
                                                response[1].fql_result_set[0].longitude
                                            ),

                                            radius: 1000//Common.RADIUS

                                        }, function (results, status) {
                                            if (status == google.maps.places.PlacesServiceStatus.OK) {
                                                model.set('address',results[0].vicinity);
                                                $(self.el).append((new window.DimaSinglePhotoView({model:model})).render().el);//self.template(photos.models[j].toJSON()));

                                            }
                                            jQuery(document).trigger('searchRequestsDequeue');
                                        },
                                        function () {
                                            jQuery(document).trigger('searchRequestsDequeue');
                                        }
                                    );
                                }).bind(this,photos.models[rrr]));

                            }
                        }
                        jQuery(document).trigger('searchRequestsDequeue');
                    }//response
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
            $(this.el).html(this.template(this.model.toJSON()));

             return this;
        }


    });
});
