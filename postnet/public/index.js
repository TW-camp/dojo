let items = document.getElementById('items');
let allItems = loadAllItems();
let ul = document.createElement('ul');
items.appendChild(ul);
let lists = allItems.map((allItem) => {
  return {name: allItem.name, id: allItem.id, price: allItem.price};
})

for(let list of lists){
  let li = document.createElement('li');
  li.innerHTML = `食品：${list.name}  编号：${list.id}  单价：${list.price}`
  ul.appendChild(li);
}


function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
