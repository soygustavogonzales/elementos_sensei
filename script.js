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
		$btnCrearAmorfo =$('.amorfo'),
		svg_ = document.getElementsByTagName('svg')[0]
		;

    /*
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
    */
		
    cuadrado = paper.rect(10, 15, 64, 64, 4).attr({fill: 'pink'}),
    rectangulo = paper.rect(30, 35, 100, 64).attr({fill: 'pink'}),
    circulo = paper.circle(150, 48, 32).attr({fill: 'lightblue'});
    
   /*
   */
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
    	.draggable(); 
	    watchElements();
		}

		function eliminarElemento (){
			console.log("removiendo...")
			paper.clear()
		}

		$btnCrearAmorfo.click(function(event){
			var set2 = paper.set()
			var amorfo = paper.path("M10,80L60,110L60,60L480,160Z")
			.attr({
				fill:"#fff",
				stroke:"white",
				'stroke-width':0
			})
			var ccx = 0, ccy = 0;
			if(this._&&this._['bbox']&&this._['bbox']['cx']&&this._['bbox']['cy']){
				ccx = this._['bbox']['cx'];ccy = this._['bbox']['cy'];
			}else{
				console.log("...");
			}
			paper.circle(ccx,ccy,3)
			.attr({
				fill:"yellow",
				stroke:"transparent"
			})
			var onend = function(e,y){
				console.log("end")
				console.log(e)
				//this.transform("t"+(e.x)+","+(e.y))
						var ccx = 0, ccy = 0;
						if(this._&&this._['bbox']&&this._['bbox']['cx']&&this._['bbox']['cy'])
							ccx = this._['bbox']['cx'];ccy = this._['bbox']['cy'];
						paper.circle(ccx,ccy,3)
						.attr({
							fill:"white",
							stroke:"transparent"
						})
			}
			var onstart = function(x,y){
				console.log("start")
				//console.log(x+" : "+y)
				this.attr({
					fill:"blue"
				})
				/*
						var ccx = 0, ccy = 0;
						if(this._&&this._['bbox']&&this._['bbox']['cx']&&this._['bbox']['cy'])
							ccx = this._['bbox']['cx'];ccy = this._['bbox']['cy'];
						paper.circle(ccx,ccy,3)
						.attr({
							fill:"white",
							stroke:"transparent"
						})
				*/
				//this.transform("t"+x+","+y)
			}
			var onmove = function(dx, dy, mx, my, ev){
				console.log("onmove")
				console.log(this)
				//console.log(ev)
				//console.log(dx+","+ dy+","+ mx+","+ my)
				    var b = this.getABox(); // Raphael's getBBox() on steroids
				   	console.log(b);
            var px = mx - b.offset.left,
                py = my - b.offset.top,
                x = this.ox + dx,
                y = this.oy + dy,
                r = this.is('circle') ? b.width / 2 : 0;
            
            // nice touch that helps you keep draggable elements within the canvas area
            /*
            var x = Math.min(
                        Math.max(0 + this.margin + (this.is('circle') ? r : 0), x),
                        this.paper.width - (this.is('circle') ? r : b.width) - this.margin),
                y = Math.min(
                        Math.max(0 + this.margin + (this.is('circle') ? r : 0), y),
                        this.paper.height - (this.is('circle') ? r : b.height) - this.margin);
            */
             //console.log(px+" : "+py)
            // work-smart, applies to circles and non-circles        
            var pos = { x: x, y: y, cx: x, cy: y };
            //console.log(pos)
						//this.transform("t"+mx+","+my)
						var ccx = 0, ccy = 0;
						if(this._&&this._['bbox']&&this._['bbox']['cx']&&this._['bbox']['cy'])
							ccx = this._['bbox']['cx'];ccy = this._['bbox']['cy'];
						/*
						paper.circle(ccx,ccy,3)
						.attr({
							fill:"white",
							stroke:"transparent"
						})
						*/
						/*
						var ccx2 = 0, ccy2 = 0;
						if(this._&&this._['bbox']&&this._['bbox']['x']&&this._['bbox']['y'])
							ccx2 = this._['bbox']['x'];ccy2 = this._['bbox']['y'];
						//console.log(ccx2)
						paper.circle(ccx2,ccy2,3)
						.attr({
							fill:"green",
							stroke:"transparent"
						})
						var ddx = 0, ddy = 0;
						if(this._&&this._['dx']&&this._['dy'])
							ddx = this._['bbox']['x2'];ddy = this._['bbox']['y2'];
						//console.log(ddx)
						paper.circle(ddx,ddy,3)
						.attr({
							fill:"blue",
							stroke:"transparent"
						})
						*/
						var ddx_ = 0, ddy_ = 0;
						if(this._&&this._['dx']&&this._['dy'])
							ddx_ = this._['dx'];ddy_ = this._['dy'];
						//console.log(ddx_)
						/*
						paper.circle(ddx_,ddy_,3)
						.attr({
							fill:"red",
							stroke:"transparent"
						})
						*/

						var a = (ccx - ddx_), b = (ccy - ddy_);
						var m = (ccx - a), n = (ccy - b);
						/*
						paper.circle(m,n,3)
						.attr({
							fill:"yellow",
							stroke:"transparent"
						})
						*/

						console.log(m+" : "+n)
						this.transform("t"+(mx - a)+","+(my - b))

			}
			set2.push(amorfo).drag(onmove,onstart,onend)
			//console.log(amorfo)
	    watchElements();
		})
		
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