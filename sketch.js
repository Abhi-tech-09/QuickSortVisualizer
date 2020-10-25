var w = window.innerWidth,
    h = window.innerHeight;
    toolsHeight = document.querySelector(".tools").offsetHeight;

function setup() {
  let canvas = createCanvas(w , h-toolsHeight);   
  canvas.style('display', 'block');
}

function draw() {
  background(100,0,0);
}

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
}

function partition(arr, low, high) { 
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; ++j) { 
      if (arr[j] <= pivot) { 
          ++i;
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return (i + 1);
}

function quickSort(arr, low, high) { 
  if (low < high) { 
      let idx = partition(arr, low, high);

      quickSort(arr, low, idx-1);
      quickSort(arr, idx + 1, high);
  }
}

// quickSort(a , 0 , a.length);

let n = 0;
let a = [];

/*Custom*/
n = document.querySelector("#customSzIpt").value;

/*Random*/

let mark = 0;

function clicked(){
  mark ^= 1;
  let allow = document.querySelector("#randomSzIpt");

  if(mark) allow.disabled = false;
  else allow.disabled = true;
}

let rdSize=document.querySelector("#randomSzIpt");

function generate(){
  a = [];
  
  if(!mark){
    n = Math.round(random(10,50));
  } 
  else{
    n = rdSize.value;
  }
  
  for(let i=0;i<n;++i) a.push(i);

  for(let i=0;i<a.length;++i){
    a[i] = Math.round(random(50,1000));
  }
  
  console.log(a);

  if(a.length >= 1) quickSort(a,0,a.length-1);

  console.log(a);
}

