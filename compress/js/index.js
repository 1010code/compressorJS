
var compressRatio = 0.8, // 圖片壓縮比例
    imgNewWidth = 400, // 圖片新寬度
    img = new Image(),
    canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    file, fileReader, dataUrl;

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// 上傳檔案
$("#upload_img").change(function () {
    file = this.files[0];
    // 圖片才處理
    if (file && file.type.indexOf("image") == 0) {
        // fileReader = new FileReader();
        // fileReader.onload = getFileInfo;
        // fileReader.readAsDataURL(file);
        // console.log(newImg)
        new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.4,
                success: resolve,
                error: reject,
            });
        }).then(async (result) => {
            console.log('before sise:'+file.size/1000);
            // console.log(file);
            // 顯示預覽圖片
            const oldImg = await toBase64(file);
            let html='';
            html += "<img src='" + oldImg + "'/>";
            $("#oldImg").html(html);
            
            console.log('Compress success');
            console.log('after sise:'+result.size/1000);
            // 顯示預覽圖片
            const newImg = await toBase64(result);
            html='';
            html += "<img src='" + newImg + "'/>";
            $("#newImg").html(html);
        }).catch((err) => {
            console.log('Compress error');
            window.alert(err.message);
        }).finally(() => {
            console.log('Compress complete');
        });


    }
});

function getFileInfo(evt) {
    dataUrl = evt.target.result,
    console.log('e04')
        // 取得圖片
        img.src = dataUrl;
}

// 圖片載入後
img.onload = function () {
    var width = this.width, // 圖片原始寬度
        height = this.height, // 圖片原始高度
        imgNewHeight = imgNewWidth * height / width, // 圖片新高度
        html = "",
        newImg;

    // 顯示預覽圖片
    html += "<img src='" + dataUrl + "'/>";
    html += "<p>這裡是原始圖片尺寸 " + width + "x" + height + "</p>";
    html += "<p>檔案大小約 " + Math.round(file.size / 1000) + "k</p>";
    $("#oldImg").html(html);

    // 使用 canvas 調整圖片寬高
    canvas.width = imgNewWidth;
    canvas.height = imgNewHeight;
    context.clearRect(0, 0, imgNewWidth, imgNewHeight);

    // 調整圖片尺寸
    context.drawImage(img, 0, 0, imgNewWidth, imgNewHeight);

    // 顯示新圖片
    newImg = canvas.toDataURL("image/jpeg", compressRatio);
    html = "";
    html += "<img src='" + newImg + "'/>";
    html += "<p>這裡是新圖片尺寸 " + imgNewWidth + "x" + imgNewHeight + "</p>";
    html += "<p>檔案大小約 " + Math.round(0.75 * newImg.length / 1000) + "k</p>"; // 出處 https://stackoverflow.com/questions/18557497/how-to-get-html5-canvas-todataurl-file-size-in-javascript
    $("#newImg").html(html);

    // canvas 轉換為 blob 格式、上傳
    canvas.toBlob(function (blob) {
        // 輸入上傳程式碼
    }, "image/jpeg", compressRatio);
};
