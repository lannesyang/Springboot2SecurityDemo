$(document).ready( function () {
	CKEDITOR.replace("content");
	var count = $("#options").val();
	var mode = $("#type").val();
	if(count==0){
		swal.fire({
			title: "請先新增文章類別",
            type: "error",
            showConfirmButton: true
		}).then((result) => {
			if (result.isConfirmed) {
				location = "/mainOptionSetting"
			}
		});
	}
	
	$('#send').click(function() {
		var path;
		if(mode=="banner"){
			path = "/bannerSetting";
		}else{
			path = "/articleSetting";
		}
		var contentData = CKEDITOR.instances.content.getData();
		var article = {
				'title' : $("#title").val().trim(),
				'articleType' : $("#articleType").val().trim(),
				'content' : contentData,
			};
		$.ajax({
			url : "/addArticleResult",
			type : "POST",
			data : JSON.stringify(article),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				swal.fire({
				    title: "新增成功!",
				    type: "success"
				}).then(function() {
				    window.location = path;
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