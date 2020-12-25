<script>
	// import { spring} from 'svelte/motion'
	export let name;
	let beta, gamma, x, y, orix, oriy;
	navigator.permissions.query({ name: "accelerometer" })

	if (window.DeviceOrientationEvent) {
		window.addEventListener(
			"deviceorientation",
			function (event) {
				alert();
				console.log(event);
				beta = event.beta;
				gamma = event.gamma;
			},
			true
		);
	} else if (window.DeviceMotionEvent) {
		window.addEventListener(
			"devicemotion",
			function (event) {
				//tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
				x = event.acceleration.x;
				y = event.acceleration.y;
			},
			true
		);
	}
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<p>음 제대로 적용 된건가?</p>
</main>
