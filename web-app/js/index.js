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

            navigator.geolocation.getCurrentPosition(
                function( position )
                {
                    window.user.set('latitude',position.coords.latitude);
                    window.user.set('longitude',position.coords.longitude);
                });


            callback_after = this.reloadPage;
        },

        reloadPage: function() {
            window.location.reload();
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

            FB.init({
                appId      : 	367045423345977,
                status     : true,
                cookie     : true,
                xfbml      : true,
                oauth      : true,
                expires    : 60*24*60
            });

            FB.getLoginStatus(function(response) {
                user.set('id', response.authResponse.userId);
            }, true);
        },

        fbOnLogin: function() {
            FB.login(function(response) {
                if (response.status == 'connected') {
                    user.set('id', response.authResponse.userId);
                    window.user.set('firstName', 'Dima');
                }
            });
        }
    });


    window.CommonView = Backbone.View.extend ({
        el: $('body'),

        events: {
           // "click div [id^=drop-down]"    : "toggleDropDownState"
        },

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



});

