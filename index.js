let plusbtn = document.querySelector("#plusbtn");
let closebtn = document.querySelector("#closebtn");
let popupscreen = document.querySelector(".popupscreen");
let title = document.querySelector(".title");
let notescontainer = document.querySelector(".notescontainer")
let addnotepopup = document.querySelector(".addnotepopup");
let notes = document.querySelector(".notes")

let notesarr = JSON.parse(localStorage.getItem("note")) || [];

let edited = false;
let updated;

shownote();


plusbtn.addEventListener("click" , ()=>{
    popupscreen.style.display = "block";
    notescontainer.style.filter = "blur(4px)"
    title.style.filter = "blur(4px)"
});

closebtn.addEventListener("click" , ()=>{
    popupscreen.style.display = "none";
    notescontainer.style.filter = "blur(0)"
    title.style.filter = "blur(0)"
});

addnotepopup.addEventListener("click" , addnote);

function addnote(){
    let titleinput = document.querySelector(".titleinput").value.trim();
    let descriptioninput = document.querySelector(".descriptioninput").value.trim();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(titleinput == "" || titleinput == " " || descriptioninput == "" || descriptioninput == " "){
        alert("type some thing (:")
    }else{
        let noteinfo = {
            titleinput,
            descriptioninput,
            notedate:`${day}/${month}/${year}`
        }
        if(!edited){
            notesarr.push(noteinfo);
        }else
        {
            notesarr[updated] = noteinfo;
        }

        shownote();
        localStorage.setItem("note" , JSON.stringify(notesarr));
        location.reload();
    }

};

function shownote(){
    notesarr.forEach((note , index) => {
        let htmlnote = `<div class="notes">
        <h1 class="notetitle">${note.titleinput}</h1>
        <p class="notep">${note.descriptioninput}</p><hr>
        <h5 class="notetime">${note.notedate}</h5>
        <button class="editnote" onclick="editnote('${index}' , '${note.titleinput}' , '${note.descriptioninput}')">Edit</button>
        <button class="deletenote"  onclick="deletenote(${index})">Delete</button>`
        notes.insertAdjacentHTML("afterend" , htmlnote);
        closebtn.click();
       document.querySelector(".titleinput").value = "";
       document.querySelector(".descriptioninput").value = "";
    })
};

function deletenote(noteid){
    notesarr.splice(noteid , 1);
    localStorage.setItem("note" , JSON.stringify(notesarr));
    location.reload();
};

function editnote(noteid , title , desc){
   edited = true;
   updated = noteid;
   plusbtn.click();
   addnotepopup.textContent = "Edit the Note!"
   document.querySelector(".titleinput").value = title;
   document.querySelector(".descriptioninput").value = desc;
   addnotepopup.addEventListener("click" , ()=>{
    closebtn.click();
   })

};


// (;
