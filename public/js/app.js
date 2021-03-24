

const addBlog = () =>{
    let Title = document.querySelector("#title").value;
    let blogcontent = document.querySelector("#body").value;
    let blogauthor = document.querySelector("#author").value;
    let feedback = document.querySelector("#feedback");
    if(Title == "" || blogcontent == "" || blogauthor == ""){
        alert("Please Enter all the Fields before submitting");
    }else{
        firebase.firestore().collection('Blog').add({
        author : blogauthor,
        title : Title,
        content : blogcontent,
        time : firebase.firestore.FieldValue.serverTimestamp()
    }).then(feedback.textContent = "Blog Successfully Saved").catch( err => {
        console.log("Firestore Database adding data error")
        feedback.textContent = "Blog Saving Error";
        
    });
    RetrieveData()
    // console.log(id = "is id")
    setTimeout(function(){ feedback.textContent = "";document.querySelector('.close').click()},3000)
    document.querySelector("#resetbtn").click();
    // reset.click()
    
    }
}

const RetrieveData = () =>{
    document.getElementById("Blogs").innerHTML = "";
    firebase.firestore().collection("Blog").orderBy('time','desc')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
            let li = document.createElement("li");
            li.className = "list-group-item"
            li.id = doc.id;
            let title = doc.data().title;
            // console.log(title);
            let bloglistTitle = document.createTextNode(title);
            li.appendChild(bloglistTitle);
            document.getElementById("Blogs").appendChild(li);
            // console.log(this.id)
            li.addEventListener('click',function(){viewBlog(this.id)})
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

RetrieveData();

const viewBlog = (id) =>{
    window.$("#veiwblogmodal").modal("show")
    firebase.firestore().collection("Blog").doc(id)
        .get()
        .then(function(doc){
            console.log("here")
            console.log(doc.data().title)
            document.getElementById('modalTitle').innerHTML = "<i class='fas fa-cloud'></i>  " + doc.data().title;
            document.getElementById('modalBody').innerHTML =  doc.data().content;
            document.getElementById('authorName').innerHTML = "Author :- " +doc.data().author;
        })
}

