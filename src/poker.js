export const RANKS=['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
export const SUITS=['♠','♥','♦','♣'];
export const DECK=RANKS.flatMap((r,ri)=>SUITS.map((s,si)=>({r,s,ri,si,id:r+s})));

function five(cs){
 const rs=cs.map(c=>c.ri).sort((a,b)=>b-a), cnt={}; rs.forEach(r=>cnt[r]=(cnt[r]||0)+1);
 const uniq=[...new Set(rs)]; if(uniq[0]===12&&uniq.includes(3)&&uniq.includes(2)&&uniq.includes(1)&&uniq.includes(0)) uniq.push(-1);
 let sh=-99; for(let i=0;i<=uniq.length-5;i++) if(uniq[i]-uniq[i+4]===4){sh=uniq[i];break;}
 const fl=cs.every(c=>c.si===cs[0].si), groups=Object.entries(cnt).map(([r,n])=>[+r,n]).sort((a,b)=>b[1]-a[1]||b[0]-a[0]);
 const flat=groups.flatMap(([r,n])=>Array(n).fill(r));
 if(fl&&sh>-99)return[8,sh]; if(groups[0][1]===4)return[7,...flat]; if(groups[0][1]===3&&groups[1][1]===2)return[6,...flat];
 if(fl)return[5,...rs]; if(sh>-99)return[4,sh]; if(groups[0][1]===3)return[3,...flat]; if(groups[0][1]===2&&groups[1][1]===2)return[2,...flat]; if(groups[0][1]===2)return[1,...flat]; return[0,...rs];
}
function cmp(a,b){for(let i=0;i<Math.max(a.length,b.length);i++){const d=(a[i]||0)-(b[i]||0);if(d)return Math.sign(d)}return 0}
export function best7(cs){let best=null;for(let a=0;a<3;a++)for(let b=a+1;b<4;b++)for(let c=b+1;c<5;c++)for(let d=c+1;d<6;d++)for(let e=d+1;e<7;e++){const v=five([cs[a],cs[b],cs[c],cs[d],cs[e]]);if(!best||cmp(v,best)>0)best=v}return best}
export function equity(hero,board){
 const known=[...hero,...board], rem=DECK.filter(c=>!known.some(k=>k.id===c.id)); let w=0,l=0,t=0,n=0;
 const need=5-board.length;
 const run=(start,left,extra)=>{if(!left){const b=[...board,...extra]; const avail=rem.filter(c=>!extra.some(x=>x.id===c.id)); const hv=best7([...hero,...b]); for(let i=0;i<avail.length;i++)for(let j=i+1;j<avail.length;j++){const dv=best7([avail[i],avail[j],...b]),x=cmp(hv,dv);x>0?w++:x<0?l++:t++;n++}return;} for(let i=start;i<=rem.length-left;i++)run(i+1,left-1,[...extra,rem[i]]);};
 if(need<=2)run(0,need,[]); else return null;
 return {win:w/n,tie:t/n,lose:l/n,total:n};
}
export function parseCard(id){return DECK.find(c=>c.id===id)||null}
