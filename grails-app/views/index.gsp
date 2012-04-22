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
        <div class="well">
            <div id="panoramio{{id}}" ></div>

            <img src="https://graph.facebook.com/{{from.id}}/picture?type=large" style="width:80px">
            {! for (var i in tags.data) { !}
                {!print('<img src=\'https://graph.facebook.com/'); print(tags.data[i].id); print("/picture?type=small' style='width: 40px;'>");!}
                {! } !}

            <span>
                <h5><a href="https://facebook.com/{{from.id}}">{{from.name}}</a>
                {! if (tags.data.length) { !}
                {! print('with'); !}
                    {! for (var i in tags.data) { !}
                    {! if (i > 0) {print ('and');} !}
                        {!print('<a href=\'https://facebook.com/'); print(tags.data[i].id); print("\' >")!}
                            {{tags.data[i].name}}
                        </a>
                    {! }} !}
                    </h5> <h5>at <a href="http://facebook.com/{{place.id}}">{{place.name}}</a></h5>
            </span>
                <a href="https://facebook.com/{{id}}/">{!if (message) print(message.substr(0,60))!}...  </a>
            <p>
                <span style="font-size: 10px;" >{!print(likes.data.length)!} likes</span>
                <span style="font-size: 10px;" >{! print(comments.data.length)!} messages</span>
            {! for (var i = comments.data.length-1; i >= Math.max(0, comments.data.length-4); i--) { !}
                {! print('<img src=\'https://graph.facebook.com/'); print(comments.data[i].from.id); print("/picture?type=small' style='width: 20px;'>"); !}
                {{comments.data[i].message}}
            {! } !}

            </p>
        </div>
        <br />
    </script>
    <script type="text/template" id="place-templ">
        <div class="entry">

            <h3>{{place.name}}</h3>
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
                        <p>{{place.rating}}</p>
                    {! } !}
                </div>
            </div>
        </div>
    </script>

    <div id="loader" style="display:none;">
        <div id="loaderBg"></div>
        <div class="loading3">
            Loading
        </div>
    </div>
    <div class="hero-unit"><div class="container"><div class="row"><div class="span12 centered"><h1>Best suggestions for places to go</h1><h2> ⋅  Open APIs  ⋅  Client based logic ⋅  Built for 24 hours</h2></div></div></div></div>
    <div class="container content">
        <div class="section no-bg">
            <div class="row">
                <div class="offset6 span6">
                    <div class="inset">
                        <h2>What is Clazzoo?</h2>
                        <p>It's a hack project, built for 24 hours on Facebook hackoton. Based on your and your friends activity on facebook, it suggests places to visit in selected city. By default in your current city</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="row">
                <div class="span4" id="checkins"></div>
                <div class="span4" id="places"></div>
                <div class="span4" id="photos"></div>
            </div>
        </div>
        <div class="section external-apis">
            <h2>Technologies used by Clazzoo</h2>
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
            <div class="span3">
                <div class="well sidebar-nav">
                    <ul class="nav nav-list">
                        <li class="nav-header">Kyiv</li>
                        <li class="active"><a href="#">Dmytro Voloshyn</a></li>
                        <li><a href="#">Taras Galkovsky</a></li>
                        <li><a href="#">paul Tarjan</a></li>

                        <li class="nav-header">Places nearby</li>
                        <li class="active" id="instagr3"><a href="#">Dmytro Voloshyn</a></li>
                        <li><a href="#" id="instagr2">Taras Galkovsky</a></li>
                        <li><a href="#" id="instagr" >paul Tarjan</a></li>
                    </ul>
                </div><!--/.well -->
               <%-- <iframe width="290" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=50.453732+30.51&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=39.644047,92.988281&amp;ie=UTF8&amp;t=p&amp;ll=50.453733,30.509977&amp;spn=0.016395,0.025749&amp;z=14&amp;output=embed"></iframe><br /><small><a href="http://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=50.453732+30.51&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=39.644047,92.988281&amp;ie=UTF8&amp;t=p&amp;ll=50.453733,30.509977&amp;spn=0.016395,0.025749&amp;z=14" style="color:#0000FF;text-align:left">View Larger Map</a></small>--%>
            </div><!--/span-->
            <div id="map"></div>
            <div class="span9">
                <div class="hero-unit" style="text-align: center;">
                   <span>

                    </span>
                    <div>
                        <div id="city-input" style = "display:none;" ><h3>Please enter the city you wanna to visit…</h3><input type="text" id="city" style="display:inline;"/>     <a href="#" id="blocation" class="btn btn-primary" style="display:inline;">Yeh</a></div>

                        <div id="facebook-login"><h3> Please login to start using service: -   <div class="fb-login-button"   data-scope="email, publish_actions, publish_stream, user_status, friends_status, user_checkins, friends_checkins,friends_photos, user_photos, user_events, friends_events" data-onlogin="window.Auth.fbOnLogin();" style="display:inline;">Login with facebook</div></h3></strong></a></div>

</h3>
                    </div>
                       <%--<div class="fb-login-button" size="medium" data-show-faces="true" data-width="200" data-max-rows="1" ></div>
                        --%>
                </div>

                <div class="row-fluid">
                    <div class="span3">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn" href="#">View details &raquo;</a></p>
                    </div><!--/span-->
                    <!-- <div class="span3" id="checkins"> -->

                    <!-- </div>[>/span<] -->
                    <!-- <div class="span3" id="places"> -->
                    <!-- </div>[>/span<] -->
                    <!-- <div class="span3" id="photos"> -->

                    </div><!--/span-->

                </div><!--/row-->
            </div><!--/span-->
        </div><!--/row-->

        <hr>
    <div id="map_canvas" style="width:100%; height:100%;top:0px;left:0px;" <%--style="display: none;"--%>></div>
        <div class="footer footer-btm"><div class="fill"><div class="container"><div class="row"><div class="span4 offset4"><p class="centered"> Clazzoo &mdash; Facebook hackaton 2012</p></div></div></div></div></div>

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

        <div class="well">
            <div class="masked-image">
            <img src="{{src_big}}" style = "width:150px;" />
            <div class="cookie-cutter" style="width:150px;height:{! print(parseInt(150*(src_height/src_width))) !} px;background-size: 150px {! print(parseInt(150*(src_height/src_width)))!}px; ">
            </div>
            </div>
            {! if(like_info.can_like) { !}
            <iframe src="//www.facebook.com/plugins/like.php?href={{link}}&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80&amp;appId=367045423345977" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:30px;" allowTransparency="true"></iframe><table class="uiGrid" cellspacing="0" cellpadding="0">
            <table class="trick">
                <tbody>
                <tr><td><div class="thumbs_up hidden_elem"></div>
                </td><td><div class="undo hidden_elem"></div>
                </td></tr><tr><td><div class="connect_widget_button_count_nub"><s></s><i></i>
                </div></td><td>
                    <div class="connect_widget_button_count_count">{{like_info.like_count}}</div>
                </td></tr></tbody></table>
            {!  } !}
            <p>
                <%--{{place_id}}--%>
                <br />
                <div class="well" style="padding:5px;margin:0px;background:#hhhhhh;">
                <strong>{! if(ownerName) {if(pic_small)print('<img src='+pic_small+' style="width:30px;"/>'); print(ownerName);} !}
                <br />
                in <a href="{{link}}">{! print(loc_name);!}</a>{! if(address)print(address); !}</strong>
                </div>
                <%--<a href="{{link}}">{{caption.substr(0,60)}}...[read more?]  </a>--%>
            </p>
        </div>
        <br />
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
