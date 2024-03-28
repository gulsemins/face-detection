// let video = document.getElementById("video");
// let model;

// // declare the canvas variable and setting up the context

// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");

// const accessCamera = () => {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: { width: 500, height: 400 },
//       audio: false,
//     })
//     .then((stream) => {
//       video.srcObject = stream;
//     });
// };

// const detectFaces = async () => {
//   const prediction = await model.estimateFaces(video, false);

//   // Using canvas to draw the video first

//   ctx.drawImage(video, 0, 0, 500, 400);

//   prediction.forEach((predictions) => {
//     // Drawing rectangle that'll detect the face
//     ctx.beginPath();
//     ctx.lineWidth = "4";
//     ctx.strokeStyle = "yellow";
//     ctx.rect(
//       predictions.topLeft[0],
//       predictions.topLeft[1],
//       predictions.bottomRight[0] - predictions.topLeft[0],
//       predictions.bottomRight[1] - predictions.topLeft[1]
//     );
//     // The last two arguments denotes the width and height
//     // but since the blazeface models only returns the coordinates
//     // so we have to subtract them in order to get the width and height
//     ctx.stroke();
//   });
// };

// accessCamera();
// video.addEventListener("loadeddata", async () => {
//   model = await blazeface.load();
//   // Calling the detectFaces every 40 millisecond
//   setInterval(detectFaces, 40);
// });

// let video = document.getElementById("video");
// let model;
// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");

// const accessCamera = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { width: 500, height: 400 },
//       audio: false,
//     });
//     video.srcObject = stream;
//   } catch (error) {
//     console.error("Error accessing camera:", error);
//     // Handle error gracefully, e.g., display an error message to the user
//   }
// };

// const detectFaces = async () => {
//   if (video.readyState === video.HAVE_ENOUGH_DATA) {
//     // Ensure video is ready before processing
//     const predictions = await model.estimateFaces(video, false);

//     ctx.drawImage(video, 0, 0, 500, 400);

//     predictions.forEach((prediction) => {
//       ctx.beginPath();
//       ctx.lineWidth = "4";
//       ctx.strokeStyle = "yellow";
//       ctx.rect(
//         prediction.topLeft[0],
//         prediction.topLeft[1],
//         prediction.bottomRight[0] - prediction.topLeft[0],
//         prediction.bottomRight[1] - prediction.topLeft[1]
//       );
//       ctx.stroke();
//     });
//   }
// };

// accessCamera();
// video.addEventListener("loadeddata", async () => {
//   try {
//     model = await blazeface.load();
//     setInterval(detectFaces, 40); // Adjust interval based on performance
//   } catch (error) {
//     console.error("Error loading model:", error);
//     // Handle error gracefully, e.g., display an error message to the user
//   }
// });

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
