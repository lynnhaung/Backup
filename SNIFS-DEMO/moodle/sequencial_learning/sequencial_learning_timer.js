

// 時間參數
var minute = 10;

//下一步: force_next 
force_next = true;

setTimeout(function () {
	var _timer = minute * 60000; //分

	// disable 強制跳轉下一步
	$(document).ready(function(){
	
		//時間倒數
		var _btn = $("#id_submitbutton");
		var _value = $("#id_submitbutton").attr("value");
		
		$("#id_submitbutton").attr("disabled", "disabled");
		
		// 剩餘秒數 _sec
		
		_sec = 5;
		var _interval_timer = setInterval(function () { 
					
			if( _sec > 0 ){ 
				_sec--; 
			};
			
			_btn.attr("value", _value + " (剩"+ _sec +"秒)");	
		}, 1000);	
		


		// 等待時間到
		setTimeout(function () {
			_btn.attr("value", _value);	
			clearInterval(_interval_timer);
		
			$("#id_submitbutton").removeAttr("disabled");
			
			//如果有強制跳轉
			if(force_next == true){
				$("#id_submitbutton").click();
			};
			
		}, _timer);

	});

}, 100);

function iframe_has_loaded() {
	window.location.reload();
	//
}