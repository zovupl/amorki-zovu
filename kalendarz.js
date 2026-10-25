// Kalendarz raportów Amorki: tydzień z raportem da się kliknąć.
// Nowy raport = nowa linia w RAPORTY (poniedziałek tygodnia, adres strony).
(function(){
  var RAPORTY=[
    {od:'2026-10-19',url:'tydzien-1.html',nr:1,okres:'19–25 października 2026',reklama:'1 448 zł',wysw:'170 tys.',zdanie:'Start promocji. Kanał +87% wyświetleń tydzień do tygodnia, KUKIRINIARA ponad 130 tys., prawie 2 000 subskrypcji.'}
  ];
  var MIES=['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
  var el=document.getElementById('kalendarz');if(!el)return;
  var biezacy=+el.getAttribute('data-nr');
  function iso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function raport(pon){for(var i=0;i<RAPORTY.length;i++)if(RAPORTY[i].od===iso(pon))return RAPORTY[i];return null}
  var dzis=iso(new Date()),h='';
  for(var m=9;m<=11;m++){ // październik – grudzień 2026
    var rok=2026,mi=m,pierwszy=new Date(rok,mi,1),ost=new Date(rok,mi+1,0);
    var pon=new Date(pierwszy);pon.setDate(pon.getDate()-((pon.getDay()+6)%7));
    h+='<div class="kMies"><div class="kNaz">'+MIES[mi]+' '+rok+'</div><div class="kSiatka"><div class="kTydz kDni"><span>pn</span><span>wt</span><span>śr</span><span>cz</span><span>pt</span><span>sb</span><span>nd</span></div>';
    while(pon<=ost){
      var r=raport(pon),kl='kTydz'+(r?' jest':'')+(r&&r.nr===biezacy?' teraz':'');
      h+=r?'<a class="'+kl+'" href="'+r.url+'" title="Raport · tydzień '+r.nr+'">':'<div class="'+kl+'">';
      for(var d=0;d<7;d++){var x=new Date(pon);x.setDate(pon.getDate()+d);
        h+='<span class="'+(x.getMonth()!==mi?'poza':'')+(iso(x)===dzis?' dzis':'')+'">'+x.getDate()+'</span>';}
      h+=r?'</a>':'</div>';
      pon.setDate(pon.getDate()+7);
    }
    h+='</div></div>';
  }
  el.innerHTML='<div class="kNagl">Wybierz tydzień <span>różowe tygodnie mają raport</span></div><div class="kMiesiace">'+h+'</div>';
  var s=document.createElement('style');
  s.textContent='#kalendarz{background:var(--karta);border:1px solid var(--ramka);border-radius:14px;padding:16px 18px;margin:0 0 30px}'+
  '.kNagl{font:800 15px Manrope,sans-serif;margin-bottom:12px}.kNagl span{font:400 12.5px Manrope,sans-serif;color:var(--cichy);margin-left:8px}'+
  '.kMiesiace{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}'+
  '.kMies{min-width:0}.kNaz{font-size:13px;font-weight:600;margin-bottom:6px}'+
  '.kSiatka{display:grid;gap:2px;font-size:12px;text-align:center}'+
  '.kTydz{display:grid;grid-template-columns:repeat(7,1fr);border-radius:7px;padding:3px 0;color:var(--tekst);text-decoration:none}'+
  '.kDni{color:var(--cichy);font-size:11px}'+
  '.kTydz .poza{color:var(--szary)}.kTydz .dzis{font-weight:700;text-decoration:underline}'+
  '.kTydz.jest{background:var(--jasny);color:var(--rozC);font-weight:700}'+
  '.kTydz.teraz{background:var(--roz);color:#fff}.kTydz.teraz .poza{color:rgba(255,255,255,.65)}'+
  '@media (max-width:760px){.kMiesiace{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}#kalendarz{padding:14px 10px}.kTydz{font-size:11.5px}}';
  document.head.appendChild(s);
  var li=document.getElementById('listaRaportow');
  if(li){li.innerHTML=RAPORTY.slice().reverse().map(function(r,i){return '<a class="rapK'+(i===0?' nowy':'')+'" href="'+r.url+'"><span class="etyk">Tydzień '+r.nr+(i===0?' · najnowszy':'')+'</span><b>'+r.okres+'</b><span class="zd">'+r.zdanie+'</span><span class="lb">reklama <i>'+r.reklama+'</i> · wyświetlenia kanału YT <i>'+r.wysw+'</i></span></a>'}).join('');}
})();
