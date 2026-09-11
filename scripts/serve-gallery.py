from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class GalleryHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return super().translate_path(path.removeprefix('/angular-material-theme'))


if __name__ == '__main__':
    handler = partial(GalleryHandler, directory='dist/gallery/browser')
    ThreadingHTTPServer(('127.0.0.1', 4272), handler).serve_forever()
