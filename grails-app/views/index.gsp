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
        <div>TEST!!!</div>
    </script>
    <div class="modal" id="locationModal" style="display:none;">
        <div class="modal-header">
            <a class="close" data-dismiss="modal">×</a>
            <h3>Enter your location...</h3>
        </div>
        <div class="modal-body">
            <p>Please enter the city you wanna to visit…</p>
        </div>
        <div class="modal-footer">

            <a href="#" class="btn btn-primary">Yeh</a>
        </div>
    </div>

    <div id="loader" style="display:none;">
        <div id="loaderBg"></div>
        <div class="loading3">
            Loading
        </div>
    </div>
    <div class="container-fluid">
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
                <iframe width="290" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=50.453732+30.51&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=39.644047,92.988281&amp;ie=UTF8&amp;t=p&amp;ll=50.453733,30.509977&amp;spn=0.016395,0.025749&amp;z=14&amp;output=embed"></iframe><br /><small><a href="http://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=50.453732+30.51&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=39.644047,92.988281&amp;ie=UTF8&amp;t=p&amp;ll=50.453733,30.509977&amp;spn=0.016395,0.025749&amp;z=14" style="color:#0000FF;text-align:left">View Larger Map</a></small>
            </div><!--/span-->
            <div class="span9">
                <div class="hero-unit" style="text-align: center;">
                   <span>

                    </span>
                    <div>
                       <h3> Please login to start using service: -   <div class="fb-login-button"   data-scope="email, publish_actions, publish_stream, user_checkins" data-onlogin="window.Auth.fbOnLogin();" style="display:inline;">Login with facebook</div></strong></a>
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
                    <div class="span3">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn" href="#">View details &raquo;</a></p>
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
            <p>
            {{caption}}  - {{like_info.like_count}}
            </p>
            <img src="{{src}}" style = "width:180px;" />
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

            // Additional initialization code here
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
    </body>
</html>
