import DataLevelChart from "../data/level_chart.json";

interface Level {
    lvl: number;
    exp_next: number;
    total_base: number;
}

class LevelChart {
    private chart: Level[] = [];

    constructor() {
        this.chart = DataLevelChart;
    }

    get MIN() {
        return this.chart.at(0)?.lvl || 1;
    }

    get MAX() {
        return this.chart.at(-1)?.lvl || 99;
    }

    get(lvl: number): Level {
        if (lvl < this.MIN || lvl > this.MAX)
            throw new Error('Level fora do intervalo');
        return this.chart.at(lvl - 1) || null;
    }

    getExpBetween(lvl1: number, lvl2: number) {
        const [lower, greater] = [lvl1, lvl2].sort(Math.min).map(l => this.get(l))
        return greater.total_base - lower.total_base;
    }


}

export default new LevelChart();