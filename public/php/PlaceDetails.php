<?php
  $api = "AIzaSyC4-Zq7jdKl1arKQgOJ6FdA6to30l0-wzE";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJVVVVlaqqFIwR6_L_MlCXJrM&key=".$api);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $output = curl_exec($ch);
  //curl_close($ch);
  //echo $output;
  //echo json_encode($output);
?>