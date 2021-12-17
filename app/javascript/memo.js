const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時:${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`
  return html; //関数buildHTMLの返り値にhtmlを指定 ここで言うhtmlは3~11行目で定義したhtmlのこと
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list"); //index.htmlのlist idを取得
      const formText = document.getElementById("content");
      const item = XHR.response.post; //response.postで値が取れるのはposts_controllerのcreate中のrenderで記述したから
      list.insertAdjacentHTML("afterend", buildHTML(XHR)) // list id内の最初の子要素の直前. なので一番上に表示される
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);