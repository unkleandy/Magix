const applyStyles = iframe => {
	let styles = {
		fontColor: "rgb(147, 255, 192)",
		fontGoogleName: "VT323",
		fontSize: "24px",
	}
	iframe.style.width = window.innerWidth - 606 + "px";
	iframe.style.height = window.innerHeight - 329 + "px";
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
}

var mousePosX = 0;
var mousePosY = 0;
let spriteList = [];
let body = null;




window.addEventListener("load", () => {
	body = document.querySelector("body")

	body.onclick = function (event) {
		spriteList.push(new PrismoBeam(event.pageX, window.innerHeight, spriteList));
	}

	body.onmousemove = function (event) {
		mousePosX = event.pageX;
		mousePosY = event.pageY;
	}
	spriteList.push(new PrismoEye());

	tick();
})


const tick = () => {
	for (let i = 0; i < spriteList.length; i++) {
		const sprite = spriteList[i];
		if (sprite instanceof PrismoEye) {
			sprite.tick(mousePosX, mousePosY);
		}
		else if (sprite instanceof Object) {
			let alive = sprite.tick()
			if (!alive) {
				spriteList.splice(i, 1);
				i--;
			}
		}
	}
	window.requestAnimationFrame(tick);
}