import urllib2
import xml.etree.ElementTree as ET

from flask import Flask, render_template

app = Flask(__name__)
app.config['DEBUG'] = True

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    cats = urllib2.urlopen("http://thecatapi.com/api/images/get?format=xml&results_per_page=20").read()
    root = ET.fromstring(cats)
    images = []
    for image in root[0][0].getchildren():
        json = {
            'url': image.find('url').text,
            'id': image.find('id').text,
            'source_url': image.find('source_url').text
        }
        images.append(json)
    print images
    return render_template("lightbox.html", images=images)


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404
