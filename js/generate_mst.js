function generate(n) {
    let kol = [];
    let anc = new Array(n);
    let mass = new Array(n).fill(1);

    function find_ancestor(node, anc) {
        if(anc[node] !== node)
            anc[node] = find_ancestor(anc[node], anc);
        return anc[node];
    }

    function kruskal() {
        kol.sort((a, b) => a[0] - b[0]);

        let mst = Array.from({ length: n }, () => Array(n).fill(0));

        while (kol.length) {
            let [_, u, v] = kol.pop();
            if (mst[u][v] === 1) continue;

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

                mst[u][v] = 1;
                mst[v][u] = 1; 
            }
        }

        return mst;
    }

    for(let i = 0; i < n; ++i) {
        anc[i] = i;

        for (let j = 0; j < n; ++j) {
            if (i === j) continue;
            let weight = Math.floor(Math.random() * (n - Math.sqrt(n))) + n;
            kol.push([weight, i, j]);
        }
    }
    return kruskal();
}

