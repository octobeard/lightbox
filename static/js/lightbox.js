(function() {
    var root = this;

    // Private helper functions

    this.LightBoxApp = {
        renderGallery: function(images) {
            document.getElementById("lightbox-gallery").innerHTML = "";
            var html = [];
            // render row
            html.push("<div style='width: 1200px;'>");
            //render image
            images.forEach(function(image, index) {
                var margin = "10px";
                // normally I'd use a handlebars template but going native here.
                html.push("<div class='gallery-image' style='height:150px; margin-right:",
                          margin, "; margin-bottom: ", margin, "px;'>");
                html.push("<img src='", image.url, "' height='150px' border='0'>");
                html.push("<div class='image-footer'>", image.source_url, "</div>");
                html.push("</div>");
            });
            html.push("</div>");
            document.getElementById("lightbox-gallery").innerHTML = html.join("");
        }
    };

}.call(this));

document.addEventListener("DOMContentLoaded", function(event) {
    LightBoxApp.renderGallery(images);
});