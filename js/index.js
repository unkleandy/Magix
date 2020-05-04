let spriteList = [];
let container = null;
let intro1 = false;
let intro2 = false;
let intro3 = false;
let windowWidth = 0;
let windowHeight = 0;




window.addEventListener("load", () => {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	spriteList.push(new Intro());
	window.setTimeout(function () { tick() }, 3000)

});




const tick = () => {
	for (let i = 0; i < spriteList.length; i++) {
		const element = spriteList[i];
		let alive = element.tick();


		if (!alive) {
			spriteList.splice(i, 1);
			i--;
		}
	}
	if (spriteList.length == 0) {
		if (intro2 == false) {
			spriteList.push(new Sword(windowWidth));
			intro2 = true;
		}
		else if (intro3 == false) {
			spriteList.push(new LoginBox());
			intro3 = true;
		}
	}

	if (spriteList.length != 0 || !intro3) {
		window.requestAnimationFrame(tick);
	}
}
