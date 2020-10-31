var w = window.innerWidth,
		h = window.innerHeight;
		toolsHeight = document.querySelector(".tools").offsetHeight;

var n = 0, a = [];
let f=0;

function setup() {
  let canvas = createCanvas(w , h-toolsHeight);   
	canvas.style('display', 'block');

  var stringArray;
	/*Custom*/
  let visQuickSort = document.querySelector("#visualBtn");
	visQuickSort.addEventListener("click",function checker(){
		n = document.querySelector("#customSzIpt").value;

		if(n){
			a = [];
			stringArray = document.querySelector("#customEleIpt").value;
			stringArray += ",";
			let num = "";
	
			for(let i = 0;i<stringArray.length;++i){
				let ch = stringArray[i];
	
				if(ch != ",")
					num += ch;
				else{
					a.push(parseInt(num));
					num = "";
				}
			}  
		
			if(n<a.length)
				alert("Number of Elements exceeded..!");
			else if(n>a.length)
				alert("We need more elements...!");
				
			// console.log(a);
		} 

    if(f%2!=0)
			quickSort(a , 0 , a.length-1);

		f++;
	});
}

/*Random*/
let mark = 0;
function clicked(){
	mark ^= 1;
	let allow = document.querySelector("#randomSzIpt");

	if(mark) allow.disabled = false;
	else allow.disabled = true;
}

function generate(){
	let rdSize=document.querySelector("#randomSzIpt").value;
	a = [];
	
	if(!mark)
		n = Math.round(random(10,50));
	else{
		console.log(rdSize);
		n = parseInt(rdSize);
		console.log(n);
	}

	for(let i=0;i<n;++i) a.push(i);

	for(let i=0;i<a.length;++i)
		a[i] = Math.round(random(100,500));  
}	

 function quickSort(arr, low, high) { 	
	if (low < high) { 
		let idx =  partition(arr, low, high);

		 Promise.all([
	  	quickSort(arr, low, idx-1),
			quickSort(arr, idx + 1, high)
		]);
	}
}

function partition(arr, low, high) { 
	let pivot = arr[high];
	let i = low - 1;
	
	for (let j = low; j < high; ++j) { 
		if (arr[j] <= pivot) { 
			++i;
			 swap(arr,i,j);
		}
	}
	 swap(arr,i+1,high);
	
	return (i + 1);
}

function swap(arr ,i,j){
	//  sleep(1000);
 [arr[i], arr[j]] = [arr[j], arr[i]];
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}

let move=0;
function draw() {
  background(0);
	textAlign(CENTER);
	
	if(a.length>0){
		let hRatio = Math.round(w/a.length),x = 0;
		// mn mx

		for(let i=0;i<a.length;++i){
			rect(x , h-a[i]-toolsHeight, hRatio , a[i]);
			x += hRatio;
		}		
	}
}


function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
}