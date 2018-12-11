	var context = new AudioContext(),
	rSound = new Audio("../Sounds/banjo.wav"),
	gSound = new Audio("../Sounds/drum.wav"),
	bSound = new Audio("../Sounds/housePiano.wav"),
	ySound = new Audio("../Sounds/saxophone.wav");
	var playMusic = 0;

	var cArray = new Array(5);
	var sounds = [rSound,ySound,gSound,bSound];

	//Erstelllung des 2-Dimensionalem Coordinaten Arrays
	var coord = new Array(8);

	for(var x = 0; x < coord.length; x++){
		coord[x] = new Array(7);
	}
	
	//Timer mit Counter für den abgleich mit der X-Koordinate
	var tCounter = 0;
	
	
	const timer = setInterval(() => {
		tCounter += 1;
			if (tCounter === 8){
				tCounter = 0;
			}
	}, 1000);
	

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

		
		console.log(tCounter);
		
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