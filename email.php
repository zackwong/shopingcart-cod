<?php
define('auth', true);
include 'config.php';
include  'fs_email.class.php';
if(empty($_COOKIE['cart'])||!isset($_COOKIE['cart']))exit("购物车为空!");
if(empty($_POST['name'])||!isset($_POST['name']))exit("请填写姓名");
if(empty($_POST['email'])||!isset($_POST['email']))exit("请填写邮箱地址");
if(empty($_POST['adress'])||!isset($_POST['adress']))exit("请填写地址");
if(!preg_match("/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i",$_POST['email']))exit("邮箱地址不合法");
include  'emailtemp.php';
$temp=emailtemp();
echo send_mail(TO_EMAIL,"客户名:".$_POST['name']."的订单", $temp);
echo "OK";
?>
