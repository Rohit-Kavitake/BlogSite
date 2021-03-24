

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

/**
 * Changes:
 * 1: converted then with async-await
 * 2: changed doc method from doc.data().KEYNAME with doc.get('KEYNAME'),
 *    as it gives formatted string, also added breaks <br/> in modalBody's innerHTML
 * 3: when you are not setting string with tags use textContent as it is better and faster.
 * 
 * TIP: try not to use innerHTML as much as possible. do some reasearch on why!
 */
const viewBlog = async (id) =>{
    window.$("#veiwblogmodal").modal("show")
    const doc = await firebase.firestore().collection("Blog").doc(id).get()
    document.getElementById('modalTitle').innerHTML = "<i class='fas fa-cloud'></i>  " + doc.get('title');
    console.log(doc.get('content').split('\n').join('<br/>'))
    document.getElementById('modalBody').innerHTML =  getStringWithNewLine(doc.get('content'));
    document.getElementById('authorName').textContent = "Author :- " +doc.get('author');
}

//utility method
const getStringWithNewLine = (str="") => {
    if(str){
        str.split('\n').join('<br/>')
    }
    return str
}

