function generateImage() {
    let colorInputs = document.querySelectorAll(".color");
    let colors = [];

    colorInputs.forEach(input => {
        colors.push(input.value);
    });

    // Blend background using all colors
    document.body.style.background =
        "linear-gradient(to right, " + colors.join(",") + ")";

    // Show palette
    let palette = document.getElementById("palette");
    palette.innerHTML = "";

    colors.forEach(c => {
        let box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = c;
        palette.appendChild(box);
    });

    // Detect color type
    function getType(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        let brightness = (r + g + b) / 3;

        if (brightness > 200) return "pastel";
        if (brightness < 80) return "dark";
        if (r > g && r > b) return "warm";
        if (b > r && b > g) return "cool";
        return "neutral";
    }

    // Get types for ALL colors
    let types = colors.map(getType);

    // Find most common type
    function mostCommon(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length - arr.filter(v => v === b).length
        ).pop();
    }

    let mainType = mostCommon(types);

    // Generate idea + image
    let idea = "";
    let image = "";

    if (mainType === "warm") {
        idea = "Paint a glowing sunset or fire-lit scene";
        image = "https://faustgallery.com/wp-content/uploads/2020/07/James-Kirkland-Chief-Red-Cloud.jpg";
    } else if (mainType === "cool") {
        idea = "Create a calm ocean or sky artwork";
        image = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1c3c1a66571057.5b0f3f3f3e9f1.jpg";
    } else if (mainType === "pastel") {
        idea = "Design a soft dreamy pastel piece";
        image = "https://cdn.pixabay.com/photo/2017/08/30/01/05/sky-2695569_1280.jpg";
    } else if (mainType === "dark") {
        idea = "Paint a moody night scene";
        image = "https://paintingvalley.com/dark-night-painting/dark-night-painting-1.jpg";
    } else if (mainType === "neutral") {
        idea = "Create an abstract colorful painting";
        image = "https://www.artworks.ae/cdn/shop/products/Beige-Abstract-Wall-Art.jpg";
    } else {
        idea = "Choose a palette to get inspired!";
        image = "";
    }

    // Display the idea text
    document.getElementById("result").innerText = idea;

    // Display the image if available
    const imgContainer = document.getElementById("imageResult");
    imgContainer.innerHTML = "";
    if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = idea;
        img.style.maxWidth = "400px";
        img.style.borderRadius = "10px";
        imgContainer.appendChild(img);
    }
}
