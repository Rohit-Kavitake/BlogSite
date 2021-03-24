

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