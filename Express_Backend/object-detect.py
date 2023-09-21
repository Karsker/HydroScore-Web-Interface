import sys
import torch

model = torch.hub.load("ultralytics/yolov5", "yolov5s")  # or yolov5n - yolov5x6, custom
img = sys.argv[1]  # or file, Path, PIL, OpenCV, numpy, list
results = model(img)
names = model.names

for r in results:
    for c in r.boxes.cls:
        print(names[int(c)])
