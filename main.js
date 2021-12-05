var engine;
//plik startujący grę
window.onload = function () {
    var engine = new TSE.Engine();
    engine.start();
};
//window.onresize = function () {
//    engine.resize();
//}
var TSE;
(function (TSE) {
    //główna klasa gry
    var Engine = /** @class */ (function () {
        //tworzy nowy silnik gry
        function Engine() {
            console.log("test");
        }
        //zaczyna grę "engine"
        Engine.prototype.start = function () {
            this._canvas = TSE.GLUtilities.initialize();
            //zerowanie kolorów czerwony,zielony,niebieski, alfa - zawsze chcemy alfę 1. Uzyskamy czarny kolor.
            TSE.gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            this.createBuffer();
            this.loop();
        };
        //skalowanie canvasa do okna
        Engine.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        };
        //Główna pętla 
        Engine.prototype.loop = function () {
            //czyszzczenie za każdym razem OBOWIĄZKOWE!
            TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, this._buffer);
            TSE.gl.vertexAttribPointer(0, 4, TSE.gl.FLOAT, false, 0, 0);
            TSE.gl.enableVertexAttribArray(0);
            TSE.gl.drawArrays(TSE.gl.TRIANGLES, 0, 3);
            requestAnimationFrame(this.loop.bind(this));
        };
        Engine.prototype.createBuffer = function () {
            this._buffer = TSE.gl.createBuffer();
            var vertices = [
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0
            ];
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, this._buffer);
            TSE.gl.vertexAttribPointer(0, 3, TSE.gl.FLOAT, false, 0, 0);
            TSE.gl.enableVertexAttribArray(0);
            TSE.gl.bufferData(TSE.gl.ARRAY_BUFFER, new Float32Array(vertices), TSE.gl.STATIC_DRAW);
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, undefined);
            TSE.gl.disableVertexAttribArray(0);
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\n        attribute vec3 a_position;\n        void main() {\n            gl_Position = vec4(a_position, 1.0);\n        }";
            var fragmentShaderSource = "\n        precision mediump float;\n\n        void main() {\n            gl_FragColor = vec4(1.0);\n        }";
            this._shader = new TSE.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    TSE.Engine = Engine;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    //klasa odpowiadająca za ustawienie renderu WebGL
    var GLUtilities = /** @class */ (function () {
        function GLUtilities() {
        }
        GLUtilities.initialize = function (elementId) {
            var canvas;
            if (elementId !== undefined) {
                canvas = document.getElementById(elementId);
                if (canvas === undefined) {
                    throw new Error("Nie można znaleźć elementu canvas:" + elementId);
                }
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
            }
            TSE.gl = canvas.getContext("webgl");
            if (TSE.gl === undefined) {
                throw new Error("Nie można zainicjolować WebGL");
            }
            return canvas;
        };
        return GLUtilities;
    }());
    TSE.GLUtilities = GLUtilities;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    //reprezentuje WebGL shader
    var Shader = /** @class */ (function () {
        //tworzy nowy shader
        function Shader(name, vertexSource, fragmentSource) {
            this._name = name;
            var vertexShader = this.loadShader(vertexSource, TSE.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, TSE.gl.FRAGMENT_SHADER);
            this.createProgram(vertexShader, fragmentShader);
        }
        Object.defineProperty(Shader.prototype, "name", {
            //nazwa shadera
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        //użyj tego shadera
        Shader.prototype.use = function () {
            TSE.gl.useProgram(this._program);
        };
        Shader.prototype.loadShader = function (source, shaderType) {
            var shader = TSE.gl.createShader(shaderType);
            TSE.gl.shaderSource(shader, source);
            TSE.gl.compileShader(shader);
            var error = TSE.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Problem z kompilacją shadera:" + this._name + ": " + error);
            }
            return shader;
        };
        Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
            this._program = TSE.gl.createProgram();
            TSE.gl.attachShader(this._program, vertexShader);
            TSE.gl.attachShader(this._program, fragmentShader);
            TSE.gl.linkProgram(this._program);
            var error = TSE.gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Problem z linkowaniem shadera:" + this._name + ": " + error);
            }
        };
        return Shader;
    }());
    TSE.Shader = Shader;
})(TSE || (TSE = {}));
//# sourceMappingURL=main.js.map