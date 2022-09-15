// //Дропдаун хедер



// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//   if (!event.target.matches('.dropbtn')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }







// work


const conncetHTML = (...className) => {
  const H = {}
  className.forEach(name => H[name] = document.getElementById(name))
  return H
}

const H = conncetHTML(
  'currency', 'categoryHover', 'table', 'elem_type', 'category', 'elem_amount', 'table_data', 'addMore',
  "creat_tranzaction", "creat_category",
  'modal_close', 'content_modal', 'modal'
);



function errorForInput(input) {
  input.style.background = bgInput.error
  setTimeout(() => input.style.background = bgInput.defoult, 3000)
}

const addCreat_tranzaction = () => {
  H.creat_tranzaction.onclick = () => {
    H.modal.classList.add('open');

    const valut = arr_currency
      .slice(1)
      .map(val => `<option value="${val}">${val}</option>`)
      .join('')

    const categoryOption = cateqory
      .slice(1)
      .map(cat => `<option value="${cat.name}">${cat.name}</option>`)
      .join('')

    H.content_modal.innerHTML = `
    <h1 class="creat_category_h1">Создать транзакцию</h1>
    <div class="C_tranzaction">
      <p>Сумма</p>
      <input type="number" slot="sum">
    </div>
    <div class="C_tranzaction">
      <p>Валюта</p>
      <select value="${arr_currency[0]}" slot="valut">
      ${valut}
      </select>
    </div>
    <div class="C_tranzaction">
      <p>Категория</p>
      <select slot="cateqory" value="${categoryOption[0].name}">
      ${categoryOption}
      </select>
    </div>
    <div class="C_tranzaction">
      <p>Описание</p>
      <input type="text" slot="description">
    </div>
    <div class="C_tranzaction">
      <p>Дата</p>
      <input slot="date" type="date">
    </div> 
    `;


    const all_C_tranzaction = document.querySelectorAll('.C_tranzaction')  



    const button = document.createElement('button')
    button.textContent = 'Создать'
    button.onclick = () => {
      let isError = false;
      const new_tranzaction =  {
        _id: id()
    }


      all_C_tranzaction.forEach(C_tranzaction => {
        const teg = C_tranzaction.children[1];
        
        if(teg.value.trim() == '') {
          errorForInput(teg)
          return isError = true;
        }
        new_tranzaction[teg.slot] = teg.value;
        
      })

      if(isError) return;
      new_tranzaction.sum = +new_tranzaction.sum;
      H.modal.classList.remove('open')
      data.unshift(new_tranzaction)
      creatChart()
      sort()

    }
    button.classList.add('creat_category_button')
    H.content_modal.appendChild(button)



  }
}

const addCreat_category = (teg) => {
  teg.onclick = () => {
    H.content_modal.textContent = '';
    H.modal.classList.add('open')

    const input = document.createElement('input')
    const button = document.createElement('button')
    const h1 = document.createElement('h1')


    input.classList.add('creat_category_input')
    button.classList.add('creat_category_button')
    h1.classList.add('creat_category_h1')

    button.textContent = 'Создать'
    h1.textContent = 'Создать категорию'

    button.onclick = () => {
      if (input.value.trim() == '') return errorForInput(input)
      H.modal.classList.remove('open')
      const newCategory = { name: input.value, _id: id() }
      cateqory.push(newCategory)
      addCategory()
      creatChart()


    }
    H.content_modal.appendChild(h1)
    H.content_modal.appendChild(input)
    H.content_modal.appendChild(button)


  }
}

const creatNumForDate = dateStr => {
  const dateArr = dateStr.split('-');
  return +(dateArr[0] + dateArr[1] + dateArr[2])
}



const addOptionForCurrency = () => {
  H.currency.innerHTML = arr_currency.map(curr => `<option value="${curr}" >${curr}</option>`).join('')
  H.currency.onchange = ({ target }) => { currentFilter.valut = target.value; sort() }

}


const addOrRemoveClassOpen = () => {
  H.modal_close.onclick = () => H.modal.classList.remove('open')
}

const addCategory = () => {
  H.categoryHover.textContent = ''
  cateqory.forEach(elem => {
    const button = document.createElement('button')
    button.classList.add('modal_category')
    button.textContent = elem.name;
    button.onclick = () => {
      // H.elem_type.textContent = elem.name;
      currentFilter.cateqory = elem.name; 
      sort();
      setTimeout(()=> H.categoryHover.classList.remove('open'),200)
     
     
      // console.log(1);
      // H.categoryHover.classList.add('none')
      // setTimeout(() => H.categoryHover.classList.remove('none'), 300)
    }
    H.categoryHover.appendChild(button)
  })
}

const addFilterForAmount = () => {
  H.elem_amount.onclick = () => {
    currentFilter.amount = currentFilter.amount == 'ot' ? 'from' : 'ot'
    sort()
  }
}

const addFilterForDate = () => {
  document.querySelectorAll('#input_date').forEach(input => {
    input.oninput = () => {
      currentFilter.date[input.slot] = creatNumForDate(input.value);

      if (currentFilter.date.ot && currentFilter.date.from && currentFilter.date.ot > currentFilter.date.from) {
        currentFilter.date[input.slot] = null;
        input.value = NaN;
        errorForInput(input)
        H.categoryHover.classList.remove('open')
      }

      sort()
      creatChart()
    }
  })
}


const addEventForAddMore = () => {
  H.addMore.onclick = () => { currentFilter.limit += 5; sort() }
}


