import os
import sys
from http.server import BaseHTTPRequestHandler

sys.path.insert(0, os.path.dirname(__file__))
from _lib import not_allowed, serve  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        serve(self, "support")

    def do_GET(self):
        not_allowed(self)

    do_PUT = do_DELETE = do_PATCH = do_GET
