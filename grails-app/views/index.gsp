<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<title>Clazzoo</title>
        <link href="css/bootstrap.css" rel="stylesheet">
	</head>
	<body>


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
            </div><!--/span-->
            <div class="span9">
                <div class="hero-unit" style="text-align: center;">
                   <span>

                    </span>
                    <div>
                       <h3> Please login to start using service: -   <div class="fb-login-button"   data-scope="email, publish_actions, publish_stream" data-onlogin="window.Auth.fbOnLogin();" style="display:inline;">Login with facebook</div></strong></a>
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
                    <div class="span3">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn" href="#">View details &raquo;</a></p>
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
    <script src="js/index.js"></script>
    <%--<script src="../assets/js/bootstrap-alert.js"></script>
    <script src="../assets/js/bootstrap-modal.js"></script>
    <script src="../assets/js/bootstrap-dropdown.js"></script>
    <script src="../assets/js/bootstrap-scrollspy.js"></script>
    <script src="../assets/js/bootstrap-tab.js"></script>
    <script src="../assets/js/bootstrap-tooltip.js"></script>
    <script src="../assets/js/bootstrap-popover.js"></script>
    <script src="../assets/js/bootstrap-button.js"></script>
    <script src="../assets/js/bootstrap-collapse.js"></script>
    <script src="../assets/js/bootstrap-carousel.js"></script>
    <script src="../assets/js/bootstrap-typeahead.js"></script>--%>
    <div id="fb-root"></div>
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
