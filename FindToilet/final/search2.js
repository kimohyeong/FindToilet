
$("#구읍면").chained("#시군");
$("#resultbtn").click(requestdata);	//검색하기 버튼 누르면 경기도 무슨시 무슨군 무슨번지 가져옴
$("#resultbtn_road").click(requestdata2);	//검색하기 버튼 누르면 경기도 무슨시 무슨군 무슨번지 가져옴
$("#resultbtn2").click(selectonmap);
$("#findroad2").click(onChangeHandler);

sigun_name= new Array("가평군","고양시","과천시","광명시" ,"광주시" ,"구리시","군포시","김포시","남양주시","동두천시","부천시","성남시", "수원시","시흥시" ,"안산시" ,"안성시" ,"안양시" ,"양주시" ,"양평군" ,"여주시" ,"연천군" ,"오산시" ,"용인시" ,"의왕시" ,"의정부시" ,"이천시" ,"파주시" ,"평택시" ,"포천시" ,"하남시" ,"화성시");
sigun_cd = new Array("41820","41280","41290","41210","41610","41310","41410","41570","41360","41250","41190","41130","41110","41390","41270","41550","41170","41630","41830","41670","41800","41370","41460","41430","41150","41500","41480","41220","41650","41450","41590");
var locations = [    ];
var addr;	//전체주소
var addr2;	//시군
var addr3;	//구읍면
var addr4;	//번지수

var i=0;
var markers=[];
var current_mark=[];
var map;

var directionsDisplay;
var directionsService;
var bounds;
function findroad2(directionsService, directionsDisplay){

	

        var request = {
          origin:$('#selectaddress').text(),
          destination:$('#dest').text(),
          travelMode: eval("google.maps.DirectionsTravelMode."+"TRANSIT")
      };
      directionsService.route(request, function(response, status) {
       
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
        else{
        	if($('#selectaddress').text()=="")
				alert("현위치를 선택해주세요");
			if($('#dest').text() == "")
				alert("도착지를 선택해주세요");

        	else
        		alert('Directions request failed due to ' + status);
        }
      });

}
function selectonmap(){

	for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

	markers = [];
  
    map.addListener('click', function(event) {
          addMarker2(event.latLng,"현위치");
        });


}

function addMarker2(location, title) {
	for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers=[];

        for (var i = 0; i < current_mark.length; i++) {
          current_mark[i].setMap(null);
        }

	current_mark = [];

 	var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable:true,
    	  title:"현위치"
        });
        
     	current_mark.push(marker);

		infowindow.setContent(title);
	    infowindow.open(map, marker);

        marker.addListener("dragend", function(event) {
        	for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers=[];

        	var geocoder = new google.maps.Geocoder();

			geocoder.geocode( {'latLng':event.latLng}, function(results, status) {
	   		   if (status == google.maps.GeocoderStatus.OK) 
	   		   {


					 $('#selectaddress').text(results[0].formatted_address);

	                var split_result=results[0].formatted_address.split(" ");
	                var dong ="동";
	                var ro="로";
	                if((results[0].formatted_address.indexOf("서울")>-1)){
	                	alert("경기도에서 골라주세요");
	                }

	               	if((results[0].formatted_address.indexOf("경기도")==-1)){
	                	if(results[0].formatted_address.indexOf(dong)>-1){

	                	addr2=split_result[1];
		                addr3=split_result[2];
		                requestdata3();
			            }
			            
	                }
	                else{

	                	if(results[0].formatted_address.indexOf(dong)>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf("읍")>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf("면")>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf(ro)>-1){

			            	addr2=split_result[2];
			                addr3=split_result[3];
			                var num=addr3.indexOf(ro);
			                addr3= addr3.substring(0,num+1);
			                 requestdata4();
			            }
	                
	                }
	                
	   		   } 
	   		   else 
	   		   {
	   		      alert("역지오코딩이 작동하지않습니다. Geocode was not successful for the following reason: " + status);
	   		   }
	   		   

	   		});
          

        });

	  ////////////역지오코딩
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode( {'latLng':location}, function(results, status) {
	   		   if (status == google.maps.GeocoderStatus.OK) 
	   		   {


					 $('#selectaddress').text(results[0].formatted_address);

	                var split_result=results[0].formatted_address.split(" ");
	                var dong ="동";
	                var ro="로";
	                if((results[0].formatted_address.indexOf("서울")>-1)){
	                	alert("경기도에서 골라주세요");
	                }

	               	if((results[0].formatted_address.indexOf("경기도")==-1)){
	                	if(results[0].formatted_address.indexOf(dong)>-1){

	                	addr2=split_result[1];
		                addr3=split_result[2];
		                requestdata3();
			            }
			            
	                }
	                else{

	                	if(results[0].formatted_address.indexOf(dong)>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf("읍")>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf("면")>-1){

	                	addr2=split_result[2];
		                addr3=split_result[3];
		                requestdata3();
			            }
			            if(results[0].formatted_address.indexOf(ro)>-1){

			            	addr2=split_result[2];
			                addr3=split_result[3];
			                var num=addr3.indexOf(ro);
			                addr3= addr3.substring(0,num+1);
			                 requestdata4();
			            }
	                
	                }
	                
	   		   } 
	   		   else 
	   		   {
	   		      alert("Geocode was not successful for the following reason: " + status);
	   		   }
	   		   
	   		});
		
  }

 function addMarker(location, title,info) {
 	
	
  
 	var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          
        });
        markers.push(marker);

        var bounds  = new google.maps.LatLngBounds();


      	loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
       
		bounds.extend(loc);
	
		map.fitBounds(bounds);       
		map.panToBounds(bounds);

	var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>남여공용여부 : </b>'+info[0]+'</p>'+
            '<p><b>남자대변기/소변기 : </b>'+info[1]+'개 / '+info[2]+'개'+'</p>'+
            '<p><b>여자대변기 : </b>'+info[3]+'</p>'+
            '<p><b>남자장애인 변기 : </b>'+info[4]+'</p>'+
            '<p><b>여자장애인 변기 : </b>'+info[5]+'</p>'+
            '<p><b>전화번호 : </b>'+info[6]+'</p>'+
            '</div>'+
            '<div><button class="button special small" onclick="findroad(\''+title+'\')" >도착지로</button></div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
        	//	infowindow.setContent(title);
			    infowindow.open(map, marker);
			  });

          

  }
