// Acessibilidade
const root = document.documentElement;
document.getElementById('btn-contrast').addEventListener('click', ()=> 
    root.setAttribute('data-high-contrast', root.getAttribute('data-high-contrast')==='true'?'false':'true')
);
document.getElementById('btn-font').addEventListener('click', ()=> 
    root.setAttribute('data-large-font', root.getAttribute('data-large-font')==='true'?'false':'true')
);
document.getElementById('btn-spacing').addEventListener('click', ()=> 
    root.setAttribute('data-wide-spacing', root.getAttribute('data-wide-spacing')==='true'?'false':'true')
);

// Leitura de voz
let speech; // variável global
let speaking = false;

const btnSpeak = document.getElementById('btn-speak');
const btnPause = document.createElement('button');
btnPause.id = 'btn-pause';
btnPause.innerText = 'Pausar/Retomar';
btnPause.style.marginLeft = '0.5rem';
btnSpeak.parentNode.appendChild(btnPause);

btnSpeak.addEventListener('click', ()=>{
    if (speaking) return; // não iniciar múltiplas instâncias
    const content = document.getElementById('maincontent').innerText;
    speech = new SpeechSynthesisUtterance(content);
    speech.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    speaking = true;
    speech.onend = () => { speaking = false; };
});

btnPause.addEventListener('click', ()=>{
    if (!speech) return;
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            window.speechSynthesis.pause();
        }
    }
});

// Cálculo de risco
const form = document.getElementById('forecast-form');
const alertsList = document.getElementById('alerts');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const rain = parseFloat(document.getElementById('rain').value)||0;
  const river = parseFloat(document.getElementById('river').value)||0;
  const drainage = parseInt(document.getElementById('drainage').value)||5;
  const score = (rain*1.5)+(river*20)-(drainage*5);
  let message = 'Risco baixo.';
  if(score>60) message='Risco ALTO de enchente.';
  else if(score>30) message='Risco moderado.';
  alertsList.innerHTML = `<li>${message} (índice: ${Math.round(score)})</li>`;
});

// Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2t2cG42d3BhMGFrcDJ2cGFjd3k0eXF0ayJ9.xZVY3Qz7aRfi6cL4Dc0XYA';
const map = new mapboxgl.Map({
  container:'map',
  style:'mapbox://styles/mapbox/streets-v12',
  center:[-46.6333,-23.5505],
  zoom:12
});
map.addControl(new mapboxgl.NavigationControl());
new mapboxgl.Marker({color:'red'})
.setLngLat([-46.6333,-23.5505])
.setPopup(new mapboxgl.Popup().setText("Centro de São Paulo"))
.addTo(map);
