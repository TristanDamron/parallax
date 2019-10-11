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

function setup() {
    createCanvas(800, 600, WEBGL);

    for (var i = 0; i < 48; i++) {
        colors[i] = color (Math.floor(Math.random() * 255) + 1,
                           Math.floor(Math.random() * 255) + 1,
                           Math.floor(Math.random() * 255) + 1);
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

    var colorIndex = 0;

    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 6; col++) {    
            push();              
            fill(colors[colorIndex]);
            // noStroke();

            if (left && right) { 
                
                // Left side
                if (-350 + (row * 100) < 0) {
                    translate((leftCenter[0] - left[0]) + -350 + (row * 100), (leftCenter[1] - left[1]) + -250 + (col * 100));                                                                                         
                } else {
                    // right side                    
                    translate((rightCenter[0] - right[0]) + -350 + (row * 100), (rightCenter[1] - right[1]) + -250 + (col * 100));                                                                                                             
                }                
            }

            scale(0.5, 0.5, 3);        
            box(100);            
            pop();          

            colorIndex++;            
        }
    }
}