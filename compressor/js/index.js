
let compressRatio = 0.8, // 圖片壓縮比例
    imgNewWidth = 400, // 圖片新寬度
    canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");
let imgDom;
const fileUploader_1 = document.getElementById("file-uploader-1");
const fileUploader_2 = document.getElementById("file-uploader-2");

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const getSize = (file) => new Promise((resolve, reject) => {
    var _URL = window.URL || window.webkitURL;
    var img = new Image();

    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;

    img.src = _URL.createObjectURL(file);
    imgDom = img;
});


const postImage = async () => {
    const file_1 = fileUploader_1.files[0];
    const sizeImage_1 = await getSize(file_1);
    const oldImageUrl_1 = await toBase64(file_1);
    const compImage_1=await getCompressImage(file_1,sizeImage_1,oldImageUrl_1);
    console.log(compImage_1);

    const file_2 = fileUploader_2.files[0];
    const sizeImage_2 = await getSize(file_2);
    const oldImageUrl_2 = await toBase64(file_2);
    const compImage_2=await getCompressImage(file_2,sizeImage_2,oldImageUrl_2);
    console.log(compImage_2);
}



const getCompressImage=(file,sizeImage,imageUrl)=>new Promise((resolve, reject) =>{
    var width = sizeImage.width, // 圖片原始寬度
        height = sizeImage.height, // 圖片原始高度
        imgNewHeight = imgNewWidth * height / width, // 圖片新高度
        html = "",
        newImg;

    console.log("檔案大小約 " + Math.round(file.size / 1000));

    // 使用 canvas 調整圖片寬高
    canvas.width = imgNewWidth;
    canvas.height = imgNewHeight;
    context.clearRect(0, 0, imgNewWidth, imgNewHeight);

    // 調整圖片尺寸
    context.drawImage(imgDom, 0, 0, imgNewWidth, imgNewHeight);

    // 顯示新圖片
    newImg = canvas.toDataURL("image/jpeg", compressRatio);
    console.log("檔案大小約 " + Math.round(0.75 * newImg.length / 1000));
    resolve({width, height, newImg, imgNewHeight, imgNewWidth});
});