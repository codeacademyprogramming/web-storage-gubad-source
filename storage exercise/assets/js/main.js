let heart = document.querySelectorAll(".card a i");

heart.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    if (elem.classList.contains("text-dark")) {
      elem.classList.remove("text-dark");
      elem.classList.add("text-danger");
    } else {
      elem.classList.remove("text-danger");
      elem.classList.add("text-dark");
    }

    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket == null) {
      basket = [];
    }

    let productId = this.dataset.id;
    let index = basket.findIndex((item) => {
      return item.id == productId;
    });
    console.log(index);
    if (index == -1) {
      let product = {
        image:
          this.parentNode.parentNode.previousElementSibling.getAttribute("src"),
        title: this.parentNode.parentNode.children[0].innerText,
        info: this.parentNode.parentNode.children[1].innerText,
        id: this.dataset.id,
      };

      basket.push(product);

      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      return;
    }
  });
});

let basket = JSON.parse(localStorage.getItem("basket"));

let cartItems = document.querySelector(".cart-items");
    if (basket != null && cartItems !=null) {

      basket.forEach((elem,index) => {
        let text = `<div class="card" style="width: 18rem;">
        <img src="${elem.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title title">${elem.title}</h5>
          <p class="card-text info">${elem.info}</p>
          <a href="#"><i class="fas fa-heart text-dark mx-2 remove" data-id="${elem.id}"></i>Go somewhere</a>
        </div>
      </div>`;
        let div = document.createElement("div");
        div.classList.add("col-lg-3");
        div.dataset.index=index;
        div.innerHTML = text;
     cartItems.append(div);
    
      });
    }

    let removeBtn=document.querySelectorAll('.remove');

    removeBtn.forEach((elem)=>{
      elem.addEventListener('click',function(){
       
        let index = elem.parentNode.parentNode.parentNode.parentNode.dataset.index;
       basket.splice(index,1);
       elem.parentNode.parentNode.parentNode.parentNode.remove();
       localStorage.setItem("basket", JSON.stringify(basket));
      })
    })