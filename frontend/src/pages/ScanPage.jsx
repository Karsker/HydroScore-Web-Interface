import React from 'react'
import { useEffect } from 'react'
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const ScanPage = () => {
    const navigate = useNavigate();
    const width = 320; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    let streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    let video = null;
    const canvas = createCanvas(1280, 720);
    const ctx = canvas.getContext('2d');
    let photo = null;
    let startbutton = null;

    function showViewLiveResultButton() {
        if (window.self !== window.top) {
            // Ensure that if our document is in a frame, we get the user
            // to first open it in its own tab or window. Otherwise, it
            // won't be able to request permission for camera access.
            document.querySelector(".contentarea").remove();
            const button = document.createElement("button");
            button.textContent = "View live result of the example code above";
            document.body.append(button);
            button.addEventListener("click", () => window.open(location.href));
            return true;
        }
        return false;
    }

    function stopVideo(stream) {
        stream.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }

    function saveImage(imageCanvas) {
        fs.writeFileSync("./image.png", buffer);
    }

    function startup() {
        if (showViewLiveResultButton()) {
            return;
        }
        video = document.getElementById("video");
        photo = document.getElementById("photo");
        startbutton = document.getElementById("startbutton");

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });


        video.addEventListener(
            "canplay",
            (ev) => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false,
        );

        startbutton.addEventListener(
            "click",
            (ev) => {
                takepicture();
                ev.preventDefault();
                stopVideo(video.srcObject);
                video.style['display'] = 'none';
            },
            false,
        );

        clearphoto();
    }

    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    function takepicture() {
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL("image/png");
            console.log(data);
            photo.setAttribute("src", data);
            axios.post('http://localhost:3000/upload', { "image": data })
                .then(() => {
                    console.log('Image scanned successfully.');
                    navigate('/');
                }).catch((error) => {
                    alert('An error occured while scanning.');
                    console.log(error.message);
                });

        } else {
            clearphoto();
        }
    }
    // location.reload();

    useEffect(() => {
        document.title = "Scan object"
    }, []);
    return (
        <React.Fragment>
            <div className='font-comic-neue flex flex-col items-center h-screen'>
                <h1 className='text-blue-400 text-4xl my-3'>Scan object to get water footprint</h1>
                <div>
                    <video id='video'>Video stream not available</video>
                    <button id='startbutton'>Scan</button>
                </div>
                <canvas id='canvas' className='hidden'></canvas>
                <div className='hidden'>
                    <img id='photo' alt='The screen capture will appear in this box'></img>
                </div>
            </div>
            {window.addEventListener("load", startup, false)}
        </React.Fragment>

    )

}

export default ScanPage