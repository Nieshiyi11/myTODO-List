// 读取数据
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [] ;
console.log(itemsArray);


// 用户写入数据
// 【tip】: 浏览器打开一个HTML页面后，会把整个HTML 面解析成一个对象，这个对象就是：document
document.querySelector("#enter").addEventListener("click",function(){
    const item = document.querySelector("#item");
    createItems(item);
});
//声明createItems(item)函数
function createItems(item){
    itemsArray.push(item.value);  // 把用户的输入放进itemsArray数组里
    localStorage.setItem("items",JSON.stringify(itemsArray)); // 存数据进localStorage
    location.reload();  // 刷新页面
}


// 渲染任务到页面上
// <textarea disabled></textarea>表示：创建一个多行文本输入框，但用disabled把这个输入框禁用了，用户不能编辑它
function displayItems(){
    let items = "";
    for(let i = 0 ; i < itemsArray.length ; i++){
        items += ` <div id="items">
                        <div class="input-controller">
                            <textarea disabled>${itemsArray[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-check deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                   </div> `;
    }
    document.querySelector(".todo-list").innerHTML = items;
    activateDeleteListener();   // 函数1
    activateEditListener();     // 函数2
    activateSaveListener();     // 函数3
    activateCancelListener();   // 函数4
}

//函数1
function activateDeleteListener(){
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach(function(db,index){
        db.addEventListener("click",function(){
            deleteItem(index);
        });
    });
}
//删除（完成）任务
function deleteItem(index){
    itemsArray.splice(index,1);
    localStorage.setItem("items",JSON.stringify(itemsArray));
    location.reload();  //注意不是Location.reload()
}

//函数2
function activateEditListener(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach(function(eb,index){
        eb.addEventListener("click",function(){
            updateController[index].style.display = "block";     // 显示当前任务对应的Save/Cancel区域
            inputs[index]. disabled = false;                     // 改成用户可编辑状态
        });
    });
}

//函数3
function activateSaveListener(){
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach(function(sb,index){
        sb.addEventListener("click",function(){
            updateItem(inputs[index].value,index);
        });
    });
}
//更新任务函数
function updateItem(text,index){
    itemsArray[index] = text;
    localStorage.setItem("items",JSON.stringify(itemsArray));
    location.reload();
}

//函数4
/*
点击【Cancel】按钮后：
1. 隐藏Save / Cancel区域
2. 让textarea重新变成不可编辑状态
*/
function activateCancelListener(){
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach(function(cb,index){
        cb.addEventListener("click",function(){
            inputs[index].value = itemsArray[index]; // 恢复成原来的内容
            updateController[index].style.display = "none";  // 隐藏当前任务对应的Save/Cancel区域
            inputs[index].disabled = true;    // 让当前任务对应的textarea重新变成不可编辑
        });
    });
}


//显示每天的日期到页面上
function displayDate(){
    let date = new Date();  // 创建了一个当前时间对象，new Date()会获取浏览器当前的日期和时间
    // date本来是一个Date对象，不是普通字符串，date.toString()将其转换成字符串
    date = date.toString().split(" "); // split(" ")表示将这个字符串按空格切开，变成数组
    // 在HTML页面里查找 id="date" 的元素并修改它里面的HTML内容
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}


// window.onload表示：等整个网页加载完成之后，再执行里面的代码
window.onload = function(){
    displayDate();
    displayItems();
}