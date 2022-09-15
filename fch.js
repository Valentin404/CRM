// var ctx = document.getElementById("myChart");
var C_myChart = document.querySelector(".C_myChart");
const creatChart = () => {
    C_myChart.textContent = ''
    const new_arr_currency = arr_currency.slice(1)
    const new_nameGrafic = nameGrafic.slice(1)
    const newCateqory = cateqory.slice(1).map(elem=>elem.name)
    const newList =sortForDateAndCateqory();

    const dateValut = {}

    newList.forEach(tranzaction => {
        // dateValut in tranzaction.valut
        // console.log(dateValut[tranzaction.valut] );
        
        dateValut[tranzaction.valut] == undefined && (dateValut[tranzaction.valut] = []);
        dateValut[tranzaction.valut].push(tranzaction)


        // console.log( );
    })
    // console.log(newList);
    // console.log(dateValut);


    new_arr_currency.forEach(valut => {
        if(dateValut[valut] === undefined) return;
        const canvas = document.createElement('canvas')
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.textContent = valut;

        div.appendChild(h2)
        div.appendChild(canvas)
      

        const category = []

        const listDate = {}
        dateValut[valut].forEach(tranzaction => {
            const cateqory = tranzaction.cateqory;
            const sum = tranzaction.sum;
            category.includes(cateqory) == false && category.push(cateqory)
            const lastSum = listDate[cateqory] ? listDate[cateqory] : 0;

            switch(currentFilter.typeChart){
                case 'income': return sum > 0 && (listDate[cateqory] = lastSum + sum)
                case 'consumption': return (sum < 0) && (listDate[cateqory] = lastSum + sum)
                default : return listDate[cateqory] = lastSum + sum
            }
            
        })
        
        const listDateForChartArr = category.map(valut => listDate[valut])

        if(listDateForChartArr.includes(undefined) && listDateForChartArr.length == 1) return //проверка на тто рисовать ли график
        var myChart = new Chart(canvas, {
            type: 'pie',
            data: {
                // label:'sadas',
                labels:category, 
                datasets: [{
                    label: '# of Tomatoes',
                    data: listDateForChartArr,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4,
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'asd'
                  },
                //cutoutPercentage: 40,
                responsive: false,
        
            }
        });

        C_myChart.appendChild(div)
    })

}






const addEventForButtons = () => {
    document.querySelectorAll('.C_buttons button').forEach(button=> {
        button.onclick = () => {
            const oldButton = document.querySelector('button.active')
            if(oldButton == button) return;
            oldButton && oldButton.classList.remove('active')
            button.classList.add('active')
            currentFilter.typeChart = button.slot
            creatChart()
        }

    })
}
