const form = document.querySelector('form')
const input = document.getElementById('inp')
const list = document.querySelector('.list')
const btn = document.querySelector('.btn')

console.log(input);
let arr = []
let editMode = false
let editIndex = 0

input.addEventListener('blur', validation)
form.addEventListener('submit', addTodo)

function validation(){
    if(this.value === ''){
        alert('Please put item first')
    }
}

function addTodo(e){
    e.preventDefault()

    if(editMode === false){
        
            let obj = {
                newTodo : input.value
            }
            arr.push(obj)
        
            form.reset()
            showItems()
            // console.log(newTodo);

    }else{
        let obj = {
            newTodo : input.value
        }
        arr[editIndex] = obj
    
        form.reset()
        showItems()
        btn.innerHTML = 'Add Item'
    }

}

function showItems(){

    list.innerHTML = ''

    arr.map((ele, index) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        
            <td>${ele.newTodo}</td>
            <td><a class="cross_class" onclick="deleteItem(${index})">X</a></td>
            <td><a class="edit_class" onclick="editItem(${index})">Edit</a></td>
            <td><a class="up_class" onclick="upItem(${index})">Up</a></td>
            <td><a class="down_class" onclick="downItem(${index})">Down</a></td>
        
        `
    
        list.appendChild(tr)
    
        console.log(tr);
    })
}

function deleteItem(idx){
    arr = arr.filter((ele, index) => {
        return index !== idx
    })
    showItems()
}

function editItem(idx){
    let obj = arr[idx]
    input.value = obj.newTodo

    editMode = true
    editIndex = idx
    btn.innerHTML = 'Update'
}

// function upItem(index){
//     let currentIndex = arr[index]
//     let previousIndex = arr[index - 1]

//     arr[index] = previousIndex
//     arr[index - 1] = currentIndex

//     showItems()
// }
function upItem(index) {

    console.log('click');
    if(index === 0){
      alert('Cannot go back anymore')
    }else{
        let currentobj = arr[index];
        let prevobj = arr[index - 1];
      
        arr[index] = prevobj;
        arr[index - 1] = currentobj;
      
        showItems();
      
    }
}

function downItem(index){
    if(index >= arr.length - 1){
        alert('Cannot go any further down')
    }else{
        let currentIndex = arr[index]
        let nextIndex = arr[index + 1]

        arr[index] = nextIndex
        arr[index + 1] = currentIndex

        showItems()
    }
}
