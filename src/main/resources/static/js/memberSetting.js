$(document).ready(function() {
	$('#memberListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
		"columnDefs": [
			{ "render": function(data) { if (data == 1) { data = '啟用'} else  { data = '停用' }return data; }, "targets": 3 }
		]
	});
	
	$('#send').click(function() {
		 var form = $('#fileUploadForm')[0];
		 var data = new FormData(form);
		$.ajax({
			 type: "POST",
		        enctype: 'multipart/form-data',
		        url: "/savePartner",
		        data: data,
		        processData: false,
		        contentType: false,
		        cache: false,
		        timeout: 1000000,
			success : function(data) {
				closeSaveModal();
				swal.fire({
				    title: "新增成功!",
				    //text: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/partnerSetting";
				});
			},
			error : function() {
				closeSaveModal();
				swal.fire({
                    title: "新增失敗",
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	
	$('#memberListTable').on("click","button",function(){
		alert("clicked");
		/*
	    var item = $(this).closest("tr");    
	    var serial = item.find('td:eq(1)').text().trim();
	    var prodName = item.find('td:eq(3)').text().trim();
	    $('#saveModal').modal('show');
	    //window.location = "/subOptionSetting?mainKey="+optionId;
	    /*
	    var mainOption = {
				'id' : optionId,
			};
	    alert('optionId:' + optionId);
	    
	    $.ajax({
			url : "/subOptionSetting",
			type : "POST",
			//data : JSON.stringify(mainOption),
			data : optionId,
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function(data) {
				$('#subModal').modal('show');
			},
			error : function() {
				closeModal();
				swal.fire({
                    title: "變更失敗",
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
		*/
	});
	
	function closeSaveModal(){
		//alert('closeModal');
		$(".modal-body #serial").val("");
	    $(".modal-body #prodName").val("");
	    $(".modal-body #engName").val("");
	    $(".modal-body #purchasePrice").val("");
	    $(".modal-body #sellingPrice").val("");
	    $(".modal-body #isActive").val("");
	    $(".modal-body #remark").val("");
	    $('#saveModal').modal('hide');
	}
});