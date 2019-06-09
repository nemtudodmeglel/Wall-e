//segedfuggvenyek
kezelotRegisztral(window, 'load', init);
function delegate(parentSelector, type, selector, fn) {

  function delegatedFunction(e) {
    var target = e.target;

    while (target && !target.matches(selector)) {
      if (target === parent) {
        return;
      }
      target = target.parentNode;
    }
    e.delegatedTarget = target;
    return fn.call(target, e);
  }

  var parent = $(parentSelector);
  kezelotRegisztral(parent, type, delegatedFunction);
}
function kezelotRegisztral(elem, tipus, kezelo) {
  //Szabványos módszer
  if (elem.addEventListener) {
    elem.addEventListener(tipus, kezelo, false);
  }
  //Microsoft módszer
  else if (elem.attachEvent) {
    elem.attachEvent('on' + tipus, function () {
      kezelo(window.event);
      //vagy
      // return kezelo.call(elem, window.event);
    });
  }
  //Tradicionális módszer
  else {
    elem['on' + tipus] = kezelo;
  }
}
function $(element){
  return document.querySelector(element);
}
function $$(element){
  return document.querySelectorAll(element);
}
//valtozok

//terkepek
var map1={
  table :
  [ "▩✹▩◼◼▩",
    "▩⮦⮢▩▩▩",
    "▩↓⮤←←←",
    "▩↺▩▩▩▩",
    "▩▩◼▩⮘▩"
  ],
  walls :
  [
    {row: 4, collumn: 4, side: 'u'},
    {row: 4, collumn: 4, side: 'l'},
    {row: 3, collumn: 4, side: 'd'},
    {row: 4, collumn: 3, side: 'r'},

  ],
  time:30000,
  row:5,
  collumn:6
}
var map2={
  table :
  [ 
    "▩▩▩▩▩▩▩▩▩▩",
    "▩▩▩▩▩←←▩⮢▩",
    "▩▩⮤▩▩↻▩▩↻▩",
    "▩◼▩▩◼▩◼◼↑▩",
    "▩▩▩↻↻▩▩✹⮘▩",
    "▩▩▩▩▩▩▩▩▩▩",
    
    
  ],
  walls :
  [
    {row: 5, collumn: 8, side: 'r'},
    {row: 5, collumn: 8, side: 'u'},
    {row: 5, collumn: 8, side: 'd'},
    {row: 5, collumn: 9, side: 'l'},
    {row: 4, collumn: 8, side: 'd'},
    {row: 6, collumn: 8, side: 'u'},
    {row: 6, collumn: 8, side: 'r'},
    {row: 6, collumn: 9, side: 'l'},

  ],
  time:40000,
  row:6,
  collumn:10
}
var maps=[map1,map2];
var currentMap= maps[localStorage.currentMap];

//ido
var timeShow;
var time=0;
//walle helyzete
var robot={x:0,y:0,direction:'r'}

