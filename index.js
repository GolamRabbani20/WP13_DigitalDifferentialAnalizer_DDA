document.getElementById('makeTable').style.display = 'none'

//document.getElementById('ddaAlgo').addEventListener('click', function(){})

document.getElementById('reset').addEventListener('click', function(){
    const x1 = document.getElementById('x1').value = ""
    const y1 = document.getElementById('y1').value = ""
    const x2 = document.getElementById('x2').value = ""
    const y2 = document.getElementById('y2').value = ""
    document.getElementById('slop').innerText = ""
    document.getElementById('makeTable').style.display = 'none'
})

document.getElementById('submitBtn').addEventListener('click', function(){
    const x1 = parseFloat(document.getElementById('x1').value)
    const y1 = parseFloat(document.getElementById('y1').value)
    const x2 = parseFloat(document.getElementById('x2').value)
    const y2 = parseFloat(document.getElementById('y2').value)
    const slop = ((y2 - y1) / (x2 - x1)).toFixed(2)
    if(Math.round(slop)){
        document.getElementById('slop').innerText = 'Slop is: ' + slop
        document.getElementById('makeTable').style.display = 'block'


        document.getElementById('myTable').innerHTML = ""
        createHeading()
        calculationForRow1(x1, y1, x1, y1)
        tableCalculations(x1, y1, x1, y1, slop, x2, y2)
    }

})
function calculationForRow1(x, y, x_plot, y_plot) {
    const rowCol = document.getElementById('myTable')
    const trow = document.createElement('tr')
    trow.innerHTML =   
                        `
                        <td>${x}</td>
                        <td>${y}</td>
                        <td>${x_plot}</td>
                        <td>${y_plot}</td>   
                        <td>(${x}, ${y})</td>
                        `
    rowCol.appendChild(trow)
}

function tableCalculations(x, y, x_plot, y_plot, slop, x2, y2){
    let m = parseFloat(slop)
    if(slop>0 && slop<=1){
        while(x_plot != x2 && y_plot != y2){
            x = x + 1
            y = y + m
            x_plot = Math.round(x)
            y_plot = Math.round(y)
            appendRow(x, y, x_plot, y_plot, m)
        }  
    }

    else if(slop>= -1 && slop<= 0){
        while(x_plot != x2 && y_plot != y2){
            x = x - 1
            y = y - m
            x_plot = Math.round(x)
            y_plot = Math.round(y)
            appendRow(x, y, x_plot, y_plot, m)
        }  
    }

    else if(slop>1){
        while(x_plot != x2 && y_plot != y2){
            x = parseFloat((x + (1/m)).toFixed(2))
            y = y + 1
            x_plot = Math.round(x)
            y_plot = Math.round(y)
            appendRow(x, y, x_plot, y_plot, m)
        }  
    }

    else if(slop<-1){
        while(x_plot != x2 && y_plot != y2){
            x = parseFloat((x - (1/m)).toFixed(2))
            y = y - 1
            x_plot = Math.round(x)
            y_plot = Math.round(y)
            appendRow(x, y, x_plot, y_plot, m)
        }  
    }
    
}    

function appendRow(x, y, x_plot, y_plot, m){
    const rowCol = document.getElementById('myTable')
    const trow = document.createElement('tr')
    if(m>0 && m<=1){
        trow.innerHTML =   
                        `
                        <td> ${x-1} + 1 = ${x}</td>
                        <td>${(y-m).toFixed(2)} + ${m} = ${y.toFixed(2)}</td>
                        <td>${x_plot}</td>
                        <td>${y_plot}</td>   
                        <td>(${x_plot}, ${y_plot})</td>
                        `
        rowCol.appendChild(trow)
    }

    else if(m>= -1 && m<= 0){
        trow.innerHTML =   
                        `
                        <td> ${x+1} - 1 = ${x}</td>
                        <td>${(y+m).toFixed(2)} - (${m}) = ${y.toFixed(2)}</td>
                        <td>${x_plot}</td>
                        <td>${y_plot}</td>   
                        <td>(${x_plot}, ${y_plot})</td>
                        `
        rowCol.appendChild(trow)
    }
    else if(m>1){
        trow.innerHTML =   
                        `
                        <td> ${(x-(1/m)).toFixed(2)} + ${(1/m).toFixed(2)} = ${x}</td>
                        <td>${y-1} + 1 = ${y}</td>
                        <td>${x_plot}</td>
                        <td>${y_plot}</td>   
                        <td>(${x_plot}, ${y_plot})</td>
                        `
        rowCol.appendChild(trow)
    }
    else if(m<-1){
        trow.innerHTML =   
                        `
                        <td> ${(x+(1/m)).toFixed(2)} - (${(1/m).toFixed(2)}) = ${x}</td>
                        <td>${y+1} - 1 = ${y}</td>
                        <td>${x_plot}</td>
                        <td>${y_plot}</td>   
                        <td>(${x_plot}, ${y_plot})</td>
                        `
        rowCol.appendChild(trow)
    }
  
}  

function createHeading() {
    const rowCol = document.getElementById('myTable')
    const trow = document.createElement('tr')
    trow.innerHTML =   
                        `
                            <th>X</th>
                            <th>Y</th>
                            <th>X plot</th>
                            <th>Y plot</th>
                            <th>(X, Y)</th>
                        `
    rowCol.appendChild(trow)
}