Magic_Shop ="";
ImFine ="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
Magic_Shop = "";
ImFine = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Magic_Shop = loadSound("Magic_Shop_BTS.mp3");
    ImFine = loadSound("Im_Fine_BTS.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    Magic_Shop = Magic_Shop.isPlaying();
    console.log(Magic_Shop);

    ImFine = ImFine.isPlaying();
    console.log(ImFine);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        ImFine.stop();
        if(Magic_Shop == false){
            Magic_Shop.play();
        }
        else{
            console.log("Song Name: Magic Shop");
            document.getElementById("song_id").innerHTML = "Song Name: Magic Shop";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Magic_Shop.stop();
        if(ImFine == false){
            ImFine.play();
        }
        else{
            console.log("Song Name: Im Fine");
            document.getElementById("song_id").innerHTML = "Song Name: Im Fine";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}