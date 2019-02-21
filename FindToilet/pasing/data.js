
//////////////////////////////////////공공데이터-->파씽/////////////////////////
$("#Button1").click(requestdata);

function requestdata(){
	var url ="http://openapi.gg.go.kr/Publtolt?KEY=35aa20240b884e5d9db0a750b19b8616&pIndex=1&pSize=5";
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
	$("#Bdata").text(xmlString);	//textarea출력

	var pdata = $(xmlString).find('row');	//파싱할 부분
	var str = "";
	$(pdata).each(function(){
		//pdata_x[i] = $(this).find('REFINE_WGS84_LAT').text();	//위도
		//pdata_y[i] = $(this).find('REFINE_WGS84_LOGT').text();	//경도
		fname = $(this).find('PBCTLT_PLC_NM').text();
		m_wtrcls = $(this).find('MALE_WTRCLS_CNT').text();//남성대변기
		m_uil=$(this).find('MALE_UIL_CNT').text();//남성 소변기
		m_dspsn= $(this).find('MALE_DSPSN_WTRCLS_CNT').text();//남성장애인용
		f_wtrcls= $(this).find('FEMALE_WTRCLS_CNT').text();//여성대변기
		f_despsn= $(this).find('FEMALE_DSPSN_WTRCLS_CNT').text();//여성장애인용
		add = $(this).find('REFINE_ROADNM_ADDR').text();//주소
		str += "이름: " + fname + '\n'	
			+ "남성대변기수 : " + m_wtrcls + '\n'
			+ "남성소변기수 : " + m_uil+ '\n'
			+ "남성장애인용 : " + m_dspsn+ '\n'
			+ "여성소변기수 : " + f_wtrcls+ '\n'
			+ "여성장애인용 : " + f_despsn+ '\n'
			+ "주소 : " + add + '\n'
			+"count : "+i+ '\n'+'--------------------------------\n';	//파싱
		i+=1;
	})

	$("#Adata").text(str);
	//mapMarker();
}

function error(request,status,error){
	$("#Bdata").text("error");
	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

}

////////////////////////////////////////////////////////////역지오코딩->파씽////////////////////
/*

function mapdata(){
	//역지오코딩
	var address1 ="https://apis.daum.net/local/geo/coord2detailaddr?apikey=61576f048207c4a3dd1cf125cf0afc46&";
	var address2 ="&inputCoordSystem=WGS84";
	var url ="x=126.90983237468618&y=37.49238614627172";
	$.ajax({
		url      : url,
		dataType : 'xml',
		success  : success_map,
		error : error			
	});
}

function success(request){
	var xmlString = (new XMLSerializer()).serializeToString(request);	//ajax통신을 통해서 가져온 xml객체를 string으로 변환
	$("#Bdata").text(xmlString);	//textarea출력

	var pdata = $(xmlString).find('row');	//파싱할 부분
	var str = "";
	$(pdata).each(function(){
		var pdata_x = $(this).find('X_WGS84').text();	//위도
		var pdata_y = $(this).find('Y_WGS84').text();	//경도
		str += "이름: " + $(this).find('FNAME').text() + '\n' + '--------------------------------\n ';	//파싱
	})

	$("#Adata").text(str);
	
}

*/
/////////////////////////////////////////////////지도/////////////////////////////

function defaultMap(){
				var oDefaultPoint = new nhn.api.map.LatLng(37.6355347,127.1480172);
			    nhn.api.map.setDefaultPoint('LatLng');
			    oMap = new nhn.api.map.Map(testMap, {
			        point: oDefaultPoint,
			        zoom: 8,
			        enableWheelZoom: true,
			        enableDragPan: true,
			        enableDblClickZoom: false,
			        mapMode: 0,
			        activateTrafficMap: false,
			        activateBicycleMap: false,
			        minMaxLevel: [1, 14],
			        size: new nhn.api.map.Size(1000, 500)
			    });
			   
}			   

defaultMap();