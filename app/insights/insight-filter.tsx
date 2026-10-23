'use client';

import {Children, useState, type ReactNode} from 'react';

export default function InsightFilter({categories, children}: {categories: string[]; children: ReactNode}) {
  const [selected, setSelected] = useState('全部');
  const options = ['全部', ...Array.from(new Set(categories))];
  const count = categories.filter(category => selected === '全部' || category === selected).length;
  return <>
    <div className="portfolio-filter" role="group" aria-label="洞察分類">
      {options.map(category => <button type="button" key={category} aria-pressed={selected === category} aria-controls="insight-results" onClick={() => setSelected(category)}>{category === '全部' ? 'ALL / 全部' : category}</button>)}
      <span role="status">{String(count).padStart(2, '0')} 篇洞察</span>
    </div>
    <div id="insight-results" className="article-list insight-list">
      {Children.toArray(children).filter((_, index) => selected === '全部' || categories[index] === selected)}
    </div>
  </>;
}
