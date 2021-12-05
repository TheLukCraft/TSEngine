namespace TSE {
    //reprezentuje WebGL shader
    export class Shader {
        private _name: string;
        private _program: WebGLProgram;
        //tworzy nowy shader
        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this.createProgram(vertexShader, fragmentShader)
        }
        //nazwa shadera
        public get name(): string {
            return this._name;
        }
        //użyj tego shadera
        public use(): void {
            gl.useProgram(this._program);
        }
        private loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Problem z kompilacją shadera:" + this._name + ": " + error);
            }
            return shader;
        }
        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram();

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);

            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Problem z linkowaniem shadera:" + this._name + ": " + error);
            }
        }
    }
}