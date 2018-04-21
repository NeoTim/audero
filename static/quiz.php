<?php
   $social_array = array('facebook', 'twitter', 'buzz');
   $os_array = array('android', 'wp7');
   $app_name_array = array('the_italian_challange', 'the_italian_challange_log_ed', 'the_italian_challenge', 'the_italian_challenge_log_ed');
   $shared_url = 'http://www.audero.it';
   $shared_image = 'images/icona_99x99_quiz.png';
   $shared_name = 'The Italian Challenge';

   $social = $_GET['social'];
   $os = $_GET['os'];
   $app_name = $_GET['app_name'];
   $message = $_GET['message'];

   if ( $social != null  &&  in_array($social, $social_array) &&
        $os != null  &&  in_array($os, $os_array) &&
        $app_name != null  &&  in_array($app_name, $app_name_array) &&
        $message != null
      )
   {
      $message = trim($message);
      $message = strip_tags($message);
      $message = htmlspecialchars($message, ENT_QUOTES, "UTF-8");

      if ($app_name == 'the_italian_challenge_log_ed')
      {
         $shared_image = 'images/icona_99x99_logica_ed.png';
         $shared_name = 'The Italian Challenge Logica Edition';
      }

      $url_twitter = "https://twitter.com/intent/tweet?text=$message via @audero_it";
      $url_facebook = "https://www.facebook.com/dialog/feed?app_id=257522274264650&link=$shared_url&picture=$shared_url/$shared_image&name=$shared_name&caption=Audero.it&description=sfida%20i%20tuoi%20amici&message=$message&redirect_uri=$shared_url";
      $url_buzz = "http://www.google.com/buzz/post?message=$message";
      
      if ($social == 'twitter')
         $url_redirect = $url_twitter;
      else if ($social == 'facebook')
         $url_redirect = $url_facebook;
      else if ($social == 'buzz')
         $url_redirect = $url_buzz;
      
      header("Location: " . $url_redirect);exit();
   }
   else
      echo 'Errore di condivisione';
?>