//utasitasok
var allCards=[1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
var chooseCards=[];
var executeCards=[];


var ingame=true;
var isPopUp=false;

//fuggvenyek

//fofuggveny
function init(){
  kezelotRegisztral($('#info'), 'click',popUp);
  //generate new cards
  makeNewChooseCards();
  fillChooseBar();
  //read the map in
  readInMap(currentMap);
  showTime();
}
//terkep beolvasasa
function readInMap(map){
  var game=$('#gameField');
  var txt='';
 txt += '<table class="robot"><tbody>';
  for (var i = 0; i < map.table.length; i++) {
    txt += '<tr>';
    for (var j = 0; j < map.table[i].length ; j++) {
      txt+= '<td class="object ';
      switch(map.table[i][j]) {
        case '▩':
          txt+= 'field';
        break;
        case '✹':
          txt+= 'finish';
        break;
        case '←':
          txt+= ' left';
        break;
        case '→':
          txt+= ' right';
        break;
        case '↑':
           txt+= ' up';
        break;
        case '↓':
           txt+= ' down';
        break;
        case '⮠':
           txt+= ' down_left';
        break;
        case '⮡':
           txt+= ' down_right';
        break;
        case '⮢':
           txt+= ' up_left';
        break;
        case '⮣':
           txtML+= ' up_right';
        break;
        case '⮤':
           txt+= ' left_up';
        break;
        case '⮥':
           txt+= ' right_up';
        break;
        case '⮦':
           txt+= '  left_down';
        break;
        case '⮧':
           txt+= ' right_down';
        break;
        case '↺':
           txt+= 'spinner_r';
        break;
        case '↻':
           txt+= 'spinner_l';
        break;  
         case '◼':
           txt+= 'hole';
        break; 
        default:
          txt+= 'field';
        break;
      }
    for (var k = 0; k < map.walls.length; k++) {
      row=map.walls[k].row -1 ;
      collumn = map.walls[k].collumn -1;


      if( row== i && collumn== j ){
        switch(map.walls[k].side){
          case 'u' :
          txt += ' upborder';
          break;
          case 'd' :
          txt += ' downborder';
          break;
          case 'r' :
          txt += ' rightborder';
          break;
          case 'l' :
          txt += ' leftborder';
          break;
        }
      }
    }
    txt += '">';

    switch(map.table[i][j]) {
      case '⮘':
           robot.x=i;
           robot.y=j;
           robot.direction='l';
           txt += '<div id="walle"><img id="wall-e" src="res/Wall-e_l.png"></div>';
        break; 
        case '⮚':
          robot.x=i;
          robot.y=j;
          robot.direction='r';
         txt += '<div id="walle"><img id="wall-e" src="res/Wall-e_r.png"></div>';
        break; 
        case '⮛':
          robot.x=i;
          robot.y=j;
          robot.direction='d';
         txt += '<div id="walle"><img id="wall-e" src="res/Wall-e_d.png"></div>';
        break; 
        case '⮙':
          robot.x=i;
          robot.y=j;
          robot.direction='u';
          txt += '<div id="walle"><img id="wall-e" src="res/Wall-e_u.png"></div>';
        break; 
      }
      txt+='</td>';
     
    }
    txt += '</tr>';
  }
  
  txt += '</tbody></table >';

  

  game.innerHTML = txt;
}

//utasito "kartyakkal" valo muveletek

// osszes utasitasfajta megkeverese
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

//megkeveres es ot kivalasztasa
function makeNewChooseCards(){
  shuffle(allCards);
  chooseCards=allCards.slice(12);
}

//valaszthato kartyak megjelenitese
function fillChooseBar(){
  var chooseBar = $('#chooseBar');
  console.log(chooseCards);
  chooseBar.innerHTML ='';
  var txt='';
  for (var i = 0; i < chooseCards.length; i++) {
    
    txt += '<div class="card">';
    switch(chooseCards[i]){
      case 0:
      txt+='</div>';
      break;
      case 1:
        txt+=' <input class="cardBut move" type="button" onclick="addToExecuteBar(1,'+ i + ')" ></div>';
      break;
      case 2:
        txt+=' <input class="cardBut move2" type="button" onclick="addToExecuteBar(2,'+ i +')" ></div>';
      break;
      case 3:
        txt+=' <input class="cardBut move3" type="button" onclick="addToExecuteBar(3,'+ i +')" ></div>';
      break;
      case 4:
        txt+=' <input class="cardBut turnL" type="button" onclick="addToExecuteBar(4,'+ i +')" ></div>';
      break;
      case 5:
       txt+=' <input class="cardBut turnR" type="button" onclick="addToExecuteBar(5,'+ i +')" ></div>';
      break;
      case 6:
        txt+=' <input class="cardBut turnA" type="button" onclick="addToExecuteBar(6,'+ i +')" ></div>';
      break;
      case 7:
        txt+=' <input class="cardBut shunt" type="button" onclick="addToExecuteBar(7,'+ i +')" ></div>';
      break;
    }
  }
  chooseBar.innerHTML +=txt;   
}

//hozzaado fuggveny
function addToExecuteBar(type,i){
  chooseCards[i]=0;
  executeCards.push(parseInt(type));
  fillExecuteBar();
  fillChooseBar();
  checkToExecute();
}

//vegrehajthato kartyak megjelenitese
function fillExecuteBar(){
  var txt='';
  for (var i = 0 ;i< executeCards.length; i++) {
    txt += '<div class="exCard ';
     
    switch(executeCards[i]){
          case 1:
            txt+=' move"  ></div>';
          break;
          case 2:
            txt+=' move2"  ></div>';
          break;
          case 3:
            txt+=' move3"  ></div>';
          break;
          case 4:
            txt+=' turnL"  ></div>';
          break;
          case 5:
           txt+=' turnR"  ></div>';
          break;
          case 6:
            txt+=' turnA"  ></div>';
          break;
          case 7 :
            txt+=' shunt" ></div>';
          break;
        }
  } 
  $('#executeBar').innerHTML = txt;
}

//mozgas alapjai

//mozgasok irannyal
function goLeft(){
 var i=0;
  function doit(){
    if(i<88){
      move(-1,0);
      i++;
      setTimeout(() => doit(),2);
    }
  }
    
    doit();
  
 // move(-85,0);
  robot.y--;
}
function goRight(){
  var i=0;
  function doit(){
    if(i<88){
      move(1,0);
      i++;
      setTimeout(() => doit(),2);
    }
  }
    doit();
 // move(85,0);
  robot.y++;
}
function goUp(){
  var i=0;
  function doit(){
    if(i<82){
      move(0,-1);
      i++;
      setTimeout(() => doit(),2);
    }
  }
    
    doit();
  //move(0,-82);
  robot.x--;
}
function goDown(){
  var i=0;
  function doit(){
    if(i<82){
      move(0,1);
      i++;
     setTimeout(() => doit(),2);
    }
  }
    doit();
  //move(0,82);
  robot.x++;
}
//forgasok
function turnAround(){
  var deg=0;
  switch(robot.direction){
    case 'u':
    robot.direction = 'd';
    deg=90;
    break;
    case 'd':
    robot.direction = 'u';
    deg=270;
    break;
    case 'l':
    robot.direction = 'r';
    deg=0;
    break;
    case 'r':
    robot.direction = 'l';
    deg=180;
    break;
  }
 var walle = $('#walle');
   var i=0;
  function doit(){
    if(i<180){
       i+=4;
      deg+=4;
      walle.style.transform=  "rotate("+deg+"deg)";
     
      setTimeout(doit,0);
    }
  }
  doit();
 // $('#wall-e').src='res/Wall-e_' + robot.direction +'.png'; 
}
function turnRight(){
  var deg=0;
  switch(robot.direction){
    case 'u':
    robot.direction = 'r';
    deg=90;
    break;
    case 'd':
    robot.direction = 'l';
    deg=270;
    break;
    case 'l':
    robot.direction = 'u';
    deg=0;
    break;
    case 'r':
    robot.direction = 'd';
    deg=180;
    break;
  }
  var walle = $('#walle');
   var i=0;
  function doit(){
    if(i<90){
      i++;
      deg++;
      walle.style.transform=  "rotate("+deg+"deg)";
      
      setTimeout(doit,2);
    }
  }
  doit();
  //$('#wall-e').src='res/Wall-e_' + robot.direction +'.png';
}
function turnLeft(){
  var deg=0;
  switch(robot.direction){
    case 'u':
    robot.direction = 'l';
    deg=90;
    break;
    case 'd':
    robot.direction = 'r';
    deg=270;
    break;
    case 'l':
    robot.direction = 'd';
    deg=0;
    break;
    case 'r':
    robot.direction = 'u';
    deg=180;
    break;
  }
  var walle = $('#walle');
   var i=0;
  function doit(){
    if(i<90){
      i++;
      deg--;
      walle.style.transform=  "rotate("+deg+"deg)";
      
      setTimeout(doit,2);
    }
  }
  doit();
   //$('#wall-e').src='res/Wall-e_' + robot.direction +'.png';
}

//mozgas alapfuggvenye
function move(dLeft,dTop){
  var walle = $('#walle');
  var s = window.getComputedStyle(walle);
  var moveTime = 0 ;
  
  walle.style.left = parseInt(s.left) + dLeft + 'px';
  walle.style.top = parseInt(s.top) + dTop + 'px';
}

//mozgasok hasznalata
function simpleMove(){
  if(robot.direction == 'u'  && !haveWalls(robot.x,robot.y,'u')){
    goUp();
    checkForWinOrLose();
    
  }else if(robot.direction == 'd'  && !haveWalls(robot.x,robot.y,'x')){
    goDown();
    checkForWinOrLose();
    
  }else if(robot.direction == 'r' && !haveWalls(robot.x,robot.y,'r')){
    goRight();
    checkForWinOrLose();
   
  }else if(robot.direction == 'l'  && !haveWalls(robot.x,robot.y,'l')){
    goLeft();
    checkForWinOrLose();
    
  }
}
function doubleMove(){
  simpleMove();
  simpleMove();
}
function tripleMove(){
  doubleMove();
  simpleMove();
}
function shunt(){
  if(robot.direction == 'd' &&  !haveWalls(robot.x,robot.y,'u') ){
    goUp();
    checkForWinOrLose();
   
  }else if(robot.direction == 'u' && !haveWalls(robot.x,robot.y,'d')){
    goDown();
    checkForWinOrLose();
  }else if(robot.direction == 'l' &&  !haveWalls(robot.x,robot.y,'r')){
    goRight();
    checkForWinOrLose();
  }else if(robot.direction == 'r' &&  !haveWalls(robot.x,robot.y,'l')){
    goLeft();
    checkForWinOrLose();
  }
} 
function basicMovement(num){
  switch(num){
          case 1:
           simpleMove();
          break;
          case 2:
            doubleMove();
          break;
          case 3:
            tripleMove();
          break;
          case 4:
            turnLeft();
          break;
          case 5:
            turnRight();
          break;
          case 6:
            turnAround();
          break;
          case 7:
            shunt();
          break;
  }
}

//ellenorzofuggvenyek

//ellenorzni a cellat, amin a robot van, majd vegrehajtja a futoszalag utasitasat
function checkCell(){
  var curCell= currentMap.table[robot.x][robot.y];
  switch(curCell){
    case '←':
      goLeft();    
    break;
    case '→':
      goRight();
    break;
    case '↑':
      goUp();
    break;
    case '↓':
      goDown();
    break;
    //ezeket nem ertem
    case '⮠' :
      goLeft()
    break;
    case '⮡':
      goRight();
    break;
    case '⮢' :
      goLeft();
    break;
    case '⮣':
      goRight();
    break;
    case '⮥' :
      goUp();
    break;
    case '⮦' :
      goDown();
    break;
    case '⮧' :
      goDown();
    break;
    case '⮤' :
      goUp();
    break;
    //idaig
    
  }
  checkForWinOrLose();
}
function checkSpinners(){
  var curCell= currentMap.table[robot.x][robot.y];
  switch(curCell){
    case '↺':
      turnRight();
    break;
    case '↻':
      turnLeft();
    break;
      case '⮠' :
      turnRight();
    break;
    case '⮡':
      turnLeft();
    break;
    case '⮢' :
      turnLeft();
    break;
    case '⮣':
      turnRight();
    break;
    case '⮥' :
      turnLeft();
    break;
    case '⮦' :
      turnLeft();;
    break;
    case '⮧' :
      turnRight();
    break;
    case '⮤' :
      turnRight ();
    break;
  }
}



//ellenorzi van-e fal a cellaban a megadott iranyban
function haveWalls(i,j,direction){

  for (var t = 0; t < currentMap.walls.length; t++) {
    if(currentMap.walls[t].row == (i+1) && currentMap.walls[t].collumn == (j+1) && currentMap.walls[t].side==direction ){
      return true;
    }
  }
  return false;
}
//ellenorzi, hogy nyert, vagy veszitett-e a jatekos
function checkForWinOrLose(){
  
  if(outOfMap()){
    lose();
    
  }
   var curCell= currentMap.table[robot.x][robot.y];
   if(curCell== '✹'){
    win();
   }else if(curCell == '◼' ){
       lose();
  }
}

//ellenorzi, hogy lelepett-e a terkeprol
function outOfMap(){

  return (robot.x<0 || robot.y<0 || robot.x>=currentMap.row || robot.y>= currentMap.collumn) 
}

//futtatas ellenorzese
function checkToExecute(){
  if(executeCards.length ==5){
    time=0;
    stopTime();
    execute(0);  
    setTimeout(function(){
      if(ingame){
         makeNewChooseCards();
        showTime();
        fillChooseBar();
        executeCards=[]; 
        fillExecuteBar();
      }
    },7500);
    
    
    
  }
 
}

//a vegrehajthato utasitasok futtatasa
function execute(i){
  if(i<(executeCards.length ) && ingame ){
    showEmptyChooseBar();
    var query = '#executeBar div:nth-child(' + (i+1) + ')';
    var cur =$(query);
    cur.style.border= 'solid 2px red';
    basicMovement(executeCards[i]);
    setTimeout(() => checkCell(),500);
    setTimeout(() => checkSpinners(),1000);
    setTimeout(() => execute(i+1),1500);

    }
}

//idofuggvenyek

//elinditja az idozitot
function showTime(){
  timeShow = setInterval(timer, 1000);
}

//leallitja a timert
function stopTime(){
  clearInterval(timeShow);
}

//ha az idozito lejar randomolja az utasitasokat, majd vegrehajtja
function timer() {
  time=time+1;
  var timeLeft= (currentMap.time/1000)-time;
  if(timeLeft==0){
    shuffle(allCards);
    executeCards = allCards.slice(16);
    fillExecuteBar();
    checkToExecute();
    
  }
  $('#topBar span').innerHTML = timeLeft;
}

//jatekesemenkezelo

//vesztes eseten
function lose(){
  ingame=false;
  //$('#walle').style.display= 'none';
  stopTime();
  $('#something_happened p').innerHTML = 'You lose';
  $('#something_happened').style.display = 'block';
  kezelotRegisztral($('#something_happened input'), 'click',function(){window.location.href = "index.html";});
}

//nyeres eseten
function win(){
  ingame=false;
  stopTime();
    $('#something_happened p').innerHTML = 'You win';
    $('#something_happened').style.display = 'block';
    kezelotRegisztral($('#something_happened input'), 'click',function(){window.location.href = "index.html";});
}

//popup segitseg
function popUp(){
  if(isPopUp){
    $("#popupDiv").style.display = 'none';
    $('#walle').style.display= 'block';
  }else{
    $("#popupDiv").style.display = 'block';
    $("#walle").style.display = 'none';

  }
  isPopUp=!isPopUp;
  
   
}
function showEmptyChooseBar(){
  $('#chooseBar').innerHTML="";
  
}