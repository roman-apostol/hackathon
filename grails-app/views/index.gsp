<!doctype html>
<html>
	<head>
		<title>Clazzoo</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script type="text/javascript"
                src="http://www.panoramio.com/wapi/wapi.js?v=1">
        </script>
    </head>
	<body>
    <script>
        window.appId = ${grailsApplication.config.fb.app.id};
    </script>
    <script type="text/template" id="checkin-templ">
        <div class="entry">
            <h3><a href="http://facebook.com/{{place.id}}">{{place.name}}</a></h3>
            <h4>
                <div id="panoramio{{id}}" ></div>
            </h4>

            <div class="row">
                <div class="span3">
                    <h4>Friends</h4>
                    <div class="thumbnails">
                        <a class="thumbnail">
                            <img src='https://graph.facebook.com/{{from.id}}/picture'>
                        </a>
                        {! for (var i in tags.data) { !}
                        <a class="thumbnail">
                            <img src='https://graph.facebook.com/{{tags.data[i].id}}/picture'>
                        </a>
                        {! } !}
                    </div>
                </div>
                <div class="span1">
                    {! if (likes) { !}
                    <h4>Likes</h4>
                    <p>{{likes.data.length}}</p>
                    {! } !}
                </div>
            </div>

        </div>

        <br />
        <%--<hr   style="color:white;height: 15px;line-width:0px;border:0px;
    background: #fff url(/images/separator.gif) no-repeat scroll center;"/>--%>

    </script>
    <script type="text/template" id="place-templ">
        <div class="entry">

            <h3><a href="https://facebook.com/{{eid}}" >{{place.name}}</a></h3>
            <h4>
                <div id="panoramio{{eid}}" ></div>
            </h4>
            <h4>Address</h4>
            <p>{{place.vicinity}}</p>
            <div class="row">
                <div class="span3">
                    <h4>Friends</h4>
                    <div class="thumbnails">
                        {! friends.forEach(function(uid){ !}
                            <a class="thumbnail">
                                <img src="https://graph.facebook.com/{{uid}}/picture" alt="" />
                            </a>
                        {! }); !}
                    </div>
                </div>
                <div class="span1">
                    {! if (place.rating) { !}
                        <h4>Rating</h4>
                        <p>{{place.rating}}/5</p>
                    {! } !}
                </div>
            </div>
        </div>
        <%--<hr   style="color:white;height: 15px;line-width:0px;border:0px;
    background: #fff url(/images/separator.gif) no-repeat scroll center;"/>--%>

    </script>

    <div class="hero-unit"><div class="container"><div class="row"><div class="span12 centered"><h1>Best suggestions for places to go</h1><h2> ⋅  Open APIs  ⋅  Client based implementation ⋅  Built in 24 hours</h2></div></div></div></div>
    <div class="container content">
        <div class="section no-bg">
            <div class="row">
                <div class="span6">
                    <input id="city-selector" type="text" placeholder="Choose city" class="input-medium search-query">
                </div>
                <div class="span6">
                    <div class="inset">
                        <h2>What is Clazzoo?</h2>
                        <p>It's a hack project, built in 24 hours at Facebook Hackathon. It suggests places to visit in selected city based on yours and your friends activities on facebook.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">

            <div id="loader" style="text-align:center;display:none;">
                <div class="loading3">
                    Loading
                </div>
            </div>
            <div id="facebook-login"><h2> Please,  <div class="fb-login-button"   data-scope="email, publish_actions, publish    ↪ _stream, user_status, friends_status, user_checkins, friends_checkins,friends_photos, user_photos, user_events, friends_eve    ↪ nts" data-onlogin="window.Auth.fbOnLogin();" style="display:inline;">Login with facebook</div></h2></strong></a></div>


            <div class="row">
                <div class="span4" id="checkins"></div>
                <div class="span4" id="places"></div>
                <div class="span4" id="photos"></div>
            </div>
        </div>
        <div class="section external-apis">
            <h2>Our technologgy stack</h2>
            <ul class="thumbnails thumbnails-gray">
                <li class="span1">
                    <a class="thumbnail" href="https://github.com/roman-apostol/hackathon"><img src="/images/api-github.jpg" alt="GitHub"/></a>
                </li>
                <li class="span1">
                    <a class="thumbnail" href="https://developers.facebook.com/docs/reference/javascript/"><img src="/images/api-facebook.jpg" alt="Facebook"/></a>
                </li>
                <li class="span1">
                    <a class="thumbnail" href="https://developers.google.com/maps/documentation/javascript"><img src="/images/api-google-maps.jpg" alt="Google Maps"/></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="container-fluid" id = "pzd" >

        <div class="row-fluid">

            <div id="map"></div>

            </div><!--/span-->
        </div><!--/row-->

        <hr>
    <div id="map_canvas" style="width:100%; height:100%;top:0px;left:0px;" <%--style="display: none;"--%>></div>
        <div class="footer footer-btm"><div class="fill"><div class="container"><div class="row"><div class="span4 offset4"><p class="centered"> Clazzoo &mdash; Facebook Hackathon 2012</p></div></div></div></div></div>

    <script src="js/thirdparty/jquery-1.7.1.min.js"></script>
    <script src="js/bootstrap.js"></script>

    <script src="js/Roma.js"></script>
    <script src="js/Dima.js"></script>
    <script src="js/Mitya.js"></script>

    <script src="js/index.js"></script>

    <script src="js/thirdparty/underscore-min.js"></script>
    <script src="js/thirdparty/backbone-min.js"></script>
    <script src="js/thirdparty/backbone-relational.js"></script>

    <div id="fb-root"></div>

    <script type="text/template" id='photos-tmpl'>

        <div class="entry">
            <h3><a href="https://facebook.com/{{object_id}}" >{{loc_name}}</a></h3>
            <h4>
                <img class="photo" src="{{src_big}}"/>
            </h4>

            <h4>Address</h4>
            <p>{{address}}</p>
            <h4>
                Comment
            </h4>
            {{caption.substr(0,80)}}<a href="https://facebook.com/{{object_id}}" > . . . ⏎</a>
            <div class="row">
                <div class="span3">
                    <h4>Friends</h4>
                    <div class="thumbnails">
                        <a class="thumbnail">
                            <img src="https://graph.facebook.com/{{uid}}/picture" alt="{{ownerName}}" />
                        </a>
                    </div>
                </div>
                <div class="span1">
                    {! if (like_info.like_count) { !}
                    <h4>Likes</h4>
                    <p>{{like_info.like_count}}</p>
                    {! } !}
                </div>

            </div>
        </div>
    <%--    <hr   style="color:white;height: 15px;line-width:0px;border:0px;
    background: #fff url(/images/separator.gif) no-repeat scroll center;"/>--%>

    </script>


    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '367045423345977', // App ID
                channelUrl : 'http://localhost:8080', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });
        };

        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    </script>
    <script type="text/javascript"
        src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false">
    </script>
    </body>
</html>
