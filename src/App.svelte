<script>
	import Bar from "svelte-chartjs/src/Bar.svelte";
	let paths = [];

	const options = {
		animation: false,
		scales: {
			xAxes: [
				{
					display: false,
				},
			],
			yAxes: [
				{
					ticks: { max: 255, min: 0 },
				},
			],
		},
	};

	let soundAllowed = (stream) => {
		window.persistAudioStream = stream;
		var audioContent = new AudioContext();
		var audioStream = audioContent.createMediaStreamSource(stream);
		var analyser = audioContent.createAnalyser();
		audioStream.connect(analyser);
		analyser.fftSize = 1024;

		var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

		for (var i = 0; i < 255; i++) {
			paths.push(0);
		}
		let doDraw = () => {
			requestAnimationFrame(doDraw);
			analyser.getByteFrequencyData(frequencyArray);
			for (var i = 0; i < 255; i++) {
				let adjustedLength =
					Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
				paths[i] = adjustedLength;
			}
		};
		doDraw();
	};

	/*window.navigator = window.navigator || {};
    /*navigator.getUserMedia =  navigator.getUserMedia       ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia    ||
                              null;*/
	navigator.getUserMedia(
		{
			audio: true,
		},
		soundAllowed,
		(error) => {
			console.log(error);
		}
	);
</script>

<style>
</style>

<main>
	<Bar data={{ labels: paths, datasets: [{ data: paths }] }} {options} />
</main>
