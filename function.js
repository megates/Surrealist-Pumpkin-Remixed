console.clear();

const path = document.getElementById('line');
const svg = document.getElementById('container');
const pumpkinContainer = document.getElementById('pumpkin');
const pumpkinElements = pumpkinContainer.getElementsByTagName('path');
const shadow = document.getElementById('shadow');
const ground = 380;

let points = {
	start: 	{x: 0, y: 0},
	bezier: {x: 0, y: 0},
	end: 	{x: 0, y: 0}
}

let pumpkinRefs = [];
let t = 0;
let translator = new POP.TranslationPath(path, 1500, 2000);

for(let i = 0; i < pumpkinElements.length; i++)
{
	let element = document.createElementNS("http://www.w3.org/2000/svg", 'path');;
		element.setAttribute('style', pumpkinElements[i].getAttribute('style'))
	
	let detail = Number(pumpkinElements[i].getAttribute('data-detail'))
	let ref = new POP.ReferencePath(pumpkinElements[i], detail, {x: 100, y: 100}, {x: 284, y: 299})
	
	pumpkinRefs.push({ref: ref, element: element});
	svg.appendChild(element);
}

shadow.setAttribute('cy', ground);

if(path && svg) tick();

function floorY(y) { return y > ground ? ground : y;}

function tick()
{
	t += 0.09;
	
	points.start.x = 110 + Math.cos(t) * 350;
	points.start.y = 160 + Math.sin(t) * 120;
	
	points.bezier.x = 200 + Math.cos(t) / 150;
	points.bezier.y = 220 + Math.sin(t) * 100;
	
//	points.end.x = 200 + Math.cos(t) * 120; 
  /* This seems to affect the vertical axis of the image MG */
//points.end.y = floorY(320 + Math.sin(t) * 100); 
  /* I blocked this out and it mage it even weirder.  It limits the movement of the shapes MG, when both are blocked out it flashes and folsd over itself */
	
	shadow.setAttribute('cx', points.start.x);
	
	path.setAttribute('d', `M ${points.start.x} ${points.start.y} S ${points.bezier.x} ${points.bezier.y} ${points.end.x} ${points.end.y} `);
	
	translator.updatePath();
	
	pumpkinRefs.map(p => {
		p.element.setAttribute("d", translator.getPath(p.ref))
	})
	
	requestAnimationFrame(() => tick())
}
