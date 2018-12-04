	rSound = new Audio("../Sounds/banjo.wav"),
	gSound = new Audio("../Sounds/drum.wav"),
	bSound = new Audio("../Sounds/housePiano.wav"),
	//rPiano = new Audio("../Sounds/randomPiano.wav"),
	//rDrum = new Audio("../Sounds/retroDrum.wav"),
	ySound = new Audio("../Sounds/saxophone.wav"),
	source = context.createMediaElementSource(),

if (navigator.requestMIDIAccess) {
	console.log("This browser supports MIDI");
	navigator.requestMIDIAccess({sysex: true})
	.then(onMIDISucces, onMIDIFailure); 
	
	function onMIDISucces(midiAccess){
		console.log(midiAccess);
		
		for (var input of midiAccess.input.values())
		input.onmidimessage = getMIDIMessage;

		var inputs = midiAccess.inputs;
		var outputs =  midiAccess.outputs;

		rSound.play();
		rSound.loop = true;
		gSound.play();
		gSound.loop = true;
		bSound.play();
		bSound.loop = true;
		ySound.play();
		ySound.loop = true;
	}

	function onMIDIFailure(){
		console.log("Could not acess your MIDI devices.");
	}

	function getMIDIMessage(midiMessage) {
		console.log(midiMessage);

		var startBit = midiMessage.data[0];
		var colorP = midiMessage.data[1];
		var xCoord = midiMessage.data[2];
		var yCoord = midiMessage.data[3];
		var endBit = midiMessage.data[4];

		int c;
		int coord {xCoord} {yCoord} = c;

		int color {c};
		
		//Timer mit Counter
		float tCounter = 0;

		/*const timer = setInterval(() => {
			tCounter += 0.1;

			if (tCounter = 16){
				tCounter = 0;
			}
		}, 100);
		*/

		//Zusammenführung der MidiDaten mit dem Counter 
		for each(color{} = null){
			for(int y = 0; y <= yCoord; y++){
				color[coord {tCounter}{yCoord}] = y;
				console.log("das ist unser Wert"+ y);
			}
			for(int i = 0; i <=color.length; i++){
				if (color{i} = null){
					playInstrument(i, color{i});
				}
			}
		}
	
	/*
	for(int i = 0; i = xCoord; i++){
		switch(color){
			case 0: //nichts
				console.log("Keine Farbe");
				playSound(color);
				break;

		case 1: //rot
				console.log("ROT!!");
				playSound(color);
				break;

		case 2: //gelb
				console.log("GELB!!");
				playSound(color);
				break;

		case 3: //gruen
				console.log("GRUEN!!");
				playSound(color);
				break;

		case 4: //blau
				console.log("Blau!!");
				playSound(color);
				break;
		}
	}*/
		
	}

}else {
	console.log("WebMidi is not supported.");
}