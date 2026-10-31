import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

// Load the real Worker entry while replacing only its external handlers.
const source = (await readFile(new URL('../worker/index.ts', import.meta.url), 'utf8'))
 .replace(/^import .*;$/gm, '');
const compiled = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {default:worker} = await import('data:text/javascript;base64,' + Buffer.from(`
const applyIndexingPolicy = (_request, response) => response;
const handleContact = () => { throw new Error('unexpected contact request'); };
const handler = {fetch: async request => new Response(await request.text())};
${compiled}`).toString('base64'));

for (const method of ['GET', 'HEAD']) {
 test(`${method} asset miss preserves a readable request for the app`, async () => {
  // Node forbids GET bodies; model an incoming Workers request using a
  // body-bearing Request with a routing-method override. Its clone retains
  // the real stream semantics that this regression exercises.
  const request = new Request('https://www.ninedr.com/', {method:'POST',body:'request-stream'});
  Object.defineProperty(request, 'method', {value:method});
  const response = await worker.fetch(request, {ASSETS:{fetch:async candidate => {
   assert.equal(await candidate.text(), 'request-stream');
   return new Response('missing', {status:404});
  }}}, {});
  assert.equal(await response.text(), 'request-stream');
 });
}
test('asset hit returns the asset without consuming the original', async () => {
 const request = new Request('https://www.ninedr.com/o2o/');
 const response = await worker.fetch(request, {ASSETS:{fetch:async () => new Response('asset')}}, {});
 assert.equal(await response.text(), 'asset');
 assert.equal(request.bodyUsed, false);
});
