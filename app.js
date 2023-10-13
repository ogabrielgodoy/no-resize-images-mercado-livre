// Event listener para o input de arquivo
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileSelect, false);

// Event listener para o botão de processamento
const processButton = document.getElementById('processButton');
processButton.addEventListener('click', processImages, false);

// Função para manipular o upload de imagens
function handleFileSelect(e) {
    const files = e.target.files;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Limpa o contêiner de imagens

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    // Redimensiona a imagem para 1200x1200
                    const newWidth = 1200;
                    const newHeight = 1200;
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    context.drawImage(img, 0, 0, newWidth, newHeight);

                    addSquares(context, newWidth, newHeight);

                    const newImage = new Image();
                    newImage.src = canvas.toDataURL('image/png');
                    imageContainer.appendChild(newImage);
                };
            };
            reader.readAsDataURL(file);
        }
    }
}

// Função para adicionar quadrados na imagem
function addSquares(context, width, height) {
    const squareSize = 10;
    const colorTopLeft = 'LightGray';
    const colorBottomRight = 'LightGray';

    // Adiciona quadrado no canto superior esquerdo
    context.fillStyle = colorTopLeft;
    context.fillRect(0, 0, squareSize, squareSize);

    // Adiciona quadrado no canto inferior direito
    context.fillStyle = colorBottomRight;
    context.fillRect(width - squareSize, height - squareSize, squareSize, squareSize);
}

// Função para processar as imagens e permitir o download
function processImages() {
    const images = document.querySelectorAll('#imageContainer img');
    images.forEach((image, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `image_${index}.png`;
        link.click();
    });
}