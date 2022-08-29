import {useCallback, useState} from "react";
import LevelChart from "./helpers/LevelChart";

interface ResultCalc {
    quantity: number
}

interface FormDataCalc {
    [k: string]: number;

    cur_lvl?: number;
    target_lvl?: number;
    cur_exp?: number;
    item_exp?: number;
}

export default function App() {
    const [result, setResult] = useState({quantity: 0} as ResultCalc);

    const handleSubmit = useCallback((ev: SubmitEvent) => {
        ev.preventDefault();
        const formData = new FormData(ev.target as HTMLFormElement);
        let formDataEntries = Object.fromEntries(formData);
        const data: FormDataCalc = Object.fromEntries(
            Object.entries(formDataEntries)
                .map(([k, v]: [string, string]) => [k, parseInt(v)])
        );
        const {cur_lvl, target_lvl, cur_exp, item_exp} = data;
        const lvlDiff = LevelChart.getExpBetween(cur_lvl, target_lvl);
        const quantity = Math.ceil((lvlDiff - Math.min(cur_exp, lvlDiff)) / item_exp);
        setResult({quantity});
    }, [setResult]);

    return <main>
        <form onSubmit={handleSubmit}>
            <label>
                Level Atual
                <input type="number" name="cur_lvl" min={LevelChart.MIN} max={LevelChart.MAX - 1}
                       defaultValue={LevelChart.MIN}/>
            </label>
            <label>
                Level Destino
                <input type="number" name="target_lvl" min={LevelChart.MIN + 1} max={LevelChart.MAX}
                       defaultValue={LevelChart.MAX}/>
            </label>
            <label>
                Exp Atual
                <input type="number" name="cur_exp" min={0} defaultValue={0}/>
            </label>
            <label>
                Item Exp
                <input type="number" name="item_exp" min={1} defaultValue={1}/>
            </label>
            <button type="submit">Calcular</button>
        </form>
        <hr/>
        <div id="results">
            <h3>Quantidade: <small>{result.quantity}</small></h3>
        </div>
    </main>;
}