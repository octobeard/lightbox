(function() {
    var root = this;

    // Private helper functions

    this.LightBoxApp = {
        renderGallery: function(images) {
            document.getElementById("lightbox-gallery").innerHTML = "";
            var html = [];
            // render row
            html.push("<div class='gallery-body'>");
            //render image
            images.forEach(function(image, index) {
                if (index % 5 === 0) {
                    html.push("<div class='gallery-row'>")
                }
                // normally I'd use a handlebars template but going native here.
                html.push("<div index='", index, "' class='gallery-image'>");
                html.push("<img src='", image.url, "' height='150px' border='0'>");
                html.push("<div class='image-footer'>", image.source_url, "</div>");
                html.push("</div>");
                if (index % 5 === 4) {
                    html.push("</div>")
                }
            });
            html.push("</div>");
            document.getElementById("lightbox-gallery").innerHTML = html.join("");
        },
        renderLightBox: function(image) {
            var div = document.createElement("div");
            div.className = "lightbox-shim";
            var lightBoxHtml = [];
            lightBoxHtml.push("<div class='lightbox-image'><img src='", image.url, "'></div>");
            div.innerHTML = lightBoxHtml.join("");
            document.getElementsByTagName('body')[0].appendChild(div);
            document.getElementsByClassName('lightbox-shim')[0].addEventListener("click", function() {
                var shim = document.getElementsByClassName('lightbox-shim')[0];
                    shim.parentNode.removeChild(shim);
            });
        }
    };

}.call(this));

document.addEventListener("DOMContentLoaded", function(event) {
    LightBoxApp.renderGallery(window.images);
    var imageElements = document.getElementsByClassName("gallery-image");
    for (var i= 0, len = imageElements.length; i<len; i++) {
        var imageElement = imageElements[i];
        imageElement.addEventListener("click", function() {
            LightBoxApp.renderLightBox(window.images[this.attributes["index"].value]);
        });
    }
});
