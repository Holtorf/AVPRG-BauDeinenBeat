	rSound = new Audio("../Sounds/banjo.wav"),
	gSound = new Audio("../Sounds/drum.wav"),
	bSound = new Audio("../Sounds/housePiano.wav"),
	//rPiano = new Audio("../Sounds/randomPiano.wav"),
	//rDrum = new Audio("../Sounds/retroDrum.wav"),
	ySound = new Audio("../Sounds/saxophone.wav"),
	source = context.createMediaElementSource(),
	filter = context.createBiquadFilter();

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
		var color = midiMessage.data[1];
		var xCoord = midiMessage.data[2];
		var yCoord = midiMessage.data[3];
		var endBit = midiMessage.data[4];

		
	}

}else {
	console.log("WebMidi is not supported.");
}