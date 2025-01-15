$(document).ready(function() {
	var buttonText = $("#buttonText").val();
	$('#optionListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
		"columnDefs": [
			{ "render": function(data) { if (data == 1) { data = '啟用'} else  { data = '停用'; }return data; }, "targets": 4 }
		],
		 dom:" <'row'<'col-sm-2'l><'col-sm-2' B><'col-sm-3' ><'col-sm-4'f>>",
		 buttons: [
		 	{
		    	text: buttonText,
		        action: function ( e, dt, node, config ) {
		        	var count = $("#options").val();
		    		if(count==0){
		    			swal.fire({
		    				title: "請先新增產品類別",
		                    type: "error",
		                    showConfirmButton: true
		                });
		    		}else{
		    			mode = "add";
		    			$('#saveModal').modal('show');
		    		}
		        }
		    }
		]
	});
	$('#addSub').click(function() {
		$('#saveModal').modal('show');
	});
	$('#sendSub').click(function() {
		var subSettingOption = {
				'optionName' : $(".modal-body #optionName").val().trim(),
				'serial' : $(".modal-body #serial").val().trim(),
				'optionType' : $("#optionType").val(),
				'active' : $("input[name='isActive']:checked").val(),
			};
		$.ajax({
			url : "/saveSubOption",
			type : "POST",
			data : JSON.stringify(subSettingOption),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				closeEditModal();
				swal.fire({
				    title: "變更成功!",
				    //text: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/subOptionSetting";
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
	    var optionName = item.find('td:eq(3)').text().trim();
	    var serial = item.find('td:eq(2)').text().trim();
	    var active = item.find('td:eq(4)').text().trim();
	    var optionId = item.find('td:eq(5)').text().trim();
	    if(active=="啟用"){
	    	$("input[name=isActive][value=" + 1 + "]").prop('checked', true);
	    }else{
	    	$("input[name=isActive][value=" + 0 + "]").prop('checked', true);
	    }
	    $("#editSerial").val(serial); 
	    $(".modal-body #editId").val(optionId);
	    $("#editOptionType").val(optionType);
		$(".modal-body #editOptionName").val(optionName);
		$('#editModal').modal('show');
	});
	
	$('#sendEditSub').click(function() {
		var subSettingOption = {
				'id' : $(".modal-body #editId").val().trim(),
				'optionName' : $(".modal-body #editOptionName").val().trim(),
				'serial' : $(".modal-body #editSerial").val().trim(),
				'optionType' : $("#editOptionType").val(),
				'active' : $("input[name='isActive']:checked").val(),
			};
		$.ajax({
			url : "/updateSubOption",
			type : "POST",
			data : JSON.stringify(subSettingOption),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				closeEditModal();
				swal.fire({
				    title: "變更成功!",
				    //text: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/subOptionSetting";
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
	function closeSaveModal(){
		$(".modal-body #serial").val("");
	    $(".modal-body #optionName").val("");
	    $('#saveModal').modal('hide');
	}
	
	function closeEditModal(){
		$(".modal-body #editSerial").val("");
	    $(".modal-body #editOptionName").val("");
	    $('#editModal').modal('hide');
	}
	
});