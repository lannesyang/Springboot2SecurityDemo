$(document).ready(function() {
	$('#articleListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
	});
	
	$('#addMain').click(function() {
		$('#mainModal').modal('show');
	});
	$('#sendMain').click(function() {
		var mainOption = {
				'optionName' : $(".modal-body #optionName").val(),
				'optionType' : $(".modal-body #optionType").val(),
			};
		$.ajax({
			url : "/saveMainOption",
			type : "POST",
			data : JSON.stringify(mainOption),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				swal.fire({
				    title: "新增成功!",
				    //text: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/mainOptionSetting";
				});
			},
			error : function(e) {
				swal.fire({
					title: e.responseText,
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	$('#optionListTable').on("click","button",function(){
		var item = $(this).closest("tr");    
		var optionType = item.find('td:eq(1)').text().trim();
	    var optionName = item.find('td:eq(2)').text().trim();
	    var id = item.find('td:eq(4)').text().trim();
	    var active = item.find('td:eq(3)').text().trim();
	    if(active=="啟用"){
	    	$("input[name=isActive][value=" + 1 + "]").prop('checked', true);
	    }else{
	    	$("input[name=isActive][value=" + 0 + "]").prop('checked', true);
	    }
	    $("#editOptionType").val(optionType); 
	    $(".modal-body #editId").val(id);
		$(".modal-body #editOptionName").val(optionName);
		$('#editModal').modal('show');
	});
	$('#editMain').click(function() {
		var tmpActive = $("input[name='isActive']:checked").val();
		//alert(tmpActive);
		var mainOption = {
				'id' : $(".modal-body #editId").val(),
				'optionName' : $(".modal-body #editOptionName").val(),
				'optionType' : $(".modal-body #editOptionType").val(),
				'active' : $("input[name='isActive']:checked").val(),
			};
		$.ajax({
			url : "/updateMainOption",
			type : "POST",
			data : JSON.stringify(mainOption),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				swal.fire({
				    title: "變更成功!",
				    //text: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/mainOptionSetting";
				});
			},
			error : function(e) {
				swal.fire({
					title: e.responseText,
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
});