function findroad(a){
	 $('#dest').text(a);
}
function onChangeHandler() {
          findroad2(directionsService, directionsDisplay);
        };

function initMap() {

	directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;


	var uluru = {lat: 37.59133, lng: 127.1409865};
		map = new google.maps.Map(document.getElementById('map'), {
		  center: uluru,
		  zoom: 15,
		  bounds: markers
		});

	directionsDisplay.setMap(map);
/*
	google.maps.event.addListener(map,'zoom_changed', function(){
		zoomChangeBoundListener=google.maps.event.addListener(map,'bounds_changed',function(event){
			if(this.getZoom()>12)
				this.setZoom(12);
			google.maps.event.removeListener(zoomChangeBoundListener);
		})
	})
*/

		


 }
    

function requestdata3(){

	locations = [    ];
	addr = "경기도 ";
	
	addr+=(addr2+" "+addr3);
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=1000&SIGUN_CD=";
	var i=0;
	for(i=0;i<sigun_name.length;i++){	//시군코드 찾아서 

		if(addr2==sigun_name[i]){
			break;
		}
	}
	url+=sigun_cd[i];	//url뒤에 넣어서 파싱시작

	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success,
		error : error			
	});
}


function requestdata4(){	//도로
for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

	markers = [];

	locations = [    ];
	addr = "경기도 ";
	
	addr+=(addr2+" "+addr3);

	
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=1000&SIGUN_CD=";
	var i=0;
	for(i=0;i<sigun_name.length;i++){	//시군코드 찾아서 

		if(addr2==sigun_name[i]){
			break;
		}
	}
	url+=sigun_cd[i];	//url뒤에 넣어서 파싱시작

	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success2,
		error : error			
	});
}


function requestdata(){
for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

	markers = [];

	for (var i = 0; i < current_mark.length; i++) {
          current_mark[i].setMap(null);
        }

	current_mark = [];


	locations = [    ];
	addr = "경기도 ";
	addr2=document.getElementById("시군").options[document.getElementById("시군").selectedIndex].text;
		if(addr2=="-- 시/군 --")
			addr2=" ";


		addr3=document.getElementById("구읍면").options[document.getElementById("구읍면").selectedIndex].text;
		if(addr3=="-- 구/읍/면 --")
			addr3=" ";

		addr4=document.getElementById("bunji").value;
				if(addr4==" ")
					addr4=" ";
		addr+=(addr2+" "+addr3+" "+addr4);
	
	
	
	
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=1000&SIGUN_CD=";
	var i=0;
	for(i=0;i<sigun_name.length;i++){	//시군코드 찾아서 

		if(addr2==sigun_name[i]){
			break;
		}
	}
	url+=sigun_cd[i];	//url뒤에 넣어서 파싱시작

	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success,
		error : error			
	});
}


function requestdata2(){

	locations = [    ];
	addr = "경기도 ";
	addr2=document.getElementById("시군2").options[document.getElementById("시군2").selectedIndex].text;
		if(addr2=="-- 시/군 --")
			addr2=" ";

		addr3=document.getElementById("roadname").value;
		if(addr3==" ")
			addr3=" ";
		addr+=(addr2+" "+addr3);
		
	
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=1000&SIGUN_CD=";
	var i=0;
	for(i=0;i<sigun_name.length;i++){	//시군코드 찾아서 

		if(addr2==sigun_name[i]){
			break;
		}
	}
	url+=sigun_cd[i];	//url뒤에 넣어서 파싱시작

	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success2,
		error : error			
	});
}


