$(document).ready(function() {
	var mode = "add";
	var buttonText = $("#buttonText").val();
	$('#prodListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
		"columnDefs": [
		   { "render": function(data) { return '<img src="' + data + '" style="width:120px"/>'; }, "targets": 2 },
		   { "render": function(data) { if (data == 1) { data = '啟用'} else  { data = '停用'; }return data; }, "targets": 5 }
		 ],
		 dom:" <'row'<'col-sm-2'l><'col-sm-2' B><'col-sm-3' ><'col-sm-4'f>>"
		 ,
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
	$('#send').click(function() {
		var form = $('#fileUploadForm')[0];
		var data = new FormData(form);
		$.ajax({
			 type: "POST",
		        enctype: 'multipart/form-data',
		        url: "/saveProduct",
		        data: data,
		        processData: false,
		        contentType: false,
		        cache: false,
		        timeout: 1000000,
			success : function(data) {
				closeSaveModal();
				swal.fire({
				    title: "新增成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/productSetting";
				});
			},
			error : function(e) {
				closeSaveModal();
				swal.fire({
					title: e.responseText,
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	
	$('#prodListTable').on("click","button",function(){
		mode = "update";
		//$('#originalPics').show();
	    var item = $(this).closest("tr");    
	    var demoProduct = {
				'id' : item.find('td:eq(5)').text().trim(),
			};
		$.ajax({
			url : "/getProductInfo",
			type : "POST",
			data : JSON.stringify(demoProduct),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function(data) {
				$(".modal-body #id").val(data.id);
			    $(".modal-body #productName").val(data.productName);
			    $(".modal-body #purchasePrice").val(data.purchasePrice);
			    $(".modal-body #sellingPrice").val(data.sellingPrice);
			    $(".modal-body #stock").val(data.stock);
			    $(".modal-body #description").val(data.description);
			    $(".modal-body #summary").val(data.summary);
				$('#saveModal').modal('show');
			},
			error : function() {
				closeSaveModal();
				swal.fire({
                    title: "查詢失敗",
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	
	function closeSaveModal(){
	    $(".modal-body #productName").val("");
	    $(".modal-body #purchasePrice").val("");
	    $(".modal-body #sellingPrice").val("");
	    $('#saveModal').modal('hide');
	}
	
});