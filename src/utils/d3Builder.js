import * as con from "../Constants"
import { wrap } from "./d3Functions";


class d3Builder {
    constructor(canvasRef, layers, mode) {
        this.canvasRef = canvasRef;
        this.layers = layers;
        this.mode = mode;
    }

    buildComposition() {
        for(let l of this.layers) {
            let actions = Object.keys(l)

            for(let a of actions) {
                // function name and parameters
                let parameters = l[a]
                if(parameters) {
                    this.functionFromString(a, parameters)
                }
            }
        }
    }

    functionFromString = (functionName, params) => {
        switch (functionName) {
         case con.BACKGROUND_LAYER: this.addBackground(params); break;
         case con.VERSOS_LAYER: this.addVersos(params); break;
         case con.FRAGMENTOS_BOTANICOS_LAYER: this.addFragmentoBotanico(params); break;
         case con.FIGURAS_MATEMATICAS_LAYER: this.addFiguraMatematica(params); break;
         case con.FIGURAS_BOTANICAS_LAYER: this.addFiguraBotanica(params); break;
         case con.FIGURAS_CODIGOS_LAYER: this.addFiguraCodigo(params); break;
         case con.FIGURAS_VERSOS_LAYER: this.addFiguraVerso(params); break;
         case con.FIGURAS_TEXTURAS_LAYER: this.addTextura(params); break;
         case con.FIGURAS_MALU_LAYER: this.addFiguraMalu(params); break;
         default: break;
        }
     }
     

    addBackground = (args) => {
        // Extract color
        let color = args['color']
        this.canvasRef.attr("style", "background-color:" + color)
    }

    reflect = (x, y, coin) => {
        let newX;
        let newY;

        let width = con.CAOS_VIEWBOX_WIDTH / 2;
        let height = con.CAOS_VIEWBOX_HEIGHT / 2;
        if(coin === 0 ){
            // X
            if(x < width) {
                newX = width + x;
            } else {
                newX = x - width;
            }
        } else {
            newX = x
        }
        // Y

        if(y < height) {
            newY = height + y;
        } else {
            newY = y - height;
        }
        return [newX, newY]
    }

    addVersos = (args) => {
        let color1 = args['color1'];
        let color2 = args['color2'];
        let verso1 = args['text1'];
        let verso2 = args['text2'];
        let sources = args['source'];
        let width = args['width'];
        let x = args['x'];
        let y = args['y'];
        let fontSize = 1.3;
        let coin = args['coin']
        
        let numWords = verso1.split(/\s+/).length;
        let scaleFactor =1;
        
        // implementacion mayusculas
        if(coin) {
            verso1 = verso1.toUpperCase();
            scaleFactor = 0.89

        }
                    
        let fontFamily = args['font-family'];
        let fontWeight = args['font-weight'];

        if(this.mode === con.POSTER) {
            // Extract color
            
            if(numWords > 50) {
                fontSize = 0.58
            } else if(numWords > 40) {
                fontSize = 0.6
            } else if(numWords > 35) {
                fontSize = 0.7
            } else if(numWords > 30) {
                fontSize = 0.8
            } else if(numWords > 25) {
                fontSize = 0.9
            } else if(numWords > 20) {
                fontSize = 1
            } else if(numWords > 15) {
                fontSize = 1.1
            } else if(numWords > 10) {
                fontSize = 1.18
            } else if(numWords > 5) {
                fontSize = 1.3
            }
        
            this.canvasRef.append("text")
                .attr("x", x)
                .attr("y", y)
                .attr("fill", color1)
                .attr("font-size", 10 * scaleFactor * fontSize + 'px')
                .attr("font-family", fontFamily)
                .attr("font-weight", fontWeight)
                .text(verso1)
                .call(wrap, 100-y)

        } else if(this.mode === con.CAOS) {

            let reflectPos = this.reflect(x, y, coin)

            this.canvasRef.append("text")
                .attr("x", x)
                .attr("y", y)
                .attr("fill", color1)
                .attr("font-size", fontSize + 'px')
                .attr("font-family", fontFamily)
                .attr("font-weight", fontWeight)
                .text(verso1)
                .call(wrap, width)

            this.canvasRef.append("text")
                .attr("x", reflectPos[0])
                .attr("y", reflectPos[1])
                .attr("fill", color2)
                .attr("font-size", 5 + 'px')
                .attr("font-family", fontFamily)
                .attr("font-weight", fontWeight)
                .text(verso2)
                .call(wrap, width)
        }
        this.addBiliography(color1, sources)
    }

