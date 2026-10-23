import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateFunnel as calc} from '../lib/funnel-calculator.mjs';
test('cohort conversion and marketing cost',()=>{const r=calc(['1000','100','20','10000']);assert.equal(r.rate,'2.0%');assert.equal(r.leadRate,'10.0%');assert.equal(r.closeRate,'20.0%');assert.equal(r.cac,'NT$ 500')});
test('zero denominators remain undefined',()=>{const r=calc(['0','0','0','0']);for(const k of ['rate','leadRate','closeRate','cac'])assert.equal(r[k],'—')});
test('invalid cohorts and missing input do not produce misleading ratios',()=>{for(const v of [['','1','1','1'],['10','11','1','0'],['10','5','6','0'],['1.5','1','1','0'],['10','1','1','-1'],['Infinity','1','1','0']])assert.equal(calc(v).rate,'請檢查輸入')});
