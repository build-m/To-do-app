  var calendar = $.calendars.instance('ethiopian');
  var da = calendar.newDate();
  var nowdate = da._day;
  var nowmonth = da._month;
  var nowyear = da._year;
  var nowmd = da._calendar.local.dayNames; 
  var monthname = '';

  if (nowmonth == 1) {
      monthname = 'መስከረም'
  } else if (nowmonth == 2) {
      monthname = 'ጥቅምት'
  }else if (nowmonth == 3) {
      monthname = 'ህዳር'
  }else if (nowmonth == 4) {
      monthname = 'ታህሳስ'
  }else if (nowmonth == 5) {
     monthname = 'ጥር'
  }else if (nowmonth == 6) {
     monthname = 'የካቲት'
  }else if (nowmonth == 7) {
     monthname = 'መጋቢት'
  }else if (nowmonth == 8) {
     monthname = 'ሚያዝያ'
  }else if (nowmonth == 9) {
     monthname = 'ግንቦት'
  }else if (nowmonth == 10) {
     monthname = 'ሰኔ'
  }else if (nowmonth == 11) {
     monthname = 'ሐምሌ'
  }else if (nowmonth == 12) {
     monthname = 'ነሐሴ'
  }else if (nowmonth == 13) {
     monthname = 'ጳጉሜ'
  }

  var a = new Date();
  
    var weekdays = new Array(7);
        weekdays[0] = "እሁድ";
        weekdays[1] = "ሰኞ";
        weekdays[2] = "ማክሰኞ";
        weekdays[3] = "ረቡዕ";
        weekdays[4] = "ሐሙስ";
        weekdays[5] = "አርብ";
        weekdays[6] = "ቅዳሜ";
        var r = weekdays[a.getDay()];

        var disp = document.getElementById("date");
        disp.innerHTML = r + ',' + monthname + ' ' + nowdate + '/' + nowyear;


const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

document.getElementById("date").addEventListener("mouseover", function(){
          console.log('hovered');
          disp.innerHTML = today.toLocaleDateString("en-US", options);

          this.addEventListener("mouseout", function(){
            console.log('unnhovered');
            disp.innerHTML = r + ',' + monthname + ' ' + nowdate + '/' + nowyear;
          })
        })  

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


















