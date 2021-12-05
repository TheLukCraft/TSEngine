namespace TSE {
    export var gl: WebGLRenderingContext;

    //klasa odpowiadająca za ustawienie renderu WebGL
    export class GLUtilities {
        public static initialize(elementId?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement;

            if (elementId !== undefined) {
                canvas = document.getElementById(elementId) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error("Nie można znaleźć elementu canvas:" + elementId)
                }
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }
            gl = canvas.getContext("webgl");
            if (gl === undefined) {
                throw new Error("Nie można zainicjolować WebGL");
            }

            return canvas;
        }
    }
}