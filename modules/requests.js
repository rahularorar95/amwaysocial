function get(url, intent) {
  kony.print("Response >> " + url);

  var request = new kony.net.HttpRequest();
  switch(intent) {
    case "Me":
      request.onReadyStateChange = responseCallBackMe;
      break;
    case "Posts":
      request.onReadyStateChange = responseCallBackPosts;
      break;
    case "Traffic":
      request.onReadyStateChange = responseCallBackTraffic;
      break;
    case "Earnings":
      request.onReadyStateChange = responseCallBackEarnings;
      break;
    case "Notifications":
      request.onReadyStateChange = responseCallBackNotifications;
      break;
  }

  request.open(constants.HTTP_METHOD_GET, url);
  request.send();
}

function responseCallBackMe(){
  try{
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("Response >> "+ JSON.stringify(this.responseText));
      user = JSON.parse(this.responseText);
    }
  }catch(e){
    kony.print("Response >> Exception is " + e);
  }
}

function responseCallBackPosts(){
  try{
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("Response >> "+ JSON.stringify(this.responseText));
      var tempPosts = JSON.parse(this.responseText);
      
      // Sync With Store
      var storedPosts = JSON.parse(kony.store.getItem("posts"));
      kony.print("Match Greet>> " + JSON.stringify(storedPosts));
      for(var i in tempPosts) {
//         for(var j in storedPosts) {
//           if( !storedPosts[j].lblDesc ) continue;
//           if( !posts[j].lblDesc ) continue;
//           storedPosts[j].lblDesc.text = storedPosts[j].lblDesc.text.replace("<div>","").replace("</div>","");
//           posts[j].lblDesc.text = tempPosts[j].lblDesc.text.replace("<div>","").replace("</div>","");
          
//           if( tempPosts[i].message == storedPosts[j].lblDesc.text ) {
//             storedPosts[j].countLike = tempPosts[i].reactions;
//             storedPosts[j].countComment = tempPosts[i].commentsCount;
//             storedPosts[j].countShare = tempPosts[i].sharesCount;              
//           }
//           if( tempPosts[i].message == posts[j].lblDesc.text ) {
//             posts[j].countLike = tempPosts[i].reactions;
//             posts[j].countComment = tempPosts[i].commentsCount;
//             posts[j].countShare = tempPosts[i].sharesCount;              
//           }
//         }
        for(var j in posts) {
          if(!posts[j].lblDesc) continue;
          posts[j].lblDesc.text = posts[j].lblDesc.text.replace("<div>","").replace("</div>","");
          if( posts[j].lblDesc.text == tempPosts[i].message ) {
            posts[j].countLike.text = tempPosts[i].reactions;
            posts[j].countComment.text = tempPosts[i].commentsCount;
            posts[j].countShare.text = tempPosts[i].sharesCount;              
          }
        }
      }
      kony.print("Post Updating >> " + JSON.stringify(posts) );

//       kony.store.setItem("posts", JSON.stringify(storedPosts));
      
    }
  }catch(e){
    kony.print("Response >> Exception is " + e);
  }
}

function responseCallBackNotifications(){
  try{
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("Response >> "+ JSON.stringify(this.responseText));
      notifications = JSON.parse(this.responseText);
      kony.print("Response >> new notifications : " + JSON.stringify(notifications));
    }
  }catch(e){
    kony.print("Response >> Exception is " + e);
  }
}

function responseCallBackEarnings(){
  try{
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("Response >> "+ JSON.stringify(this.responseText));
      earnings = JSON.parse(this.responseText);
    }
  }catch(e){
    kony.print("Response >> Exception is " + e);
  }
}

function responseCallBackTraffic(){
  try{
    if (this.readyState == constants.HTTP_READY_STATE_DONE) {
      kony.print("Response >> "+ JSON.stringify(this.responseText));
      traffic = JSON.parse(this.responseText);
    }
  }catch(e){
    kony.print("Response >> Exception is " + e);
  }
}

function fetchData() {
  kony.print("Response >> Called");
  var baseUrl = "https://amway-chinmayapati.c9users.io/";
 
  // Get Me
  get(baseUrl, "Me");

  // Get Posts
  get(baseUrl+"posts", "Posts");

  // Get Notifications
  get(baseUrl+"notifications", "Notifications");

  // Get Traffic
  get(baseUrl+"traffic", "Traffic");

  // Get Earnings
  get(baseUrl+"earnings", "Earnings");
}

function registerServiceCall() {
  try {
    kony.print("Response >> Service registered");
    kony.timer.schedule("fetchData", fetchData, 5, true);
  } catch(e) { kony.print("Fetching Data Failed"); }
}