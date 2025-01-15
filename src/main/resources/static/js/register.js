$(document).ready(function() {
	var hasConfirm = false;
	$("#cfPassword").hide();
	$("#confirmPassword").keyup(function(){
		hasConfirm = true;
		comparePW();
	});
	$("#password").keyup(function() {
		if(hasConfirm == true){
			comparePW();
		}
	});
	$('#city').on('change', function() {
		$.ajax({
			url : "/getAreas",
			type : "POST",
			data : $('#city').val(),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response){
            	$('#area').html("");
            	$.map(response, function (key,value) {
            		$('#area').append("<option value=" + key + ">" + value + "</option>");
            	});
			},
			error : function() {
				swal.fire({
                    title: "請稍後再試",
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	function comparePW(){
		var pw = $('#password').val();
	    var cp = $('#confirmPassword').val();
	    if(cp != pw){
	    	$("#cfPassword").show();
	    }else{
	    	$("#cfPassword").hide();
	    }
	}
});

