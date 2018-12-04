	var context = new AudioContext(),
	rSound = new Audio("../Sounds/banjo.wav"),
	gSound = new Audio("../Sounds/drum.wav"),
	bSound = new Audio("../Sounds/housePiano.wav"),
	//rPiano = new Audio("../Sounds/randomPiano.wav"),
	//rDrum = new Audio("../Sounds/retroDrum.wav"),
	ySound = new Audio("../Sounds/saxophone.wav");

	//source = context.createMediaElementSource();

	var arrayColor = new Array(4);

		var coord = new Array(16);

		for(var x = 0; x < coord.length; x++){
			coord[x] = new Array(15);
		}

if (navigator.requestMIDIAccess) {
	console.log("This browser supports MIDI");
	navigator.requestMIDIAccess({sysex: true})
	.then(onMIDISucces, onMIDIFailure); 
	
	function onMIDISucces(midiAccess){
		console.log(midiAccess);
		
		var inputs = midiAccess.inputs;
		var outputs =  midiAccess.outputs;

		/*
		rSound.play();
		rSound.loop = false;
		gSound.play();
		gSound.loop = false;
		bSound.play();
		bSound.loop = false;
		ySound.play();
		ySound.loop = false;
		*/
	}

	function onMIDIFailure(){
		console.log('Could not acess your MIDI devices.');
	}

	function getMIDIMessage(midiMessage) {
		console.log(midiMessage);
		console.log("hallo");

		rSound.play();
		rSound.loop = true;

		var startBit = midiMessage.data[0];
		var color = midiMessage.data[1];
		var xCoord = midiMessage.data[2];
		var yCoord = midiMessage.data[3];
		var endBit = midiMessage.data[4];

		coord [xCoord] [yCoord] = color;

		//Timer mit Counter
		var tCounter = 0;

		/*const timer = setInterval(() => {
			tCounter += 0.1;

			if (tCounter = 16){
				tCounter = 0;
			}
		}, 100);
		*/

		//Variablen für  die for Schleifen
		var c = 0;
		var y = 0;
		var i = 0;

		//Zusammenführung der MidiDaten mit dem Counter 
		for(c = 0; c < color.length; c++){
			color[c] = 20;
		}
	
		for(y = 0; y < yCoord; y++){
			color[coord [tCounter][yCoord]] = y;
			console.log("das ist unser Wert"+ y);
		}

		for(i = 0; i <color.length; i++){
			if (color[i] != 20){
				playInstrument(i, color[i]);
			}
		}		
	}

	function playInstrument(){
		console.log("jetzt spielt ein instrument");
	}

}else {
	console.log("WebMidi is not supported.");
}