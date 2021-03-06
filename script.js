let canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");
let loadImage = (src, callback) => {
    let img= document.createElement('img');
    img.onload= () => callback(img);
    img.src=src;
}
let imagePath = (frameno, animation) => {
   // return "https://admiring-wright-a13381.netlify.app/images/" + animation + "/" + frameno + ".png";
   return './images/' + '/' + animation + '/' + frameno + '.png';
}
let frames = {
   idle:[1,2,3,4,5,6,7,8],
   kick:[1,2,3,4,5,6,7],
   punch:[1,2,3,4,5,6,7], 
   backward:[1,2,3,4,5,6],
   block:[1,2,3,4,5,6,7,8,9],
   forward:[1,2,3,4,5,6]
};
let loadImages = (callback) => {
   let images = {idle:[], kick:[], punch:[], backward:[], block:[], forward:[]};
   let imagesToLoad = 0;
   ["idle", "kick", "punch", "backward", "block", "forward"].forEach((animation) => {
      let animateFrames = frames[animation];
      imagesToLoad += animateFrames.length;
      animateFrames.forEach((frameno) => {
         let path = imagePath(frameno, animation);
         loadImage(path, (image) => {
            images[animation][frameno - 1] = image;
            imagesToLoad -= 1;
            if(imagesToLoad === 0){
               callback(images);
            }
         });
      });
   });
};
let animate = (ctx, images, animation, callback) => {
   images[animation].forEach((image, index) => {
      setTimeout(() => {
         ctx.clearRect(0, 0, 500, 500);
         ctx.drawImage(image, 0, 0, 500, 500);
      }, index*100);
   });
   setTimeout(callback, images[animation].length * 100);
}
loadImages((images) => {
   let quedAnimation = [];
   let aux = () => {
      let selectedAnimation;
      if(quedAnimation.length === 0){
         selectedAnimation = "idle";
      }
      else{
         selectedAnimation = quedAnimation.shift();
      }
      animate(ctx, images, selectedAnimation, aux);
   };
   aux();
   document.getElementById("kick").onclick = () => {
      quedAnimation.push("kick");
   }
   document.getElementById("punch").onclick = () => {
      quedAnimation.push("punch");
   }
   document.getElementById("block").onclick = () => {
      quedAnimation.push("block");
   }
   document.getElementById("backward").onclick = () => {
      quedAnimation.push("backward");
   }
   document.getElementById("forward").onclick = () => {
      quedAnimation.push("forward");
   }
   document.addEventListener("keyup", (event) => {
      const key = event.key;
       if(key==="ArrowLeft"){
        quedAnimation.push("backward");
       } else if(key === "ArrowRight"){
        quedAnimation.push("forward");
       } else if( key === 'ArrowUp'){
        quedAnimation.push("kick"); 
       } else if( key === "ArrowDown"){
        quedAnimation.push("punch");
       } else if(key === " "){
        quedAnimation.push("block");
       }
   });
});
