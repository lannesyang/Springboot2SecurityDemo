$(document).ready( function () {
	CKEDITOR.replace("content");
	var oriarticleId = $("#articleId").val();
	var oriArticleType = $("#oriArticleType").val();
	var oriArticleContent = $("#oriArticleContent").val();
	
	$("#articleType").val(oriArticleType);
	$("#content").val(oriArticleContent);
	
	$('#send').click(function() {
		var contentData = CKEDITOR.instances.content.getData();
		var article = {
				'title' : $("#title").val().trim(),
				'articleType' : $("#articleType").val().trim(),
				'content' : contentData,
			};
		$.ajax({
			url : "/updateArticleResult",
			type : "POST",
			data : JSON.stringify(article),
			contentType: "application/json; charset=utf-8",
            dataType: "json",
			success : function() {
				swal.fire({
				    title: "變更成功!",
				    type: "success"
				}).then(function() {
				    window.location = "/updateArticle?id=" + oriarticleId;
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