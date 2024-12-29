function generate(n) {
    let kol = [];
    let anc = new Array(n*n);
    let mass = new Array(n*n).fill(1);

    function find_ancestor(node, anc) {
        if(anc[node] !== node)
            anc[node] = find_ancestor(anc[node], anc);
        return anc[node];
    }

    function kruskal() {
        kol.sort((a, b) => a[0] - b[0]);

        let mst = Array.from({ length: 2*n-1 }, () => Array(2*n-1).fill(1));

        while (kol.length) {
            let [_, u, v, k] = kol.pop();

            let first_anc = find_ancestor(u, anc);
            let second_anc = find_ancestor(v, anc);

            if (first_anc !== second_anc) {
                if (mass[first_anc] < mass[second_anc]) {
                    anc[first_anc] = second_anc;
                    mass[second_anc] += mass[first_anc];
                } else {
                    anc[second_anc] = first_anc;
                    mass[first_anc] += mass[second_anc];
                }
                let u1 = Math.floor(u / n);
                k == 0 ? mst[2*u1-1][(u%n)*2] = 0 : mst[2*u1][(u%n)*2+1] = 0;
            }
            for(let i=0;i<2*n;i+=2)
                for(let j=0;j<2*n;j+=2)
                    mst[i][j] = 0;
        }

        return mst;
    }

    for(let i = 0; i < n; ++i) {

        for (let j = 0; j < n; ++j) {
            anc[i*n+j] = i*n+j;
            if(i>0)
            {
                //kierunek 
                // 0 - gora
                // 1 - prawo
                let weight = Math.floor(Math.random() * (n - Math.sqrt(n))) + n;
                kol.push([weight, i*n+j,(i-1)*n+j,0]);
            }
            if(j < n-1)
            {
                let weight = Math.floor(Math.random() * (n - Math.sqrt(n))) + n;
                kol.push([weight, i*n+j, i*n+j+1,1]);
            }
        }
    }
    return kruskal();
}