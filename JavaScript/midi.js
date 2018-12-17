var context = new AudioContext(),
	rSound = new Audio("../Sounds/banjo.wav"),
	gSound = new Audio("../Sounds/drum.wav"),
	bSound = new Audio("../Sounds/housePiano.wav"),
	ySound = new Audio("../Sounds/saxophone.wav"),
	sounds = [rSound,ySound,gSound,bSound];
	source = context.createMediaElementSource(sounds[i]);
	filter = context.createBiquadFilter();

	source.connect(filter);
	filter.connect(context.destination);

var timer = null;

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
	stButton.addEventListener("mousedown", function(e){
		tCounter = 0;
		timer = setInterval(() => {
			tCounter += 1;
			console.log(tCounter);
				if (tCounter === 9){
					tCounter = 0;
					console.log(tCounter);
					}
		}, 1000);
	});

	spButton.addEventListener("mousedown",function(e){
		clearInterval(timer);
		tCounter = 10;
	});

	lpBtn.addEventListener("mousedown",function(e){
		filter.type = filter.LOWPASS;
		console.log(filter.type);
	});

}

var cArray = new Array(5);

//Erstelllung des 2-Dimensionalem Coordinaten Arrays
var coord = new Array(8);
for(var x = 0; x < coord.length; x++){
	coord[x] = new Array(7);
}
	
//Timer mit Counter für den abgleich mit der X-Koordinate
var tCounter = 10;

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

	//Funktion zur verarbeitung der Übertragenen Daten
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

		//Variablen für  die for Schleifen
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
		sounds[i].play(); 
}
}else {
	console.log("WebMidi is not supported.");
}
