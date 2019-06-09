//segedfvek
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


var currentMap;//0tol indexelodnek a palyak 
var mapNum=2;



function init(){
	currentMap=0;
	kezelotRegisztral($('#mapRight'),'click',function(e){
		mapPic=$('#mapPic');
		currentMap = ((currentMap+1)%mapNum);
		mapPic.src="res/map" + (currentMap+1) + '.png';
	});

	kezelotRegisztral($('#mapLeft'),'click',function(e){
		mapPic=$('#mapPic');

		currentMap = (currentMap==0)?(mapNum-1):(currentMap-1);

		mapPic.src="res/map" + (currentMap+1) + '.png';
	});
	kezelotRegisztral($('#startGame'),'click', function(e){
		localStorage.currentMap=currentMap;
	});
}

