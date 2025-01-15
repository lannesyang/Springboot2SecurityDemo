$(document).ready(function() {
	$('#prodListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
		"columnDefs": [
		   { "render": function(data) { return '<img src="' + data + '" style="width:120px"/>'; }, "targets": 1 },
		   { "render": function(data) { return '<input type="number" name="Quantity" value="1" min="1" style="width:60px"/>'; }, "targets": 4 },
		   { "render": function(data) { if (data === 'true') {data = ''} else  {data = '<span style="font-weight:bold;color:red">目前無庫存</span>';}return data; }, "targets": 6 }
		 ]
	});
	$('#prodListTable').on("click","button",function(){
	    var item = $(this).closest("tr"); 
	    var product = {
				'serial' : item.find('td:eq(7)').text().trim(),
			};
	    $.ajax({
			url : "/delFromShoppingCar",
			type : "POST",
			data : JSON.stringify(product),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function(data) {
				window.location = "/shoppingCar";
			},
			error : function() {
				swal.fire({
                    title: "變更失敗",
                    type: "error",
                    showConfirmButton: true
                });
			}
		});
	});
	$('#checkout').click(function() {
		var prods = [];
		$('#prodListTable tr').each(function() {
			if ($(this).find('[type="checkbox"]').is(":checked")) {
				var item = $(this).closest("tr"); 
			    var id = item.find('td:eq(8)').html();
			    var prodName =  item.find('td:eq(2)').html();
			    var picSrc = item.find('td:eq(1)').html();
			    var price = item.find('td:eq(3)').html();
			    var tmp = item.find('input[name="Quantity"]').val();
			    var platformProduct = {"id":id,"prodName":prodName,"picSrc1":picSrc,"sellingPrice":price,"stock":tmp};
			    prods.push(platformProduct);
			  }
		 });
		if(prods.length == 0){
			swal.fire({
                title: "請至少選擇一種商品",
                type: "error",
                showConfirmButton: true
            });
		}else{
			$.ajax({
				url : "/createOrder",
				type : "POST",
				data : JSON.stringify(prods),
				contentType: "application/json; charset=utf-8",
	            dataType: "json",
				success : function(data) {
					window.location = "/platformOrder";
				},
				error : function() {
					swal.fire({
	                    title: "變更失敗",
	                    type: "error",
	                    showConfirmButton: true
	                });
				}
			});
		}
	});
});