		var paper = Raphael('caja', 1200, 560),
  //set = paper.set(),
  $caja = $('#caja'),
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
		$btnCrearForma = $('.cforma'),
		$btnCrearPtos = $('.cPtos'),
		svg_ = document.getElementsByTagName('svg')[0],
		$svg_ = $(svg_),
		elActual = null,
		mover = !true,
		actual = null,ant = null,
		ruta = 1;


		Raphael.el.setCustomAttributes = function() {
			var tipoEle = this.node.tagName;
			switch(tipoEle){
				case'text':
					ctmAttrs = {
						'font-size':20
					}
						var taTemporal = document.createElement("textarea");
						var $taTemp = $(taTemporal);
						$taTemp.attr("cols",5)
						$taTemp.attr("rows",2)
					this.dblclick(function(event) {
						console.log("doble click")
						var x = 0, y = 0;
						if(this.attrs&&this.attrs.text)
							$taTemp.val(this.attrs.text)
						if(this._&&this._['bbox']&&this._['bbox']['cx']!=null&&this._['bbox']['cy']!=null){
							x = this._['bbox']['cx'];y = this._['bbox']['cy'];
							console.log(x+" , "+y)
						}
						if(this._&&this._['dx']!=null&&this._['dy']!=null){
							x = this._['dx'];y = this._['dy'];
							console.log(x+" , "+y)
						}
						$taTemp.css({
							background:"transparent",
							outline:"none",
							padding:"0px 5px",
							"font-size":"20px",
							position:"absolute",
							top:((y)?((y)+"px"):"100px"),
							left:((x)?((x)+"px"):"100px"),
							border:"1px dotted #333"
						})
						this.hide()
						$caja.append($taTemp)
						var self = this;
						$taTemp.mouseout(function(event) {
							//this = $taTemp
							self.attr({
								text:$taTemp.val()
							})
							this.remove()
							self.show()
						});
							var parar = false
						$taTemp.keyup(function(event) {
							var codCaracter = (event.keyCode)
							var anchoTa = 0, altoTa = 0
								console.log(codCaracter)
							if(parar==false&&!(codCaracter==13||codCaracter==8||codCaracter==37||codCaracter==38||codCaracter==39||codCaracter==40)){
								console.log("!13")
								anchoTa = parseInt($taTemp.attr("cols")) + 1
								console.log("anchoTa "+anchoTa)
								$taTemp.attr("cols",anchoTa)
								$taTemp.attr("rows",$taTemp.attr("rows"))
								if(anchoTa>80)
									parar = true
							}

							/*
							else{
								console.log("=13")
								altoTa = parseInt($taTemp.attr("rows")) + 1
								$taTemp.attr("cols",$taTemp.attr("cols"))
								$taTemp.attr("rows",altoTa)
							}
							*/
						});
					});

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
			/*
			this.mousedown(function(event) {
				actual = this
				mover = !mover
				console.log(this)
			});
			*/
			this.mouseup(function(e){
				//mover = !mover
    		//console.log(this)
    		//console.log(this._)
    	if(this._['bboxwt']&&this._['bboxwt'].toString){
    		//console.log(this._['bboxwt'])
    	}
    	else
    		//console.log(this._['bboxwt'])

    	//console.log(this._.bboxwt.x +" , "+this._.bboxwt.x)
    	//actual = this;
    	//console.log(e)
    	var x = 0, y = 0;
    	if(actual._&&actual._['bbox']){
    		x = actual._['bbox']['cx'], y = actual._['bbox']['cy'];
    		//console.log(x + " * "+ y)
    	}
    	var datos = actual.getBBox(false);
					//console.log(datos)
					//console.log(datos.x+" , "+datos.y)

					$alto.val(this.height)
					$ancho.val(this.width)
					$translatex.val(((x)?x:datos.x))
					$translatey.val(((y)?y:datos.y))
					if(this._&&this._['deg']!=undefined&&this._['sx']!=undefined){
						$rotate.val(this._['deg'])
						$escala.val(this._['sx'])
					}

					/*
					console.log(
							$alto.val()+", "+
							$ancho.val()+", "+
							$translatex.val()+", "+
							$translatey.val()+", "+
							$rotate.val()+", "+
							$escala.val()
					)
					*/

					if(actual){
						ant = actual
						actual = this
						/*
						console.group("actual")
							console.log(actual)
							console.log(ant)
						console.groupEnd("actual")
						*/
						actual.attr({
							stroke:"red"
						})
						ant.attr({
							stroke:"black"
						})
					}else{
						actual = this
						/*
						console.group("actual else")
						console.log(actual)
						console.groupEnd("actual")
						*/
							actual.attr({
								stroke:"red"
							})
					}
    })

			this.hover(function(){
				this.attr({
					cursor:"move"
				})
			})

			this.attr(ctmAttrs)
			return this
		}
		/*
		*/
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
				var Xdes = 0,Ydes = 0;
					if(actual.data("objectName")&&(actual.data("objectName")=="objAmorfo"||actual.data("objectName")=="objPunto")){
						//console.log(actual)
						Xdes = actual.realPath[0][1],Ydes = actual.realPath[0][2];
						//console.log(Xdes + " , "+Ydes)
					}
				actual.transform("t"+(e.x - Xdes)+","+(e.y - Ydes)+"r"+deegre+"s"+scale)
			}
		}


	$pizarra.ubicacion = "atras"

	$btnMoverPizarra.click(function(event) {
		//console.log($pizarra)
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
			function crearCajaTexto (opt) {
				
			}
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
				ancho:3,
				objectName:null
			}
				opt = $.extend(default_,opt)
				var path = "", l = opt.points.length-1;
				$.each(opt.points, function(index, val) {
					//console.log(val)
					if(index==0)
					 path+="M"+val//path.concat("M"+val)
					else if(index>0)
						path+="L"+val
				});
				//path+="Z"
				//console.log(path)
				var newLine = paper.path(path)
				.attr({
					fill:"rgba(0,0,0,.6)"
				})
				.data('objectName',opt.objectName)
				.setCustomAttributes()
				//.transform("s5")
		}

		function crearForma() {
			crearPtos(function(opt){
				crearRaya({
					points:opt.arrayPtos,
					objectName:"objAmorfo"
				})
				opt.setPtos.remove()
			})
		}

		function crearPtos(callback) {
			var callback = callback || function(){}
			var set = paper.set();

			$svg_.css({
				cursor:"crosshair"
			})
			var arrayPtos = [],iniciar = true;
				$svg_.click(function(event) {
					if(iniciar){
						//	console.log(event.originalEvent)
							var x = event.originalEvent.x, y = event.originalEvent.y,
							ptoAnt = paper.getElementByPoint(x,y),
							ptoNuevo = x+","+y;
							if(ptoAnt&&ptoAnt.data('ruta')&&(ptoAnt.data('ruta')==ruta)){//se cogio un pto repetido

								iniciar = false
								startDefaultStatus()
								var ultimoEleEnSet = set[(set.length)-1],
								primerEleEnSet = set[0];
								arrayPtos.push(ptoNuevo)
								if(ultimoEleEnSet.id==ptoAnt.id)
									arrayPtos.splice(arrayPtos.length - 1,1)
								callback({
									arrayPtos:arrayPtos,
									setPtos:set
								})

								ruta++;
							}else{
								arrayPtos.push(ptoNuevo)
								var newPto = paper.circle(x,y,5)
								.setCustomAttributes()
								.attr({
									stroke:"transparent",
									fill:"rgba(0,220,6,.7)"
								})
								.data('objectName','objPunto')
								.mouseover(function(){
									this.transform("s1.7")
									this.attr({
										stroke:"rgba(0,0,0,0)"
									})
								})
								.mouseout(function(){
									this.transform("s1")
								})
								.data('ruta',ruta)
								set.push(newPto)
							}
					}
				});
		}
		function startDefaultStatus() {
				$svg_.css({
					cursor:"default"
				})
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
			//console.log("removiendo...")
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

		$btnCrearForma.click(function(event) {
			crearForma()
		});
		$eliminar.click(function(event) {
			eliminarElemento()
		});
		$btnCrearPtos.click(function(event) {
			crearPtos()
		});
		function transformar() {
   var datos = actual.getBBox(false);
   //console.log(datos.x +" : "+datos.y+ ", deg:"+actual._['deg'])
   var Xdes = 0, Ydes = 0;
			var deegre = $rotate.val(),
			x = parseInt($translatex.val()),
			y = parseInt($translatey.val()),
			scale = 1+(parseInt($escala.val())/10);
   if(actual.data('objectName')&&(actual.data('objectName')=="objAmorfo")){
	   Xdes = actual._['bbox']['cx']
	   Ydes = actual._['bbox']['cy']
	   //console.log("coords: "+Xdes+" , "+Ydes)
				//actual.transform("t"+(Xdes)+","+(Ydes)+"r"+deegre+"s"+scale)			
				actual.transform("t"+x+","+y+"r"+deegre+"s"+scale)			
   }else{
				actual.transform("t"+(x - Xdes)+","+(y - Ydes)+"r"+deegre+"s"+scale)			
   }
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
