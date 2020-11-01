var w = window.innerWidth, h = window.innerHeight,
    toolsHeight = document.querySelector('.tools').offsetHeight,
    n = 0, a = [], flag = [], cur = -1, it1 = -1, it2 = -1, isCustom, speed = 200;

const genBtn = document.querySelector('#genArr');
const shuffleBtn = document.querySelector('#shuffleBtn');
const customInput = document.querySelector('#customEleIpt');

function setup() {
	let canvas = createCanvas(w, h - toolsHeight);
	canvas.style('display', 'block');

	let visQuickSort = document.querySelector('#visualBtn');

    visQuickSort.addEventListener('click', function checker() {
        if (isCustom) {
            a = customInput.value.split(",").map(e => parseInt(e));
        }
        
        flag = new Array(a.length);
        flag.fill(0);
        quickSort(a, 0, a.length - 1);
        
	});
}

function generate() {
	let rdSize = document.querySelector('#randomSzIpt').value;
	a = [];
    n = parseInt(rdSize);

    if (!n) n = Math.round(random(20, 100));
    
    a = new Array(n);    
	for (let i = 0; i < a.length; ++i) a[i] = Math.round(random(50, 500));
	flag = new Array(a.length);
    flag.fill(0);
    it1 = it2 = cur = -1;
}

function isSorted(arr) {
	let temp = true;
	for (let i = 1; i < arr.length; ++i) {
		if (arr[i - 1] > arr[i]) {
            temp = false;
			break;
		}
	}
	return temp;
}

shuffleBtn.addEventListener('click', () => {
	let temp = [], val, len = a.length;

	while (temp.length < len) {
		let idx = Math.round(random(0, a.length - 1));
		val = a[idx];
		a.splice(idx, 1);
		temp.push(val);
	}

	if (isSorted(temp)) {
        let idx1 = Math.round(random(0, a.length / 2)), idx2 = Math.round(random((a.length + 1) / 2, a.length + 1));
		[ temp[idx1], temp[idx2] ] = [ temp[idx2], temp[idx1] ];
	}

	a = temp;
    flag.fill(0);
    it1 = it2 = cur = -1;
});

function draw() {
	background('#0F2027');
    textAlign(CENTER);
    checkCustom();
    
	if (a.length > 0) {
		if (flag[0]!=2) {
			if(cur >=0) flag[cur] = 1;
			if (it1 >= 0) flag[it1] = flag[it2] = 3;
		}

		let hRatio = Math.round(w / a.length), x = 0;
		let mul = w % a.length;
		mul /= a.length;
		hRatio += mul;

		for (let i = 0; i < a.length; ++i) {
			if (flag[i] == 3) fill('#3b5bff');
			else if (flag[i] == 2) fill('#38ef7d');
			else if (flag[i] == 1) fill('#F00000');
			else fill(255);

			rect(x, h - a[i] - toolsHeight, hRatio, a[i]);
			x += hRatio;
		}

		if (flag[0]!=2) {
			if(cur >=0) flag[cur] = 0;
			if (it1 >= 0) flag[it1] = flag[it2] = 0;
		}
    }
}

function checkCustom() {
    isCustom = genBtn.disabled = (customInput.value.trim().length != 0);
}

async function quickSort(arr, low, high) {
	if (low < high) {
		let idx = await partition(arr, low, high);
		Promise.all([ quickSort(arr, low, idx - 1), quickSort(arr, idx + 1, high) ]);
	}

    if (isSorted(a)) flag.fill(2);
}

async function partition(arr, low, high) {
	let pivot = arr[high];
	let i = low - 1;
	cur = high;

	for (let j = low; j < high; ++j) {
		if (arr[j] <= pivot) {
			++i;
			await swap(arr, i, j);
		}
		(it1 = i), (it2 = j);
	}
	await swap(arr, i + 1, high);

	return i + 1;
}

async function swap(arr, i, j) {
	await sleep(speed);
	[ arr[i], arr[j] ] = [ arr[j], arr[i] ];
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function windowResized() {
	w = window.innerWidth;
	h = window.innerHeight;
	resizeCanvas(w, h);
}