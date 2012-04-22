<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<title>Clazzoo</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/main.css" rel="stylesheet">
	</head>
	<body>
    <script type="text/template" id="checkin-templ">
        <div class="well">

            <img src="https://graph.facebook.com/{{from.id}}/picture?type=large" style="width:80px">
            <span>
                <h5><a href="https://facebook.com/{{from.id}}">{{from.name}}</a>
                {! if (tags.data.length) { !}
                {! print('with'); !}
                    {! for (var i in tags.data) { !}
                    {! if (i > 0) {print ('and')}; print(tags.data[i].name); !}
                {! }} !}
                    </h5> <h5>at <a href="http://facebook.com/{{place.id}}">{{place.name}}</a></h5>
            </span>
                <a href="">{!if (message) print(message.substr(0,60))!}...  </a>
            <p>
                <span style="font-size: 10px;" >{!print(likes.data.length)!} likes</span>
                <span style="font-size: 10px;" >{! print(messages.data.length)!} messages</span>
            </p>
        </div>
        <br />
    </script>
    <div id="map_canvas" style="width:10%; height:10%" style="display: none;"></div>
    <div class="modal" id="locationModal" >
        <div class="modal-header">
            <a class="close" data-dismiss="modal">×</a>
            <h3>Enter your location...</h3>
        </div>
        <div class="modal-body">
            <h3>Please enter the city you wanna to visit…</h3>
            
            <input type="text" id="city" style="display:inline;"/>     <a href="#" id="blocation" class="btn btn-primary" style="display:inline;">Yeh</a>
            <h3>Or let us take your current position!</h3>
            <a href="#" id="glocation" class="btn btn-primary">Where am I?</a>
        </div>

    </div>

    <div id="loader" style="display:none;">
        <div id="loaderBg"></div>
        <div class="loading3">
            Loading
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
                        <li class="active"><a href="#">Dmytro Voloshyn</a></li>
                        <li><a href="#">Taras Galkovsky</a></li>
                        <li><a href="#">paul Tarjan</a></li>
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
<h3> Please login to start using service: -   <div class="fb-login-button"   data-scope="email, publish_actions, publish_stream, user_status, friends_status, user_checkins, friends_checkins,friends_photos, user_photos, user_events, friends_events" data-onlogin="window.Auth.fbOnLogin();" style="display:inline;">Login with facebook</div></strong></a>
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
                    <div class="span3" id="checkins">

                    </div><!--/span-->
                    <div class="span3">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn" href="#">View details &raquo;</a></p>
                    </div><!--/span-->
                    <div class="span3" id="photos">

                    </div><!--/span-->

                </div><!--/row-->
            </div><!--/span-->
        </div><!--/row-->

        <hr>

        <footer>
            <p> Clazzoo for hackaton 2012(c)</p>
        </footer>

    </div><!--/.fluid-container-->
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

            <img src="{{src_big}}" style = "width:180px;" />

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
                <strong>{! if(ownerName) {print('<img src='+pic_small+' />'); print(ownerName);} !}</strong>
                <a href="{{link}}">{{caption.substr(0,60)}}...[read more?]  </a>



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
