import fs from 'fs';
import express, { Request, Response, Express } from 'express';
import showdown from 'showdown';

// Default port
const port = 3000;

const app: Express = express();
app.use(express.json()); 

const converter = new showdown.Converter();
converter.setOption('tables', true);

app.get("/", (req: Request, res: Response) => {
    const text = fs.readFileSync('./README.md').toString();
    const html = converter.makeHtml(text);
    res.send(html);
});

// 以下是我對 battle 新增 type 的假設
const battleWeights: Record<number, number[]> = {
    0: [1, 2, 1], // 攻擊力較突出一點類型
    1: [1, 1, 5], // 恢復力很強的類型
    2: [3, 1, 2],  // 防禦力及恢復力都算突出的類型
    3: [1, 5, 1],   // 攻擊力很突出的類型
    4: [5, 5, 5],  // 三者皆是完美的類型
    5: [5, 1, 1]     // 只有防禦力很強的類型
};

function GetTotalWeighedValue(properties: number[], weights: number[]): number {
    return properties.reduce((acc, value, index) => acc + value * weights[index], 0);
}

function getRandomRate(): number {
    return parseFloat(Math.random().toFixed(1));
}

function GetFinalValue(weightedValue: number, rate: number) {
    return weightedValue * rate;
}

app.get('/battle', (req: Request, res: Response) => {
    const { battle, playerA, playerB } = req.body;

    if (!battleWeights.hasOwnProperty(battle)) {
        res.status(400).json({ error: '沒有明確的加權值類型!' });
        return; 
    }

    if (!Array.isArray(playerA.properties) || !Array.isArray(playerB.properties)) {
        res.status(400).json({ error: '玩家的類型是錯誤的!' });
        return; 
    }

    if (
        playerA.properties.some((value: number) => value < 0) ||
        playerB.properties.some((value: number) => value < 0)
    ) {
        res.status(400).json({ error: 'Invalid value' });
        return; 
    }

    if (playerA.properties.length !== 3 || playerB.properties.length !== 3) {
        res.status(400).json({ error: '項目長度不等於預期設定' });
        return; 
    }

    const userSendWeights = battleWeights[battle] || battleWeights[0];
    const weighedValueA = GetTotalWeighedValue(playerA.properties, userSendWeights);
    const weighedValueB = GetTotalWeighedValue(playerB.properties, userSendWeights);

    const rateA = getRandomRate();
    const rateB = getRandomRate();

    const FinalValueA = GetFinalValue(weighedValueA, rateA);
    const FinalValueB = GetFinalValue(weighedValueB, rateB);

    let winner: number;
    if (FinalValueA > FinalValueB) {
        winner = 0;
    } else if (FinalValueB > FinalValueA) {
        winner = 1;
    } else {
        winner = 2; // 平手時的條件
    }

    res.send({
        winner,
        playerA: { weightedValue: weighedValueA, rate: rateA },
        playerB: { weightedValue: weighedValueB, rate: rateB },
    });
});


export default app;


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}