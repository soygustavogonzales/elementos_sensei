		var paper = Raphael('caja', 1200, 560),
  set = paper.set(),
	 $btnCrearRect = $('.rectangle'),
		$rotate = $('.rotate'),
		$translatex = $('.translatex'),
		$translatey = $('.translatey'),
		$ancho = $('.ancho'),
		$alto = $('.alto'),
		$eliminar = $('.eliminar'),
		$btnMoverPizarra = $('#change'),
		$pizarra = $('.pizarra'),
		$btnCrearCircle = $('.circule'),
		$btnCrearRaya = $('.raya'),
		$btnCrearTexto = $('.texto'),
		$btnCambiarTexto = $('.ctexto'),
		$parrafo = $('.parrafo'),
		elActual = null,
		svg_ = document.getElementsByTagName('svg')[0];
		
		var mover = !true;
		var ele;
		svg_.onmousedown = function(e){
			//sconsole.log(e.x + " , "+e.y)
			ele = paper.getElementByPoint(e.x,e.y);
			elActual = ele
			mover = !mover
			console.log(ele)
		}

		svg_.onmouseup = function(e){
			mover = !mover
		}

		svg_.onmousemove = function(e){
			//console.log(e.x + " , "+e.y)
			if(ele&&mover){
				var deegre = ele._['deg'];
				ele.transform("t"+(e.x)+","+(e.y)+"r"+deegre)
			}
		}


	$pizarra.ubicacion = "atras"

	$btnMoverPizarra.click(function(event) {
		console.log($pizarra)
		if($pizarra.ubicacion == "atras"){
			$pizarra.css({
				'z-index':'2'
			})
			$pizarra.ubicacion = "adelante"
		}
		else{
				$pizarra.css({
				'z-index':'1'
			})
			$pizarra.ubicacion = "atras"
		}
	});

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
    mouseup(function(e){
    		console.log(this)
    		console.log(this._)
    	if(this._['bboxwt']&&this._['bboxwt'].toString){
    		console.log(this._['bboxwt'])
    	}
    	else
    		console.log(this._['bboxwt'])

    	//console.log(this._.bboxwt.x +" , "+this._.bboxwt.x)
    	//elActual = this;
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

		function crearRaya (opt) {
			var default_ = {
				points:["0,0","50,50"],
				ancho:3
			}
				opt = $.extend(default_,opt)
				var path = "", l = opt.points.length-1;
				$.each(opt.points, function(index, val) {
					if(index!=l)
					 path+="M"+val//path.concat("M"+val)
					else
						path+="L"+val
				});

				var newLine = paper.path(path).
				attr({
					"stroke-width":opt.ancho
					,title:"linea"
				}).
				hover(function(){
					this.attr({
						cursor:"pointer"
					})
				})
				//.transform("s5")
		}

		function crearTexto (opt) {
			var default_ = {
				texto : "{ }"
			}
			opt = $.extend(default_,opt)
			var newText = paper.text(20,20,opt.texto)
			.attr({
				'font-size':20,
			})
			.hover(function(){
				this.attr({
					cursor:"pointer"
				})
			})
		}
		function crearCirculo(opt) {
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					r: 5,//anchura
					color:"rgba(0,0,0,0)"//color de fondo
				}
				opt = $.extend(default_,opt)
				var newCirculo = paper.circle(opt.x,opt.y,opt.r).
				attr({
					fill:opt.color
				})
				.hover(function(){
					this.attr({
						cursor:"pointer"
					})
				})
		}

		function eliminarElemento (){
			console.log("removiendo...")
			elActual.remove()
		}
		$btnCambiarTexto.click(function(event) {
			elActual.attr({
				text:$parrafo.val()
			})
		});
		$btnCrearTexto.click(function(event) {
			var texto = $parrafo.val();
			crearTexto({
				texto:texto
			})
		});

		$btnCrearRaya.click(function(event) {
			crearRaya({
				points:["0,0","20,150"]
			})
		});
		$btnCrearCircle.click(function(event) {
			crearCirculo({
				x:0,
				y:0,
				r:100
			})
		});
		$btnCrearRect.click(function(event) {
			var ancho = parseInt($('.ancho').val()),
			alto = parseInt($('.alto').val()),
			color = $('.color').val();
			var opt = {
				container:paper,
				width:ancho,
				height:alto,
				color:"rgba(0,0,0,0)"
			}

			crearRectangulo(opt)
		});


		$eliminar.click(function(event) {
			eliminarElemento()
		});

		$rotate.change(function(event) {
   var datos = elActual.getBBox(false);
   console.log(datos.x +" : "+datos.y+ ", deg:"+elActual._['deg'])
			var deegre = $rotate.val();
			var x = $translatex.val(),
			y = $translatey.val();
			elActual.transform("t"+x+","+y+"r"+deegre)
		});

		$translatex.change(function(event) {
   var datos = elActual.getBBox(false);
   console.log(datos.x +" : "+datos.y+ ", deg:"+elActual._['deg'])
			var deegre = $rotate.val();
			var x = $translatex.val(),
			y = $translatey.val();
			elActual.transform("t"+x+","+y+"r"+deegre)
		});

		$translatey.change(function(event) {
   var datos = elActual.getBBox(false);
   console.log(datos.x +" : "+datos.y+ ", deg:"+elActual._['deg'])
			var deegre = $rotate.val();
			var x = $translatex.val(),
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