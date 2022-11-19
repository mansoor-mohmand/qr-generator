// https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WIFI%3AT%3AWPA;S:KPNbox12;P:Welkom1348!; wifi qr code

const IMG_AFG  = document.querySelector("#IMG_AFG");
// const FILE_INPUT = document.getElementById("FILE_INPUT").;
const SHARE_BTN = document.getElementById("SHARE_BTN");

const OUTPUT = document.getElementById("OUTPUT");


// let files = IMG_AFG.src;
// console.log(files);

// SHARE_BTN.addEventListener("click",()=>{

//     // const files = FILE_INPUT.files[0];

//     const files = {
//         name:IMG_AFG.src,
//         type:"image/jpg"
//     }
//     console.log(files);

    


// });

    // Get a reference to our file input
    const fileInput = document.querySelector('input[type="file"]');
    var img = IMG_AFG.src.split("/");
    var imglen = img.length;

    // Create a new File object
    const myFile = new File(['Hello World!'], img[imglen-1], {
        type: 'image/jpg',
        lastModified: new Date(),
    });
    
    // Now let's create a DataTransfer to get a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
    

SHARE_BTN.addEventListener("click", async ()=>{
    // const files = FILE_INPUT.files;
       const files = fileInput.files;
    
    if (!navigator.canShare) {
        OUTPUT.textContent = "Not supported canShare";
        return false;
    }
    if(!navigator.share)
    {
        OUTPUT.textContent = "Not supported share";
        return false;
    }
        try {
            await navigator.share({
                files,
                title: 'Images',
                text: 'Beautiful images'
              });
            OUTPUT.textContent = 'Shared!';
          }
          catch (error) 
          {
            OUTPUT.textContent = `Error: ${error.message}`;
          }
});
