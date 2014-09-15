  var circle = document.querySelector('.colores'),
  circleEraser = document.querySelector('.eraser'),
  tamano = document.querySelector('.tamano'),
  tamDiv = document.querySelectorAll('.tamano div'),
  div = document.querySelectorAll('.colores div'),
  divEraser = document.querySelectorAll('.eraser div'),
  articleColores = document.querySelector('.colores-btn'),
  articleEraser = document.querySelector('.eraser-btn'),
  boxLeft = document.querySelector('.box-left'),
  date = document.querySelector('.date'),
  boxRight = document.querySelector('.box-right');

    var onAnimation = function(){
      
      document.removeEventListener('mousemove',menu,false)
      circle.classList.remove('hide')
      tamano.classList.remove('hide')
      for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.add('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.add('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.add('expand-tam')
        };
      },750)
      
    }

    var offAnimation = function(){
      document.addEventListener('mousemove',menu,false)
      circle.classList.add('hide')
      tamano.classList.add('hide')
      for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('animar')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('animar-tam')
      };
      var timer = setTimeout(function(){
        for (var i = div.length - 1; i >= 0; i--) {
          div.item(i).classList.remove('expand')
          tamDiv.item(i)&&tamDiv.item(i).classList.remove('expand-tam')
        };
      },10)
      
    }

    var onAnimationEraser = function() {
      
      document.removeEventListener('mousemove',menu,false)
      circleEraser.classList.remove('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.add('expand')
        };
      },750)
      
    }
    var offAnimationEraser = function() {

      circleEraser.classList.add('hide')
      for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('animar')
      };
      var timer = setTimeout(function(){
        for (var i = divEraser.length - 1; i >= 0; i--) {
          divEraser.item(i).classList.remove('expand')
        };
      },10)
      document.addEventListener('mousemove',menu,false)

    }
    var animationRotationEraser = function (e) {

      document.removeEventListener('mousemove',menu,false)

      if(e.x <=5 && e.y <=110 && e.y >= 95){
        this.classList.contains('rotar-tam-pause')&&this.classList.remove('rotar-tam-pause')
        !this.classList.contains('rotar-tam')&&this.classList.add('rotar-tam')
        !this.classList.contains('rotar-tam-running')&&this.classList.add('rotar-tam-running')
      }else{
        !this.classList.contains('rotar-tam-pause')&&this.classList.add('rotar-tam-pause')
        this.classList.contains('rotar-tam-running')&&this.classList.remove('rotar-tam-running')
      }
    }
    
    var animationRotationTamano = function (e){
      //console.log("x: %d,y: %d",e.x,e.y)
      if(e.x >= 90 && e.y >= 670){
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.remove('rotar-tam-reverse')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
      }
      else if(e.x <= 5 && e.y <= 590){
        tamano.classList.contains('rotar-tam-pause')&&tamano.classList.remove('rotar-tam-pause')
        !tamano.classList.contains('rotar-tam')&&tamano.classList.add('rotar-tam')
        !tamano.classList.contains('rotar-tam-reverse')&&tamano.classList.add('rotar-tam-reverse')
      }
      else{
        !tamano.classList.contains('rotar-tam-pause')&&tamano.classList.add('rotar-tam-pause')
      }
    } 

    var clock = function (){
      var cT = new Date(),
          cD = cT.getDate(),
          cH = cT.getHours(),
          cM = cT.getMinutes(),
          cS = cT.getSeconds(),
          cA = cT.getFullYear();

      cM = (cM < 10 ? '0' : '') + cM;
      cS = (cS < 10 ? '0' : '') + cS;
      cH = (cH > 12) ? cH - 12 : cH;
      cH = (cH === 0) ? 12 : cH;
      // get Clock
      var clk = cH + ':' + cM;
      
      // array  days
      var w = new Array(7);
      w = [
        'Domingo','Lunes','Martes',
        'Miercoles','Jueves','Viernes','Sabado'];
      
      // get day
      var day = w[cT.getDay()];
      
      // array months
      var m = new Array(12);
      m =[
        'Enero','Febrero','Marzo',
        'Abril','Mayo','Junio','Julio',
        'Agosto','Septiembre','Octubre',
        'Noviembre','Diciembre'];
      // get Month
      var month = m[cT.getMonth()];

      // Render html
      date.innerHTML = 
        '<div class="clock">'+clk+'</div>'+
        '<ul class="day">'+
          '<li>'+day+'</li>'+
          '<li>'+cD+' de '+month+'</li>'+
        '</ul>';
    }

    var menu = function (e){
      var umbralWidth = screen.width - 5;
      if (e.clientX < '5'&& e.clientY > '100' && e.clientY < '550'){
        boxLeft.classList.add('show');
        date.classList.add('showClock');
        // show clock
        clock();
      // left = 150px
      } 
      else if(e.clientX > '150'){
          boxLeft.classList.remove('show');
          date.classList.remove('showClock');
      }

      if(e.clientX > umbralWidth && e.clientY > '100' && e.clientY < '550'){
        console.log("abrir derecha")
        boxRight.classList.add('show-right');
      } else if(e.clientX < (screen.width - 180)){
        boxRight.classList.remove('show-right');
      }
    }

    for (var i = div.length - 1; i >= 0; i--) {
      div[i].onclick = function (){
        console.log("click on color")
      }
      div[i].onmouseover = function (){
        var span = this.children;
        var background = span[0].style.background;
        for (var i = tamDiv.length - 1; i >= 0; i--) {
          var span = tamDiv.item(i).children;
          span[0].style.background = background
        };

      }
    };
    for (var i = tamDiv.length - 1; i >= 0; i--) {
      tamDiv[i].onclick = function (){
        console.log("click on tamano")
      }
    };

document.addEventListener('mousemove',menu,false)
articleColores.addEventListener('mouseenter',onAnimation,false)
articleEraser.addEventListener('mouseenter',onAnimationEraser,false)
tamano.addEventListener('mouseleave',offAnimation,false)
circleEraser.addEventListener('mouseleave',offAnimationEraser,false)
circleEraser.addEventListener('mousemove',animationRotationEraser,false)
tamano.addEventListener('mousemove',animationRotationTamano,false)