const creatElem = elem => {
  const classForAmount = elem.sum < 0 ? 'red' : 'green'

  return `  <div class="table_elem" id="elem_${elem._id}">
  <div  id="elem_type" class="elem_type elem">${elem.cateqory}</div>
  <div class="line"></div>
  <div class="elem_currency elem">
    ${elem.valut}
  </div>
  <div class="line"></div>
  <button class="elem_amount elem ${classForAmount}"  id="elem_amount">${elem.sum}</button>
  <div class="line"></div>
  <div class="elem_description elem">${elem.description}</div>
  <div class="line"></div>
  <div class="elem_date elem">${elem.date}</div>
</div>`
}


const addAllElemForTable_data = (arr = data) => {
  H.table_data.innerHTML =
    arr.length === 0
      ? '<div class="noFind">Не найдено</div>'
      : arr.map(creatElem).join('')
}

const sortForDateAndCateqory = () => {
  let newList = data;
const ot = currentFilter.date.ot ? currentFilter.date.ot : 0;
const from = currentFilter.date.from ? currentFilter.date.from : Infinity;

if (currentFilter.cateqory !== cateqory[0].name) newList = newList.filter(elem => currentFilter.cateqory == elem.cateqory);
if (currentFilter.date.from || currentFilter.date.ot) newList = newList.filter(elem => {
  const date = creatNumForDate(elem.date)
  return (date >= ot && date <= from)
})

return newList
}




const sort = () => {
  if (data.length <= currentFilter.limit) H.addMore.remove()

  let newList = data.slice(0, currentFilter.limit);
  const ot = currentFilter.date.ot ? currentFilter.date.ot : 0;
  const from = currentFilter.date.from ? currentFilter.date.from : Infinity;

  if (currentFilter.amount !== null) newList.sort((one, two) => currentFilter.amount == 'ot' ? one.sum - two.sum : two.sum - one.sum);
  if (currentFilter.valut !== arr_currency[0]) newList = newList.filter(elem => currentFilter.valut == elem.valut);
  if (currentFilter.cateqory !== cateqory[0].name) newList = newList.filter(elem => currentFilter.cateqory == elem.cateqory);

  if (currentFilter.date.from || currentFilter.date.ot) newList = newList.filter(elem => {
    const date = creatNumForDate(elem.date)
    return (date >= ot && date <= from)
  })

  creatDataForGrafic()
  addAllElemForTable_data(newList)
  // creatChart()
}
const addClassOpenForCategoryHover = () => {
  H.category.onclick = () => {
    H.categoryHover.classList.add('open')
  }
  H.category.onblur = () => {
    setTimeout(()=>  H.categoryHover.classList.remove('open'),200)
   
  }
}


// Grafic 
const creatCurrentValut = (width,valut,bg) => {
  const grafic = document.createElement('div')
  grafic.classList.add('grafic')
  grafic.textContent = valut;
  grafic.style.width = width + '%';
  grafic.style.background = bg;
  return grafic
}
const creatGrafic = (newData) => {
  const all =  document.querySelectorAll('.C_AllGrafic')
  let i = 0;
  for(const valut in newData){
    const type = newData[valut]

    const C_for_Grafic = document.createElement('div')
    C_for_Grafic.classList.add('C_for_Grafic')
    const C_for_GraficForSum = document.createElement('div')
    C_for_GraficForSum.classList.add('C_for_Grafic')

    for(const currentValut in type){
     
    C_for_Grafic.appendChild( creatCurrentValut(33.3,currentValut,'rgba(56, 56, 56, 0.801)'))
     C_for_GraficForSum.appendChild(creatCurrentValut(33.3,type[currentValut],'rgba(31, 31, 31, 0.801)'))

    }
    



    all[i].innerHTML = ` <div class="C_for_Grafic">
    <div class="grafic">
        ${nameGrafic[i]}
    </div>
</div>`
  all[i].appendChild(C_for_Grafic)
  all[i].appendChild(C_for_GraficForSum)

i++;
}



}

const creatAlldataValut = (dataGrafic,new_arr_currency) => {
  const newData = {
    all : {},
    income : {},
    consumption : {}
  }
  new_arr_currency.forEach(valut => {
   const income = dataGrafic[valut + '-i']
   const consumption = dataGrafic[valut + '-c']

   

    newData.all[valut] = income + consumption
    newData.income[valut] = income
    newData.consumption[valut] = consumption
  })

return newData
}


const creatDataForGrafic = () => {

const dataGrafic = {}
const new_arr_currency = arr_currency.slice(1)
new_arr_currency.forEach((valut) =>( dataGrafic[valut + '-i'] = 0, dataGrafic[valut + '-c'] = 0))




let newList =sortForDateAndCateqory();
// let newList = data;
// const ot = currentFilter.date.ot ? currentFilter.date.ot : 0;
// const from = currentFilter.date.from ? currentFilter.date.from : Infinity;

// if (currentFilter.cateqory !== cateqory[0].name) newList = newList.filter(elem => currentFilter.cateqory == elem.cateqory);
// if (currentFilter.date.from || currentFilter.date.ot) newList = newList.filter(elem => {
//   const date = creatNumForDate(elem.date)
//   return (date >= ot && date <= from)
// })

newList.forEach(elem => {
    if(elem.sum > 0) dataGrafic[elem.valut + '-i'] += elem.sum
    else dataGrafic[elem.valut + '-c'] += elem.sum
  })
// 
 newData = creatAlldataValut(dataGrafic,new_arr_currency)


 creatGrafic(newData)
}


!function () {
  addOptionForCurrency()
  addOrRemoveClassOpen()
  addCategory()
  addFilterForAmount()
  addAllElemForTable_data(data.slice(0, currentFilter.limit))
  addFilterForDate()
  addEventForAddMore()
  addCreat_category(H.creat_category)
  // addCreat_category(H.creat_category) add your teg
  addCreat_tranzaction()
  addClassOpenForCategoryHover()
  creatDataForGrafic()
  creatChart()
  addEventForButtons()
}();

