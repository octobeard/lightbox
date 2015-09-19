(function() {
    var root = this;

    // Private helper functions

    /**
     * Clears out the shim html element by removing it entirely.  In modern browsers this will
     * clean up the associated event listeners.
     */
    function clearShim() {
        var shim = document.getElementsByClassName('lightbox-shim')[0];
            shim.parentNode.removeChild(shim);
    }

    /**
     * Lightbox Gallery
     *
     * Renders a gallery of cat images pulled from thecatapi.com that will display a nice lightbox view when
     * an image is clicked and allow the user to view the next or previous image.
     */
    this.LightBoxApp = {
        /**
         * This function will render an image gallery given an array of image data.
         * @param images Array of image objects with url, id and source_url attributes
         */
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
                html.push(
                    "<div index='", index, "' class='gallery-image'>",
                        "<img src='", image.url, "' height='150px' border='0'>",
                        "<div class='image-footer'>", image.source_url, "</div>",
                    "</div>");
                if (index % 5 === 4) {
                    html.push("</div>")
                }
            });
            html.push("</div>");

            // place finished gallery html in DOM
            document.getElementById("lightbox-gallery").innerHTML = html.join("");
        },
        renderLightBox: function(image, imageIndex) {
            // create lightbox div
            var div = document.createElement("div");
            div.className = "lightbox-shim";
            var lightBoxHtml = [];

            // build inner html of lightbox
            lightBoxHtml.push(
                "<div class='lightbox-image'>",
                    "<img src='", image.url, "'>",
                    "<div class='text-footer'>",
                        "<div class='left-link'><a href='javascript:void(0)'>&lt;</a></div>",
                        "<div class='right-link'><a href='javascript:void(0)'>&gt;</a></div>",
                    "</div>",
                    "<div class='title'><a href='", image.source_url, "'>", image.source_url, "</a></div>",
                "</div>");
            div.innerHTML = lightBoxHtml.join("");

            // append lightbox html to the body and attach event listeners
            document.getElementsByTagName('body')[0].appendChild(div);
            document.getElementsByClassName('lightbox-shim')[0].addEventListener("click", function() {
                clearShim();
            });
            document.getElementsByClassName("left-link")[0].addEventListener("click", function(e) {
                e.stopPropagation();
                clearShim();
                LightBoxApp.renderLightBox(window.images[imageIndex - 1], imageIndex - 1);
            });
            document.getElementsByClassName("right-link")[0].addEventListener("click", function(e) {
                e.stopPropagation();
                clearShim();
                LightBoxApp.renderLightBox(window.images[imageIndex + 1], imageIndex + 1);
            });
        }
    };

}.call(this));

document.addEventListener("DOMContentLoaded", function() {
    // Renders the gallery and adds event listeners to each gallery image
    LightBoxApp.renderGallery(window.images);
    var imageElements = document.getElementsByClassName("gallery-image");
    for (var i= 0, len = imageElements.length; i<len; i++) {
        var imageElement = imageElements[i];
        imageElement.addEventListener("click", function() {
            LightBoxApp.renderLightBox(window.images[this.attributes["index"].value], parseInt(this.attributes["index"].value));
        });
    }
});
