export {JS};
class JS{
    //?getURL
    static GetURLPramas = (url)=>{
        return JSON.parse(`{"${url.split("?")[1].replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`);
    }

    //? thousand separator
    static TSeparator = (num_data)=>{
    
        let num = num_data.toString();
        let n_len =  num.length;
        
        let format1 = `${num.slice(0,1)}.${num.slice(1,4)}`;
        let format2 = `${num.slice(0,2)}.${num.slice(2,4)}`;
        let format3 = `${num.slice(0,3)}.${num.slice(3,4)}`;
        
        return (n_len==7)?`${format1} million`
                :(n_len==8)?`${format2} million`
                :(n_len==9)?`${format3} million`
                :(n_len==10)?`${format1} billion`
                :(n_len==11)?`${format2} billion`
                :(n_len==12)?`${format3} billion`
                :num_data.toLocaleString();
        }

    // ?object iteration values
    static IterateObject = (obj) =>
    {
        let arr = [];
        for(let item of Object.entries(obj))
        {
            arr.push(item[1]);
            // arr+=`${item[1]},`;
        }
        return arr;
    }

    // ?object iteration keys
    static IterateObjectKeys = (objKey) =>
    {
        let key = "";
        for(let item of Object.keys(objKey))
        {
            key = item;
            break;
        }
        return key;
    }

    // ?line break for array values
    static LineBreakArray= (arr) =>{
        var value="";
        arr.forEach(item=>{value+=`${item}<br>`;});
        return value;
    }

    // ? share website url
    async Share(shareurl, sharetitle, sharetext)
    {
        let share_data = {
            title :sharetitle,
            text:sharetext,
            url:shareurl || window.location.href
        }
        try{
            await navigator.share(share_data);
            alert("Shared Successfully");
        }catch(error){
            alert(`Not Shared ${error}`);
        }
    }

    // ? share website url along with image
    async ShareImage(shareimg, shareurl, sharetitle, sharetext)
    {
        try {
          const response = await fetch(shareimg);
          const blob = await response.blob();
          const file = new File([blob], 'rick.jpg', {type: blob.type});
    
          await navigator.share({
            url: shareurl,
            title: sharetitle,
            text: sharetext,
            files: [file]
          });
        } catch (err) {
          console.log(err.name, err.message);
        }
      }

    // ? Fetch and download image from url
      async FetchDownload(url,image_id,ancher_id)
      {
        const response = await fetch(url);
        const imageBlob = await response.blob();
        const imageBase64 = URL.createObjectURL(imageBlob);
        
        
        image_id.src = imageBase64;
        ancher_id.href = imageBase64;
  
        
      //   const a = document.createElement('a')
      //   a.style.setProperty('display', 'none')
      //   document.body.appendChild(a)
      //   a.download = url.replace(/^.*[\\\/]/, '')
      //   a.href = imageBase64
      //   a.click()
      //   a.remove()
      }

    // ? Copy Text data
      static CopyText = (Text) => 
      {
        navigator.clipboard.writeText(Text);
        alert("Text copied!");
      }
}





// ? download Dom-to-image
// * link
/* <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script> */
// * usage
// download_btn.onclick = () => {

//   domtoimage.toPng(document.getElementById('generated_qrcode'),{
//       quality:0.99,
//   })
//   .then(dataURL => {
//       const a = document.createElement("a");
//       document.body.appendChild(a);
//       a.download = "qr-code.png";
//       a.href = dataURL;
//       a.click();
//   })

// }
