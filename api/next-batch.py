import os
import sys
from http.server import BaseHTTPRequestHandler

sys.path.insert(0, os.path.dirname(__file__))
from _lib import serve_next_batch  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        serve_next_batch(self)
