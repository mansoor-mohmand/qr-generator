// https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WIFI%3AT%3AWPA;S:KPNbox12;P:Welkom1348!; wifi qr code

// const IMG_AFG  = document.querySelector("#IMG_AFG");
// const FILE_INPUT = document.getElementById("FILE_INPUT");
// const SHARE_BTN = document.getElementById("SHARE_BTN");

// const OUTPUT = document.getElementById("OUTPUT");

// // let files = IMG_AFG.src;
// // console.log(files);

// // async function SHARE()
// // {
// //     const files = FILE_INPUT.files;
// //     await navigator.share({
// //         title: 'Images',
// //         text: 'Beautiful images'
// //       });
// // }

// SHARE_BTN.addEventListener("click",async ()=>{
//     const files = FILE_INPUT.files;
//     // const shareData = {
//     //     files,
//     //     title: 'MDN',
//     //     text: 'Learn web development on MDN!'
//     //     // url: 'https://developer.mozilla.org'
//     //   }
//     // if (navigator.canShare({ files })) {
    
//     if (!navigator.canShare) {
//         OUTPUT.textContent = "Not supported canShare";
//         return false;
//     }
//     if(!navigator.share)
//     {
//         OUTPUT.textContent = "Not supported share";
//         return false;
//     }
//         try {
//             await navigator.share({
//                 files,
//                 title: 'Images',
//                 text: 'Beautiful images'
//               });
//             OUTPUT.textContent = 'Shared!';
//           }
//           catch (error) 
//           {
//             OUTPUT.textContent = `Error: ${error.message}`;
//           }
//     // }
//     // else{
//     //     OUTPUT.textContent = `Your system doesn't support sharing these files.`
//     // }
// });


const input = document.getElementById('files')
const output = document.getElementById('output')

document.getElementById('share').addEventListener('click', async () => {
  const files = input.files

  if (files.length === 0) {
    output.textContent = 'No files selected.'
    return
  }

  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()
  if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`
    return
  }

  if (navigator.canShare({ files })) {
    try {
      await navigator.share({
        files,
        title: 'Images',
        text: 'Beautiful images'
      })
      output.textContent = 'Shared!'
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`
  }
})