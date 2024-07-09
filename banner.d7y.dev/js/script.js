
var fontList = [
    "Barlow Condensed", "Caveat", "Chela One", "Dancing Script", "El Messiri", "Gelasio serif", "Gloria Hallelujah", "Great Vibes",
    "Indie Flower", "Lexend Deca", "Lilita One", "Lobster", "Lugrasimo", "Lumanosimo", "Pacifico", "Pangolin",
    "Playfair Display", "Rubik", "Shadows Into Light", "Space Mono", "Tektur", "Wix Madefor Text", "Yuji Boku",
];
var canvas = document.createElement('canvas');
canvas.width = 480;
canvas.height = 168;

function CreateFrame(text, font) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '32px ' + font;
    canvas.style.letterSpacing = "2.2em"
    var text = text;
    var textWidth = ctx.measureText(text).width;
    var textHeight = ctx.measureText('M').actualBoundingBoxAscent; // Approximate height
    var x = (canvas.width - textWidth) / 2;
    var y = (canvas.height + textHeight) / 2;

    ctx.fillText(text, x, y);
    return ctx;
}

let current;
function CreateBanner(name) {
    let text = name;
    let delay = document.querySelector('.delay input').value || 100;
    current = null;
    let encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(delay);
    encoder.start();
    for (let i = 0; i < fontList.length; i++) {
        let ctx = CreateFrame(text, `'${fontList[i]}'`);
        encoder.addFrame(ctx);
    }
    encoder.finish();
    var binary_gif = encoder.stream().getData();
    var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
    var img = document.querySelector('.banner');
    img.setAttribute("data-name", text)
    img.src = data_url;
    current = data_url;
}

function DownloadBanner() {
    if (current) {
        let img = document.querySelector(".banner");
        download(img.src, img.getAttribute("data-name") || "download.gif", "image/gif");
    }
}

function Generate() {
    let name = document.querySelector('.name').value;
    if (name && name != "") {
        CreateBanner(name);
    } else {
        let el = document.querySelector('.generate .input-container')
        el.classList.add("error");
        setTimeout(() => {
            el.classList.remove("error");
        }, 1000);
    }
}