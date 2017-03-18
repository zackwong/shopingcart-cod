  var app = angular.module('productlist',  []);
  app.controller('shopingcart',function($scope, $http) {
	  
	var cartsun=function(){
		if(getCookie("cart")=="") return false;
		cartlist=JSON.parse(getCookie("cart"));
		var cartcount=0;
		var price=0;
		var arr = new Array()
		for(var i in cartlist){
			cartcount+=parseInt(cartlist[i].count);
			price+=parseInt(cartlist[i].price*cartlist[i].count);
		}
		arr['count']=cartcount;
		arr['price']=price;
		$scope.cartinfo=arr;
	}
	
    if(cartsun()||getCookie("cart")!="")
     $scope.cartlist=JSON.parse(getCookie("cart"));

//弹出层(主要用来选择商品的参数)
    $scope.showpop = function(pid){
      $http.get("/products/"+pid+".json")
      .success(function (response) {
         $scope.data =response;
         $scope.set=null;
         var item=new Array();
         for(x in response){
           if(typeof(response[x])=='object') item[x]=response[x].data[0];
         }
		 item["price"]=response["price"];
         $scope.set=item;
		 cartsun();
      });
    };
//添加到购物车
    $scope.addcart=function(){
     var str="";
      for (x in $scope.set){
		  console.log(x!='price');
        if(x!='price')
			str+=" | "+x+":"+$scope.set[x];
	  }
     var item={};
     var cartlist= new Array();

     if(getCookie("cart")!="")
      cartlist=JSON.parse(getCookie("cart"));

     item.title=($scope.data.productID+str).toString();
	 item.price=$scope.set["price"];
     for(var i in cartlist)
      if(cartlist[i].title===item.title)
        return;

     item.count=1;
     cartlist.push(item);
     $scope.cartlist=cartlist;
     setCookie("cart",JSON.stringify($scope.cartlist),7)
	 cartsun();
    } ;
//改变购物车内商品数量
    $scope.cartchange =function(index){
      var count=0;
      count=$scope.cartlist[index].count

      if(getCookie("cart")!="")
       cartlist=JSON.parse(getCookie("cart"));
       if(!(count%1 === 0)||count<1){
		$scope.cartlist=cartlist;
        return;
	   }
       cartlist[index].count=count;
       $scope.cartlist=cartlist;
       setCookie("cart",JSON.stringify($scope.cartlist),7)
	   cartsun();
    };
//删除购物车
    $scope.cartdelete =function(index){
      var cartlist= new Array();
      if(getCookie("cart")!="")
       cartlist=JSON.parse(getCookie("cart"));
      cartlist.splice(index,1);
      $scope.cartlist=cartlist;
      setCookie("cart",JSON.stringify($scope.cartlist),7)
	  cartsun();
    };

	
//提交订单
    $scope.checkout=function(){
            $http(
              {
              method:'post',
              url:'email.php',
              data:$scope.user,
              headers:{'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                      }
              }
            ).success(function (response){
              (response=="OK")?console.log(response):alert(response);
            }
          );
    };

  });



  var setCookie=function(c_name,value,expiredays)
  {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
 };
  var getCookie= function (c_name)
  {
  if (document.cookie.length>0)
    {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
      {
      c_start=c_start + c_name.length+1
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      }
    }
  return ""
  };

  var  delCookie=function(name)
  {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
