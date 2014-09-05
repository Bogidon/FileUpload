function loadImageToDOM(files, idx) {
	if (idx >= 0) {
		var file = files[idx];
		var fullName = file.name.toLowerCase();
		var ext = fullName.split(".").pop();

		if ($.inArray(ext, ["jpg", "jpeg", "png"]) != -1) {
			console.log(fullName);
			fileReader =  new FileReader();
			fileReader.onload = function() {
				var url =  'url(' + '"' + fileReader.result + '"' + ')';
				var imagePreview = $('<div class="preview" style="display:none"><div class="previewImage"><img class="remove" src="remove.png" style="display:none"/></div></div>');
				imagePreview.children(".previewImage")[0].style.backgroundImage= url;
				imagePreview.appendTo($(".previewContainer")).fadeIn();

				// Load next
				loadImageToDOM(files, idx-1);
			};
			fileReader.readAsDataURL(file);
		} else {
			alert("Invalid image format. Only .jpg, .jpeg, and .png files are valid");
		}
	}

	if (idx === 0) {
		$(".cover").removeClass("cover");
		$(".preview").first().addClass("cover");
	};
};

$(document).ready(function() {
	$(".previewContainer").on("mouseover", ".previewImage", function() {
		var removebutton = $(this).children("img");
		removebutton.show();

	}).on("mouseleave", ".previewImage", function() { 
		var removebutton = $(this).children("img");
		removebutton.fadeOut(200);

	}).on("click", ".remove", function() { 
		$(this).parents(".preview").remove();

	}).sortable({
		update: function(event, ui) {
			if (ui.item.hasClass("cover") || !$(".preview").first().hasClass("cover")) {
				$(".cover").removeClass("cover");
				$(".preview").first().addClass("cover");	
			}			
		}
	});

	$(".addPhoto").change(function() {
		var files = $(this)[0].files;
		loadImageToDOM(files, files.length - 1);
	});
});