    addFragmentoBotanico = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/fb/${imgPath}.jpg`)
        let x = args["x"]
        let y = args["y"]
        let width = args["width"]

        if(this.mode === con.POSTER) {
            this.canvasRef.append("svg:image")
                .attr("xlink:href", img)
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
                .attr("xlink:href", img)
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
        }
    }



    addFiguraMatematica = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/fm/${imgPath}.png`)
        let x = args["x"]
        let y = args["y"]
        let rotationAngle = args['rotation']

        if(this.mode === con.POSTER) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", con.POSTER_VIEWBOX_WIDTH)
            .attr("height", con.POSTER_VIEWBOX_HEIGHT)
            .attr("transform", function(d) {
                let center = this.getBBox();
                return ("rotate(" + rotationAngle + ", " + 
                (center.x + center.width / 2) + ", " + (center.y + center.height / 2) + ")")
            })            
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", con.CAOS_VIEWBOX_WIDTH)
            .attr("height", con.CAOS_VIEWBOX_HEIGHT)
            .attr("transform", function(d) {
                let center = this.getBBox();
                return ("rotate(" + rotationAngle + ", " + 
                (center.x + center.width / 2) + ", " + (center.y + center.height / 2) + ")")
            })            
        }
    }

    addBiliography = (color, sources) => {

        let fontFamily = 'OpenSans'
        let fontWeight = 'regular'
        let textSource = sources
        let text = this.mode === con.POSTER ? con.BIBLIOGRAPHY_POSTER : con.BIBLIOGRAPHY_CAOS; 
        let width = this.mode === con.POSTER ? con.POSTER_VIEWBOX_WIDTH : con.CAOS_VIEWBOX_WIDTH;
        let height = this.mode === con.POSTER ? con.POSTER_VIEWBOX_HEIGHT : con.CAOS_VIEWBOX_HEIGHT;
        

        this.canvasRef.append("text")
            .attr("x", width - 70)
            .attr("y", 4)
            .attr("fill", color)
            .attr("font-size", 0.2 + "vw")
            .attr("font-family", fontFamily)
            .attr("font-weight", fontWeight)
            .text(text);
            
        
        textSource.forEach((t, i) => {
            this.canvasRef.append("text")
                .attr("x", 3)
                .attr("y", height - (4* (i + 1)))
                .attr("fill", color)
                .attr("font-size", 0.2 + "vw")
                .attr("font-family", fontFamily)
                .attr("font-weight", fontWeight)
                .text(t)
            }

        )
    }

    addFiguraBotanica = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/cb/${imgPath}.png`)
        let x = args["x"]
        let y = args["y"]
        let width = args['width']
        if(this.mode === con.POSTER) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width) 
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)         
        }

    }

    addFiguraCodigo = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/fc/${imgPath}.png`)
        let x = args["x"]
        let y = args["y"]
        let width = args['width']
        if(this.mode === con.POSTER) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)    
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)         
        }

    }

    addFiguraVerso = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/fv/${imgPath}.png`)
        let x = args["x"]
        let y = args["y"]
        let width = args['width']
        if(this.mode === con.POSTER) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)    
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)         
        }

    }

    addTextura = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/ft/${imgPath}.jpg`)
        let coin = args['coin']
        if(coin) {
            if(this.mode === con.POSTER) {
                this.canvasRef.append("svg:image")
                .attr("xlink:href", img)
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", con.CAOS_VIEWBOX_WIDTH)  
                .style("opacity", 0.2)    
            } else if(this.mode === con.CAOS) {
                this.canvasRef.append("svg:image")
                .attr("xlink:href", img)
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", con.CAOS_VIEWBOX_WIDTH)  
                .style("opacity", 0.2)       
            }
        }


    }

    addFiguraMalu = (args) => {
        let imgPath = args['img'];
        let img = require(`./../resources/fmalu/${imgPath}.jpg`)
        let x = args["x"]
        let y = args["y"]
        let width = args['width']
        if(this.mode === con.POSTER) {
           // To Implement
        } else if(this.mode === con.CAOS) {
            this.canvasRef.append("svg:image")
            .attr("xlink:href", img)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)      
        }

    }

    cleanCanvas = () => {
        this.canvasRef.selectAll("*").remove()
    }
}

export default d3Builder