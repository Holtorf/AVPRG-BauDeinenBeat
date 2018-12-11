var context = new AudioContext(),
    sliders = document.getElementsByClassName("slider"),
    
	lpButton = document.getElementById("lpButton"),
    hpButton = document.getElementById("hpButton"),
    bpButton = document.getElementById("bpButton"),
    apButton = document.getElementById("apButton"),
    lsButton = document.getElementById("lsButton"),
    hsButton = document.getElementById("hsButton"),
    pButton = document.getElementById("pButton"),
    nButton = document.getElementById("nButton"),

    startBtn = document.getElementById("startBtn"),
	saveBtn = document.getElementById("saveBtn"),
    stopBtn = document.getElementById("stopBtn"),

    isPlaying = false,
	source = context.createMediaElementSource(sounds);
	filter = context.createBiquadFilter();

source.connect(filter);
filter.connect(context.destination);

for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter);
}

//Funktion zur änderung der Parameter Werte der Slider
function changeParameter() {
    switch(this.id) {
        case "frequencySlider":
            filter.frequency.value = this.value;
            document.getElementById("frequencyOutput").innerHTML = this.value + " Hz";
            break;
        case "detuneSlider":
            filter.detune.value = this.value;
            document.getElementById("detuneOutput").innerHTML = this.value + " Cents";
            break;
        case "qSlider":
            filter.Q.value = this.value;
            document.getElementById("qOutput").innerHTML = this.value;
            break;
        case "gainSlider":
            filter.gain.value = this.value;
            document.getElementById("gainOutput").innerHTML = this.value + " dB";
            break;
    }
}

//Actionlistener für die Button
startBtn.addEventListener("mousedown", function(e){
	playMusic = 1;
});

stopBtn.addEventListener("mousedown",function(e){
	playMusic = 0;
});

saveBtn.addEventListener("mousedown",function(){

});
lpButton.addEventListener("mousedown",function(){
 filter.type = filter.LOWPASS;
 filter.frequency.value = 5000;
});
