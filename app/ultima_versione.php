<?php
   $anemolif = '2.1';
   $site_seeker = '2.2.2';
   
   $softwareName = '';
   $softwareVersion = '';
   $userAgent = '';
   
   if ( isset($_GET['software']) )
      $softwareName = $_GET['software'];
   
   if ( isset($_GET['version']) )
      $softwareVersion = $_GET['version'];

   if ( isset($_SERVER['HTTP_USER_AGENT']) )
      $userAgent = $_SERVER['HTTP_USER_AGENT'];

   if (strcasecmp($_SERVER['REQUEST_METHOD'], "GET") == 0)
   {
      if (strcasecmp($softwareName, 'anemolif') == 0  ||  strcasecmp($userAgent, 'anemolif') == 0)
         echo $anemolif;
      else if (strcasecmp($softwareName, 'site_seeker') == 0  ||  strcasecmp($userAgent, 'site seeker') == 0)
         echo $site_seeker;
   }
?>