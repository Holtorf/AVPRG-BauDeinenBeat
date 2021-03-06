var context = new AudioContext(),
	rSound = new Audio("../Sounds/snare.wav"),
	gSound = new Audio("../Sounds/vocal.wav"),
	bSound = new Audio("../Sounds/guitar.wav"),
	ySound = new Audio("../Sounds/drum.wav"),
	sounds = [rSound,ySound,gSound,bSound];
	source = new Array (sounds.length);
	filter = context.createBiquadFilter();
	
var timer = null;
var cArray = new Array(5);
var coord = new Array(8);
var tCounter = 10;

window.onload=function(){
	var sliders = document.getElementsByClassName("slider"),

	lpBtn = document.getElementById("lpButton"),
    hpBtn = document.getElementById("hpButton"),
    bpBtn = document.getElementById("bpButton"),
    apBtn = document.getElementById("apButton"),
    lsBtn = document.getElementById("lsButton"),
    hsBtn = document.getElementById("hsButton"),
    pBtn = document.getElementById("pButton"),
    nBtn = document.getElementById("nButton"),

    stButton = document.getElementById("startBtn"),
	svButton = document.getElementById("saveBtn"),
    spButton = document.getElementById("stopBtn");

	for (var s = 0; s < sliders.length; s++) {
		sliders[s].addEventListener("mousemove", changeParameter);
	}

	//Funktion zur �nderung der Parameter Werte der Slider
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

	//Actionlistener f�r die Button
	stButton.addEventListener("mousedown", function(e){
		tCounter = 0;
		timer = setInterval(() => {
			tCounter += 1;
			console.log(tCounter);
				if (tCounter === 8){
					tCounter = 0;
					console.log(tCounter);
					}
		}, 1000);

		for(var m=0; m <= sounds.length; m++){
		source[m] = context.createMediaElementSource(sounds[m]);
		source[m].connect(filter);
		filter.connect(context.destination);
	}
	});

	spButton.addEventListener("mousedown",function(e){
		clearInterval(timer);
		tCounter = 10;
	});

	lpBtn.addEventListener("click",function(e){
		filter.type = "lowpass";
		console.log(filter.type);
	});

	hpBtn.addEventListener("click",function(e){
		filter.type = "highpass";
		console.log(filter.type);
	});

	bpBtn.addEventListener("click",function(e){
		filter.type = "bandpass";
		console.log(filter.type);
	});

	apBtn.addEventListener("click",function(e){
		filter.type = "allpass";
		console.log(filter.type);
	});

	lsBtn.addEventListener("click",function(e){
		filter.type = "lowshelf";
		console.log(filter.type);
	});

	hsBtn.addEventListener("click",function(e){
		filter.type = "highshelf";
		console.log(filter.type);
	});

	pBtn.addEventListener("click",function(e){
		filter.type = "peaking";
		console.log(filter.type);
	});

	nBtn.addEventListener("click",function(e){
		filter.type = "notch";
		console.log(filter.type);
	});
}

//Erstelllung des 2-Dimensionalem Coordinaten Arrays
for(var x = 0; x < coord.length; x++){
	coord[x] = new Array(7);
}
	
//Timer mit Counter f�r den abgleich mit der X-Koordinate

if (navigator.requestMIDIAccess) {
	console.log("This browser supports MIDI");
	navigator.requestMIDIAccess({sysex: true})
	.then(onMIDISucces, onMIDIFailure); 
	
	//Gibt in der Konsole wieder wenn MIDI fkt.
	function onMIDISucces(midiAccess){
		//console.log(midiAccess);
		
		for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;

		var inputs = midiAccess.inputs;
		var outputs =  midiAccess.outputs;
	}

	//Gibt in der Konsole wieder wenn MIDI nicht fkt.
	function onMIDIFailure(){
		console.log('Could not acess your MIDI devices.');
	}

	//Funktion zur verarbeitung der �bertragenen Daten
	function getMIDIMessage(midiMessage) {
		//console.log(midiMessage);

		//MidiDaten werden in Variablen gespeichert
		var startBit = midiMessage.data[0];
		var color = midiMessage.data[1];
		var xCoord = midiMessage.data[2];
		var yCoord = midiMessage.data[3];
		var endBit = midiMessage.data[4];

		//X und Y Koordinaten ins Array eingeben
		coord [xCoord] [yCoord] = color - 1;
		//console.log(coord);

		//Variablen f�r  die for Schleifen
		var c = 0;
		var y = 0;
		var x = 0;
		var i = 0;

		for(c = 0; c < cArray.length; c++){
			cArray[c] = 6;
		}
	
		for(y = 0; y < yCoord; y++){
			if(coord [tCounter][y] >= 0){
			cArray[coord [tCounter][y]] = yCoord;
			}
		}

		for(i = 0; i <cArray.length; i++){
			if (cArray[i] != 6){
				playInstrument(i, cArray[i]);
			}
		}
		}

	//Zuweisung Farbe und Instrument
function playInstrument(i){
		sounds[i].currentTime = 0;
		sounds[i].play(); 
}
}else {
	console.log("WebMidi is not supported.");
}
