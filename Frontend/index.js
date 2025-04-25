
const socket = io('http://localhost:3000')


socket.on("helloMessege" , (data) => {
    console.log(data);
});

function sendMessage() {
    const inputData = document.getElementById("message").value
 console.log(inputData);

 socket.emit("sendMessage" , inputData);
}

socket.on("receiveMessage" , (data) => {

    document.querySelector("#display").innerHTML = `<div class="">
 <button class="btn btn-primary">${data}</button>
</div>`

})

document.querySelector("#message").addEventListener("input" , (e)=>{
    socket.emit("typing" , e.target.value);
})


socket.on("displayTyping" , (data) => {
    document.querySelector("#typing").classList.replace("d-none" , "d-block")
})

document.getElementById("message").addEventListener("keyup" , (e) =>{
    socket.emit("removeTyping" , e.target.value);
})

socket.on("remove" , (data) => {
    
    setTimeout(() => {
        document.querySelector("#typing").classList.replace("d-block" , "d-none")
    }, 1000);

})