const track = document.getElementById('slider-container');
const mouseDown=(e)=>{
    track.dataset.mouseDownAt=e.clientX

}
const mouseOnMove=(e)=>{
    if(track.dataset.mouseDownAt === "0"||!track.dataset.mouseDownAt) return;
    const mouseDelta=parseFloat(track.dataset.mouseDownAt)-e.clientX,
    maxDelta=window.innerWidth/2;
    const percentage=(mouseDelta/maxDelta)*-100,
    nextPercentageUnconstrained = track.dataset.prevPercentage?parseFloat(track.dataset.prevPercentage) + percentage:percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    track.dataset.percentage=nextPercentage;
    track.style.transform=`translate(${nextPercentage}%,-50%)`;
    track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
const mouseUp=(e)=>{
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousedown=e=>mouseDown(e)
window.onmousemove=e=>mouseOnMove(e)
window.onmouseup=e=>mouseUp(e)
/* -- Had to add extra lines for touch events -- */


window.ontouchstart = e => mouseDown(e.touches[0]);

window.ontouchend = e => onmouseup(e.touches[0]);

window.ontouchmove = e => mouseOnMove(e.touches[0]);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}