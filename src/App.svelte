<script>
	import Bar from "svelte-chartjs/src/Bar.svelte";
	let paths = [];

	let lightOn = false;
	let lock = false;

	let onOffMethod = async () => {
		if (lightOn) {
			await fetch("http://192.168.0.47:3017/turnon", {
				method: "POST",
			}).then(() => console.log("off"));
			lightOn = !lightOn;
		} else {
			await fetch("http://192.168.0.47:3017/turnoff", {
				method: "POST",
			}).then(() => console.log("on"));
			lightOn = !lightOn;
		}
		lock = true;
		setTimeout(function () {
			lock = false;
		}, 1000);
	};

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

			for (var i = 0; i < 255; i++) {
				if (
					Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5) >
						200 &&
					!lock
				) {
					console.log(
						Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5)
					);
					onOffMethod();
					return;
				}
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
