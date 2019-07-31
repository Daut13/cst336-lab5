$(document).ready(function() {

	$(".favoriteIcon").on("click", function() {

		//alert($(this).prev().attr("src"));

		var imageURL = $(this).prev().attr("src");
		
		if ($(this).attr("src") == "img/favorite.png") {
			$(this).attr("src", "img/favorite_on.png");
			updateFavorite("add", imageURL); //insert a new record
		} else {
			$(this).attr("src", "img/favorite.png");
			updateFavorite("delete", imageURL); //delete record
		}
	});
	
	$(".keywordLink").on("click", function(){
		
		$.ajax({
			method: "get",
			url: "/api/displayFavorites",
			data: {
				   "keyword" : $(this).text().trim(),
				  },
			success: function(rows, status) {
				
				$("#favorites").html("");
				$("#favorites").append("<div class='imageContainer'>")
				rows.forEach(function(row){
					$("#favorites").append("<img class='image' src= '" + row.imageURL + "' width='150' height='150'>");
					$("#favorites").append("<img class='favoriteIcon' src='img/favorite_on.png'width='20'>");
				})
				$("#favorites").append("</div>")
			}
				  
		});//AJAX
	});
	
	function updateFavorite(action, imageURL){
		
		$.ajax({
			method: "get",
			url: "/api/updateFavorites",
			data: {
				   "imageURL" : imageURL,
				   "keyword" : $("#keyword").val(),
				   "action" : action
				  }
		});//AJAX
		
	};

})