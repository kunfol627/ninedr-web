import test from 'node:test';
import assert from 'node:assert/strict';
import {handleSurvey} from '../lib/survey-handler.mjs';
for(const cohort of ['a','b'])test(`survey ${cohort} retains class routing`,async()=>{
 const response=handleSurvey(new Request(`https://www.ninedr.com/survey/class/${cohort}`));
 assert.equal(response.status,200);
 assert.equal(response.headers.get('X-Robots-Tag'),'noindex, follow');
 assert.match(await response.text(),new RegExp(`\\?class=${cohort}`));
});
test('unrelated paths are untouched',()=>assert.equal(handleSurvey(new Request('https://www.ninedr.com/')),null));
test('unknown classes do not fall back to class a',()=>assert.equal(handleSurvey(new Request('https://www.ninedr.com/survey/class/c')),null));
test('HEAD has no body',async()=>assert.equal(await handleSurvey(new Request('https://www.ninedr.com/survey/class/a',{method:'HEAD'})).text(),''));
