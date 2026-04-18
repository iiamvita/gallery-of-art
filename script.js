function generateImage(){

    let colorInputs= document.querySelectorAll(".color");

    let colors = [];

    colorInputs.forEach(input => {
        colors.push(input.value);
    });

    //2. Blend background using all colors
    document.body.style.background=
    "linear-gradient(to right, " + colors.join(",") + ")";

    //3. Show palette
    let palette = document.getElementById("palette");
    palette.innerHTML ="";

    colors.forEach(c => {
        let box = document.createElement("div");
        box.className ="color-box";
        box.style.backgroundColor =c;
        palette.appendChild(box);
    });

    //4. Function to detect color type
    function getType(hex){
       let r = parseInt(hex.slice(1, 3), 16);
       let g = parseInt(hex.slice(3, 5), 16);
       let b = parseInt(hex.slice(5, 7), 16);


        let brightness = (r + g + b) / 3;

        if(brightness > 200) return "pastel";

        if(brightness < 80) return "dark";

        if (r > g && r > b) return "warm";

        if(b> r && b > g) return "cool";

            return "neutral";
    }

    //5. Get types for ALL colors
    let types = colors.map(getType);

    //6. Find most common type
    function mostCommon(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length - arr.filter(v => v === b).length

    ).pop();
    }

    let mainType = mostCommon(types);

    //7. Generate idea + image

    let idea = "";
    let image = "";

    if (mainType === "warm") {
        idea = "Paint a glowing sunset or fire-lit scene";
        image = "https://images.unsplash.com/photo-1501973801540-527f08ccae7b";
    }

    else if (mainType === "cool") {
        idea = "Create a calm ocean or sky artwork";
        image ="https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
    }
    else if (mainType === "pastel") {
        idea = "Design a soft dreamy pastel piece";
        image = "https://images.unsplash.com/photo-1492724441997-5dc865305da7";
    }
    else if (mainType === "dark") {
        idea = "Paint a moody night scene";
        image = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
    }
    else {
        idea = "Create an abstract colorful painting ";
        image = "https://images.unsplash.com/photo-1500534623283-312aade485b7";
    }

    // 8. Display results
    document.getElementById("result").innerText = idea;
    document.getElementById("image").src = image;
}