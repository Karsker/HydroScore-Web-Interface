import os
from google.cloud import vision
import io
import json


#instantiation of client

credential_path = r".\\hydroscore_json.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
client = vision.ImageAnnotatorClient()


#local image

image_path = 'public/static/image.png'
with io.open(image_path, 'rb') as image_file:
    content = image_file.read()
image = vision.Image(content = content)

response = client.label_detection(image = image)
labels = response.label_annotations
for label in labels:
    print(label.description)