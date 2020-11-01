var w = window.innerWidth, h = window.innerHeight,
    toolsHeight = document.querySelector('.tools').offsetHeight,
    n = 0, a = [], flag = [], cur, shuff, it1 = -1, it2 = -1, isCustom , isRandom;

const genBtn = document.querySelector('#genArr');
function setup() {
	let canvas = createCanvas(w, h - toolsHeight);
	canvas.style('display', 'block');

	var stringArray;
	let visQuickSort = document.querySelector('#visualBtn');

	visQuickSort.addEventListener('click', function checker() {
		n = parseInt(document.querySelector('#customSzIpt').value);
        
        if (isCustom) {
            if (n) {
                a = [];
                shuff = true
                stringArray = document.querySelector('#customEleIpt').value;
                stringArray += ',';
                let num = '';
    
                for (let i = 0; i < stringArray.length; ++i) {
                    let ch = stringArray[i];
    
                    if (ch != ',') num += ch;
                    else {
                        a.push(parseInt(num));
                        num = '';
                    }
                }
    
                if (a.length == n) {
                    genBtn.disabled = true;
                    flag = new Array(a.length);
                    flag.fill(0);
                    quickSort(a, 0, a.length - 1);
                }
            }
        } else { 
            if (isRandom) { 
                if (n < a.length)
                    alert('Number of Elements exceeded..!');
                else if (n > a.length)
                    alert('We need more elements...!');
            }
            quickSort(a, 0, a.length - 1);
        }

	});
}

let mark = 0;
function clicked() {
	mark ^= 1;
	let allow = document.querySelector('#randomSzIpt');

    if (mark) {
        allow.disabled = false;
        allow.style.cursor = 'auto';
    }
    else { 
        allow.disabled = true;
        allow.style.cursor = 'no-drop';
    }
}

function generate() {
	let rdSize = document.querySelector('#randomSzIpt').value;
	a = [];

	if (!mark) n = Math.round(random(100, 600));
	else n = parseInt(rdSize);

	for (let i = 0; i < n; ++i) a.push(i);
	for (let i = 0; i < a.length; ++i) a[i] = Math.round(random(50, 500));

	flag = new Array(a.length);
    flag.fill(0);
    
    isRandom = true;
    shuff = true;
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
	await sleep(50);
	[ arr[i], arr[j] ] = [ arr[j], arr[i] ];
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
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

const shuffleBtn = document.querySelector('#shuffleBtn');
shuffleBtn.addEventListener('click', () => {
	let temp = [],
		val,
		length = a.length;

	while (temp.length < length) {
		let idx = Math.round(random(0, a.length - 1));
		val = a[idx];
		a.splice(idx, 1);
		temp.push(val);
	}

	if (isSorted(temp)) {
		let idx1 = Math.round(random(0, a.length / 2)),
			idx2 = Math.round(random((a.length + 1) / 2, a.length + 1));

		[ temp[idx1], temp[idx2] ] = [ temp[idx2], temp[idx1] ];
	}

	a = temp;
    flag.fill(0);
    shuff = false;
});

function draw() {
	background('#434343');
	textAlign(CENTER);
    assginDisable();
    
	if (a.length > 0) {
		if (flag[0]!=2 && shuff) {
			flag[cur] = 1;
			if (it1 >= 0) flag[it1] = flag[it2] = 3;
		}

		let hRatio = Math.round(w / a.length), x = 0;
		let mul = w % a.length;
		mul /= a.length;
		hRatio += mul;

		for (let i = 0; i < a.length; ++i) {
			if (flag[i] == 3) fill('#17a2b8');
			else if (flag[i] == 2) fill('#28a745');
			else if (flag[i] == 1) fill('#dc3545');
			else fill(255);

			rect(x, h - a[i] - toolsHeight, hRatio, a[i]);
			x += hRatio;
		}

		if (flag[0]!=2 && shuff) {
			flag[cur] = 0;
			if (it1 >= 0) flag[it1] = flag[it2] = 0;
		}
	}
}

function assginDisable() {
	let tempN = document.querySelector('#customSzIpt').value;
	tempN = parseInt(tempN);

	if (tempN) {
		let tempA = [];
    
        let tempstring = document.querySelector('#customEleIpt').value;

        if (tempstring.length > 0) { 
            tempstring += ',';
            let num = '';
    
            for (let i = 0; i < tempstring.length; ++i) {
                let ch = tempstring[i];
    
                if (ch != ',') num += ch;
                else {
                    tempA.push(parseInt(num));
                    num = '';
                }
            }
        }

        if (tempA.length == tempN) {
            genBtn.style.cursor = 'no-drop';
            genBtn.disabled = true;
            isCustom = true;
            isRandom = false;
        }
        else { 
            genBtn.style.cursor = 'default';
            genBtn.disabled = false;
            isCustom = false;
            isRandom = true;
            shuff = false;
            flag.fill(0);
        }
	}
}

function windowResized() {
	w = window.innerWidth;
	h = window.innerHeight;
	resizeCanvas(w, h);
}