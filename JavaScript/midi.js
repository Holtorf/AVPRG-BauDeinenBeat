if (navigator.requestMIDIAccess) {
 navigator.requestMIDIAccess({sysex: false}).then(function(midiAccess) {
 midi = midiAccess;
 console.log("Ich funktioniere!!!!!!!");
 var inputs = midi.inputs.values();
 // loop through all inputs
 for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
 // listen for midi messages
 input.value.onmidimessage = onMIDIMessage;
 }
 });
} else {
 alert("No MIDI support in your browser.");
}