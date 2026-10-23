export function calculateFunnel(raw){
 const [v,l,b,c]=raw.map(Number);
 const ok=raw.length===4&&raw.every(s=>String(s).trim()!=='')&&[v,l,b,c].every(n=>Number.isFinite(n)&&n>=0)&&[v,l,b].every(Number.isSafeInteger)&&l<=v&&b<=l;
 const pct=(a,z)=>z?(100*a/z).toFixed(1)+'%':'—';
 return {rate:ok?pct(b,v):'請檢查輸入',leadRate:ok?pct(l,v):'—',closeRate:ok?pct(b,l):'—',cac:ok&&b?'NT$ '+Math.round(c/b).toLocaleString('en-US'):'—',calcNote:ok?'數字描述的是結構，無法單獨判定原因。應搭配名單品質、產品毛利與業務週期解讀。':'此簡化模型要求：造訪 ≥ 名單 ≥ 成交，人數須為非負整數，所有欄位不得空白，費用不得為負數。'};
}
