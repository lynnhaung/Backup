

// 時間參數
var minute = 0.1;

//下一步: force_next 
force_next = false;

setTimeout(function () {
	var _timer = minute * 60000; //分

	// disable 強制跳轉下一步
	$(document).ready(function(){
	
		//時間倒數
		var _btn = $(".singlebutton input[type='submit']");
		var _value = _btn.attr("value");
		
		_btn.attr("disabled", "disabled");
		//滑鼠連續點2次 這個動作超過10次 會把前往下一階段的活動按鈕解除
		var _g = 0;
		_btn.dblclick(function () {
			_g++;
			if (_g > 10) {
				_btn.removeAttr("disabled");
			}
		});
		
		// 剩餘秒數 _sec
		
		_sec = minute * 60; //秒
		var _interval_timer = setInterval(function () { 
			if( _sec < 11){		
				if( _sec > 0 ){ 
					_sec--; 
				};
				
				_btn.attr("value", _value + " (剩"+ _sec +"秒)");
			}else{ _sec--;}
			
		}, 1000);	
		


		// 等待時間到
		setTimeout(function () {
			_btn.attr("value", _value);	
			clearInterval(_interval_timer);
		
			_btn.removeAttr("disabled");
			
			//如果有強制跳轉
			if(force_next == true){
				_btn.click();
			};
			
		}, _timer);

	});

}, 100);

function iframe_success() {
	//window.location.reload(); //
}