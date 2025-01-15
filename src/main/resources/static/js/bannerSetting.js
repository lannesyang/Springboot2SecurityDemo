$(document).ready(function() {
	var buttonText = $("#buttonText").val();
	$('#articleListTable').DataTable({
		"oLanguage" : {
			"sUrl" : "/i18/datatable.json"
		},
		"columnDefs" : [{
			/*
			"render" : function(data) {
				if (data == 1) {
					data = '啟用'
				} else {
					data = '停用';
				}
				return data;
			},
			"targets" : 4
			*/
			/*
		    { "render": function(data) { if (data === 'true') { 
				data ='<input type="button" value="停用" class="btn btn-success">&nbsp;<input type="button" value="啟用" class="btn btn-danger" disabled>';
				} else  { 
				data ='<input type="button" value="停用" class="btn btn-danger" disabled>&nbsp;<input type="button" value="啟用" class="btn btn-success">';
				} return data; 
			}, "targets": 3 
			*/
		} ],
		dom : " <'row'<'col-sm-2'l><'col-sm-2' B><'col-sm-3' ><'col-sm-4'f>>",
		buttons : [ {
			text : buttonText,
			action : function(e, dt, node, config) {
				window.location = "/addArticle?type=banner";
			}
		} ]
	});

	$('#articleListTable').on("click", "button", function() {
		var item = $(this).closest("tr");
		var id = item.find('td:eq(5)').text().trim();
		window.location = "/updateArticle?id="+id;
	});
});