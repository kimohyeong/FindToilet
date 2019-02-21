
$("#구읍면").chained("#시군");
$("#accordion").accordion();
$(window).load(defaultMap);
var addr;
var addr2;
var addr3;
var check=true;

var check2=false;
var current_point;
pdata_x = new Array();
pdata_y = new Array();
fname = new Array();
m_wtrcls = new Array();
m_uil = new Array();
m_dspsn = new Array();
f_wtrcls = new Array();
f_despsn = new Array();

//////////////////////////////////////공공데이터-->파씽/////////////////////////
$("#resultbtn").click(requestdata);
$("#resultbtn2").click(clickmap);

sigun_name= new Array("가평군","고양시","과천시","광명시" ,"광주시" ,"구리시","군포시","김포시","남양주시","동두천시","부천시","성남시", "수원시","시흥시" ,"안산시" ,"안성시" ,"안양시" ,"양주시" ,"양평군" ,"여주시" ,"연천군" ,"오산시" ,"용인시" ,"의왕시" ,"의정부시" ,"이천시" ,"파주시" ,"평택시" ,"포천시" ,"하남시" ,"화성시");

sigun_cd = new Array("41820","41280","41290","41210","41610","41310","41410","41570","41360","41250","41190","41130","41110","41390","41270","41550","41170","41630","41830","41670","41800","41370","41460","41430","41150","41500","41480","41220","41650","41450","41590");

function requestdata(){

	addr = "경기도 ";

	if(check==true)
	{
		addr2=document.getElementById("시군").options[document.getElementById("시군").selectedIndex].text;
		if(addr2=="-- 시/군 --")
			addr2=" ";

		addr3=document.getElementById("구읍면").options[document.getElementById("구읍면").selectedIndex].text;
		if(addr3=="-- 구/읍/면 --")
			addr3=" ";
	}
	else
	{

	}

	addr+=(addr2+" "+addr3);

	//alert("addr: "+addr);
    
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=1000&SIGUN_CD=";
	var i=0;
	for(i=0;i<sigun_name.length;i++){

		if(addr2==sigun_name[i]){
			break;
		}
	}
	url+=sigun_cd[i];

	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success,
		error : error			
	});
}

function success(request){
	var i=0;
	var xmlString = (new XMLSerializer()).serializeToString(request);	//ajax통신을 통해서 가져온 xml객체를 string으로 변환

	var pdata = $(xmlString).find('row');	//파싱할 부분
	var str = "";
	var add;

	$(pdata).each(function(){

		add = $(this).find('REFINE_LOTNO_ADDR').text();//주소

		if(add.indexOf(addr3)>0)
			{
				pdata_x[i] = $(this).find('REFINE_WGS84_LAT').text();	//위도
				pdata_y[i] = $(this).find('REFINE_WGS84_LOGT').text();	//경도
				fname[i] = $(this).find('PBCTLT_PLC_NM').text();

				m_wtrcls[i] = $(this).find('MALE_WTRCLS_CNT').text();//남성대변기
				m_uil[i]=$(this).find('MALE_UIL_CNT').text();//남성 소변기
				m_dspsn[i]= $(this).find('MALE_DSPSN_WTRCLS_CNT').text();//남성장애인용
				f_wtrcls[i]= $(this).find('FEMALE_WTRCLS_CNT').text();//여성대변기
				f_despsn[i]= $(this).find('FEMALE_DSPSN_WTRCLS_CNT').text();//여성장애인용
				i+=1;
			}
		else if(add.indexOf(addr3)==-1)
			;

		
	})
	i=0;
	mapMarker();
}


function error(request,status,error){
	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

}

//////////////////////지도/////////////////////////////


function defaultMap(){
				var oDefaultPoint = new nhn.api.map.LatLng(37.59133,127.1409865);
			    nhn.api.map.setDefaultPoint('LatLng');
			    oMap = new nhn.api.map.Map(map, {
			        point: oDefaultPoint,
			        zoom: 12,
			        enableWheelZoom: true,
			        enableDragPan: true,
			        enableDblClickZoom: false,
			        mapMode: 0,
			        activateTrafficMap: false,
			        activateBicycleMap: false,
			        minMaxLevel: [1, 14],
			        size: new nhn.api.map.Size(1000, 600)
			    });

			

			    tmp = new nhn.api.map.ZoomControl();
				tmp.setPosition({top:60, right:10}); // 위치 설정
				oMap.addControl(tmp); // 지도에 추가


}			   

