		var paper = Raphael('caja', 1200, 560);
        paper.rect(0,0,1200,560).attr({
        	fill: 'rgba(0,0,0,0)'
        });
  var set = paper.set();


		var $btnCrearRect = $('.rectangle'),
		$rotate = $('.rotate'),
		$translatex = $('.translatex'),
		$translatey = $('.translatey'),
		$ancho = $('.ancho'),
		$alto = $('.alto'),
		$eliminar = $('.eliminar'),
		svg_ = document.getElementsByTagName('svg')[0]
		;

		svg_.onclick = function(e){
			console.log(e.x + " , "+e.y)
		}
		svg_.onmousemove = function(e){
			console.log(e.x + " , "+e.y)
			if(elActual){
				var deegre = $rotate.val(),
				x = $translatex.val()
				y = $translatey.val();
				elActual.transform("t"+e.x+","+e.y+"r"+deegre)
			}
		}
		
    /*
        cuadrado = paper.rect(10, 15, 64, 64, 4).attr({fill: 'pink'}),
        rectangulo = paper.rect(30, 35, 100, 64).attr({fill: 'pink'}),
        circulo = paper.circle(150, 48, 32).attr({fill: 'lightblue'});
    */
    
   /*
    set.push(cuadrado,circulo,rectangulo)
       .draggable();

	    	var watchElements = function(){

	       var move = function(dx, dy, mx, my, ev) {
	            // Get mouse X/Y (relative to SVG/VML canvas)
	            var ox = this.ox, oy = this.oy;
	            console.log(ox+" : "+oy)
	            var offset = $(this.paper.canvas).parent().offset(),
	                px = mx - offset.left,
	                py = my - offset.top;
	    
	            $('.aviso').html([
	                'Drag Move: (Canvas offset relative to HTML doc): ' + 
	                    [offset.left, offset.top].join(', '),
	                'Distance XY: ' + [dx, dy].join(', '),
	                'Document XY: ' + [mx, my].join(', '),
	                'Canvas XY: ' + [px, py].join(', ')
	                ].join('<br>'));
	    
	        },
	        start = function() { 
	        		  var ox = this.ox, oy = this.oy;
	            console.log(ox+" : "+oy)
	        	//$('.aviso').html('Drag Start');
	        },
	        end = function() { 
	        		  var ox = this.ox, oy = this.oy;
	            console.log(ox+" : "+oy)
	        	//$('.aviso').html('Drag End');
	         };
	    
	    			set.drag(move, start, end);
	    	}
	    	watchElements();
   */
	var btnMoverPizarra = $('#change');
	var pizarra = $('.pizarra')

	pizarra.ubicacion = "atras"

	btnMoverPizarra.click(function(event) {
		console.log(pizarra)
		if(pizarra.ubicacion == "atras"){
			pizarra.css({
				'z-index':'2'
			})
			pizarra.ubicacion = "adelante"
		}
		else{
				pizarra.css({
				'z-index':'1'
			})
			pizarra.ubicacion = "atras"
		}
	});
		var elActual = null;
		function crearRectangulo (opt){
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					width: 10,//anchura
					height: 10,//altura
					color:"rgba(0,0,0,0)",//color de fondo
					punta:0//redondes de los vertices,a mayor valor mas redonda sera la punta
				}

				opt = $.extend(default_, opt);
				//console.log(opt)

    var newCuadrado = paper.rect(opt.x, opt.y, opt.width, opt.height,opt.punta).
    attr({fill: opt.color}).
    click(function(e){
    		console.log(this)
    		console.log(this._)
    	if(this._['bboxwt']&&this._['bboxwt'].toString){
    		console.log(this._['bboxwt'])
    	}
    	else
    		console.log(this._['bboxwt'])

    	//console.log(this._.bboxwt.x +" , "+this._.bboxwt.x)
    	elActual = this;
    	//console.log(e)
    	var datos = elActual.getBBox(false);
					//console.log(datos)
					console.log(datos.x+" , "+datos.y)

					$alto.val(this.height)
					$ancho.val(this.width)
					$translatex.val(datos.x)
					$translatey.val(datos.y)
					if(this._&&this._['deg']!=undefined){
						$rotate.val(this._['deg'])
						console.log("deg es: "+ this._['deg'])
					}else{
						console.log(this._['deg'])
					}


					console.log(
							$alto.val()+", "+
							$ancho.val()+", "+
							$translatex.val()+", "+
							$translatey.val()+", "+
							$rotate.val()
					)

    })
    .hover(function() {
    	this.attr({
    		cursor:"pointer"
    	})
    });
			 set.push(newCuadrado)  
    //.draggable(); 
	   // watchElements();
		}

		function eliminarElemento (){
			console.log("removiendo...")
			paper.clear()
		}


		
		$btnCrearRect.click(function(event) {
			var ancho = parseInt($('.ancho').val()),
			alto = parseInt($('.alto').val()),
			color = $('.color').val();
			var opt = {
				container:paper,
				width:ancho,
				height:alto,
				color:color
			}

			crearRectangulo(opt)
		});


		$eliminar.click(function(event) {
			eliminarElemento()
		});

		$rotate.change(function(event) {
			var deegre = $rotate.val();
			var x = $translatex.val()
			y = $translatey.val();
			console.log("cambio de valor: " + deegre)
			console.log(elActual)
			elActual.transform("t"+x+","+y+"r"+deegre)
		});

		$translatex.change(function(event) {
			var deegre = $rotate.val();
			var x = $translatex.val()
			y = $translatey.val();
			elActual.transform("t"+x+","+y+"r"+deegre)
			
		});

		$translatey.change(function(event) {
			var deegre = $rotate.val();
			var x = $translatex.val()
			y = $translatey.val();
			elActual.transform("t"+x+","+y+"r"+deegre)
			
		});

		$alto.change(function(event) {
			elActual.attr({
				height:$alto.val()
			})
		});

		$ancho.change(function(event) {
			elActual.attr({
				width:$ancho.val()
			})
		});