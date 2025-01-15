$(document).ready(function() {
	$('#search').click(function() {
		if($('#searchKey').val()==null|$('#searchKey').val().length==0)
			window.location = "/productList";
		else
			window.location = "/productList?searchKey="+$('#searchKey').val();
	});
	$('#prodlowerBar').html("");
	var content = genPage($('#totalPages').val(),$('#currentPage').val());
	$('#prodlowerBar').html(content);
	
	function genPage(totalPage,currentPage){
		maxPage = parseInt(totalPage)+1;
		html = '<ul class="pagination" style="float:right">';
		if(totalPage==1){
			html = "";
		}else if(1<totalPage&&totalPage<8){
			for (let i = 1; i < maxPage; i++) {
				if(i==currentPage)
					html += '<li class="page-item active"><a class="page-link" href="#">'+i+'</a></li>';
				else 
					html += '<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>';
			}
		}
		html += '</ul>';
		return html;
	}
	$(document).on("click", "a", function(){
		if(!$(this).text().includes("功能")){
			if($('#hiddenSearchKey').val()==null|$('#hiddenSearchKey').val().length==0){
				window.location = "/productList?currentPage="+$(this).text();
			}else{
				window.location = "/productList?searchKey="+$('#hiddenSearchKey').val()+"&currentPage="+$(this).text();
			}
		}
	});
});