function mapMarker(){
				oMap.clearOverlay(); //마커지우기
				var i=0;
				var len = pdata_x.length;
				var oPoint = new Array();
				var oSize;
				var oOffset;
				var oIcon;
				var oMarker;
				var oLabel;
				if(len ==0){
					alert("검색결과가 없습니다.");
				
				}
				else{
						for(i=0; i<len; i++)
					    {
							oPoint[i] = new nhn.api.map.LatLng(pdata_x[i],pdata_y[i]);
						    oSize = new nhn.api.map.Size(28, 37); //아이콘 사이즈
							oOffset = new nhn.api.map.Size(14, 37); //아이콘 사이즈에 따른 위치 보정
							oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);
							oMarker = new nhn.api.map.Marker(oIcon, { title : fname[i] }); //마커 제목 생성
							oMarker.setPoint(oPoint[i]); // 마커 표시할 좌표 선택
							oMap.addOverlay(oMarker); //마커를 지도위에 표시
							
							//마커 라벨 출력
							oLabel = new nhn.api.map.MarkerLabel(); //마커 라벨 선언
							oMap.addOverlay(oLabel); //마커 라벨 지도에 추가, 기본은 보이지 않는 상태로 추가됨
							//oLabel.setVisible(true, oMarker); //마커 라벨 보이기

						}

						if(check==false){//현위치 마커
						    oSize1 = new nhn.api.map.Size(28, 37); //아이콘 사이즈
							oOffset1 = new nhn.api.map.Size(14, 37); //아이콘 사이즈에 따른 위치 보정
							oIcon1 = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize1, oOffset1);
							oMarker1 = new nhn.api.map.Marker(oIcon1, { title : "현위치" }); 
							oMarker1.setPoint(current_point); 
							oMap.addOverlay(oMarker1);

							oLabel1 = new nhn.api.map.MarkerLabel(); //마커 라벨 선언
							oMap.addOverlay(oLabel1); //마커 라벨 지도에 추가, 기본은 보이지 않는 상태로 추가됨
							oLabel1.setVisible(true, oMarker1); //마커 라벨 보이기
						}
						oMap.setBound(oPoint);

						oMap.attach('mouseenter', function (oCustomEvent) {
			        var oTarget = oCustomEvent.target;
			        // 마커위에 마우스 올라간거면
			        if (oTarget instanceof nhn.api.map.Marker) {
			        	
			            var oMarker = oTarget;
			          //  alert("??");
			            oLabel.setVisible(true, oMarker); // - 특정 마커를 지정하여 해당 마커의 title을 보여준다.

			        }
			    });

			    oMap.attach('mouseleave', function (oCustomEvent) {
			        var oTarget = oCustomEvent.target;
			        // 마커위에서 마우스 나간거면
			        if (oTarget instanceof nhn.api.map.Marker) {
			            oLabel.setVisible(false);
			        }
			    });


				}

				check2=true;
				 
				addr2=" ";
				addr3=" ";
				addr=" ";

				initializeArray();
			
				check=true;
				

}
function initializeArray(){
pdata_x =null;
pdata_y = null;
fname =null;

pdata_x = new Array();
pdata_y = new Array();
fname = new Array();

}
function clickmap(){
	check2=false;
    var oSize = new nhn.api.map.Size(28, 37);
    var oOffset = new nhn.api.map.Size(14, 37);
    var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);

	oMap.clearOverlay(); //마커지우기
  

  if(check2==false){


    oMap.attach('click', function (oCustomEvent) {

    			current_point = oCustomEvent.point;
		        var oTarget = oCustomEvent.target;

		        var oMarker = new nhn.api.map.Marker(oIcon, {title: '마커 : ' + current_point.toString()});
		        
		        oMap.clearOverlay();

				oMarker.setPoint(current_point);
				oMap.addOverlay(oMarker);

				var oLabel = new nhn.api.map.MarkerLabel(); // - 마커 라벨 선언.
				oMap.addOverlay(oLabel); // - 마커 라벨 지도에 추가. 기본은 라벨이 보이지 않는 상태로 추가됨.
				oLabel.setVisible(true, oMarker); //마커 라벨 보이기

		/////////////역지오코딩//////////////
				var oPoints= current_point.toString().split(',');
				
				var geocoder = new google.maps.Geocoder();

				var location = new google.maps.LatLng(oPoints[1],oPoints[0]);
				
				geocoder.geocode( {'latLng':location}, function(results, status) {
		       		   if (status == google.maps.GeocoderStatus.OK) 
		       		   {
		                    alert(results[0].formatted_address);
		                    var split_result=results[0].formatted_address.split(" ");
		                    addr2=split_result[2];
		                    addr3=split_result[3];
		                    //alert(addr2+addr3);
		       		   } 
		       		   else 
		       		   {
		       		      alert("Geocode was not successful for the following reason: " + status);
		       		   }
		       		   requestdata();
		       		});
				check=false;
				
		    
		    });
	}	    
    	
       
}
