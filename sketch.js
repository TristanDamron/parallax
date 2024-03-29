let leftCenter = undefined; 
let rightCenter = undefined; 

let left = undefined;
let right = undefined;

document.addEventListener("DOMContentLoaded", function(event) {
    const video = document.getElementById("video");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;                
                const poseNet = ml5.poseNet(video, function () {
                    console.log("Model loaded");
                });      
                
                poseNet.on("pose", function (results) {                
                    left = [];
                    right = [];
    
                    left[0] = results[0].pose.leftEye.x;
                    left[1] = results[0].pose.leftEye.y;

                    right[0] = results[0].pose.rightEye.x;
                    right[1] = results[0].pose.rightEye.y;                      
                });                      
            })
            .catch(function (err0r) {
                console.log(err0r);
            });
    }   
});

var colors = [];
var slider;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    slider = createSlider(0, 50, 10);
    slider.position((windowWidth / 2) - 200, 0);
    slider.style('width', '400px');

    for (var i = 0; i < 48; i++) {
        colors[i] = color (Math.floor(Math.random() * 255) + 1,
                           Math.floor(Math.random() * 255) + 1,
                           Math.floor(Math.random() * 255) + 1, 
                           80);
    }
}

function draw() {
    if (!leftCenter) {
        leftCenter = left;
    }

    if (!rightCenter) {
        rightCenter = right;
    }    

    background(0);    

    rectMode(CENTER);
    
    push();              
    fill(colors[0]);
    noStroke();
    translate(0, 0);

    if (left && right) {                 
        for (var i = 1; i < slider.value(); i++) {
            scale(1 - (0.01 * i));                    
            rect((leftCenter[0] - left[0]) + (rightCenter[0] - right[0]) - 50, -((leftCenter[1] - left[1]) + (rightCenter[1] - right[1])) + 50, 100, 100);                                                                                                                                 
        }
    }

    pop();          

}