import request from 'supertest';
import { Express} from 'express';
import app from '../src/app'

describe('測試 / 的內容', ()=>{
    test('測試 GET 是否含有 HTML 內容',async ()=>{
         const response=await request(app).get('/')
         expect(response.status).toBe(200);
         expect(response.text).toContain('topic')
    })
})
describe('測試 /battle 的內容',()=>{
    test('因為沒有添加請求主題，應該要回傳錯誤',async ()=>{
         const response=await request(app).get('/battle').send({})
         expect(response.status).toBe(400);
         expect(response.body.error).toBe('沒有明確的加權值類型!')
    }),
    test('因為玩家的屬性格式不正確，應該要回傳錯誤',async()=>{
        const response=await request(app).get('/battle').send({
            battle:1,
            playerA:{properties:''},
            playerB:{properties:'錯誤的格式，因為非 Array'},
        })
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('玩家的類型是錯誤的!')
    }),
    test('因為玩家屬性值有負數，所以應該出現報錯',async()=>{
         const response=await request(app).get('/battle').send({
            battle: 3,
            playerA: { properties: [2,3,-4] },
            playerB: { properties: [-1, 2, 3] }
         })
         expect(response.status).toBe(400);
         expect(response.body.error).toBe('Invalid value')
    }),
    test('因為屬性長度不如預期，所以應該報錯',async()=>{
        const response=await request(app).get('/battle').send({
            battle: 1,
            playerA: { properties: [2,3,4,5,55,66] },
            playerB: { properties: [1,3] }
        })
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('項目長度不等於預期設定')
    }),
    test('應該回傳正確的對戰結果',async ()=>{
         const response=await request(app).get('/battle').send({
            battle: 1,
            playerA: { properties: [3, 2, 1] },
            playerB: { properties: [2, 3, 1] }
         })
         expect(response.status).toBe(200);
         expect(response.body).toHaveProperty('winner');
         expect(response.body.playerA).toHaveProperty('weightedValue');
         expect(response.body.playerB).toHaveProperty('weightedValue');
    })
})