$(document).ready(function() {
     /********************************************
     * Sign In / Sing Up models and views
     ********************************************/
    window.User = Backbone.RelationalModel.extend ({
        defaults:{
            id: null,
            firstName:null,
            lastName: null
        },

        getFullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        }
    });

    window.UserList = Backbone.Collection.extend({
        model: User
    });

    window.user = new User;

    window.AuthView = Backbone.View.extend ({
        el: $('body'),
        model: user,

        events: {

        },

        initialize: function() {
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        },


        initFB: function(d){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/"+"en"+"_"+
                "EN"
                +"/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        },

        fbAsyncInit: function(response) {
            this.getPos();
            FB.init({
                appId      : 	367045423345977,
                status     : true,
                cookie     : true,
                xfbml      : true,
                oauth      : true,
                expires    : 60*24*60
            });
            var self= this;
            FB.getLoginStatus(function(response) {
                if(response.authResponse){

                    user.set('id', response.authResponse.userId);
                    //$(".hero-unit").hide();
                }else{
                    self.fbOnLogin();
                }

            }, true);
        },

        fbOnLogin: function() {
            FB.login(function(response) {
                if (response.status == 'connected') {
                    //$(".hero-unit").hide();

                    user.set('id', response.authResponse.userId);

                }
            });
        } ,
        getPos: function(){
            var self=this;
            //console.log("hello");
            navigator.geolocation.getCurrentPosition(
                function( position )
                {
                    window.user.set('latitude',position.coords.latitude);
                    window.user.set('longitude',position.coords.longitude);

                    window.user.set('firstName', 'Dima');

                });

        },
    });


    window.CommonView = Backbone.View.extend ({
        RADIUS: 50000, //meters
        getDistanceBetweenLatLng: function (lat1, lng1, lat2, lng2) {
            return 6400000 * Math.acos(
                Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
            );
        },
        el: $('body'),

        events: {
            "click #blocation"    : "locate",
            "click #glocation"    : "glocate",
            "click .close"    : "close"
        },
        close: function()
        {
            $("#locationModal").hide();
        },
        locate : function()
        {
         var city = $("#city").val();
         this.geocode(city);
         //$("#locationModal").modal('hide');
         //   $("#locationModal").hide();
        },

        glocate : function()
        {

            this.getPos();
            $("#locationModal").modal('hide');
            $("#locationModal").hide();
        },

        geocode: function(address)
        {
            var self = this;
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });

                    window.user.set('latitude', results[0].geometry.location.Za);
                    window.user.set('longitude',results[0].geometry.location.$a);
                    //user.set('id',user.get('id'));
                    window.Dima.loggedIn();

                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });

        }    ,
        msToString: function(milliseconds) {
            var minute = 60 * 1000;
            var hours = Math.floor(milliseconds / (minute * 60));
            var minutes = (milliseconds - hours * (minute * 60))  / (1000 * 60);
            hours += '';
            minutes += '';
            if (hours.length < 2) { hours = '0' + hours}
            if (minutes.length < 2) { minutes = '0' + minutes}
            return hours + ':' + minutes;
        },


        resizeImages:function(container, maxWidth, maxHeight){
            $(container+' img').each(function() {
                $(this).load( function() {
                    var ratio = 0;  // Used for aspect ratio
                    var width = $(this).width();    // Current image width
                    var height = $(this).height();  // Current image height
                    // Check if the current width is larger than the max
                    if(width > maxWidth){
                        ratio = maxWidth / width;   // get ratio for scaling image
                        $(this).css("width", maxWidth); // Set new width
                        $(this).css("height", height * ratio);  // Scale height based on ratio
                        height = height * ratio;    // Reset height to match scaled image
                        width = width * ratio;    // Reset width to match scaled image
                    }

                    // Check if current height is larger than max
                    if(height > maxHeight){
                        ratio = maxHeight / height; // get ratio for scaling image
                        $(this).css("height", maxHeight);   // Set new height
                        $(this).css("width", width * ratio);    // Scale width based on ratio
                        width = width * ratio;    // Reset width to match scaled image
                    }
                } );
            });
        }

    })

    window.Common = new CommonView;
    window.Auth = new AuthView;
    window.checkinsView = new CheckinsColumn;
    window.Dima = new DimaView;
    window.Mitya = new MityaView;

    window.fbAsyncInit = function(response) {
        window.Auth.fbAsyncInit(response);
    };

    $(window).scroll(function() {
        window.checkinsView.bottomReached();
    });



});

