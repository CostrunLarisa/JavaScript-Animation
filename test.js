let counterId = 1;

function  erase() {
     var shape = document.getElementById(this.id);
     var area =  document.getElementsByClassName('area');
    updateNoOfShapes(-1);
    var pixels = -((parseInt(shape.clientHeight)) + parseInt(shape.clientWidth));
    updatePixels(pixels);
    area[0].removeChild(shape);
}
function updateNoOfShapes(noOfShapes){
    
    var lastValues = (document.getElementById('noOfShapes')).innerHTML;
    if (lastValues == ""){
        (document.getElementById('noOfShapes')).innerHTML = noOfShapes+"";
    }
    else{
        (document.getElementById('noOfShapes')).innerHTML = parseInt(lastValues) +noOfShapes+"";
    }
}

function updatePixels(noOfPixels){
    var lastValues = (document.getElementById('occupiedArea')).innerHTML;
    if (lastValues == ""){
        (document.getElementById('occupiedArea')).innerHTML = noOfPixels+"";
    }
    else{
        (document.getElementById('occupiedArea')).innerHTML = parseInt(lastValues) +noOfPixels+"";
    }
}
window.onload = function (){
    var class_names= document.getElementsByClassName('shape');
    var totalPixels = 0;
    for (var i = 0; i < class_names.length; i++) {
        var leftPosition = Math.floor(Math.random()*90);
        class_names[i].addEventListener('click', erase, false);
        class_names[i].setAttribute('id',counterId+'');
        class_names[i].style.left = leftPosition +"%";
        class_names[i].style.marginTop = "-200px";
        counterId+=1;
        totalPixels += parseInt(class_names[i].clientHeight) + parseInt(class_names[i].clientWidth);
    }
    
    var noOfShapes = class_names.length;
    updateNoOfShapes(noOfShapes);
    updatePixels(totalPixels);
    
    document.getElementsByClassName('area')[0].onclick = function createShape(e){
        
     var shape = ["ellipse","triangle","circle","star","square","pentagon","hexagon"];
    
        var area = document.getElementsByClassName('area');
        var isFree = true;
        for (var i = 0; i < class_names.length; i++) {
            var isClickInsideElement = e.target.contains(class_names[i]);
            if (isClickInsideElement == false) {
                isFree = false;
                break;
            }
        }
        
        if(isFree == true){
            
        var indexOfShape = Math.floor(Math.random()*7);
        var newShape = document.createElement('div');
    
        //newShape.style.left = event.pageX-(area[0].offsetWidth/3.2)+"px";
        //newShape.style.top = event.pageY - (area[0].offsetHeight*1.7)+180+"px";
            
        newShape.style.left= e.screenX*2 - (area[0].offsetWidth)+"px";
        newShape.style.top = e.screenY*2 - (area[0].offsetHeight)+"px";
        newShape.setAttribute('id',counterId+'');
        newShape.className = "shape "+shape[indexOfShape];
    
        if (shape[indexOfShape] == "hexagon"){
            
        var top = document.createElement('div');
        var content = document.createElement('div');
        var bottom = document.createElement('div');
        top.className = "hexagonTop";
        content.className = "hexagonContent";
        bottom.className = "hexagonBottom";
        newShape.appendChild(top);
        newShape.appendChild(content);
        newShape.appendChild(bottom);
        }
        
        newShape.addEventListener('click', erase, false);
        area[0].appendChild(newShape);
        updateNoOfShapes(1);
        var pixels = parseInt(newShape.clientHeight) + parseInt(newShape.clientWidth);
        updatePixels(pixels);
        counterId+=1;
        }
    }
    
}