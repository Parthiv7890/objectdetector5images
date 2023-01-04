img = ''
let objDetector
let status1 = ''
let objects = []
function preload(){
}
function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380,380)
    video.hide()
}
function start(){
    objDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}
function draw(){
    image(video,0,0,380,380)
    if(status1 !=""){
        r = random(255)
        g = random(255)
        b = random(255)
        objDetector.detect(video,gotResults)
        for(i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected"
            document.getElementById("noOfObjects").innerHTML = "Number of objects detected are : "+objects.length
            fill(r,g,b)
            confidencePercent = floor(objects[i].confidence * 100)
            text(objects[i].label + " "+confidencePercent+"% ",objects[i].x+5,objects[i].y+15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
   
    /*fill(255,0,0)
    text("Dog",45,55)
    noFill()
    stroke(255,0,0)
    rect(30,40,350,300)

    fill(255,0,0)
    text("Cat",320,120)    
    noFill()
    stroke(255,0,0)
    rect(300,90,270,320)*/
}
function modelLoaded(){
    status1 = 'true'
    
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results)
        objects = results 

    }
    
}