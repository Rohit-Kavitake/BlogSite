

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
    // console.log(id = "is id")
    setTimeout(function(){ feedback.textContent = ""},3000)
    let reset = document.querySelector("#resetbtn");
    reset.click()
    }
}

const RetrieveData = () =>{
    firebase.firestore().collection("Blog")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let li = document.createElement("li");
            li.className = "list-group-item"
            let title = doc.data().title;
            // console.log(title);
            let bloglistTitle = document.createTextNode(title);
            li.appendChild(bloglistTitle);
            document.getElementById("Blogs").appendChild(li);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

RetrieveData();

