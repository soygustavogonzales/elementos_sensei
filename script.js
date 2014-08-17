		var paper = Raphael('caja', 1200, 560),
  set = paper.set(),
	 $btnCrearRect = $('.rectangle'),
		$rotate = $('.rotate'),
		$translatex = $('.translatex'),
		$translatey = $('.translatey'),
		$ancho = $('.ancho'),
		$alto = $('.alto'),
		$escala = $('.escala'),
		$eliminar = $('.eliminar'),
		$btnMoverPizarra = $('#change'),
		$pizarra = $('.pizarra'),
		$btnCrearCircle = $('.circule'),
		$btnCrearRaya = $('.raya'),
		$btnCrearTexto = $('.texto'),
		$btnCambiarTexto = $('.ctexto'),
		$parrafo = $('.parrafo'),
		elActual = null,
		actual = null,ant = null,
		svg_ = document.getElementsByTagName('svg')[0];

		Raphael.el.setCustomAttributes = function() {
			var tipoEle = this.node.tagName;
			switch(tipoEle){
				case'text':
					ctmAttrs = {
						'font-size':20
					}
				break;
				case'rect':
					ctmAttrs = {
						fill:"rgba(0,0,0,0)"				
					}
				break;
				case'circle':
				ctmAttrs = {
						fill:"rgba(0,0,0,0)"				
				}
				break;
				case'path':
				ctmAttrs = {
					"stroke-width":2
					,title:"linea"
				}
				break;
			}

			this.mouseup(function(e){
    		console.log(this)
    		console.log(this._)
    	if(this._['bboxwt']&&this._['bboxwt'].toString){
    		console.log(this._['bboxwt'])
    	}
    	else
    		console.log(this._['bboxwt'])

    	//console.log(this._.bboxwt.x +" , "+this._.bboxwt.x)
    	//actual = this;
    	//console.log(e)
    	var datos = actual.getBBox(false);
					//console.log(datos)
					console.log(datos.x+" , "+datos.y)

					$alto.val(this.height)
					$ancho.val(this.width)
					$translatex.val(datos.x)
					$translatey.val(datos.y)
					if(this._&&this._['deg']!=undefined&&this._['sx']!=undefined){
						$rotate.val(this._['deg'])
						$escala.val(this._['sx'])
					}


					console.log(
							$alto.val()+", "+
							$ancho.val()+", "+
							$translatex.val()+", "+
							$translatey.val()+", "+
							$rotate.val()+", "+
							$escala.val()
					)

					if(actual){
						ant = actual
						actual = this
						console.group("actual")
							console.log(actual)
							console.log(ant)
						console.groupEnd("actual")
						actual.attr({
							stroke:"red"
						})
						ant.attr({
							stroke:"black"
						})
					}else{
						actual = this
						console.group("actual else")
							console.log(actual)
						console.groupEnd("actual")
							actual.attr({
								stroke:"red"
							})
					}
    })

			this.hover(function(){
				this.attr({
					cursor:"pointer"
				})
			})
			this.attr(ctmAttrs)
		}
		
		var mover = !true;
		var ele;
		svg_.onmousedown = function(e){
			//sconsole.log(e.x + " , "+e.y)
			actual = paper.getElementByPoint(e.x,e.y);
			//actual = ele
			mover = !mover
			console.log(actual)
		}

		svg_.onmouseup = function(e){
			mover = !mover
		}

		svg_.onmousemove = function(e){
			//console.log(e.x + " , "+e.y)
			if(actual&&mover){
				var deegre = actual._['deg'],
				scale = actual._['sx'];
				actual.transform("t"+(e.x)+","+(e.y)+"r"+deegre+"s"+scale)
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
    var newCuadrado = paper.rect(opt.x, opt.y, opt.width, opt.height,opt.punta)
    .setCustomAttributes()
			 //set.push(newCuadrado)  
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

				var newLine = paper.path(path)
				.setCustomAttributes()
				//.transform("s5")
		}

		function crearTexto (opt) {
			var default_ = {
				texto : "{ }"
			}
			opt = $.extend(default_,opt)
			var newText = paper.text(20,20,opt.texto)
			.setCustomAttributes()
		}
		function crearCirculo(opt) {
				var default_ = {
					x : 0,//posicion en el eje x
					y : 0,//posicion en el eje y
					r: 5,//anchura
					color:"rgba(0,0,0,0)"//color de fondo
				}
				opt = $.extend(default_,opt)
				var newCirculo = paper.circle(opt.x,opt.y,opt.r)
				.setCustomAttributes()
		}

		function eliminarElemento (){
			console.log("removiendo...")
			actual.remove()
		}
		$btnCambiarTexto.click(function(event) {
			actual.attr({
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
				r:10
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

		function transformar() {
   var datos = actual.getBBox(false);
   console.log(datos.x +" : "+datos.y+ ", deg:"+actual._['deg'])
			var deegre = $rotate.val(),
			x = $translatex.val(),
			y = $translatey.val(),
			scale = 1+(parseInt($escala.val())/10)
			actual.transform("t"+x+","+y+"r"+deegre+"s"+scale)			
		}

		$rotate.change(function(event) {
			transformar()
		});

		$translatex.change(function(event) {
			transformar()
		});

		$translatey.change(function(event) {
			transformar()
		});

		$escala.change(function(event) {

		transformar()

		});

		$alto.change(function(event) {
			actual.attr({
				height:$alto.val()
			})
		});


		$ancho.change(function(event) {
			actual.attr({
				width:$ancho.val()
			})
		});
