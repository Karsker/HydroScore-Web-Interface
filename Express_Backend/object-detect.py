import sys
import torch

model = torch.hub.load("ultralytics/yolov5", "yolov5s")  # or yolov5n - yolov5x6, custom
img = sys.argv[1]  # or file, Path, PIL, OpenCV, numpy, list
results = model(img)

print(results)  # or .show(), .save(), .crop(), .pandas(), etc.
