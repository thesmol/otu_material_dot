const t0 = 0;
const t1 = 15;
const x0 = -5;
const x1 = -5;
const x2 = 5;
const v0 = 5;
//const n_u = 10;
const eps = 0.2;
const length = 499;
const h = (t1 - t0) / length;

const generateArray = (t0, t1, h) => {
    const result = [];
    for (let t = t0; t < t1 + h; t += h) {
        result.push(t);
    }
    return result;
}

const T = generateArray(t0, t1, h);

const getU = (x, v, eps) => {
    if (Math.abs(x) < eps && Math.abs(v) < eps) {
        return 0;
    } else {
        if (v > (x < 0 ? Math.sqrt(-2 * x) : -Math.sqrt(2 * x))) {
            return -1;
        } else {
            return 1;
        }
    }
}

const feedbackСontrol = (T) => {
    let x = Array(T.length);
    let v = Array(T.length);
    let u = Array(T.length);
    let xExt = Array(T.length);
    let LL = Array(T.length);

    u[0] = 0;
    v[0] = v0 + h * u[0];
    x[0] = x0 + h * v[0];

    for (let i = 1; i < T.length; i++) {
        u[i] = getU(x[i-1], v[i-1], eps);
        v[i] = v[i-1] + h * u[i];
        x[i] = x[i-1] + h * v[i];
    }

    // const sigma = x.map((xi, i) => {
    //     return xi + 0.5 * v[i] * Math.abs(v[i]);
    // });
    // const sign = sigma.map((number) => Math.sign(number) < 0 ? -1 : 1);

    const x1Ext = Math.min(...[x1, Math.min(...x)]);
    const x2Ext = Math.max(...[x2, Math.max(...x)]);
    const hExt = (x2Ext - x1Ext)/length;

    xExt[0] = x1Ext;
    LL[0] = xExt[0] < 0 ? Math.sqrt(-2 * xExt[0]) : -Math.sqrt(2 * xExt[0]);

    for (let i = 1; i < T.length; i++) {
        xExt[i] = xExt[i-1] + hExt;
        LL[i] = xExt[i] < 0 ? Math.sqrt(-2 * xExt[i]) : -Math.sqrt(2 * xExt[i]);
    }

    return {
        T: T,
        x: x,
        v: v,
        u: u,
        xExt: xExt,
        LL: LL,
        names: [
            'Управление материальной точкой методом обратной связи',
            'V(x)',
            "LL'(x)",
            "V(t)",
            "U(t)",
            "X(t)",
        ]
    }
}


const programControl = () => {

}

export const chartData = feedbackСontrol(T);