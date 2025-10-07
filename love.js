// GSAP timeline to recreate "reel" style animation

const move = 1.0;      // seconds base
const boom = 0.25;     // seconds for boom pulse
const easing = "sine.inOut";

// element refs
const shape = document.getElementById('shape');
const badge = document.getElementById('badge');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const caption = document.getElementById('caption');
const cta = document.getElementById('cta');
const sparks = document.querySelectorAll('.spark');

// master timeline
const tl = gsap.timeline({defaults:{ease:easing}});

// badge pop-in
tl.fromTo(badge, {scale:0.2, opacity:0},
                {   scale:1, opacity:1, duration:move, ease:"elastic.out(1, 0.6)"}, 0);

// subtle float
tl.to(badge, {y:"-=12", duration:1.2, yoyo:true, repeat:-1, ease:"sine.inOut"}, 0.2);

// heart pulses
tl.fromTo(shape, {scale:0.9},
                {scale:1.08, duration:boom, repeat:5, yoyo:true, ease:"sine.inOut"}, 0.05);

// text entrance
tl.to(title, {opacity:1, y:0, duration:0.6}, 0.5);
tl.to(subtitle, {opacity:1, y:0, duration:0.6}, 0.65);

// sparks
tl.to(sparks, {opacity:1, scale:1.2, duration:0.22, stagger:0.08, ease:"back.out(1.4)"}, 0.75);
tl.to(sparks, {opacity:0, scale:0.6, duration:0.6, stagger:0.06, ease:"power2.in"}, 1.05);

// caption & CTA
tl.to(caption, {opacity:1, y:0, duration:0.5}, 1.0);
tl.to(cta, {opacity:1, y:0, scale:1, duration:0.55, ease:"back.out(1.2)"}, 1.1);

// looping subtle pulse
const loopPulse = gsap.timeline({repeat:-1, repeatDelay:1.6});
loopPulse.to(badge, {scale:1.06, duration:0.18, ease:"sine.out"});
loopPulse.to(badge, {scale:1.0, duration:0.32, ease:"sine.in"}, "+=0");
loopPulse.to(shape, {scale:1.06, duration:0.18}, "<");
loopPulse.to(shape, {scale:1.0, duration:0.32}, "<");
loopPulse.to(badge, {boxShadow:"0 18px 48px rgba(255,77,109,0.24)", duration:0.18}, "<");
loopPulse.to(badge, {boxShadow:"0 8px 30px rgba(0,0,0,0.6)", duration:0.32}, "<");

// click interaction
const phone = document.getElementById('phone');
phone.addEventListener('click', () => {
    gsap.fromTo(badge, {scale:1.0}, {scale:1.18, duration:0.18, ease:"power2.out", yoyo:true, repeat:1});
    gsap.fromTo(sparks, {opacity:0, scale:0.6}, {opacity:1, scale:1.2, duration:0.12, stagger:0.06, yoyo:true, repeat:1, ease:"power1.out"});
});

// optional: reduced motion
if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(3);
}
