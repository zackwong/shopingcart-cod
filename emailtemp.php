<?php
if ( ! defined('auth')) exit('No direct script access allowed');
 function emailtemp(){
  $Dfrom="<table border='1' cellpadding='10'><tr><td style='text-align: center;'>产品名</td><td>单价</td><td>价格</td><td>数量</td></tr>";
  $Ddata=json_decode($_COOKIE['cart']);
  foreach ($Ddata as $key => $value) {
    $Dfrom.="<tr><td>".$value->title."</td><td style='text-align: center;'>".$value->price."</td><td style='text-align: center;'>".$value->price*$value->count."</td><td style='text-align: center;'>".$value->count."</td></tr>";
	$price+=$value->price*$value->count;
	$count+=$value->count;
  }
  $Dfrom.="</table>";
  $footer="<p>总数:".$count."   金额:".$price."</p>";
  return "客户名:".$_POST['name']." </br>"."客户邮箱:".$_POST['email']."</br>客户地址:".$_POST['adress']."</br>".$Dfrom.$footer;
};
