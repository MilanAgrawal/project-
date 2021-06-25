const socket=io('/')
const myPeer= new Peer()
const videoGrid = document.getElementById("video-streaming");/*the video element to which the video stream is to be added*/
const myVideo = document.createElement("video");
myVideo.muted = true;
let myVideoStream;
var getUserMedia =
navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia;
navigator.mediaDevices.getUserMedia({
video: true,
audio: true
}).then(stream =>{
  myVideoStream=stream;

addVideoStream(myVideo,stream)/*adding our videos stream to the videoGrid element*/
/*when someone calls ,we answer back giving our video stream and responding to the stream sent by them*/
myPeer.on('call',(call)=>
{
  call.answer(stream);
  const video=document.createElement("video");
  call.on('stream',(userVideoStream)=>{
    addVideoStream(video,userVideoStream)
  })
})
/*when new user joins our room we allow our video and audio stream to be shared with the other users*/
socket.on('user-connected',(userId)=>{
  console.log(userId+"connected in the calls")
connectToNewUser(userId,stream);
})
})
myPeer.on("open",(id)=>{
  socket.emit("join-room",ROOM_ID,id);
})
const connectToNewUser=function(userId,stream){
/*calling the user and sending our video and audio stream*/
  const call=myPeer.call(userId,stream)
  const video=document.createElement('video')
  /*taking the user video stream*/
  call.on('stream',(userVideoStream) =>{
    /*taking user video and audio stream and adding to ours pages*/
    addVideoStream(video,userVideoStream)
  })
  /*rmoves the videos when the user leaves the calls*/
    call.on('close',()=>{
    video.remove()
  })
}

const addVideoStream=(video,stream)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
       video.play();
    });
videoGrid.append(video);
}
/*The send button in chat box sends the value in the input elements to the server and then it is broadcasted to all the users in the same room and is appended to the list items of ul.
*/
const objectss=$('.adds #heaa')
const buttonss=$('.adds #buttonclasses')
buttonss.on('click',function(){
  console.log(objectss.val())
  socket.emit('messages',objectss.val())
  objectss.val('')
})
const obje=$('.classbutton')
obje.on('click',function(){
alert("localhost:3005/"+ROOM_ID)
})
/*add the socket.disconnected event here*/
socket.on('broadcastingss',messages=>{
console.log(messages);
const chatboxclassessadderss=$(".chat-sectionsareas")
chatboxclassessadderss.append(`<div class="chatboxes">${messages}</div>`)
})
/*Share link option provides the link to the room and allows new users to join the call by using the url
<i class="fas fa-video-slash"></i>*/
/*<i class="fas fa-microphone-slash"></i>*/
