# topic
使用zip來交付程式，只需要package-lock.json，不需要連同node_modules一同壓縮。
## 需求
### 實作API /battle
依使用端提供的資訊，計算並回傳勝負結果，所有battle方式都要實作。
#### Input

| key     | type       | description                              |
|---------|------------|------------------------------------------|
| playerA | Properties | 玩家A資訊                                    |
| playerB | Properties | 玩家B資訊                                    |
| battle  | number     | battle方式，每種方式會對玩家數值作不同的加權，見表格"Battle方式"  |

* Properties

| key |type| description |
|-----|---|-------------|
| -   | array |含三個數值的數列|

* Battle方式

|  battle  | properties[0]加權值 | properties[1]加權值 | properties[2]加權值 | description                              |
|:--------:|:----------------:|:----------------:|:----------------:|------------------------------------------|
|    0     |        1         |        2         |        1         | 參考output的success實例，將input的實例中的數值作計算而得的結果 |
|    1     |        1         |        1         |        5         ||
|    2     |        3         |        1         |        2         ||

* 實例

    ```json
    {
        "battle": 0,
        "playerA": {
            "properties": [
              30,
              23,
              45
            ]
        },
        "playerB": {
            "properties": [
              47,
              15,
              33
            ]
        }
    }
    ```

#### output

| key     | type   | description             |
|---------|--------|-------------------------|
| winner  | number | 0為playerA獲勝，1為playerB獲勝 |
| playerA | Result | 玩家A計算結果                 |
| playerB | Result | 玩家B計算結果                 |
| error   | string |參賽者數值為負，回傳error: Invalid value|
* Result

| key     | type   | description                                                                                |
|---------|--------|--------------------------------------------------------------------------------------------|
|weightedValue| number | 參賽者各數值乘上加權後相加的結果                                                                           |
|rate| number | 攻擊加成，weightedValue乘上此數值後，再決定勝負結果，如實例中playerA攻擊加成後為133.1，playerB攻擊加成後為165最終為playerB獲勝。 |

* 實例

    Success
    ```json
    {
      "winner": 1,
      "playerA": {
        "weightedValue": 121,
        "rate": 0.1
      },
      "playerB": {
        "weightedValue": 110,
        "rate": 0.5
      }
    }
    ```

    Error
    ```json
    {
      "error": "Invalid value"
    }
    ```

## 加分
* 實作時考慮battle type的擴增
* 單元測試