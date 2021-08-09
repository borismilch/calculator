
export function calculator(selector, options ={}){
    let arr1 = [')', '(', '+', '÷', '-', '%','*',];
    let arr2 = ['=', 'AC'];
    let arr = ['1','2','3','4','5','6','7','8','9', '0'];
    let acc = '';
    const input = creator('input', 'calculator__input', false, false, 'value', '0')
    
    const hint = creator('span', 'calculator__hint', 'Ans = 123')
    
    const buttons = creator('div', 'calculator-buttons');

    const {numbers} = options;
    console.log(eval(fixer('2 ÷ 1 00%')))
    const parent = document.querySelector(selector);

    const btns =  btnCreator(numbers, arr1,arr2, 'calculator__button', 'calculator__button--white', 'calculator__button--gray','calculator__button--blue',  )
   
    buttons.addEventListener('click', (e)=>{
        e.preventDefault();
        
        
        let btnContent = e.target.textContent;
        if(arr.includes(btnContent)){
        acc += btnContent    
        input.value = acc;
         }
        if(arr1.includes(btnContent) && acc !== ''){
           let last =  acc[acc.length-1]
            arr1.includes(last) ? noop() : acc += btnContent
            input.value = acc;
         }
        if(btnContent === 'AC'){
            input.value = '0'
            acc = ''
        }
        if(btnContent === '='){
            input.value = eval(fixer(input.value))
            acc = `${eval(fixer(input.value))}`
        }
        if(acc !=='' && acc !== undefined){
            hint.textContent = `${eval(fixer(input.value))}`
        }
    })

    btns.forEach(btn=> buttons.insertAdjacentElement('beforeend',btn))
    parent.insertAdjacentElement('afterbegin', input);
    parent.insertAdjacentElement('afterbegin', hint);
    parent.insertAdjacentElement('beforeend', buttons);
  
    
  
}
function noop(){}
function creator(element, cls,  text, cls2, attr, attrval){
    let elem  =  document.createElement(element);
    elem.classList.add(cls);
    cls2 ? elem.classList.add(cls2) : noop();
    text ? elem.textContent = text : noop()
    attr ? elem.setAttribute(attr, attrval) : noop()
    return elem
}

function btnCreator(array, arr1,arr2, clsdef, cls1, cls2, cls3){
    let ss = []
for (let i = 0; i < array.length; i++) {
    const element = array[i];
     ss.push(arr1.includes(element) ? creator('button', clsdef , array[i], cls2) : arr2.includes(element)?creator('button', clsdef ,array[i], cls3): creator('button', clsdef ,array[i], cls1))
}
return ss
}

function fixer(str){
  return str
   .replace(/÷/gi , '/')
   .replace(/%/gi, '/100')
   .replace(/\s/gi, '')
}