function success(request){	//파싱


	var xmlString = (new XMLSerializer()).serializeToString(request);	//ajax통신을 통해서 가져온 xml객체를 string으로 변환

	var pdata = $(xmlString).find('row');	//파싱할 부분
	var str = "";
	var add;

	$(pdata).each(function(){

		add = $(this).find('REFINE_LOTNO_ADDR').text();//주소
			
		if(add.indexOf(addr3)>0)
			{
					var newlocation=new Array(4);
					newlocation[0]=$(this).find('PBCTLT_PLC_NM').text();
					newlocation[1]=$(this).find('REFINE_WGS84_LAT').text();	//위도
					newlocation[2]=$(this).find('REFINE_WGS84_LOGT').text();	//위도
					
					var info=new Array(8);
					info[0] = $(this).find('MALE_FEMALE_TOILET_YN').text();//공용화장실여부


					info[1] = $(this).find('MALE_WTRCLS_CNT').text();//남성대변기
					info[2]=$(this).find('MALE_UIL_CNT').text();//남성 소변기

					info[3]= $(this).find('FEMALE_WTRCLS_CNT').text();//여성대변기

					info[4]=$(this).find('MALE_DSPSN_WTRCLS_CNT').text();//남성장애인용
					info[5]= $(this).find('FEMALE_DSPSN_WTRCLS_CNT').text();//여성장애인용
					info[6]=$(this).find('MANAGE_INST_TELNO').text();
					info[7]=$(this).find('PBCTLT_PLC_NM').text();
					locations.push(newlocation);

					addMarker(new google.maps.LatLng(newlocation[1], newlocation[2]), newlocation[0],info);
				
				
			}
		else if(add.indexOf(addr3)==-1)
				;


		
	})
}

function success2(request){	//파싱
	var xmlString = (new XMLSerializer()).serializeToString(request);	//ajax통신을 통해서 가져온 xml객체를 string으로 변환

	var pdata = $(xmlString).find('row');	//파싱할 부분
	var str = "";
	var add;
	$(pdata).each(function(){

		add = $(this).find('REFINE_ROADNM_ADDR').text();//주소
			
		if(add.indexOf(addr3)>0)
			{		
					var newlocation=new Array(4);
					newlocation[0]=$(this).find('PBCTLT_PLC_NM').text();
					newlocation[1]=$(this).find('REFINE_WGS84_LAT').text();	//위도
					newlocation[2]=$(this).find('REFINE_WGS84_LOGT').text();	//위도
					
					var info=new Array(8);
					info[0] = $(this).find('MALE_FEMALE_TOILET_YN').text();//공용화장실여부


					info[1] = $(this).find('MALE_WTRCLS_CNT').text();//남성대변기
					info[2]=$(this).find('MALE_UIL_CNT').text();//남성 소변기

					info[3]= $(this).find('FEMALE_WTRCLS_CNT').text();//여성대변기

					info[4]=$(this).find('MALE_DSPSN_WTRCLS_CNT').text();//남성장애인용
					info[5]= $(this).find('FEMALE_DSPSN_WTRCLS_CNT').text();//여성장애인용
					info[6]=$(this).find('MANAGE_INST_TELNO').text();
					info[7]=$(this).find('PBCTLT_PLC_NM').text();
					locations.push(newlocation);

					addMarker(new google.maps.LatLng(newlocation[1], newlocation[2]), newlocation[0],info);
				
				
				
			}
		else if(add.indexOf(addr3)==-1)
				;


		
	})
}


function error(request,status,error){
	alert("인터넷 연결을 해주세요"+"code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

}






/////////////////////라디오


function Rradio_OnOff1(id)

{

   if(id == "Radio_On1")

   {
      document.all["Radio_On1"].style.display = '';         // 보이게
      document.all["Radio_Off1"].style.display = 'none';  // 안보이게
   }

   else
   {
      document.all["Radio_On1"].style.display = 'none';  // 안보이게
      document.all["Radio_Off1"].style.display = '';         // 보이게
      document.all["Radio_On2"].style.display = 'none';  // 안보이게
      document.all["Radio_Off2"].style.display = 'none';  // 안보이게
   }



}


function Rradio_OnOff2(id)

{

   if(id == "Radio_On2")

   {
      document.all["Radio_On2"].style.display = '';         // 보이게
      document.all["Radio_Off2"].style.display = 'none';  // 안보이게
   }

   else
   {
      document.all["Radio_On2"].style.display = 'none';  // 안보이게
      document.all["Radio_Off2"].style.display = '';         // 보이게
   }

   

}

