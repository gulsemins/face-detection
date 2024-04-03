let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let message = document.getElementById("message");

const accessCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 500, height: 400 },
      audio: false,
    });
    video.srcObject = stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
    message.textContent = "Error accessing camera!";
  }
};

const detectFaces = async () => {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    const predictions = await model.estimateFaces(video, false);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
    ctx.drawImage(video, 0, 0, 500, 400);

    predictions.forEach((prediction) => {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "yellow";
      ctx.rect(
        prediction.topLeft[0],
        prediction.topLeft[1],
        prediction.bottomRight[0] - prediction.topLeft[0],
        prediction.bottomRight[1] - prediction.topLeft[1]
      );
      ctx.stroke();
    });
  }
};

accessCamera();
video.addEventListener("loadeddata", async () => {
  try {
    model = await blazeface.load();
    setInterval(detectFaces, 40);
  } catch (error) {
    console.error("Error loading model:", error);
    message.textContent = "Error loading face detection model!";
  }
});
